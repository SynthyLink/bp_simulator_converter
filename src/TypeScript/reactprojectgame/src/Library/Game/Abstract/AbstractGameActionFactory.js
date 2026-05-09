"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractGameActionFactory = void 0;
class AbstractGameActionFactory {
    constructor() {
        this.typeName = "AbstractGameActionFactory";
        this.types = ["IObject", "IGameActionFactory", "AbstractGameActionFactory"];
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
exports.AbstractGameActionFactory = AbstractGameActionFactory;
//# sourceMappingURL=AbstractGameActionFactory.js.map