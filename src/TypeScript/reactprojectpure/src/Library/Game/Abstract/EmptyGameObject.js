"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyGameObject = void 0;
const GamePerformer_1 = require("../GamePerformer");
class EmptyGameObject {
    constructor(name) {
        this.performer = new GamePerformer_1.GamePerformer();
        this.typeName = "EmptyGameObject";
        this.types = ["IObject", "EmptyGameObject"];
        this.name = "";
        this.name = name;
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
exports.EmptyGameObject = EmptyGameObject;
//# sourceMappingURL=EmptyGameObject.js.map