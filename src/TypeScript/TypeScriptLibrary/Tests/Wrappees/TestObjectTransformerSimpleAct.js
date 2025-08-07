"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestObjectTransformerSimpleAct = void 0;
const FictiveDataConsumer_1 = require("../../Library/Fiction/FictiveDataConsumer");
const PefrormerMeasuremets_1 = require("../../Library/Measurements/PefrormerMeasuremets");
const DataRuntimeConsumer_1 = require("../../Library/Runtime/DataRuntimeConsumer");
const TestObjectTransformerSimple_1 = require("../TestObjectTransformerSimple");
class TestObjectTransformerSimpleAct extends TestObjectTransformerSimple_1.TestObjectTransformerSimple {
    constructor() {
        super();
        this.dc = new FictiveDataConsumer_1.FictiveDataConsumer();
        var co = this.getCategoryObject("Chart");
        this.dc = co;
    }
    action() {
        var k = this.dc.getAllMeasurements()[1];
        var a = k.getMeasurement(0).getMeasurementValue();
        var b = k.getMeasurement(1).getMeasurementValue();
        var c = k.getMeasurement(2).getMeasurementValue();
        console.log(a, b, c);
    }
    test() {
        var runtime = new DataRuntimeConsumer_1.DataRuntimeConsumer(this.dc);
        var p = new PefrormerMeasuremets_1.PefrormerMeasuremets();
        p.peformFixedStepCalculation(runtime, 0, 1, 20, this);
    }
}
exports.TestObjectTransformerSimpleAct = TestObjectTransformerSimpleAct;
//# sourceMappingURL=TestObjectTransformerSimpleAct.js.map