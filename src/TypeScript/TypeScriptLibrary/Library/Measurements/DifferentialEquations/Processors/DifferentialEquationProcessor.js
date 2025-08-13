"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentialEquationProcessor = void 0;
const OwnNotImplemented_1 = require("../../../ErrorHandler/OwnNotImplemented");
const FictiveTimeMeasurementProvider_1 = require("../../../Fiction/FictiveTimeMeasurementProvider");
class DifferentialEquationProcessor {
    constructor() {
        this.dimension = 0;
        /*    if (Dim == 0) {
                return;
            }
                double dt = t1 - t0;
                int i = 0;
                double t = t0;
            foreach(IMeasurements m in equations)
            {
                for (int j = 0; j < m.Count; j++)
                {
                    w[i] = (double)m[j].Parameter();
                    ++i;
                }
            }
            StaticExtensionDataPerformerPortable.Time = t;
            StaticExtensionDataPerformerPortable.Desktop.ResetUpdatedMeasurements();
            UpdateMeasurements();
            i = 0;
            foreach(IMeasurements m in equations)
            {
                    IDifferentialEquationSolver s = m as IDifferentialEquationSolver;
                s.CalculateDerivations();
                for (int j = 0; j < m.Count; j++)
                {
                        IDerivation der = m[j] as IDerivation;
                    w[i] = w[i] + der.Derivation.ToDouble() * dt;
                    ++i;
                }
                s.CopyVariablesToSolver(i - m.Count, w);
            }/*/
        this.equations = [];
        this.norm = [];
        this.measurements = [];
        this.timeProvider = new FictiveTimeMeasurementProvider_1.FictiveTimeMeasurementProvider();
    }
    setDifferentialEquationProcessor(collection) {
        throw new Error("Method not implemented.");
    }
    getDifferentialEquations() {
        return this.equations;
    }
    addRangeDifferentialEquations(equations) {
        for (let e of equations) {
            this.equations.push(e);
        }
    }
    stepDifferentialEquations(start, finish) {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    updateDimension() {
        this.dimension = 0;
        for (var m of this.measurements) {
            this.dimension += m.getMeasurementsCount();
        }
    }
    getDifferentialEquationsTimeProvider() {
        return this.timeProvider;
    }
    setDifferentialEquationsTimeProvider(time) {
        this.timeProvider = time;
    }
    clearDifferentialEquations() {
        this.measurements.length = 0;
        this.norm.length = 0;
        this.equations.length = 0;
    }
    newDifferentialEquations() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    getDifferentialEquationsDimention() {
        return 0;
    }
}
exports.DifferentialEquationProcessor = DifferentialEquationProcessor;
//# sourceMappingURL=DifferentialEquationProcessor.js.map