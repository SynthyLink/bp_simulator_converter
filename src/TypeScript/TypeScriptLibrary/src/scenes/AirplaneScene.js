"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirplaneScene = void 0;
const ScadaScene_1 = require("../Library/Abstract3Game/Scenes/ScadaScene");
const Airplane_1 = require("./Airplane");
class AirplaneScene extends ScadaScene_1.ScadaScene {
    constructor(game) {
        super(game, new Airplane_1.Airplane());
        this.addResource("models/pLANE/Cessna_208_Caravan.obj");
        this.addResource("models/pLANE/master.mtl");
        this.addResource("models/pLANE/mat0_c.jpg");
    }
}
exports.AirplaneScene = AirplaneScene;
//# sourceMappingURL=AirplaneScene.js.map