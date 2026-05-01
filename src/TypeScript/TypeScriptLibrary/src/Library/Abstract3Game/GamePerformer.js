"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePerformer = void 0;
const Performer_1 = require("../Performer");
class GamePerformer extends Performer_1.Performer {
    constructor(game) {
        super();
        this.game = game;
        this.factory = game.getConsumerFactory();
    }
}
exports.GamePerformer = GamePerformer;
//# sourceMappingURL=GamePerformer.js.map