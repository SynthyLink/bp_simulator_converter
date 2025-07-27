"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomAct = void 0;
const PefrormerMeasuremets_1 = require("./Library/Measurements/PefrormerMeasuremets");
const DetaRuntimeConsumer_1 = require("./Library/Runtime/DetaRuntimeConsumer");
const Random_1 = require("./src/Random");
class RandomAct extends Random_1.Random {
    constructor() {
        super();
        var co = this.getCategoryObject("Chart");
        this.dc = co;
    }
    action() {
        var k = this.dc.getAllMeasurements()[0];
        var a = k.getMeasurement(0).getMeasurementValue();
        var b = k.getMeasurement(1).getMeasurementValue();
        console.log(a, b);
    }
    test() {
        var runtime = new DetaRuntimeConsumer_1.DetaRuntimeConsumer(this.dc);
        var p = new PefrormerMeasuremets_1.PefrormerMeasuremets();
        p.peformFixedStepCalculation(runtime, 0, 1, 1000, this);
    }
}
exports.RandomAct = RandomAct;
//# sourceMappingURL=RandomAcr.js.map