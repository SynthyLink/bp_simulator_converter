"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineGameImitation = void 0;
const EngineGame_1 = require("../../Game/Abstract/EngineGame");
class EngineGameImitation extends EngineGame_1.EngineGame {
    constructor(name, factory) {
        super(name, factory);
        this.steps = 0;
        this.step = 0;
        this.begin = 0;
        this.types.push("EnigneGameImitation");
        this.typeName = "EnigneGameImitation";
    }
    setImitation(steps, step, begin) {
        this.steps = steps;
        this.step = step;
        this.begin = begin;
    }
    run() {
        let a = 0;
        for (var i = 0; i < this.steps; i++) {
            this.cycle(i * this.step + this.begin);
            if (!this.isRunning())
                return;
        }
    }
}
exports.EngineGameImitation = EngineGameImitation;
//# sourceMappingURL=EngineGameImitation.js.map