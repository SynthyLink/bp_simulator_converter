"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const AirplaneScene_1 = require("../scenes/AirplaneScene");
const FileGameFactory_1 = require("../src/FileSystem/Factory/FileGameFactory");
const ReferenceFrameGameActionFactory_1 = require("../src/Library/Abstract3Game/GameActions/ReferenceFrameGameActionFactory");
const ScadaFindFrame_1 = require("../src/Library/Abstract3Game/GameActions/ScadaFindFrame");
const EngineGameImitation_1 = require("../src/Library/Abstract3Game/Imitation/EngineGameImitation");
const PIAct_1 = require("./wrappers/PIAct");
class Actor {
    constructor() {
        this.dir = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole\\models\\";
        this.dir = this.dir.replaceAll("\\", "/");
        var find = new ScadaFindFrame_1.ScadaFindFrame("Camera");
        var ga = new ReferenceFrameGameActionFactory_1.ReferenceFrameGameActionFactory(find);
        this.factory = new FileGameFactory_1.FileGameFactory(this.dir, ga);
        var g = new EngineGameImitation_1.EngineGameImitation("", this.factory);
        g.setImitation(10, 1, 0);
        this.game = g;
        var sc = new AirplaneScene_1.AirplaneScene(this.game, "Chart");
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
//# sourceMappingURL=Actor.js.map