"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CessnaScene = void 0;
const Cessna_1 = require("../Cessna");
const GameFactory_1 = require("../common/GameFactory");
const ScadaScene_1 = require("../common/ScadaScene");
const ScadaDesktopEngine_1 = require("../Library/Scada/ScadaDesktopEngine");
class CessnaScene extends ScadaScene_1.ScadaScene {
    load() {
        this.game.loader.load({
        // LOAD
        });
    }
    constructor(game) {
        super(game, new ScadaDesktopEngine_1.ScadaDesktopEngine(new Cessna_1.Cessna(), game, new GameFactory_1.GameFactory(), "Chart"));
    }
}
exports.CessnaScene = CessnaScene;
//# sourceMappingURL=NameScene.js.map