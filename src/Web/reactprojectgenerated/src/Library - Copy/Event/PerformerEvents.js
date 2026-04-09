"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerEvents = void 0;
const Performer_1 = require("../Performer");
class PerformerEvents {
    constructor() {
        this.isEnabled = false;
        this.performer = new Performer_1.Performer();
        this.timerAction = new TimerAction();
    }
    actionT(t) {
        t.setEventEnabled(this.isEnabled);
    }
    setComponentCollectionEnabled(collection, isEnabled) {
        this.isEnabled = this.isEnabled;
        this.performer.forEach(collection, this, "IEventStart");
    }
    setComponentCollectionTimer(collection, factory) {
        if (factory === null)
            return;
        this.timerAction.set(factory);
        this.performer.forEach(collection, this.timerAction, "ITimerConsumer");
    }
}
exports.PerformerEvents = PerformerEvents;
class TimerAction {
    actionT(t) {
        t.setTimer(this.factory);
    }
    set(factory) {
        this.factory = factory;
    }
}
//# sourceMappingURL=PerformerEvents.js.map