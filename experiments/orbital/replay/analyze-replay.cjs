// Recompute all metrics from raw JSON, including separate timestamp checks.
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(process.argv[2]||path.join(__dirname,'evidence'));
const read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const protocol=read('protocol.json');
const pos=['x','y','z'],vel=['vx','vy','vz'];
function compare(a,b) {
  assert.equal(a.length,b.length,'event count mismatch');
  assert.equal(a.length,protocol.expectedEventsPerScenario,'unexpected event count');
  const rows=a.map((x,i)=>{
    const y=b[i];
    for (const k of ['orbitalTime',...pos,...vel]) {assert(Number.isFinite(x[k]));assert(Number.isFinite(y[k]));}
    return {event:i+1,time:x.orbitalTime,timeDifference:y.orbitalTime-x.orbitalTime,positionDifference:Math.hypot(...pos.map(k=>y[k]-x[k])),velocityDifference:Math.hypot(...vel.map(k=>y[k]-x[k]))};
  });
  const mean=key=>rows.reduce((s,r)=>s+r[key],0)/rows.length;
  const max=key=>Math.max(...rows.map(r=>Math.abs(r[key])));
  return {rows,summary:{events:rows.length,maxTimeDifferenceSeconds:max('timeDifference'),maxPositionDifferenceKm:max('positionDifference'),meanPositionDifferenceKm:mean('positionDifference'),maxVelocityDifferenceKmPerSec:max('velocityDifference'),meanVelocityDifferenceKmPerSec:mean('velocityDifference'),firstPositionDifferenceKm:rows[0].positionDifference,lastPositionDifferenceKm:rows.at(-1).positionDifference,firstVelocityDifferenceKmPerSec:rows[0].velocityDifference,lastVelocityDifferenceKmPerSec:rows.at(-1).velocityDifference,passes:rows.every(r=>Math.abs(r.timeDifference)<=protocol.timeToleranceSeconds&&r.positionDifference<=protocol.positionToleranceKm&&r.velocityDifference<=protocol.velocityToleranceKmPerSec)}};
}
let results=[];let csv=['run,event,time,time_difference_s,position_difference_km,velocity_difference_km_s'];
for(let run=1;run<=4;run++) {
  const a=read(`csharp-run${run}.json`),b=read(`corrected-run${run}.json`);
  assert.deepEqual(a.condition,protocol.scenarios[run-1]);
  assert.deepEqual(b.condition,a.condition);
  const {rows,summary}=compare(a.records,b.records);
  results.push({run,...summary});
  csv.push(...rows.map(r=>[run,r.event,r.time,r.timeDifference,r.positionDifference,r.velocityDifference].join(',')));
}
const reference=read('csharp-run1.json').records;
const baseline=compare(reference,read('baseline-run1.json').records);
const corrected=read('corrected-run1.json').records;
const shift=(key,amount)=>{const copy=structuredClone(corrected);copy[0][key]+=amount;return compare(reference,copy).summary;};
const negativeControls={positionTwoMm:shift('x',2e-6),velocityTwoMicrometresPerSecond:shift('vx',2e-9),timestampOneSecond:shift('orbitalTime',1)};
assert(!baseline.summary.passes,'The uncorrected implementation should fail the combined check');
for (const [name,result] of Object.entries(negativeControls)) assert(!result.passes,`Negative control did not fail: ${name}`);
const report={protocol,results,baselineRun1:baseline.summary,baselineTimeOffsets:[...new Set(baseline.rows.map(r=>r.timeDifference))],negativeControls};
fs.writeFileSync(path.join(root,'comparison.json'),JSON.stringify(report,null,2));
fs.writeFileSync(path.join(root,'event-residuals.csv'),csv.join('\n')+'\n');
console.log(JSON.stringify({results,baselineRun1:baseline.summary,baselineTimeOffsets:report.baselineTimeOffsets,negativeControlsRejected:true},null,2));
assert(results.every(r=>r.passes),'Corrected replay failed the unchanged acceptance criteria');
