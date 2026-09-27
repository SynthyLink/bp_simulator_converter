import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { isDeepStrictEqual } from 'node:util';

const numeric = ['close','buyPrice','sellPrice','income','averageShort','averageLong','donchianHigh','donchianLow'];
const keys = ['date','position','events',...numeric].sort();
export function compareResults(a, b, bars, config) {
    const issues = [];
    let mismatchCount = 0;
    const report = (message, detail = {}) => { mismatchCount++; if (issues.length < 20) issues.push({message,...detail}); };
    const abs = config.absoluteTolerance, rel = config.relativeTolerance;
    if (!Number.isFinite(abs) || !Number.isFinite(rel) || abs < 0 || rel < 0) throw Error('Invalid tolerances');
    const near = (x,y) => Math.abs(x-y) <= abs + rel * Math.max(Math.abs(x),Math.abs(y));
    const maxAbsoluteError = Object.fromEntries(numeric.map(k => [k,0]));
    for (const [name,result] of [['CSharp',a],['TypeScript',b]]) {
        if (result.metadata?.implementation !== name) report('Implementation label mismatch',{name});
        if (!isDeepStrictEqual(result.metadata?.config,config)) report('Configuration mismatch',{name});
        if (result.metadata?.source?.rowCount !== bars.length) report('Source row count mismatch',{name});
        if (!Array.isArray(result.records) || result.records.length !== bars.length) {
            report('Row count mismatch',{name,expected:bars.length,actual:result.records?.length});
        }
        for (const [i,r] of (result.records ?? []).entries()) {
            if (!isDeepStrictEqual(Object.keys(r).sort(),keys)) report('Record schema mismatch',{name,index:i});
            const bar = bars[i];
            if (!bar || r.date !== bar.date || r.close !== bar.close) report('Date/close alignment mismatch',{name,index:i});
            if (![null,0,1,2].includes(r.position)) report('Invalid position',{name,index:i});
            for (const k of numeric) if (r[k] !== null && !Number.isFinite(r[k])) report('Non-finite/missing value',{name,index:i,field:k});
            const events = [];
            if (r.buyPrice !== null) events.push('buy');
            if (r.sellPrice !== null) events.push('sell');
            if (!isDeepStrictEqual(r.events,events)) report('Event/price inconsistency',{name,index:i});
            for (const k of ['buyPrice','sellPrice']) if (r[k] !== null && r[k] !== r.close) report('Execution price differs from close',{name,index:i,field:k});
            // Independent window calculations catch errors shared by both implementations.
            for (const [k,input,operation] of [['averageShort','close','mean'],['averageLong','close','mean'],
                ['donchianHigh','high','max'],['donchianLow','low','min']]) {
                const n = config[k];
                let expected = null;
                if (i >= n-1 && bar) {
                    const values = bars.slice(i-n+1,i+1).map(x=>x[input]);
                    expected = operation === 'mean' ? values.reduce((s,v)=>s+v,0)/n : operation === 'max' ? Math.max(...values) : Math.min(...values);
                }
                if (expected === null ? r[k] !== null : r[k] === null || !near(r[k],expected)) report('Independent indicator check failed',{name,index:i,field:k});
            }
        }
    }
    for (const key of ['source','provenance','environment','positionEncoding'])
        if (!isDeepStrictEqual(a.metadata?.[key],b.metadata?.[key])) report(`Metadata ${key} differs`);
    let exactRecords = true;
    for (let i=0; i<Math.max(a.records?.length??0,b.records?.length??0); i++) {
        const x=a.records?.[i], y=b.records?.[i];
        if (!isDeepStrictEqual(x,y)) exactRecords=false;
        if (!x || !y) continue;
        for (const k of ['date','position','events']) if (!isDeepStrictEqual(x[k],y[k])) report('Exact field mismatch',{index:i,date:x.date,field:k,csharp:x[k],typescript:y[k]});
        for (const k of numeric) {
            if (x[k] === null || y[k] === null) {
                if (x[k] !== y[k]) report('Null mismatch',{index:i,date:x.date,field:k});
            } else if (Number.isFinite(x[k]) && Number.isFinite(y[k])) {
                maxAbsoluteError[k]=Math.max(maxAbsoluteError[k],Math.abs(x[k]-y[k]));
                if (!near(x[k],y[k])) report('Numerical mismatch',{index:i,date:x.date,field:k,csharp:x[k],typescript:y[k]});
            }
        }
    }
    const stats = result => ({
        rows:result.records?.length??0,
        buyEvents:(result.records??[]).filter(r=>r.events?.includes('buy')).length,
        sellEvents:(result.records??[]).filter(r=>r.events?.includes('sell')).length,
        firstEventDate:result.records?.find(r=>r.events?.length)?.date??null,
        finalPosition:result.records?.at(-1)?.position??null,
        finalModelIncome:result.records?.at(-1)?.income??null
    });
    return {passed:mismatchCount===0,exactRecords,mismatchCount,issues,
        symbol:config.symbol,interval:config.interval,firstDate:bars[0]?.date,lastDate:bars.at(-1)?.date,
        tolerance:{absolute:abs,relative:rel,rule:'abs(a-b) <= absolute + relative * max(abs(a),abs(b))'},
        maxAbsoluteError,csharp:stats(a),typescript:stats(b),
        interpretation:'Runtime parity for the existing generated model; income is the legacy model accumulator, not independently validated portfolio P&L.'};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const root=path.dirname(fileURLToPath(import.meta.url));
    const read=f=>readFileSync(path.join(root,f));
    const json=f=>JSON.parse(read(f));
    const sha=b=>createHash('sha256').update(b).digest('hex');
    const config=json('config.json'), source=json('data/source.json');
    const a=json('Trading_CSharp.json'), b=json('Trading_TypeScript.json');
    if (sha(read(source.dataFile))!==source.dataSha256 || sha(read(source.rawFile))!==source.rawSha256 ||
        !isDeepStrictEqual(a.metadata.source,source) || !isDeepStrictEqual(b.metadata.source,source)) throw Error('Dataset/source provenance mismatch');
    const summary=compareResults(a,b,json(source.dataFile),config);
    summary.resultSha256={CSharp:sha(read('Trading_CSharp.json')),TypeScript:sha(read('Trading_TypeScript.json'))};
    summary.provenance=a.metadata.provenance;
    writeFileSync(path.join(root,'summary.json'),JSON.stringify(summary,null,2)+'\n');
    console.log(JSON.stringify(summary,null,2));
    if (!summary.passed) process.exitCode=1;
}
