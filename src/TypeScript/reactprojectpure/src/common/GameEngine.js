"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameEngine = void 0;
const game_1 = __importDefault(require("./game"));
const ActionArrayT_1 = require("../Library/Utilities/Generic/ActionArrayT");
class GameEngine extends game_1.default {
    actionGame(time) {
        this.curentAction.actionT(time);
    }
    constructor(canvas, options) {
        super(canvas, options);
        this.engineAction = new ActionArrayT_1.ActionArrayT();
        this.emptyAction = new ActionArrayT_1.ActionArrayT();
        this.curentAction = new ActionArrayT_1.ActionArrayT();
        this.currentTime = Math.min();
        this.isEnabled = false;
        this.engineAction.addActionT(this);
    }
    actionT(t) {
        this.currentTime = t;
    }
    isEngineEnabled() {
        return this.isEnabled;
    }
    setEngineEnabled(enabled) {
        if (enabled == this.isEnabled)
            return;
        this.isEnabled = enabled;
        this.curentAction = (enabled) ? this.engineAction : this.emptyAction;
    }
    getPlayEngineTime() {
        return this.currentTime;
    }
    getEngineAction() {
        return this.engineAction;
    }
}
exports.GameEngine = GameEngine;
//# sourceMappingURL=GameEngine.js.map