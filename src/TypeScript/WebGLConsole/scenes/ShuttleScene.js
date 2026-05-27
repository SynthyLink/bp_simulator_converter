"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShuttleScene = void 0;
const ScadaScene_1 = require("../src/Library/Game/Scenes/ScadaScene");
const Shuttle_1 = require("./Shuttle");
class ShuttleScene extends ScadaScene_1.ScadaScene {
    constructor(game, chart) {
        super(game, new Shuttle_1.Shuttle(), chart);
    }
}
exports.ShuttleScene = ShuttleScene;
//# sourceMappingURL=ShuttleScene.js.map