"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyGameActionFactory = void 0;
const AbstractGameActionFactory_1 = require("../../Game/Abstract/AbstractGameActionFactory");
const EmptyGameAction_1 = require("./EmptyGameAction");
class EmptyGameActionFactory extends AbstractGameActionFactory_1.AbstractGameActionFactory {
    constructor() {
        super();
        this.action = new EmptyGameAction_1.EmptyGameAction();
        this.typeName = "EmptyGameActionFactory";
        this.types.push("EmptyGameActionFactory");
    }
    getGameAction(object) {
        return this.action;
    }
}
exports.EmptyGameActionFactory = EmptyGameActionFactory;
//# sourceMappingURL=EmptyGameActionFactory.js.map