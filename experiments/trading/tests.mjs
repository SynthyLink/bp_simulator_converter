import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compareResults } from './compare.mjs';
const read=f=>JSON.parse(readFileSync(new URL(f,import.meta.url)));
const a=read('Trading_CSharp.json'), b=read('Trading_TypeScript.json');
const bars=read('data/AAPL_1d.json'), config=read('config.json');
const compare=(x=a,y=b)=>compareResults(x,y,bars,config);
test('501 daily rows, original dates, independent indicators and runtime parity',()=>{
    const result=compare();
    assert.equal(bars.length,501);
    assert.equal(result.passed,true,JSON.stringify(result.issues));
    assert.equal(result.exactRecords,true);
    assert.ok(result.csharp.buyEvents>0 && result.csharp.sellEvents>0);
});
test('detects missing first bar',()=>{
    const changed=structuredClone(b); changed.records.shift();
    assert.equal(compare(a,changed).passed,false);
});
test('detects changed event and position',()=>{
    const changed=structuredClone(b); changed.records[100].position=99; changed.records[100].events=[];
    assert.equal(compare(a,changed).passed,false);
});
test('detects significant numerical drift',()=>{
    const changed=structuredClone(b); changed.records[100].income+=0.01;
    assert.equal(compare(a,changed).passed,false);
});
test('accepts floating-point noise within tolerance, without calling it exact',()=>{
    const changed=structuredClone(b); changed.records[100].income+=1e-12;
    const result=compare(a,changed);
    assert.equal(result.passed,true); assert.equal(result.exactRecords,false);
});
test('detects an indicator error shared by both implementations',()=>{
    const x=structuredClone(a), y=structuredClone(b);
    x.records[100].averageLong+=1; y.records[100].averageLong+=1;
    assert.equal(compare(x,y).passed,false);
});
test('detects null warmup mismatch and non-finite numbers',()=>{
    const changed=structuredClone(b); changed.records[0].averageLong=0;
    assert.equal(compare(a,changed).passed,false);
    changed.records[0].averageLong=NaN;
    assert.equal(compare(a,changed).passed,false);
});
test('detects wrong dataset provenance and settings',()=>{
    const changed=structuredClone(b); changed.metadata.source.dataSha256='wrong';
    changed.metadata.config.averageLong=80;
    assert.equal(compare(a,changed).passed,false);
});
test('rejects non-finite tolerances',()=>{
    assert.throws(()=>compareResults(a,b,bars,{...config,absoluteTolerance:NaN}));
});
test('normalized bars preserve provider OHLCV and New York session dates',()=>{
    const raw=read('data/AAPL_yahoo_raw.json').chart.result[0];
    const quote=raw.indicators.quote[0];
    const format=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'});
    const expected=raw.timestamp.map((t,i)=>({date:format.format(new Date(t*1000)),
        open:quote.open[i],high:quote.high[i],low:quote.low[i],close:quote.close[i],volume:quote.volume[i]}));
    assert.deepEqual(bars,expected);
});
