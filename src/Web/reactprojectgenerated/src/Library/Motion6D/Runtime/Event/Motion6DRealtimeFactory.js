"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion6DRealtimeFactory = void 0;
const DataRuntimeConsumerMotion6DEvent_1 = require("./DataRuntimeConsumerMotion6DEvent");
const Performer_1 = require("../../../Performer");
const PerformerMeasuremets_1 = require("../../../Measurements/PerformerMeasuremets");
const FictiveRealtimeCollection_1 = require("../../../Fiction/FictiveRealtimeCollection");
const RungeProcessor_1 = require("../../../Measurements/DifferentialEquations/Processors/RungeProcessor");
const Motion6DFactory_1 = require("../../Motion6DFactory");
class Motion6DRealtimeFactory {
    constructor() {
        this.performer = new Performer_1.Performer();
        this.mPerformer = new PerformerMeasuremets_1.PerformerMeasuremets();
        this.typeName = "Motion6DRealtimeFactory";
        this.types = ["IObject", "IRealtimeCollectionFactory", "Motion6DRealtimeFactory"];
        this.name = "";
    }
    getName() {
        return this.name;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    createRealtimeFromCollection(collection) {
        let processor = new RungeProcessor_1.RungeProcessor();
        return new FictiveRealtimeCollection_1.FictiveRealtimeCollection();
    }
    createRealtimeFromDataConsumer(consumer) {
        return new DataRuntimeConsumerMotion6DEvent_1.DataRuntimeConsumerMotion6DEvent(consumer, new Motion6DFactory_1.Motion6DFactory());
    }
}
exports.Motion6DRealtimeFactory = Motion6DRealtimeFactory;
//# sourceMappingURL=Motion6DRealtimeFactory.js.map