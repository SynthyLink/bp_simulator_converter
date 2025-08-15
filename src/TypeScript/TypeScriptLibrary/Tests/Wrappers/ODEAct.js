"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ODEAct = void 0;
const FictiveDataConsumer_1 = require("../../Library/Fiction/FictiveDataConsumer");
const EulerProcessor_1 = require("../../Library/Measurements/DifferentialEquations/Processors/EulerProcessor");
const PefrormerMeasuremets_1 = require("../../Library/Measurements/PefrormerMeasuremets");
const DataRuntimeConsumerODE_1 = require("../../Library/Runtime/DataRuntimeConsumerODE");
const ODE_1 = require("../ODE");
class ODEAct extends ODE_1.ODE {
    constructor() {
        super();
        this.dc = new FictiveDataConsumer_1.FictiveDataConsumer();
        var o = this.getCategoryObjects();
        this.dc = o[2];
    }
    action() {
        var k = this.dc.getAllMeasurements()[0];
        var a = k.getMeasurement(0).getMeasurementValue();
        var b = k.getMeasurement(1).getMeasurementValue();
        console.log(a, b);
    }
    test() {
        try {
            let processor = new EulerProcessor_1.EulerProcessor();
            var runtime = new DataRuntimeConsumerODE_1.DataRuntimeConsumerODE(this.dc, processor);
            var p = new PefrormerMeasuremets_1.PefrormerMeasuremets();
            p.peformFixedStepCalculation(runtime, 0, 0.01, 40, this);
        }
        catch (e) {
            let i = 0;
        }
    }
}
exports.ODEAct = ODEAct;
//# sourceMappingURL=ODEAct.js.map