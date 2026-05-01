"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSceneObject = void 0;
class AbstractSceneObject {
    constructor(scene, name) {
        this.typeName = "AbstractSceneObject";
        this.types = ["IObject", "ISceneObject", "AbstractSceneObject"];
        this.name = "";
        this.scene = scene;
        scene.addChildT(this);
        this.name = name;
    }
    getScene() {
        return this.scene;
    }
    getClassName() {
        throw new Error("Method not implemented.");
    }
    imlplementsType(type) {
        throw new Error("Method not implemented.");
    }
    getName() {
        throw new Error("Method not implemented.");
    }
}
exports.AbstractSceneObject = AbstractSceneObject;
//# sourceMappingURL=AbstractSceneObject.js.map