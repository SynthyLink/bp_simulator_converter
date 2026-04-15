"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneScene = void 0;
const Airplane_1 = require("../Airplane");
const GameFactory_1 = require("../common/GameFactory");
const ScadaScene_1 = require("../common/ScadaScene");
const ScadaDesktopEngine_1 = require("../Library/Scada/ScadaDesktopEngine");
class AirplaneScene extends ScadaScene_1.ScadaScene {
    load() {
        this.game.loader.load({
            ["Cessna_208_Caravan.obj"]: { url: 'models/pLANE/Cessna_208_Caravan.obj', type: 'text' },
            ["master.mtl"]: { url: 'models/pLANE/master.mtl', type: 'text' },
            ["mat0_c.jpg"]: { url: 'models/pLANE/mat0_c.jpg', type: 'image' }
        });
    }
    constructor(game) {
        super(game, new ScadaDesktopEngine_1.ScadaDesktopEngine(new Airplane_1.Airplane(), game, new GameFactory_1.GameFactory(), "Chart"));
    }
}
exports.AirplaneScene = AirplaneScene;
//# sourceMappingURL=AirplaneScene.js.map