"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CessnaScene = void 0;
const ScadaScene_1 = require("../Library/Abstract3Game/Scenes/ScadaScene");
const Cessna_1 = require("./Cessna");
class CessnaScene extends ScadaScene_1.ScadaScene {
    constructor(game) {
        super(game, new Cessna_1.Cessna());
        //LOAD
    }
}
exports.CessnaScene = CessnaScene;
//# sourceMappingURL=CessnaScene.js.map