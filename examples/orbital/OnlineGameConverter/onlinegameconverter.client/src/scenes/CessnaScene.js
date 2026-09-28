"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CessnaScene = void 0;
const Cessna_1 = require("../Cessna");
const ScadaScene_1 = require("../common/ScadaScene");
const ScadsDesktop_1 = require("../Library/Scada/ScadsDesktop");
class CessnaScene extends ScadaScene_1.ScadaScene {
    load() {
        this.game.loader.load({
        // LOAD
        });
    }
    constructor(game) {
        super(game, new ScadsDesktop_1.ScadaDesktop(new Cessna_1.Cessna()));
    }
}
exports.CessnaScene = CessnaScene;
//# sourceMappingURL=CessnaScene.js.map