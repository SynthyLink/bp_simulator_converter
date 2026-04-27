"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = exports.Actor = void 0;
const AirplaneScene_1 = require("./scenes/AirplaneScene");
const FileGameFactory_1 = require("./src/FileSystem/Factory/FileGameFactory");
const ReferenceFrameGameActionFactory_1 = require("./src/Library/Abstract3DGame/GameActions/ReferenceFrameGameActionFactory");
const ScadaFind3DFrame_1 = require("./src/Library/Abstract3DGame/GameActions/ScadaFind3DFrame");
const EngineGameImitation_1 = require("./src/Library/Abstract3DGame/Imitation/EngineGameImitation");
const AbstractAction_1 = require("./src/Library/Event/Objects/AbstractAction");
const AbstractActionT_1 = require("./src/Library/Event/Objects/AbstractActionT");
const PIAct_1 = require("./test/wrappers/PIAct");
class Actor {
    constructor() {
        this.dir = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole/static/models";
        this.dir = this.dir.replaceAll("\\", "/");
        var find = new ScadaFind3DFrame_1.ScadaFind3dFrame("Camera");
        var ga = new ReferenceFrameGameActionFactory_1.ReferenceFrameGameActionFactory(find);
        this.factory = new FileGameFactory_1.FileGameFactory(this.dir, ga);
        var g = new EngineGameImitation_1.EngineGameImitation("", this.factory);
        g.getExternalAction().addAction(new A("game"));
        g.setImitation(10, 1, 0);
        this.game = g;
        var sc = new AirplaneScene_1.AirplaneScene(this.game, "Chart");
        var ea = sc.getExternalAction();
        ea.addAction(new A("scene"));
        ea.addAction(new B(sc, g));
    }
    loadGame() {
        this.game.loadItself(true);
        this.game.startItself(true);
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
        let dc = scada.getScadaObject("Chart", "IDataConsumer");
        this.dataConsumer = dc[0];
        let timer = scada.getScadaObject("Timer", "TimerObject");
        timer[0].eventActionT().addActionT(new TA(this.game));
    }
    action() {
        var mmm = this.dataConsumer.getAllMeasurements();
        var mm = mmm[0];
        var m = mm.getMeasurement(0);
        var v = m.getMeasurementValue();
        console.log("Value " + v);
    }
}
class TA extends AbstractActionT_1.AbstractActionT {
    constructor(game) {
        super();
        this.game = game;
    }
    actionT(t) {
        console.log("time " + t);
        if (t > 5) {
            this.game.startItself(false);
        }
    }
}
//# sourceMappingURL=Actor.js.map