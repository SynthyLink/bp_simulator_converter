"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EulerProcessor = void 0;
const Performer_1 = require("../../../Performer");
const DifferentialEquationProcessor_1 = require("./DifferentialEquationProcessor");
class EulerProcessor extends DifferentialEquationProcessor_1.DifferentialEquationProcessor {
    constructor() {
        super(...arguments);
        this.performer = new Performer_1.Performer();
        this.w = [];
        this.w = [];
    }
    stepDifferentialEquations(start, finish) {
        /*    isBusy = true;
            if (Dim == 0) {
                return;
            }
                double dt = t1 - t0;
                int i = 0;
                */
        let dt = finish - start;
        let i = 0;
        for (let m of this.measurements) {
            for (let j = 0; j < m.getMeasurementsCount(); j++) {
                var mea = m.getMeasurement(j);
                var v = mea.getMeasurementValue();
                this.w[i] = this.performer.convertFromAny(x);
                ++i;
            }
        }
        //   StaticExtensionDataPerformerPortable.Time = t;
        //   StaticExtensionDataPerformerPortable.Desktop.ResetUpdatedMeasurements();
        //   UpdateMeasurements();
        i = 0;
        for (let s of this.equations) {
            s.calculateDerivations();
            let m = s;
            let count = m.getMeasurementsCount();
            for (var j = 0; j < count; j++) {
                var mea = m.getMeasurement(j);
                var x = this.performer.getDerivationMeasuremet(mea);
                w[i] += w[i] + x * dt;
                ++i;
            }
            s.copyVariablesToSolver(i - count, w);
        }
    }
    updateDimension() {
    }
    newDifferentialEquations() {
        return new EulerProcessor();
    }
}
exports.EulerProcessor = EulerProcessor;
//# sourceMappingURL=EulerProcessor.js.map