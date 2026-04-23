"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicPrimitive = void 0;
const Performer_1 = require("../../Library/Performer");
class BasicPrimitive {
    constructor(name, scene) {
        this.name = "";
        this.typeName = "BasicPrimitive";
        this.types = ["IObject", "IFactoryConsumer", "BasicPrimitive"];
        this.performer = new Performer_1.Performer();
        this.name = name;
        this.scene = scene;
        scene.addObjectToScene(this);
        this.game = scene.getGame();
        this.gl = scene.getGl();
    }
    setConsumerFactory(factory) {
        this.factory = factory;
    }
    getConsumerFactory() {
        return this.factory;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
    getName() {
        return this.name;
    }
}
exports.BasicPrimitive = BasicPrimitive;
//# sourceMappingURL=BasicPrimitive.js.map