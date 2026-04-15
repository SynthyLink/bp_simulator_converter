import { IPlayEngine } from "../../Library/Interfaces/IPlayEngine";
import { Composition } from "../Composition";
import { ScadaDesktopEngine } from "../../Library/Scada/ScadaDesktopEngine";
import { Motion6DRealtimeFactory } from "../../Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory";
import { IScadaInterface } from "../../Library/Scada/Interfaces/IScadaInterface";
import { IAction } from "../../Library/Interfaces/IAction";
import { IDataConsumer } from "../../Library/Measurements/Interfaces/IDataConsumer";
import { IEvent } from "../../Library/Interfaces/IEvent";
import { Airplane } from "../../Airplane";

export class ScadaComposition {

    scada !: IScadaInterface
    constructor(engine: IPlayEngine) {
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
    class Action implements IAction {
    action(): void {
        var m = this.dc.getAllMeasurements();
        var x = m[0]
        var y = [x.getMeasurement(0).getMeasurementValue(), x.getMeasurement(0).getMeasurementValue()]
        console.log(y)
    }
    dc!: IDataConsumer;

    constructor(dc: IDataConsumer, event: IEvent) {
        this.dc = dc;
        event.eventAction().addAction(this)
    }

}
