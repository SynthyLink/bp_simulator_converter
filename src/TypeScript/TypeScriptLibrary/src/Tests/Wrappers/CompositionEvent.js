"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositionEvent = void 0;
const Composition_1 = require("../Composition");
class CompositionEvent extends Composition_1.Composition {
    constructor(stop) {
        super();
        //     this.engine = new WatchFactory(stop)
        var co = this.getCategoryObject("Chart");
        this.ev = this.getCategoryObject("Timer");
        this.dc = co;
        // let eev = new DataRuntimeConsumerEvent(this.dc)
        //  eev.setTimeProvider(this.engine)
        //  eev.setTimerFactory(this.engine)
        // this.eve = eev
        this.stop = stop;
    }
    test() {
        new Action(this.dc, this.ev);
        this.eve.startRuntime(0);
        this.eve.setComponentCollectionRunning(true);
        // this.engine.setEngineEnabled(true)
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