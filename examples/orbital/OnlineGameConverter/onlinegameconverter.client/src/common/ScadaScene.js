"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaScene = void 0;
const BasicScene_1 = require("./BasicScene");
const Object3DPrimive_1 = require("./Primitives/Object3DPrimive");
const Performer_1 = require("../Library/Performer");
class ScadaScene extends BasicScene_1.BasicScene {
    constructor(game, factory, scada) {
        super(game, factory);
        this.performer = new Performer_1.Performer();
        this.startp = new Start();
        this.scada = scada;
        this.loadShapes();
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