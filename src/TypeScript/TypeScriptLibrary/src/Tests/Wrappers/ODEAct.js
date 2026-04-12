"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ODEAct = void 0;
const RungeProcessor_1 = require("../../Library/Measurements/DifferentialEquations/Processors/RungeProcessor");
const PerformerMeasuremets_1 = require("../../Library/Measurements/PerformerMeasuremets");
const DataRuntimeConsumerODE_1 = require("../../Library/Runtime/DataRuntimeConsumerODE");
const ODE_1 = require("../ODE");
class ODEAct extends ODE_1.ODE {
    constructor() {
        super();
        var o = this.getCategoryObjects();
        this.dc = o[2];
    }
    action() {
        var k = this.dc.getAllMeasurements()[0];
        var a = k.getMeasurement(0).getMeasurementValue();
        var b = k.getMeasurement(1).getMeasurementValue();
        console.log(a, b);
    }
    func() {
        return false;
    }
    test() {
        try {
            let processor = new RungeProcessor_1.RungeProcessor();
            var runtime = new DataRuntimeConsumerODE_1.DataRuntimeConsumerODE(this.dc, processor);
            var p = new PerformerMeasuremets_1.PerformerMeasuremets();
            p.performFixedStepCalculation(runtime, 0, 0.4, 45, this, this);
        }
        catch (e) {
            let i = 0;
        }
    }
}
exports.ODEAct = ODEAct;
//# sourceMappingURL=ODEAct.js.map