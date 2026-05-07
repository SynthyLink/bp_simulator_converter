"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaComposition = void 0;
const ScadaDesktopEngine_1 = require("../../Library/Scada/ScadaDesktopEngine");
const Airplane_1 = require("../../Airplane");
const GameFactory_1 = require("../../common/GameFactory");
class ScadaComposition {
    constructor(engine) {
        console.log("AAAPPPm");
        let a = new Airplane_1.Airplane();
        let f = new GameFactory_1.GameFactory();
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