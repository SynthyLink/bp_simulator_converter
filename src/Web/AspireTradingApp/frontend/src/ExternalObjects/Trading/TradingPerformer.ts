import type { IActionT } from "../../Library/Interfaces/IActionT";
import type { IDesktop } from "../../Library/Interfaces/IDesktop";
import type { IFactory } from "../../Library/Interfaces/IFactory";
import type { HistoryMessage } from "./Database/HistoryMessage";
import type { ILocalDB } from "./Database/Local/Interfaces/ILocalDB";
import { PerformerMeasuremets } from "../../Library/Measurements/PerformerMeasuremets";
import { TradingCommunication } from "./Communication/TradingCommunication";
import { TradingDataQuery } from "./Components/TradingDataQuery";
import type { IDataConsumer } from "../../Library/Measurements/Interfaces/IDataConsumer";

export class TradingPerformer {

    pefrormer !: PerformerMeasuremets

    desktop !: IDesktop
     
    query !: TradingDataQuery

    dataConsumer !: IDataConsumer

    communication!: TradingCommunication
    constructor(local: ILocalDB, desktop: IDesktop, communication : TradingCommunication, factory?: IFactory) {
        this.local = local;
        this.pefrormer = new PerformerMeasuremets(factory)
        this.desktop = desktop
        this.communication = communication
        this.setCommunication(communication, desktop)
        this.query = desktop.getCategoryObject("Trading") as unknown as TradingDataQuery
        this.dataConsumer = desktop.getCategoryObject("Trading") as unknown as IDataConsumer

    }

    async writeHistoryAsync(symbol: string, begin: number, end: number, history: HistoryMessage[]): Promise<void> {
       let p = await this.local.getIntervalAsync(symbol);
        if (p.length === 0)
            this.local.clearHistoryAsync(symbol)
        await this.local.writeHistoryAsync(symbol, begin, end, history)
    }

    async readHistory(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        let p = await this.local.getIntervalAsync(symbol);
        let b = p.length === 0 || p[0] > begin || p[1] < end
        if (b) {
            await this.local.clearHistoryAsync(symbol)
            return [];
        }
        return await this.local.readHistoryAsync(symbol, begin, end)
    }

    public setCommunication(communication: TradingCommunication, desktop: IDesktop) {
        let act = new SetCommunication(communication)
        this.pefrormer.forEach<TradingDataQuery>(desktop, act, "TradingDataQuery")

    }

    public async calculate(symblol: string, period: string, begin: number, end: number, controllor: AbortController): Promise<Map<string, any>[]>
    {
        this.query.setQueryParameters(symblol, period, begin, end)
        let x = await this.pefrormer.performIteratorDataConsumerMapAsync()
        return []
    }


    local !: ILocalDB

    any : any
}



class SetCommunication implements IActionT<TradingDataQuery> {
    communication !: TradingCommunication;
    constructor(communication: TradingCommunication) {
        this.communication = communication
    }
    actionT(t: TradingDataQuery): void {
        t.setCommunication(this.communication)
    }
    isEmptyActionT(): boolean {
        return false
    }

}