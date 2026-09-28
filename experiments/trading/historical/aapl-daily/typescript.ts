import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { DonchianDesktop } from '../../src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Algorithms/DonchianDesktop';
import { EmptyObject } from '../../src/Web/AspireTradingApp/frontend/src/Library/EmptyObject';
import { EmptyChecker } from '../../src/Web/AspireTradingApp/frontend/src/Library/EmptyChecker';
import { Motion6DFactory } from '../../src/Web/AspireTradingApp/frontend/src/Library/Motion6D/Motion6DFactory';
import { PerformerMeasuremets } from '../../src/Web/AspireTradingApp/frontend/src/Library/Measurements/PerformerMeasuremets';
import { DataRuntimeConsumer } from '../../src/Web/AspireTradingApp/frontend/src/Library/Runtime/DataRuntimeConsumer';
import type { TradingDataQuery } from '../../src/Web/AspireTradingApp/frontend/src/ExternalObjects/Trading/Components/TradingDataQuery';
import type { IDataConsumer } from '../../src/Web/AspireTradingApp/frontend/src/Library/Measurements/Interfaces/IDataConsumer';
import type { SequenceFilterWrapper } from '../../src/Web/AspireTradingApp/frontend/src/Library/Measurements/SequenserFilterWrapper';

const root = path.resolve(process.argv[2]);
const read = (f: string) => JSON.parse(readFileSync(path.join(root, f), 'utf8'));
const config = read('config.json');
const bars = read('data/AAPL_1d.json');
const oaDate = (date: string) => Date.parse(date + 'T00:00:00Z') / 86400000 + 25569;
const isoDate = (date: number) => new Date(Math.round((date - 25569) * 86400000)).toISOString().slice(0,10);
class FileHistory extends EmptyObject {
    constructor() { super('AAPL fixture'); this.types.push('ITradingDatabaseHistoryInterface'); }
    async getSymbolsAsync() { return [['AAPL','AAPL']]; }
    async getHistoricalDataMessageDateTimesAsync(_id: any, period: string, symbol: string, begin: number, end: number) {
        if (period !== config.interval || symbol !== config.symbol) throw Error('Wrong fixture query');
        return bars.filter((b: any) => oaDate(b.date) >= begin && oaDate(b.date) < end)
            .map((b: any) => ({ ...b, date: oaDate(b.date), requestId: 0, count: 0, wap: 0, hasGaps: false }));
    }
}
const factory = new Motion6DFactory();
factory.addFactory(new EmptyChecker(), 'ICheck');
factory.addFactory(new FileHistory(), 'ITradingDatabaseHistoryInterface');
const abort = new AbortController();
const desktop = await DonchianDesktop.getDesktopAsync(abort, factory);
const query = desktop.getCategoryObject('Trading') as unknown as TradingDataQuery;
query.setQueryParameters(config.symbol, config.interval, oaDate(config.startInclusive), oaDate(config.endExclusive));
for (const size of [0,1,3]) {
    query.data = bars.slice(0,size).map((b: any) => ({...b,date:oaDate(b.date)}));
    for (let replay=0; replay<2; replay++) {
        query.resetIterator();
        let i=0;
        while (query.nextIterator()) {
            if (i>=size || query.current.close!==bars[i].close || isoDate(query.current.date)!==bars[i].date)
                throw Error('TypeScript iterator alignment regression');
            i++;
        }
        if (i!==size) throw Error('TypeScript iterator count regression');
    }
}
console.log('TypeScript iterator checks: empty, singleton, multiple bars and reset passed');
for (const [name, setting] of [['Average Short','averageShort'],['Average Long','averageLong'],
    ['Donchian maximum','donchianHigh'],['Donchian minimum','donchianLow']]) {
    (desktop.getCategoryObject(name) as unknown as SequenceFilterWrapper).getFilter().setFilterCount(config[setting]);
}
const consumer = desktop.getCategoryObject('Chart') as unknown as IDataConsumer;
const map = new Map([
    ['date','Trading.DateTime'],['close','Trading.Close'],['position','Order.Position'],
    ['buyPrice','Order.Buy Price'],['sellPrice','Order.Sell Price'],['income','Order.Income'],
    ['averageShort','Average Short.Output'],['averageLong','Average Long.Output'],
    ['donchianHigh','Donchian maximum.Output'],['donchianLow','Donchian minimum.Output']
]);
const performer = new PerformerMeasuremets(factory);
performer.errorHandler = { handleException(error: Error) { throw error; }, log(message: string) { throw Error(message); } };
const runtime = new DataRuntimeConsumer(consumer, factory);
const raw = await performer.performIteratorDataConsumerMapAsync(consumer, query, runtime, abort, map);
if (raw.length !== bars.length) throw Error(`Expected ${bars.length} rows, got ${raw.length}`);
const records = raw.map((item: Map<string, any>, i: number) => {
    const row: any = Object.fromEntries([...item].map(([k,v]) => [k, v === undefined ? null : v]));
    row.date = isoDate(row.date);
    if (row.date !== bars[i].date || row.close !== bars[i].close) throw Error('Date/price alignment error');
    row.events = [];
    if (row.buyPrice !== null) row.events.push('buy');
    if (row.sellPrice !== null) row.events.push('sell');
    return row;
});
const metadata = { ...read('.build/metadata.json'), implementation: 'TypeScript', runtime: process.version };
writeFileSync(path.join(root, 'Trading_TypeScript.json'), '{\n"metadata":' + JSON.stringify(metadata) +
    ',\n"records":[\n' + records.map((r: any) => JSON.stringify(r)).join(',\n') + '\n]}\n');
console.log(`TypeScript: ${records.length} rows`);
