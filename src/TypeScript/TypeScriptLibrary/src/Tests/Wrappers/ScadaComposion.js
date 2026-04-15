"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaComposition = void 0;
class ScadaComposition {
    constructor(engine) {
        /*     console.log("AAAPPPm")
             let a = new Airplane();
             let f = new Motion6DRealtimeFactory()
             console.log(a)
             console.log(f)
             this.scada = new ScadaDesktopEngine(a, engine, f, "Chart")
          let dc = this.scada.getScadaObject<IDataConsumer>("Chart", "IDataConsumer")
             let ev = this.scada.getScadaObject<IEvent>("Timer", "IEvent")
          new Action(dc[0], ev[0])
           this.scada.setScadaEnabled(true)*/
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