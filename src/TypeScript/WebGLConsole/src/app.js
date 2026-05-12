"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
const AirplaneScene_1 = require("../scenes/AirplaneScene");
const GameGLFactoty_1 = require("./GLGameFactory/GameGLFactoty");
const ReferenceFrameGameActionFactory_1 = require("./Library/Abstract3DGame/GameActions/ReferenceFrameGameActionFactory");
const ScadaFind3DFrame_1 = require("./Library/Abstract3DGame/GameActions/ScadaFind3DFrame");
const ScadaFindCamera_1 = require("./Library/Abstract3DGame/GameActions/ScadaFindCamera");
const AbstractAction_1 = require("./Library/Event/Objects/AbstractAction");
const AbstractActionT_1 = require("./Library/Event/Objects/AbstractActionT");
const PerformerEvents_1 = require("./Library/Event/PerformerEvents");
const GLGame_1 = require("./Library/GLGame/GLGame");
PerformerEvents_1.PerformerEvents.setTimeScale(0.001);
function funcAirplane() {
    var find = new ScadaFind3DFrame_1.ScadaFind3dFrame("Camera");
    var ga = new ReferenceFrameGameActionFactory_1.ReferenceFrameGameActionFactory(find, undefined);
    let factory = new GameGLFactoty_1.GameGLFactory(ga);
    ga.setConsumerFactory(factory);
    factory.addFactory(find, "IFindFrame");
    factory.addFactory(new ScadaFindCamera_1.ScadaFindCamera("Camera"), "IFindCamera");
    // First thing we need is to get the canvas on which we draw our scenes
    let canv = document.querySelector("#app");
    if (canv === undefined)
        return;
    let canvas = canv;
    let eng = new FictiveEngine();
    // Then we create an instance of the game class and give it the canvas
    const game = new GLGame_1.GLGame("", factory, eng, true, canvas, { maxfps: 25 });
    game.getExternalAction().addAction(new A("game"));
    // g.setImitation(10, 1, 0);
    // Here we list all our scenes and our initial scene
    const initialScene = "Game";
    const sc = new AirplaneScene_1.AirplaneScene(game, "Chart");
    var ea = sc.getExternalAction();
    ea.addAction(new A("scene"));
    ea.addAction(new B(sc, game));
    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
    // game.addSceneObject("Game", new SpaceTrippersScene(game))
    game.addScene("Air", sc);
    game.startItself(true);
    var sel = document.querySelector("#scenes");
    if (sel === undefined)
        return;
    // Here we setup a selector element to switch scenes from the webpage
    var selector = sel;
    /*    for (let name in scenes) {
            let option = document.createElement("option");
            option.text = name;
            option.value = name;
            selector.add(option);
        }
        selector.value = initialScene;
        selector.addEventListener("change", () => {
         //   game.startScene(selector.value);
        });
        /*
        let act = new ActorWebNew()
        act.actCompositionEvent(game)
        */
}
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
funcAirplane();
class FictiveEngine {
    isEngineEnabled() {
        throw new Error("Method not implemented.");
    }
    setEngineEnabled(enabled) {
        throw new Error("Method not implemented.");
    }
    getEngineAction() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=app.js.map