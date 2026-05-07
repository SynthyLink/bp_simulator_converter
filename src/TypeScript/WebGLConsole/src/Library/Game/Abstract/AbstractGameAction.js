"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGameAction = void 0;
class AbstractGameAction {
    constructor() {
        this.typeName = "AbstractGameAction";
        this.types = ["IObject", "IGameAction", "AbstractGameAction"];
        this.name = "";
    }
    getName() {
        return this.name;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
}
exports.AbstractGameAction = AbstractGameAction;
//# sourceMappingURL=AbstractGameAction.js.map