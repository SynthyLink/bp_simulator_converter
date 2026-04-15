"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaScene = void 0;
const ScadaDesktopEngine_1 = require("../Library/Scada/ScadaDesktopEngine");
const BasicScene_1 = require("./BasicScene");
const Object3DPrimive_1 = require("./Primitives/Object3DPrimive");
const Performer_1 = require("../Library/Performer");
class ScadaScene extends BasicScene_1.BasicScene {
    constructor(game, factory, desktop) {
        super(game, factory);
        this.startp = new Start();
        this.performer = new Performer_1.Performer();
        console.log("PPPPPPPPPPPPP");
        this.scada = new ScadaDesktopEngine_1.ScadaDesktopEngine(desktop, game, factory, "Chart");
        console.log(this.scada);
        console.log("PPPPHHHPPPPPPPPP");
        console.log(this.performer);
        this.loadShapes();
        console.log(this.performer.setFactoryToObjectCollection);
        this.performer.setFactoryToObjectCollection(this, factory);
    }
    draw(deltaTime) {
    }
    end() {
    }
    actionT(t) {
        var name = t.getName();
        new Object3DPrimive_1.Object3DPrimitive(name, this, t);
    }
    loadShapes() {
        console.log("LLLLL");
        console.log(this.scada);
        this.performer.forEach(this.scada, this, "Basic3DShape");
    }
    start() {
        this.performer.forEach(this, this.startp, "IStartPrimitive");
    }
}
exports.ScadaScene = ScadaScene;
class Start {
    actionT(t) {
        t.startPrimitive();
    }
}
//# sourceMappingURL=ScadaScene.js.map