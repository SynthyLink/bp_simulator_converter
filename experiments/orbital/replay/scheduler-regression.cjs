#!/usr/bin/env node
'use strict';

// Runs the repository's actual TypeScript modules. Candidate source substitutions
// exist only in memory; no repository file is modified by this harness.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

const argv = process.argv.slice(2);
function argument(name, fallback) {
  const index = argv.indexOf(name);
  return index < 0 ? fallback : argv[index + 1];
}
const sourceRoot = path.resolve(argument('--source-root', path.join(__dirname, 'pinned-source')));
const frontend = path.join(sourceRoot, 'examples/orbital/AspireOnlineConverter/frontend');
const ts = require(path.join(frontend, 'node_modules/typescript'));
const schedulerPath = path.join(frontend, 'src/Library/Measurements/PerformerMeasuremets.ts');
const wrapperPath = path.join(frontend, 'src/Algorithms/OrbitalForecastCalculation/OrbitalForecastCalculation.ts');
const schedulerOriginal = fs.readFileSync(schedulerPath, 'utf8');
const wrapperOriginal = fs.readFileSync(wrapperPath, 'utf8');
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');

function classMember(source, filename, className, memberName) {
  const parsed = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const classes = parsed.statements.filter(node => ts.isClassDeclaration(node) && node.name?.text === className);
  assert.equal(classes.length, 1, `Exactly one ${className} class is required`);
  const members = classes[0].members.filter(node => node.name?.getText(parsed) === memberName);
  assert.equal(members.length, 1, `Exactly one ${className}.${memberName} member is required`);
  return { parsed, member: members[0] };
}

function schedulerCandidate(source) {
  const { parsed, member } = classMember(source, schedulerPath, 'PerformerMeasuremets', 'peformCondFixedStepCalculation');
  assert(ts.isMethodDeclaration(member) && member.body, 'The target must be a concrete method');
  const originalBody = member.body.getText(parsed);
  // These checks prevent silently patching a materially different future method.
  assert.equal((originalBody.match(/runtime\.stepRuntime\(st, s\)/g) || []).length, 1);
  assert.equal((originalBody.match(/let s = st \+ step;/g) || []).length, 1);
  assert(originalBody.indexOf('runtime.updateRuntime()') < originalBody.indexOf('runtime.stepRuntime(st, s)'));
  const body = `{
        var tm: ITimeMeasurementProvider = new TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        var previous = start;
        for (var i = 0; i < steps; i++) {
            if (stop.func()) return;
            tm.setTime(st);
            if (i > 0) {
                runtime.stepRuntime(previous, st);
                previous = st;
            }
            runtime.updateRuntime();
            if (condition.func()) {
                act.action();
            }
            st += step;
        }
    }`;
  return source.slice(0, member.body.getStart(parsed)) + body + source.slice(member.body.end);
}

function wrapperCandidate(source) {
  const { parsed, member } = classMember(source, wrapperPath, 'OrbitalForecastCalculation', 'calculate');
  assert(ts.isPropertyDeclaration(member) && member.initializer && ts.isArrowFunction(member.initializer));
  const text = member.getText(parsed);
  const oldCount = 'var count = Math.floor(condition.end - condition.begin);';
  assert.equal(text.split(oldCount).length - 1, 1, 'Expected one uncorrected sample-count expression');
  const replacement = text.replace(oldCount, 'var count = Math.floor(condition.end - condition.begin) + 1;');
  return source.slice(0, member.getStart(parsed)) + replacement + source.slice(member.end);
}

const actualOnly = argv.includes('--verify-source');
const proposedScheduler = actualOnly ? null : schedulerCandidate(schedulerOriginal);
const proposedWrapper = actualOnly ? null : wrapperCandidate(wrapperOriginal);
const overrides = new Map();
const originalHook = require.extensions['.ts'];
require.extensions['.ts'] = function loadTypeScript(module, filename) {
  const source = overrides.get(path.resolve(filename)) ?? fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
      useDefineForClassFields: true,
    },
    reportDiagnostics: true,
  });
  const errors = (compiled.diagnostics || []).filter(item => item.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `TypeScript transpilation errors in ${filename}`);
  module._compile(compiled.outputText, filename);
};

function clearProjectModuleCache() {
  for (const filename of Object.keys(require.cache)) {
    if (filename.startsWith(path.join(frontend, 'src') + path.sep)) delete require.cache[filename];
  }
}

function exactIntegral(kind, start, end) {
  return kind === 'time' ? (end * end - start * start) / 2 : 7.5 * (end - start);
}

function runCase(PerformerMeasuremets, specification, method = 'conditional') {
  const { start = 0, step = 1, steps = 4, initial = 0, derivative = 'constant' } = specification;
  const updates = [], emitted = [], intervals = [], lifecycle = [];
  let provider, state = initial;
  const runtime = {
    setTimeProvider(value) { provider = value; lifecycle.push('setTimeProvider'); },
    startRuntime(value) { assert.equal(value, start); state = initial; lifecycle.push('startRuntime'); },
    stepRuntime(begin, end) {
      intervals.push([begin, end]);
      state += exactIntegral(derivative, begin, end);
    },
    updateRuntime() { updates.push({ time: provider.getTime(), state }); },
  };
  const condition = { func: () => specification.select ? specification.select(provider.getTime(), state) : true };
  const stop = { func: () => Boolean(specification.cancelAfter !== undefined && updates.length >= specification.cancelAfter) };
  const action = { action: () => emitted.push({ time: provider.getTime(), state }) };
  const performer = new PerformerMeasuremets();
  if (method === 'conditional') {
    performer.peformCondFixedStepCalculation(runtime, condition, stop, start, step, steps, action);
  } else {
    performer.performFixedStepCalculation(runtime, start, step, steps, stop, action);
  }
  const sampleCount = Math.min(steps, specification.cancelAfter ?? steps);
  const expectedUpdates = Array.from({ length: sampleCount }, (_, index) => {
    const time = start + index * step;
    return { time, state: initial + exactIntegral(derivative, start, time) };
  });
  const expectedEmitted = method === 'conditional' && specification.select
    ? expectedUpdates.filter(sample => specification.select(sample.time, sample.state))
    : expectedUpdates;
  const expectedIntervals = expectedUpdates.slice(1).map((sample, index) => [expectedUpdates[index].time, sample.time]);
  const failures = [];
  for (const [label, actual, expected] of [
    ['states at update time', updates, expectedUpdates],
    ['selected output samples', emitted, expectedEmitted],
    ['integration intervals (no step after final observation)', intervals, expectedIntervals],
    ['initialization order', lifecycle, ['setTimeProvider', 'startRuntime']],
  ]) {
    try { assert.deepEqual(actual, expected); } catch { failures.push({ check: label, actual, expected }); }
  }
  return { name: specification.name, passed: failures.length === 0, updates, emitted, intervals, failures };
}

const cases = [
  { name: 'constant_velocity_initial_and_final_samples' },
  { name: 'time_dependent_derivative', derivative: 'time' },
  { name: 'nonzero_start_nonunit_step', start: 10, step: 0.25, steps: 5, initial: 3, derivative: 'time' },
  { name: 'condition_uses_current_state', steps: 5, select: (_time, state) => state >= 15 },
  { name: 'condition_uses_current_time', steps: 5, select: time => time % 2 === 0 },
  { name: 'condition_always_false_preserves_integration', select: () => false },
  { name: 'cancellation_stops_before_next_integration', steps: 6, cancelAfter: 3 },
  { name: 'initial_cancellation', cancelAfter: 0 },
  { name: 'single_initial_sample', steps: 1, start: 10, initial: 3 },
  { name: 'zero_samples', steps: 0 },
];

async function testWrapper(PerformerMeasuremets) {
  // Instantiate the actual generated graph plus handwritten wrapper, but intercept
  // the scheduler call so this unit test does not integrate an orbit.
  const { OrbitalForecastCalculation } = require(wrapperPath);
  const wrapper = new OrbitalForecastCalculation();
  wrapper.set = function () { this.list = []; };
  const original = PerformerMeasuremets.prototype.peformCondDCFixedStepCalculation;
  const originalLog = console.log;
  const results = [];
  try {
    console.log = () => {};
    for (const condition of [{ begin: 100, end: 104 }, { begin: 100, end: 100 }, { begin: 100, end: 104.5 }]) {
      let captured;
      PerformerMeasuremets.prototype.peformCondDCFixedStepCalculation = function (...arguments_) { captured = arguments_; };
      await wrapper.calculate(condition, new AbortController());
      assert(captured, 'Wrapper must call the real scheduler entry point');
      const actual = { start: captured[4], step: captured[5], samples: captured[6] };
      const expected = { start: condition.begin, step: 1, samples: Math.floor(condition.end - condition.begin) + 1 };
      let passed = true;
      try { assert.deepEqual(actual, expected); } catch { passed = false; }
      results.push({ name: `wrapper_inclusive_grid_${condition.begin}_${condition.end}`, passed, actual, expected });
    }
  } finally {
    console.log = originalLog;
    PerformerMeasuremets.prototype.peformCondDCFixedStepCalculation = original;
  }
  return results;
}

async function runMode(mode) {
  overrides.clear();
  if (mode === 'candidate') {
    overrides.set(schedulerPath, proposedScheduler);
    overrides.set(wrapperPath, proposedWrapper);
  }
  clearProjectModuleCache();
  const { PerformerMeasuremets } = require(schedulerPath);
  const scheduler = cases.map(specification => runCase(PerformerMeasuremets, specification));
  const reference = [cases[0], cases[1], cases[2], cases[6], cases[7], cases[8], cases[9]]
    .map(specification => runCase(PerformerMeasuremets, specification, 'unconditional'));
  const wrapper = await testWrapper(PerformerMeasuremets);
  const tests = [...scheduler, ...reference, ...wrapper];
  return {
    mode, scheduler, unaffectedUnconditionalReference: reference, wrapper,
    summary: { total: tests.length, passed: tests.filter(test => test.passed).length, failed: tests.filter(test => !test.passed).length },
  };
}

async function main() {
  const modes = actualOnly ? ['actual'] : ['baseline', 'candidate'];
  const results = [];
  for (const mode of modes) results.push(await runMode(mode));
  assert.equal(fs.readFileSync(schedulerPath, 'utf8'), schedulerOriginal, 'Harness must not alter scheduler source');
  assert.equal(fs.readFileSync(wrapperPath, 'utf8'), wrapperOriginal, 'Harness must not alter wrapper source');
  const report = {
    createdUtc: new Date().toISOString(),
    description: 'Actual TypeScript modules transpiled to CommonJS in memory; exact analytic mock ODE integrals test scheduling independently of RK4 error.',
    nodeVersion: process.version,
    typescriptVersion: ts.version,
    sourceRoot,
    sourceHashes: {
      scheduler: sha256(schedulerOriginal), wrapper: sha256(wrapperOriginal),
      ...(actualOnly ? {} : { candidateScheduler: sha256(proposedScheduler), candidateWrapper: sha256(proposedWrapper) }),
    },
    results,
  };
  const reportFile = path.resolve(argument('--report', path.join(__dirname, actualOnly ? 'scheduler-regression-actual.json' : 'scheduler-regression-results.json')));
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2) + '\n');
  for (const result of results) console.log(`${result.mode}: ${result.summary.passed}/${result.summary.total} passed, ${result.summary.failed} failed`);
  console.log(`Report: ${reportFile}`);
  if (!actualOnly) {
    const baseline = results[0];
    assert(baseline.scheduler.filter(test => !test.passed).length >= 7, 'Uncorrected scheduler must expose the expected regression');
    assert(baseline.wrapper.every(test => !test.passed), 'Uncorrected wrapper must expose endpoint omission');
    assert(baseline.unaffectedUnconditionalReference.every(test => test.passed), 'Existing unconditional path is an independent passing reference');
  }
  assert.equal(results.at(-1).summary.failed, 0, 'Corrected/actual source must pass every regression test');
}

main().catch(error => { console.error(error.stack || error); process.exitCode = 1; }).finally(() => {
  if (originalHook) require.extensions['.ts'] = originalHook;
  else delete require.extensions['.ts'];
});
