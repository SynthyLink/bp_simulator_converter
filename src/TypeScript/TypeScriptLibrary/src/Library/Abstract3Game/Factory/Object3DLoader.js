"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object3DLoader = void 0;
const Scene3DMesh_1 = require("../SceneObjects/Scene3DMesh");
const BasicGameLoader_1 = require("./BasicGameLoader");
class Object3DLoader extends BasicGameLoader_1.BasicGameLoader {
    loadObject(parent, child) {
        super.loadObject(parent, child);
        var className = child.getClassName();
        switch (className) {
            case "Basic3DShape":
                var b = child;
                new Scene3DMesh_1.Scene3DMesh(this.scene, b);
        }
    }
}
exports.Object3DLoader = Object3DLoader;
//# sourceMappingURL=Object3DLoader.js.map