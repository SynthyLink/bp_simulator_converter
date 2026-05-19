"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = exports.Actor = void 0;
const AirplaneScene_1 = require("./scenes/AirplaneScene");
const FileGameFactory_1 = require("./src/Console/FileGameFactory");
const ReferenceFrameGameActionFactory_1 = require("./src/Library/Abstract3DGame/GameActions/ReferenceFrameGameActionFactory");
const ScadaFind3DFrame_1 = require("./src/Library/Abstract3DGame/GameActions/ScadaFind3DFrame");
const ScadaFindCamera_1 = require("./src/Library/Abstract3DGame/GameActions/ScadaFindCamera");
const EngineGameCameraAction_1 = require("./src/Library/Abstract3DGame/Games/EngineGameCameraAction");
const AbstractAction_1 = require("./src/Library/Event/Objects/AbstractAction");
const AbstractActionT_1 = require("./src/Library/Event/Objects/AbstractActionT");
const EnfineWatch_1 = require("./src/Library/Utilities/Watch/EnfineWatch");
const PIAct_1 = require("./test/wrappers/PIAct");
class Actor {
    async p() {
        let response = await fetch(this.url);
        console.log("RESP", response);
        console.log("BLOB", response.blob);
        let data = await response.text();
        console.log(data);
    }
    //engine: FictiveEngine = new FictiveEngine()
    constructor() {
        this.url = "http://localhost:4173/static/models/pLANE/master.mtl";
        this.dir = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole/static/models";
        this.dir = this.dir.replaceAll("\\", "/");
        var find = new ScadaFind3DFrame_1.ScadaFind3dFrame("Camera");
        var ga = new ReferenceFrameGameActionFactory_1.ReferenceFrameGameActionFactory(find, undefined);
        var f = new FileGameFactory_1.FileGameFactory(this.dir, ga);
        ga.setConsumerFactory(f);
        this.factory = f;
        f.addFactory(find, "IFindFrame");
        f.addFactory(new ScadaFindCamera_1.ScadaFindCamera("Camera"), "IFindCamera");
        let engine = new EnfineWatch_1.EngineWatch(500);
        var g = new EngineGameCameraAction_1.EngineGameCameraAction("", this.factory, engine, false);
        g.getExternalAction().addAction(new A("game"));
        this.game = g;
        var sc = new AirplaneScene_1.AirplaneScene(this.game, "Chart");
        let scada = sc.getConsumerScada();
        var ea = sc.getInternalAction();
        ea.addAction(new A("scene"));
        ea.addAction(new B(sc, g));
        var ena = g.getEngineAction();
        ena.addActionT(new TT());
    }
    loadGame() {
        this.game.loadItself(true);
        this.game.startItself(true);
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
    constructor(scene, game) {
        super();
        this.game = game;
        let scada = scene.getConsumerScada();
        this.inputs = scada.getScadaInputs();
        let dc = scada.getScadaObject("Chart", "IDataConsumer");
        this.dataConsumer = dc[0];
        let timer = scada.getScadaObject("Timer", "TimerObject");
        timer[0].eventActionT().addActionT(new TA(this.game, this.inputs));
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
    constructor(game, inputs) {
        super();
        this.game = game;
        this.inputs = inputs;
    }
    actionT(t) {
        console.log("time " + t);
        if (t > 2) {
            console.log("FORCE");
            this.inputs[0].setInputValue("X", 1);
        }
        if (t > 5) {
            this.game.startItself(false);
        }
    }
}
//# sourceMappingURL=Actor.js.map