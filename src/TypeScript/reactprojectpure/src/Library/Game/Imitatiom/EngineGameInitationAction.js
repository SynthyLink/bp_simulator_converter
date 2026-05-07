"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineGameImitationAction = void 0;
const EngineGameImitation_1 = require("./EngineGameImitation");
class EngineGameImitationAction extends EngineGameImitation_1.EngineGameImitation {
    constructor(name, factory) {
        super(name, factory);
        this.types.push("IGameActionConverter");
        this.types.push("EngineGameImitationAction");
        this.typeName = "EngineGameImitationAction";
        factory.addFactory(this, "IGameActionConverter");
    }
    functT(s) {
        return s;
    }
}
exports.EngineGameImitationAction = EngineGameImitationAction;
//# sourceMappingURL=EngineGameInitationAction.js.map