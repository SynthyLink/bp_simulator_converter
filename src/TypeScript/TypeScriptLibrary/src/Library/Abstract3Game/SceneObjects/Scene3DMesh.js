"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene3DMesh = void 0;
const AssociatedSceneObject_1 = require("../Abstract/AssociatedSceneObject");
class Scene3DMesh extends AssociatedSceneObject_1.AssociatedSceneObject {
    constructor(scene, object) {
        super(scene, object);
        this.meshes = [];
        this.types.push("IMeshHolder");
        this.types.push("IURLResourceHolder");
        this.types.push("Scene3DMesh");
        this.typeName = "Scene3DMesh";
    }
    getURLResources() {
        return this.shape.getURLResources();
    }
    addURLRource(name, url, type) {
    }
    getHolderMeshes() {
        return this.meshes;
    }
}
exports.Scene3DMesh = Scene3DMesh;
//# sourceMappingURL=Scene3DMesh.js.map