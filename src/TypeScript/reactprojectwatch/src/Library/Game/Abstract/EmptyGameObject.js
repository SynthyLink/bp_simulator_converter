"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyGameObject = void 0;
const GamePerformer_1 = require("../GamePerformer");
class EmptyGameObject {
    constructor(name, factory) {
        this.performer = new GamePerformer_1.GamePerformer();
        this.typeName = "EmptyGameObject";
        this.types = ["IObject", "EmptyGameObject", "IFactoryConsumer"];
        this.name = "";
        this.name = name;
        if (factory != undefined)
            this.factory = factory;
    }
    setConsumerFactory(factory) {
        this.factory = factory;
    }
    getConsumerFactory() {
        return this.factory;
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