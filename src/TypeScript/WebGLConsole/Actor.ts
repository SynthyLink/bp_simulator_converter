import { Airplane } from "./scenes/Airplane";
import { AbstractAction } from "./src/Library/Event/Objects/AbstractAction";
import { AbstractActionT } from "./src/Library/Event/Objects/AbstractActionT";
import { ActionTAction } from "./src/Library/Event/Objects/ActionTAction";
import { TimerObject } from "./src/Library/Event/Objects/TimerObject";
import { IActionAddRemove } from "./src/Library/Interfaces/IActionAddRemove";
import { IComponentCollection } from "./src/Library/Interfaces/IComponentCollection";
import { IFactory } from "./src/Library/Interfaces/IFactory";
import { IInput } from "./src/Library/Interfaces/IInput";
import { IPlayEngine } from "./src/Library/Interfaces/IPlayEngine";
import { IDataConsumer } from "./src/Library/Measurements/Interfaces/IDataConsumer";
import { Motion6DFactory } from "./src/Library/Motion6D/Motion6DFactory";
import { IScadaConsumer } from "./src/Library/Scada/Interfaces/IScadaConsumer";
import { IScadaInterface } from "./src/Library/Scada/Interfaces/IScadaInterface";
import { ScadaDesktop } from "./src/Library/Scada/ScadaDesktop";
import { ScadaDesktopEngine } from "./src/Library/Scada/ScadaDesktopEngine";
import { ScadaPerformer } from "./src/Library/Scada/ScadaPerformer";
import { TestObject } from "./src/Library/TestObject";
import { ActionArray } from "./src/Library/Utilities/Generic/ActionArray";
import { EngineWatch } from "./src/Library/Utilities/Watch/EngineWatch";
import { PIAct } from "./test/wrappers/PIAct";



export class Actor {
    constructor() {
        this.dir = this.dir.replaceAll("\\", "/");
        new TestObject
        //   ga.setConsumerFactory(f)
        this.factory = new Motion6DFactory()
        let ap = new Airplane();
        this.createActionScada(ap)
     }

    createEngineScada(collection: IComponentCollection): IActionAddRemove {
        let tm = new EngineWatch(100)
        let scada = this.performer.createScadaDesktopEngine(collection, tm,
            this.factory, "Chart")
        let sc = scada as unknown as IScadaInterface
        sc.setScadaEnabled(true)
        let ea = tm.getEngineAction()
        ea.addActionT(new ActionTAction(scada))
        scada.addAction(new A("I = "))
        scada.addAction(new B(sc, tm))
        ea.addActionT(new TT())
        tm.setEngineEnabled(true)
        return scada

    }


    createActionScada(collection: IComponentCollection): IActionAddRemove {
        let tm = new EngineWatch(10)
        let act = new ActionArray
        let actT = new ActionTAction<number>(act)
        tm.getEngineAction().addActionT(actT)
        let scada = this.performer.createScadaDesktopAction(collection, act, 1,
            this.factory, "Chart")
        let sc = scada as unknown as IScadaInterface
        let ea = tm.getEngineAction()
        ea.addActionT(new ActionTAction(scada))
        scada.addAction(new A("I = "))
        scada.addAction(new B(sc, tm))
        ea.addActionT(new TT())
        sc.setScadaEnabled(true)
        tm.setEngineEnabled(true)
        return scada

    }

    createActionScadaScada(collection: IComponentCollection): IActionAddRemove {
        let tm = new EngineWatch(10)
        let act = new ActionArray
        let scada = this.performer.createScadaDesktopAction(collection, act, 1,
            this.factory, "Chart")
        let sc = scada as unknown as IScadaInterface
        let ea = tm.getEngineAction()
        ea.addActionT(new ActionTAction(scada))
        scada.addAction(new A("I = "))
        scada.addAction(new B(sc, tm))
        ea.addActionT(new TT())
        tm.getEngineAction().addActionT(new ActionTAction(scada))
        sc.setScadaEnabled(true)
        tm.setEngineEnabled(true)
        return scada

    }




    factory!: IFactory;

    url: string = "http://localhost:4173/static/models/pLANE/master.mtl"

    async p(): Promise<void> {
        let response = await fetch(this.url)
        console.log("RESP", response)
        console.log("BLOB", response.blob)

        let data = await response.text();

        console.log(data)
    }

    //engine: FictiveEngine = new FictiveEngine()
    performer: ScadaPerformer = new ScadaPerformer();
    loadGame(): void {
    //    this.game.loadItself(true);
    //    this.game.startItself(true);
      /* for (let i = 0; i < 10; i++) {
            this.engine.setTime(i)
        }*/

    }


    dir: string = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole/static/models";
    actPI(): void {
        try {
            var o = new PIAct();
            o.test();
        }
        catch (e) {
            //finish(e);
        }
    }

    actAirplane(): void {
    }

}

export class A extends AbstractAction {
    s: string = ""
    i: number = 0
    constructor(s: string) {
        super()
        this.s = s;
    }
    action(): void {
        ++this.i
        console.log(this.s + " " + this.i)
    }

}

class B extends AbstractAction {

    dataConsumer !: IDataConsumer
    scada !: IScadaInterface

    inputs !: IInput[]
    constructor(scada: IScadaInterface, engine: IPlayEngine) {
        super()
        this.inputs = scada.getScadaInputs()
        let dc = scada.getScadaObject<IDataConsumer>("Chart", "IDataConsumer")
        this.dataConsumer = dc[0];
        let timer = scada.getScadaObject<TimerObject>("Timer", "TimerObject")
        timer[0].eventActionT().addActionT(new TA(this.inputs, engine, scada))
    }

    action(): void {
        var mmm = this.dataConsumer.getAllMeasurements()
        var mm = mmm[0];
        var m = mm.getMeasurement(0)
        var v = m.getMeasurementValue()
        console.log("Value " + v)
        mm = mmm[2]
        m = mm.getMeasurement(3)
        let n = m.getMeasurementName();
        v = m.getMeasurementValue()
        console.log(n + " " + v)
    }
}

class TT extends AbstractActionT<number> {
    actionT(t: number): void {
        console.log("2 * time " + 2 * t)
    }

}

class TA extends AbstractActionT<number> {
    inputs !: IInput[] 
    timer!: IPlayEngine
    scada!: IScadaInterface
    constructor(inputs: IInput[], timer: IPlayEngine, scada: IScadaInterface) {
        super()
        this.inputs = inputs
        this.timer = timer
        this.scada = scada
    }
    actionT(t: number): void {
        console.log("time " + t)
        if (t > 2) {
            console.log("FORCE")
            this.inputs[0].setInputValue("X", 1)
        }
        if (t > 5) {
            this.scada.setScadaEnabled(false)
            this.timer.setEngineEnabled(false)
        }
    }
}



