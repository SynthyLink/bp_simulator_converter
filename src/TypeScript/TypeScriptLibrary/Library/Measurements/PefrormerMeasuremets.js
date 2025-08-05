"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PefrormerMeasuremets = void 0;
const Performer_1 = require("../Performer");
const AliasNameMeasurement_1 = require("./AliasNameMeasurement");
const TimeMeasurementProvider_1 = require("./TimeMeasurementProvider");
const Variable_1 = require("./Variables/Variable");
class PefrormerMeasuremets {
    constructor() {
        this.performer = new Performer_1.Performer();
    }
    createVariable(name, type, value, alias) {
        var nms = alias.getAliasNames();
        for (var n of nms) {
            if (n == name) {
                return new AliasNameMeasurement_1.AliasNameMeasurement(alias, name);
            }
        }
        return new Variable_1.Variable(name, type, value);
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
    peformFixedStepCalculation(runtime, start, step, steps, act) {
        var tm = new TimeMeasurementProvider_1.TimeMeasurementProvider();
        runtime.setTimeProvider(tm);
        runtime.startRuntime(start);
        var st = start;
        for (var i = 0; i < steps; i++) {
            tm.setTime(st);
            runtime.updateRuntime();
            act.action();
            st += step;
        }
    }
}
exports.PefrormerMeasuremets = PefrormerMeasuremets;
//# sourceMappingURL=PefrormerMeasuremets.js.map