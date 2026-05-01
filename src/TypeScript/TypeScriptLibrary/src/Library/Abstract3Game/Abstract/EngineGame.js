"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineGame = void 0;
const ActionArrayT_1 = require("../../Utilities/Generic/ActionArrayT");
const AbstractGame_1 = require("./AbstractGame");
class EngineGame extends AbstractGame_1.AbstractGame {
    constructor(name, factory) {
        super(name, factory);
        this.engineAction = new ActionArrayT_1.ActionArrayT();
        this.engineIsRunning = false;
        this.types.push("IPlayEngine");
        this.types.push("EngineGame");
        this.typeName = "EngineGame";
    }
    startItself(start) {
        if (!super.startItself(start))
            return false;
        this.setEngineEnabled(start);
        return true;
    }
    isEngineEnabled() {
        return this.engineIsRunning;
    }
    setEngineEnabled(enabled) {
        if (enabled == this.engineIsRunning)
            return false;
        this.engineIsRunning = enabled;
        if (enabled)
            this.run();
        return true;
    }
    getEngineAction() {
        return this.engineAction;
    }
    cycle(time) {
        if (!this.isStarted)
            return;
        this.engineAction.actionT(time);
        this.externalAction.action();
        this.internalAction.action();
    }
}
exports.EngineGame = EngineGame;
//# sourceMappingURL=EngineGame.js.map