"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConsumerVariableMeasurementsStarted = void 0;
const AliasInitialValueCollection_1 = require("../AliasInitialValueCollection.");
const DataConsumerVariableMeasurements_1 = require("./DataConsumerVariableMeasurements");
class DataConsumerVariableMeasurementsStarted extends DataConsumerVariableMeasurements_1.DataConsumerVariableMeasurements {
    constructor(desktop, name) {
        super(desktop, name);
        this.typeName = "DataConsumerVariadbleMeasurementsStarted";
        this.types.push("IStarted");
        this.types.push("DataConsumerVariadbleMeasurementsStarted");
        this.alias = this;
    }
    startedStart(start) {
        this.initial.resetInitialValues();
    }
    setInitial() {
        this.initial = new AliasInitialValueCollection_1.AliasInitialValueCollection(this, this);
    }
}
exports.DataConsumerVariableMeasurementsStarted = DataConsumerVariableMeasurementsStarted;
//# sourceMappingURL=DataConsumerVariableMeasurementsStarted.js.map