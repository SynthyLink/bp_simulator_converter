"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnigneGameImitation = void 0;
const EngineGame_1 = require("../Abstract/EngineGame");
class EnigneGameImitation extends EngineGame_1.EngineGame {
    constructor(name, factory) {
        super(name, factory);
        this.steps = 0;
        this.step = 0;
        this.begin = 0;
    }
    setImitation(steps, step, begin) {
        this.steps = step;
        this.step = step;
        this.begin = begin;
    }
    run() {
        for (var i = 0; i < this.steps; i++) {
            this.cycle(i * this.step + this.begin);
        }
    }
}
exports.EnigneGameImitation = EnigneGameImitation;
//# sourceMappingURL=EnigneGameImitation.js.map