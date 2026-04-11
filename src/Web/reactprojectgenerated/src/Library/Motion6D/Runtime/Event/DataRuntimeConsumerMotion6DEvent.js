"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRuntimeConsumerMotion6DEvent = void 0;
const DataRuntimeConsumerEvent_1 = require("../../../Event/Runtime/DataRuntimeConsumerEvent");
const Motion6DPerformer_1 = require("../../Motion6DPerformer");
class DataRuntimeConsumerMotion6DEvent extends DataRuntimeConsumerEvent_1.DataRuntimeConsumerEvent {
    constructor(dataConsumer, processor) {
        super(dataConsumer, processor);
        this.motionPefromer = new Motion6DPerformer_1.Motion6DPerformer();
    }
    getExtenalUpdate(obj, realime) {
        var a = super.getExtenalUpdate(obj, realime);
        this.motionPefromer = new Motion6DPerformer_1.Motion6DPerformer();
        var act = this.motionPefromer.createUpdateFramesAction(this);
        a.addAction(act);
        return a;
    }
}
exports.DataRuntimeConsumerMotion6DEvent = DataRuntimeConsumerMotion6DEvent;
//# sourceMappingURL=DataRuntimeConsumerMotion6DEvent.js.map