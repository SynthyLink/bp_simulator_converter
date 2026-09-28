"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaComposition = void 0;
const ScadaDesktopEngine_1 = require("../../Library/Scada/ScadaDesktopEngine");
const Motion6DRealtimeFactory_1 = require("../../Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory");
const Airplane_1 = require("../../Airplane");
class ScadaComposition {
    constructor(engine) {
        console.log("AAAPPPm");
        let a = new Airplane_1.Airplane();
        let f = new Motion6DRealtimeFactory_1.Motion6DRealtimeFactory();
        console.log(a);
        console.log(f);
        this.scada = new ScadaDesktopEngine_1.ScadaDesktopEngine(a, engine, f, "Chart");
        let dc = this.scada.getScadaObject("Chart", "IDataConsumer");
        let ev = this.scada.getScadaObject("Timer", "IEvent");
        new Action(dc[0], ev[0]);
        this.scada.setScadaEnabled(true);
    }
}
exports.ScadaComposition = ScadaComposition;
class Action {
    action() {
        var m = this.dc.getAllMeasurements();
        var x = m[0];
        var y = [x.getMeasurement(0).getMeasurementValue(), x.getMeasurement(0).getMeasurementValue()];
        console.log(y);
    }
    constructor(dc, event) {
        this.dc = dc;
        event.eventAction().addAction(this);
    }
}
//# sourceMappingURL=ScadaComposion.js.map