"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion6DRealtimeFactory = void 0;
const DataRuntimeConsumerMotion6DEvent_1 = require("./DataRuntimeConsumerMotion6DEvent");
const Performer_1 = require("../../../Performer");
const PerformerMeasuremets_1 = require("../../../Measurements/PerformerMeasuremets");
const FictiveRealtimeCollection_1 = require("../../../Fiction/FictiveRealtimeCollection");
const RungeProcessor_1 = require("../../../Measurements/DifferentialEquations/Processors/RungeProcessor");
class Motion6DRealtimeFactory {
    constructor() {
        this.performer = new Performer_1.Performer();
        this.mPerformer = new PerformerMeasuremets_1.PerformerMeasuremets();
    }
    createRealtimeFromCollection(collection) {
        let processor = new RungeProcessor_1.RungeProcessor();
        return new FictiveRealtimeCollection_1.FictiveRealtimeCollection();
    }
    createRealtimeFromDataConsumer(consumer) {
        let processor = new RungeProcessor_1.RungeProcessor();
        return new DataRuntimeConsumerMotion6DEvent_1.DataRuntimeConsumerMotion6DEvent(consumer, processor);
    }
}
exports.Motion6DRealtimeFactory = Motion6DRealtimeFactory;
//# sourceMappingURL=Motion6DRealtimeFactory.js.map