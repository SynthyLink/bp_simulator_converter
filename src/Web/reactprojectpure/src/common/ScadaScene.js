"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaScene = void 0;
const ScadaDesktopEngine_1 = require("../Library/Scada/ScadaDesktopEngine");
const BasicScene_1 = require("./BasicScene");
const Performer_1 = require("../Library/Performer");
class ScadaScene extends BasicScene_1.BasicScene {
    constructor(game, factory, desktop) {
        super(game, factory);
        this.startp = new Start();
        this.performer = new Performer_1.Performer();
        this.scada = new ScadaDesktopEngine_1.ScadaDesktopEngine(desktop, game, factory, "Chart");
        this.loadScada();
        this.performer.setFactoryToObjectCollection(this, factory);
    }
    draw(deltaTime) {
    }
    end() {
    }
    actionT(t) {
        this.loader.loadObject(this, t);
    }
    loadScada() {
        this.performer.forEach(this.scada, this, "IObject");
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