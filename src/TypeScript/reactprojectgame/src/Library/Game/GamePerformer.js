"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePerformer = void 0;
const Performer_1 = require("../Performer");
class GamePerformer extends Performer_1.Performer {
    sceneToScada(scene) {
        var sh = this.convertObject(scene, "IScadaConsumer");
        if (sh.length == 0)
            return undefined;
        return sh[0].getConsumerScada();
    }
}
exports.GamePerformer = GamePerformer;
//# sourceMappingURL=GamePerformer.js.map