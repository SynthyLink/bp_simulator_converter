"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerPlayEngineFactory = void 0;
const TimeSpan_1 = require("../Utilities/DateTime/TimeSpan");
const ActionArray_1 = require("../Utilities/Generic/ActionArray");
class TimerPlayEngineFactory {
    constructor(engine) {
        this.timers = [];
        this.engine = engine;
        engine.getEngineAction().addActionT(this);
    }
    actionT(t) {
        for (let timer of this.timers) {
            timer.setTime(t);
        }
    }
    isTimerFactoryEnabled() {
        return true;
    }
    setTimerFactoryEnabled(enabled) {
    }
    getTimerFromFactory(timeSpan) {
        var t = new Timer(this, timeSpan);
        this.timers.push(t);
        return t;
    }
}
exports.TimerPlayEngineFactory = TimerPlayEngineFactory;
class Timer {
    constructor(factory, span) {
        this.span = new TimeSpan_1.TimeSpan(1000000);
        this.last = Math.min();
        this.lt = Math.min();
        this.action = new ActionArray_1.ActionArray();
        this.interval = 0;
        this.span = span;
        this.factory = factory;
        this.interval = span.getTotalMilliseconds();
    }
    getTimerTimeSpan() {
        return this.span;
    }
    isTimerEnabled() {
        return this.factory.isTimerFactoryEnabled();
    }
    setTimerEnabled(enabled) {
        var b = this.factory.isTimerFactoryEnabled();
        if (b != enabled)
            this.factory.setTimerFactoryEnabled(enabled);
    }
    getTimerEvent() {
        return this.action;
    }
    setTime(time) {
        if (this.last == this.lt) {
            this.last = time;
            return;
        }
        if (time > this.last + this.interval) {
            this.action.action();
            this.last = time;
        }
    }
}
//# sourceMappingURL=TimerPlayEngineFactory.js.map