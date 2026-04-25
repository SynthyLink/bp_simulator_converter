"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const CessnaScene_1 = require("../scenes/CessnaScene");
const FileGameFactory_1 = require("../src/FileSystem/Factory/FileGameFactory");
const EngineGameImitation_1 = require("../src/Library/Abstract3Game/Imitation/EngineGameImitation");
const PIAct_1 = require("./wrappers/PIAct");
class Actor {
    constructor() {
        this.dir = "C:\\AUsers\\1MySoft\\CSharp\\src\\TypeScript\\WebGLConsole\\models\\";
        this.factory = new FileGameFactory_1.FileGameFactory(this.dir);
        this.game = new EngineGameImitation_1.EngineGameImitation("", this.factory);
        var sc = new CessnaScene_1.CessnaScene(this.game);
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