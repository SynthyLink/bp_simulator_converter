"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerMeasuremets = void 0;
const DataConsumerBoolFunc_1 = require("./DataConsumerBoolFunc");
const Performer_1 = require("../Performer");
const TimeMeasurementProvider_1 = require("./TimeMeasurementProvider");
class PerformerMeasuremets {
    constructor() {
        this.performer = new Performer_1.Performer();
    }
    setTimeProvider(timeProvider, measurements) {
        for (let m of measurements) {
            let tm = this.performer.convertObject(m, "ITimeMeasurementConsumer");
            if (tm.length > 0) {
                tm[0].setTimeMeasurement(timeProvider);
            }
        }
    }
    setTimeProviderCollection(objects, timeProvider) {
        let objs = objects.getObjects();
        for (let o of objs) {
            let tm = this.performer.convertObject(o, "ITimeMeasurementConsumer");
            if (tm.length > 0) {
                tm[0].setTimeMeasurement(timeProvider);
            }
        }
    }
    getArrayMeasurements(array) {
        var n = array.getMeasurementNames().length;
        var mea = [];
        for (var i = 0; i < n; i++) {
            //  mea.push(new ArrayMeasurement(array, i));
        }
        return mea;
    }
    initStart(array, x) {
        var n = x.length;
        var y = array.getMeasurementValues();
        for (var i = 0; i < n; i++) {
            y[i] = x[i];
        }
    }
    getDependentPrivate(dataConsumer, measurements) {
        let m = dataConsumer.getAllMeasurements();
        for (let i = 0; i < m.length; i++) {
            let mea = m[i];
            if (measurements.find(mea => true) === undefined) {
            }
            else {
                measurements.push(mea);
                let dc = mea;
                //     if (dc instanceof IDataConsumer)
            }
        }
    }
    peformCondDCFixedStepCalculation(runtime, dataConsumer, conditionName, stop, start, step, steps, act) {
        var cond = new DataConsumerBoolFunc_1.DataConsumerBoolFunc(dataConsumer, conditionName);
        this.peformCondFixedStepCalculation(runtime, cond, stop, start, step, steps, act);
    }
    peformCondFixedStepCalculation(runtime, condition, stop, start, step, steps, act) {
        var tm = new TimeMeasurementProvider_1.TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        for (var i = 0; i < steps; i++) {
            if (stop.func())
                return;
            tm.setTime(st);
            runtime.updateRuntime();
            if (condition.func()) {
                act.action();
            }
            let s = st + step;
            if (i > 0) {
                runtime.stepRuntime(st, s);
            }
            st = s;
        }
    }
    performFixedStepCalculation(runtime, start, step, steps, stop, act) {
        let tm = new TimeMeasurementProvider_1.TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        var curr = start;
        for (var i = 0; i < steps; i++) {
            if (stop.func())
                return;
            tm.setTime(st);
            if (i > 0) {
                runtime.stepRuntime(curr, st);
                curr = st;
            }
            runtime.updateRuntime();
            act.action();
            st += step;
        }
    }
    fullReset(consumer) {
        let meas = consumer.getAllMeasurements();
        for (let m of meas) {
            let c = this.performer.convertObject(m, "IDataConsumer");
            if (c.length > 0) {
                c[0].resetDataConsumer();
                this.fullReset(c[0]);
            }
        }
    }
}
exports.PerformerMeasuremets = PerformerMeasuremets;
//# sourceMappingURL=PerformerMeasuremets.js.map