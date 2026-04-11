"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRuntimeConsumerEvent = void 0;
const DataRuntimeConsumerODE_1 = require("../../Runtime/DataRuntimeConsumerODE");
const PerformerEvents_1 = require("../PerformerEvents");
class DataRuntimeConsumerEvent extends DataRuntimeConsumerODE_1.DataRuntimeConsumerODE {
    constructor(dataConsumer, processor) {
        super(dataConsumer, processor);
        this.ePerformer = new PerformerEvents_1.PerformerEvents();
        this.isEnabled = false;
        var up = this.dataConsumer;
        var ob = this.dataConsumer;
        up.setExternalUpdate(this.getExtenalUpdate(ob, this));
    }
    getExtenalUpdate(obj, realime) {
        return this.mPerformer.createUpdateMeasurementsAction(this);
    }
    prepare(dataConsumer) {
        super.prepare(dataConsumer);
        let x = this.performer.convertObject(dataConsumer, "IEventHandler");
        if (x.length == 0)
            return;
        let evetns = x[0].getChildernT();
        for (let event of evetns) {
            let y = this.performer.convertObject(event, "ICategoryObject");
            if (y.length > 0) {
                let z = y[0];
                if (!this.categoryObjects.includes(z)) {
                    this.categoryObjects.push(z);
                }
            }
        }
    }
    getComponentCollection() {
        return this;
    }
    setComponentCollection(collection) {
    }
    isComponentCollectionRunning() {
        return this.isEnabled;
    }
    setComponentCollectionRunning(running) {
        if (this.isEnabled == running)
            return;
        this.isEnabled = running;
        this.ePerformer.setComponentCollectionEnabled(this, running);
    }
    setTimerFactory(timerFactory) {
        this.ePerformer.setComponentCollectionTimer(this, timerFactory);
    }
    setTimeProvider(timeProvider) {
        this.mPerformer.setTimeProviderCollection(this, timeProvider);
    }
}
exports.DataRuntimeConsumerEvent = DataRuntimeConsumerEvent;
//# sourceMappingURL=DataRuntimeConsumerEvent.js.map