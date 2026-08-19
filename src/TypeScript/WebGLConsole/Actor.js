"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = exports.Actor = void 0;
const Airplane_1 = require("./scenes/Airplane");
const AbstractAction_1 = require("./src/Library/Event/Objects/AbstractAction");
const AbstractActionT_1 = require("./src/Library/Event/Objects/AbstractActionT");
const ActionTAction_1 = require("./src/Library/Event/Objects/ActionTAction");
const Motion6DFactory_1 = require("./src/Library/Motion6D/Motion6DFactory");
const ScadaPerformer_1 = require("./src/Library/Scada/ScadaPerformer");
const TestObject_1 = require("./src/Library/TestObject");
const ActionArray_1 = require("./src/Library/Utilities/Generic/ActionArray");
const EngineWatch_1 = require("./src/Library/Utilities/Watch/EngineWatch");
const PIAct_1 = require("./test/wrappers/PIAct");
class Actor {
    constructor() {
        this.url = "http://localhost:4173/static/models/pLANE/master.mtl";
        //engine: FictiveEngine = new FictiveEngine()
        this.performer = new ScadaPerformer_1.ScadaPerformer();
        this.dir = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole/static/models";
        this.dir = this.dir.replaceAll("\\", "/");
        new TestObject_1.TestObject;
        //   ga.setConsumerFactory(f)
        this.factory = new Motion6DFactory_1.Motion6DFactory();
        let ap = new Airplane_1.Airplane();
        this.createActionScada(ap);
    }
    createEngineScada(collection) {
        let tm = new EngineWatch_1.EngineWatch(100);
        let scada = this.performer.createScadaDesktopEngine(collection, tm, this.factory, "Chart");
        let sc = scada;
        sc.setScadaEnabled(true);
        let ea = tm.getEngineAction();
        ea.addActionT(new ActionTAction_1.ActionTAction(scada));
        scada.addAction(new A("I = "));
        scada.addAction(new B(sc, tm));
        ea.addActionT(new TT());
        tm.setEngineEnabled(true);
        return scada;
    }
    createActionScada(collection) {
        let tm = new EngineWatch_1.EngineWatch(10);
        let act = new ActionArray_1.ActionArray;
        let actT = new ActionTAction_1.ActionTAction(act);
        tm.getEngineAction().addActionT(actT);
        let scada = this.performer.createScadaDesktopAction(collection, act, 1, this.factory, "Chart");
        let sc = scada;
        let ea = tm.getEngineAction();
        ea.addActionT(new ActionTAction_1.ActionTAction(scada));
        scada.addAction(new A("I = "));
        scada.addAction(new B(sc, tm));
        ea.addActionT(new TT());
        sc.setScadaEnabled(true);
        tm.setEngineEnabled(true);
        return scada;
    }
    createActionScadaScada(collection) {
        let tm = new EngineWatch_1.EngineWatch(10);
        let act = new ActionArray_1.ActionArray;
        let scada = this.performer.createScadaDesktopAction(collection, act, 1, this.factory, "Chart");
        let sc = scada;
        let ea = tm.getEngineAction();
        ea.addActionT(new ActionTAction_1.ActionTAction(scada));
        scada.addAction(new A("I = "));
        scada.addAction(new B(sc, tm));
        ea.addActionT(new TT());
        tm.getEngineAction().addActionT(new ActionTAction_1.ActionTAction(scada));
        sc.setScadaEnabled(true);
        tm.setEngineEnabled(true);
        return scada;
    }
    async p() {
        let response = await fetch(this.url);
        console.log("RESP", response);
        console.log("BLOB", response.blob);
        let data = await response.text();
        console.log(data);
    }
    loadGame() {
        //    this.game.loadItself(true);
        //    this.game.startItself(true);
        /* for (let i = 0; i < 10; i++) {
              this.engine.setTime(i)
          }*/
    }
    actPI() {
        try {
            var o = new PIAct_1.PIAct();
            o.test();
        }
        catch (e) {
            //finish(e);
        }
    }
    actAirplane() {
    }
}
exports.Actor = Actor;
class A extends AbstractAction_1.AbstractAction {
    constructor(s) {
        super();
        this.s = "";
        this.i = 0;
        this.s = s;
    }
    action() {
        ++this.i;
        console.log(this.s + " " + this.i);
    }
}
exports.A = A;
class B extends AbstractAction_1.AbstractAction {
    constructor(scada, engine) {
        super();
        this.inputs = scada.getScadaInputs();
        let dc = scada.getScadaObject("Chart", "IDataConsumer");
        this.dataConsumer = dc[0];
        let timer = scada.getScadaObject("Timer", "TimerObject");
        timer[0].eventActionT().addActionT(new TA(this.inputs, engine, scada));
    }
    action() {
        var mmm = this.dataConsumer.getAllMeasurements();
        var mm = mmm[0];
        var m = mm.getMeasurement(0);
        var v = m.getMeasurementValue();
        console.log("Value " + v);
        mm = mmm[2];
        m = mm.getMeasurement(3);
        let n = m.getMeasurementName();
        v = m.getMeasurementValue();
        console.log(n + " " + v);
    }
}
class TT extends AbstractActionT_1.AbstractActionT {
    actionT(t) {
        console.log("2 * time " + 2 * t);
    }
}
class TA extends AbstractActionT_1.AbstractActionT {
    constructor(inputs, timer, scada) {
        super();
        this.inputs = inputs;
        this.timer = timer;
        this.scada = scada;
    }
    actionT(t) {
        console.log("time " + t);
        if (t > 2) {
            console.log("FORCE");
            this.inputs[0].setInputValue("X", 1);
        }
        if (t > 5) {
            this.scada.setScadaEnabled(false);
            this.timer.setEngineEnabled(false);
        }
    }
}
//# sourceMappingURL=Actor.js.map