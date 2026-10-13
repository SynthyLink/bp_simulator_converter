'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const frontend = path.join(path.resolve(process.argv[2] || 'replay-checkout'), 'examples/orbital/AspireOnlineConverter/frontend');
const ts = require(path.join(frontend, 'node_modules/typescript'));
require.extensions['.ts'] = function (module, filename) {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {fileName:filename,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,esModuleInterop:true,useDefineForClassFields:true}});
  module._compile(result.outputText, filename);
};
const {OrbitalForecastCalculation} = require(path.join(frontend,'src/Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation.ts'));
const {PerformerMeasuremets} = require(path.join(frontend,'src/Library/Measurements/PerformerMeasuremets.ts'));
const {TimeMeasurementProvider} = require(path.join(frontend,'src/Library/Measurements/TimeMeasurementProvider.ts'));
const input = JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/baseline-run1.json'))).condition;
function probe(mode) {
  const wrapper = new OrbitalForecastCalculation();
  wrapper.set(input);
  const atmosphere=wrapper.getCategoryObject('Atmosphere');
  const motion=wrapper.getCategoryObject('Motion equations');
  const callSamples=[], derivativeSamples=[];
  const original=atmosphere.calculate.bind(atmosphere);
  atmosphere.calculate=function(inputs, outputs) {
    original(inputs,outputs);
    callSamples.push({input:[...inputs],density:outputs[0]});
  };
  const originalTree=motion.calculateTree.bind(motion);
  motion.calculateTree=function(){
    originalTree();
    const actual=[this.var_16,this.var_26,this.var_32];
    const withoutDrag=[(this.var_0+this.var_3)+this.var_15,this.var_17+(this.var_19-this.var_24),this.var_27];
    derivativeSamples.push({density:this.var_5,speed:this.var_7,dragCoefficient:this.var_4,
      velocity:[this.var_9,this.var_14,this.var_30],gravity:[this.var_0,this.var_17,this.var_27],
      dragTerms:[this.var_10,this.var_22,this.var_31],actualAcceleration:actual,withoutDrag,
      bitwiseEqualWithoutDrag:actual.every((x,i)=>Object.is(x,withoutDrag[i]))});
  };
  const observations=[];
  const act={action(){observations.push({time:wrapper.runtime.getTimeProvider().getTime(),state:['x','y','z','u','v','w'].map(key=>wrapper.get(key))})}};
  const p=new PerformerMeasuremets();
  if(mode==='baseline') {
    // Original method body, copied exactly except removal of TS annotations.
    p.peformCondFixedStepCalculation=function(runtime,condition,stop,start,step,steps,act){
      var tm=new TimeMeasurementProvider();
      runtime.setTimeProvider(tm);runtime.startRuntime(start);var st=start;
      for(var i=0;i<steps;i++){
        if(stop.func())return;
        tm.setTime(st);runtime.updateRuntime();if(condition.func())act.action();
        let s=st+step;if(i>0)runtime.stepRuntime(st,s);st=s;
      }
    };
  }
  p.peformCondFixedStepCalculation(wrapper.runtime,{func:()=>true},{func:()=>false},input.begin,1,4,act);
  const position=[input.x,input.y,input.z];
  const directDensityChecks=[0,1,43200,86400].map(offset=>({offset,density:atmosphere.atmosphere(input.begin+offset,position)}));
  return {mode,parameters:{atmosphere:atmosphere.getIf(),dragCoefficient:motion.getAliasValue('s'),q:motion.getAliasValue('q'),o:motion.getAliasValue('o')},observations,callSamples,derivativeSamples,directDensityChecks};
}
const sourceHashes={};
for(const filename of ['src/Algorithms/OrbitalForecastCalculation/OrbitalForecast.ts','src/Library/Measurements/PerformerMeasuremets.ts','src/ExternalObjects/Components/Atmosphere/AtmospherePure.ts']){
  sourceHashes[filename]=crypto.createHash('sha256').update(fs.readFileSync(path.join(frontend,filename))).digest('hex');
}
const archivedBaseline=JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/baseline-run1.json'))).records;
const corrected=JSON.parse(fs.readFileSync(path.join(__dirname,'evidence/corrected-run1.json'))).records;
const stateFields=['x','y','z','vx','vy','vz'];
const nonidentical=[];
for(let i=0;i<archivedBaseline.length;i++)for(const field of stateFields){
  if(!Object.is(archivedBaseline[i][field],corrected[i][field]))nonidentical.push({index:i,field});
}
const report={description:'Read-only instrumentation of the actual generated orbital graph and atmosphere component. Baseline scheduler reconstructed in memory; corrected scheduler imported without changes. Four grid observations per probe; no new full-horizon simulation.',
  nodeVersion:process.version,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,sourceHashes,
  fullReplayComparison:{baselineEvents:archivedBaseline.length,correctedEvents:corrected.length,stateValuesCompared:archivedBaseline.length*6,nonidentical,timeDifferences:[...new Set(archivedBaseline.map((row,i)=>row.orbitalTime-corrected[i].orbitalTime))]},
  runs:[probe('baseline'),probe('corrected')]};
fs.writeFileSync(path.join(__dirname,'atmosphere-clock-probe.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({fullReplayComparison:report.fullReplayComparison,probes:report.runs.map(run=>({mode:run.mode,derivativeEvaluations:run.derivativeSamples.length,allEvaluationsBitwiseEqualWithoutDrag:run.derivativeSamples.every(sample=>sample.bitwiseEqualWithoutDrag),firstDerivative:run.derivativeSamples[0],directDensityChecks:run.directDensityChecks}))},null,2));
