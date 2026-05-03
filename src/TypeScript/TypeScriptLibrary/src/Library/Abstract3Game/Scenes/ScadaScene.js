"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaScene = void 0;
const ScadaDesktop_1 = require("../../Scada/ScadaDesktop");
const ScadaDesktopEngine_1 = require("../../Scada/ScadaDesktopEngine");
const AbstractScene_1 = require("../Abstract/AbstractScene");
class ScadaScene extends AbstractScene_1.AbstractScene {
    constructor(game, collection) {
        super(game, collection.getName());
        this.collection = collection;
        var engine = this.performer.convertObject(game, "IPlayEngine");
        if (engine.length > 0)
            this.scada = new ScadaDesktopEngine_1.ScadaDesktopEngine(collection, engine[0], this.factory, this.name);
        else
            this.scada = new ScadaDesktop_1.ScadaDesktop(collection);
    }
    getConsumerScada() {
        return this.scada;
    }
    setConsumerScada(scada) {
        return false;
    }
    loadItself(load) {
        if (!super.loadItself(load))
            return false;
        if (load)
            this.performer.createSceneAction();
        else
            this.internalAction.clearActions();
        return true;
    }
}
exports.ScadaScene = ScadaScene;
//# sourceMappingURL=ScadaScene.js.map