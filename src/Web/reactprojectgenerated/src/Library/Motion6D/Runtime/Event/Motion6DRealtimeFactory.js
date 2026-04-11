"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Motion6DRealtimeFactory = void 0;
const DataRuntimeConsumerMotion6DEvent_1 = require("./DataRuntimeConsumerMotion6DEvent");
const Performer_1 = require("../../../Performer");
const PerformerMeasuremets_1 = require("../../../Measurements/PerformerMeasuremets");
class Motion6DRealtimeFactory {
    constructor() {
        this.performer = new Performer_1.Performer();
        this.mPerformer = new PerformerMeasuremets_1.PerformerMeasuremets();
    }
    createRealtimeFromCollection(collection) {
        throw new Error("Method not implemented.");
    }
    createRealtimeFromDataConsumer(consumer) {
        return new DataRuntimeConsumerMotion6DEvent_1.DataRuntimeConsumerMotion6DEvent(consumer, PerformerMeasuremets_1.PerformerMeasuremets.getDifferentialEquationProcessor());
    }
}
exports.Motion6DRealtimeFactory = Motion6DRealtimeFactory;
//# sourceMappingURL=Motion6DRealtimeFactory.js.map