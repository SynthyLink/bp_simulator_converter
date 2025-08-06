"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConsumerVariadbleMeasurements = void 0;
const FictiveFeedbackAliasCollection_1 = require("../Fiction/FictiveFeedbackAliasCollection");
const Performer_1 = require("../Performer");
const DataConsumer_1 = require("./DataConsumer");
const PefrormerMeasuremets_1 = require("./PefrormerMeasuremets");
class DataConsumerVariadbleMeasurements extends DataConsumer_1.DataConsumer {
    constructor(desktop, name) {
        super(desktop, name);
        this.output = [];
        this.variables = new Map();
        this.aliasTypes = new Map();
        this.aliasValues = new Map();
        this.aliasNames = [];
        this.performer = new Performer_1.Performer();
        this.pMeasurements = new PefrormerMeasuremets_1.PefrormerMeasuremets();
        this.feedback = new FictiveFeedbackAliasCollection_1.FictiveFeedbackAliasCollection();
        this.alias = this;
        this.typeName = "DataConsumerVariadbleMeasurements";
        this.types.push("DataConsumerVariadbleMeasurements");
        this.types.push("IMeasurements");
        this.types.push("IAlias");
    }
    getMeasurementsCount() {
        return this.output.length;
    }
    getMeasurement(i) {
        return this.output[i];
    }
    addMeasurement(measurement) {
    }
    updateMeasurements() {
    }
    getAliasType(name) {
        return this.aliasTypes.get(name);
    }
    getAliasNames() {
        return this.aliasNames;
    }
    getAliasValue(name) {
        return this.aliasValues.get(name);
    }
    setAliasValue(name, value) {
        this.performer.setAliasType(name, value, this.aliasTypes, this.aliasNames);
        this.aliasValues.set(name, value);
    }
    addVariable(variable) {
        this.output.push(variable);
        this.variables.set(variable.getMeasurementName(), variable);
    }
    getFeedbackAliasCollection() {
        throw new Error("Method not implemented.");
    }
}
exports.DataConsumerVariadbleMeasurements = DataConsumerVariadbleMeasurements;
//# sourceMappingURL=DataConsumerVariableMeasurements.js.map