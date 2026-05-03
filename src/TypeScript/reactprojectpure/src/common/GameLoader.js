"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLoaderFactory = void 0;
const Performer_1 = require("../Library/Performer");
const Object3DPrimive_1 = require("./Primitives/Object3DPrimive");
class GameLoaderFactory {
    constructor() {
        this.typeName = "GameLoaderFactory";
        this.types = ["IObject", "ILoaderFactory", "GameLoaderFactory"];
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
    getLoader(object) {
        var scene = object;
        return new GameLoader(scene);
    }
}
exports.GameLoaderFactory = GameLoaderFactory;
class GameLoader {
    constructor(scene) {
        this.performer = new Performer_1.Performer();
        this.scene = scene;
    }
    getLoader(object) {
        return this;
    }
    loadObject(parent, child) {
        var b = this.performer.convertObject(child, "Basic3DShape");
        if (b.length > 0) {
            var name = b[0].getName();
            new Object3DPrimive_1.Object3DPrimitive(name, this.scene, b[0]);
            return;
        }
    }
}
//# sourceMappingURL=GameLoader.js.map