"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Benchmark = void 0;
class Benchmark {
    _running = false;
    _results = new Array();
    _frames;
    _runs;
    _framesPerCycle;
    _framesForWarmup;
    _framePrepare = undefined;
    _runsFinished = undefined;
    initialize(cycles, framesForWarmup, framesPerRun, framePrepare, runsFinished) {
        if (this._running) {
            console.log('benchmark already in progress');
            return;
        }
        this._framePrepare = framePrepare;
        this._runsFinished = runsFinished;
        this._running = true;
        this._frames = 0;
        this._runs = Math.max(0, cycles);
        this._framesForWarmup = Math.max(0, framesForWarmup);
        this._framesPerCycle = Math.max(1, framesPerRun);
        this._results.length = this._runs;
        this._results.fill(0.0);
    }
    frame() {
        if (this._running === false) {
            return;
        }
        ++this._frames;
        const frames = this._frames - this._framesForWarmup;
        const frame = frames < 0 ? frames : frames % this._framesPerCycle;
        const cycle = frames >= 0 ? Math.floor(frames / this._framesPerCycle) : -1;
        if (frames === 1 - this._framesForWarmup) {
            console.log('---- benchmark warmup ------');
        }
        if (frames === 0) {
            console.log('---- benchmark started -----');
        }
        if ((frames % this._framesPerCycle) === 0 && cycle > 0) {
            this._results[cycle - 1] = (performance.now() - this._results[cycle - 1]) / this._framesPerCycle;
            console.log(' --  cycle: ' + cycle.toString().padStart(2, '0') +
                ', tpf: ' + this._results[cycle - 1].toFixed(4).padStart(9, '0') +
                ', fps: ' + (1000.0 / this._results[cycle - 1]).toFixed(4).padStart(9, '0'));
        }
        if ((frames % this._framesPerCycle) === 0 && cycle >= 0 && cycle < this._runs) {
            this._results[cycle] = performance.now();
        }
        if (cycle >= this._runs) {
            this._running = false;
            console.log('---- benchmark stopped -----');
            this._framePrepare = undefined;
            this._runsFinished(this._runs, this._framesForWarmup, this._framesPerCycle, this._results);
            this._runsFinished = undefined;
        }
        else {
            this._framePrepare(frame, this._framesForWarmup, this._framesPerCycle, cycle);
        }
    }
    get running() {
        return this._running;
    }
}
exports.Benchmark = Benchmark;
//# sourceMappingURL=benchmark.js.map