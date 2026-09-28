"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionEvent = void 0;
const DataRuntimeConsumerEvent_1 = require("../../Library/Event/Runtime/DataRuntimeConsumerEvent");
const Composition_1 = require("../Composition");
const TimerPlayEngineFactory_1 = require("../../Library/Event/TimerPlayEngineFactory");
const EngineTimerProvider_1 = require("../../Library/Event/EngineTimerProvider");
class CompositionEvent extends Composition_1.Composition {
    constructor(engine) {
        super();
        var co = this.getCategoryObject("Chart");
        this.ev = this.getCategoryObject("Timer");
        this.dc = co;
        let eev = new DataRuntimeConsumerEvent_1.DataRuntimeConsumerEvent(this.dc);
        eev.setTimeProvider(new EngineTimerProvider_1.EngineTimerProvider(engine));
        eev.setTimerFactory(new TimerPlayEngineFactory_1.TimerPlayEngineFactory(engine));
        this.engine = engine;
        this.eve = eev;
    }
    test() {
        new Action(this.dc, this.ev);
        this.eve.startRuntime(0);
        this.eve.setComponentCollectionRunning(true);
        //      this.engine.setEngineEnabled(true)
    }
}
exports.CompositionEvent = CompositionEvent;
class Action {
    action() {
        var m = this.dc.getAllMeasurements();
        var x = m[0];
        var y = [x.getMeasurement(0).getMeasurementValue(), x.getMeasurement(1).getMeasurementValue()];
        console.log(y);
    }
    constructor(dc, event) {
        this.dc = dc;
        event.eventAction().addAction(this);
    }
}
//# sourceMappingURL=CompositionEvent.js.map