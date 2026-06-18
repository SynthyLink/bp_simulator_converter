"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaComposition = void 0;
const ScadaDesktopEngine_1 = require("../../Library/Scada/ScadaDesktopEngine");
const Motion6DFactory_1 = require("../../Library/Motion6D/Motion6DFactory");
const Cessna_1 = require("../../scenes/Cessna");
//import { GameFactory } from "../../common/GameFactory";
class ScadaComposition {
    scada;
    constructor(engine) {
        console.log("AAAPPPm");
        let a = new Cessna_1.Cessna();
        let f = new Motion6DFactory_1.Motion6DFactory();
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
    dc;
    isEmptyAction() {
        return false;
    }
    constructor(dc, event) {
        this.dc = dc;
        event.eventAction().addAction(this);
    }
}
//# sourceMappingURL=ScadaComposion.js.map