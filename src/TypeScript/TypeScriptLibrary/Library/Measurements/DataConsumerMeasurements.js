"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConsumerMeasurements = void 0;
const FeedbackAliasCollection_1 = require("../FeedbackAliasCollection");
const FictiveAlias_1 = require("../Fiction/FictiveAlias");
const FictiveFeedbackAliasCollection_1 = require("../Fiction/FictiveFeedbackAliasCollection");
const Performer_1 = require("../Performer");
const DataConsumer_1 = require("./DataConsumer");
class DataConsumerMeasurements extends DataConsumer_1.DataConsumer {
    constructor(desktop, name) {
        super(desktop, name);
        this.output = [];
        this.aliasTypes = new Map();
        this.aliasValues = new Map();
        this.aliasNames = [];
        this.performer = new Performer_1.Performer();
        this.alias = new FictiveAlias_1.FictiveAlias();
        this.external = new Map();
        this.feedbackAliases = [];
        this.feedbackAliasCollection = new FictiveFeedbackAliasCollection_1.FictiveFeedbackAliasCollection();
        this.alias = this;
        this.typeName = "DataConsumerMeasurements";
        this.types.push("DataConsumerMeasurements");
        this.types.push("IMeasurements");
        this.types.push("IAlias");
        this.types.push("IExternalAliasDictionary");
    }
    addFeedbackAlias(feedbackAlias) {
        this.feedbackAliases.push(feedbackAlias);
    }
    updateFeedbackAliasCollection() {
        for (let r of this.feedbackAliases) {
            r.setFeedBackAlias();
        }
    }
    getExternalAliasDictionary() {
        return this.external;
    }
    getExternalAlias(name) {
        return this.external.get(name);
    }
    addExternalAlias(name, value) {
        this.external.set(name, value);
    }
    getAliasValue(name) {
        return this.aliasValues.get(name);
    }
    getMeasurementsCount() {
        return this.output.length;
    }
    getMeasurement(i) {
        return this.output[i];
    }
    addMeasurement(measurement) {
        this.output.push(measurement);
    }
    updateMeasurements() {
    }
    getAliasType(name) {
        return this.aliasTypes.get(name);
    }
    getAliasNames() {
        return this.aliasNames;
    }
    getAliasVаlue(name) {
        return this.aliasValues.get(name);
    }
    setAliasValue(name, value) {
        this.performer.setAliasType(name, value, this.aliasTypes, this.aliasNames);
        this.aliasValues.set(name, value);
    }
    setExternalAliases(map) {
        this.feedbackAliasCollection = new FeedbackAliasCollection_1.FeedbackAliasCollection(this, this, map);
    }
}
exports.DataConsumerMeasurements = DataConsumerMeasurements;
//# sourceMappingURL=DataConsumerMeasurements.js.map