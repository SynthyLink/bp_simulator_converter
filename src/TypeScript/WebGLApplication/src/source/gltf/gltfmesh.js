"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLTFMesh = void 0;
const gltfprimitive_1 = require("./gltfprimitive");
/**
 * This class represents a mesh as specifed by glTF.
 * It is primarily a container for primitives, which are represented by GLTFPrimitive.
 * See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshes
 */
class GLTFMesh {
    _name;
    _primitives;
    constructor(name) {
        this._name = name;
        this._primitives = new Array();
    }
    get primitives() {
        return this._primitives;
    }
    addPrimitive(primitive) {
        this._primitives.push(primitive);
    }
}
exports.GLTFMesh = GLTFMesh;
//# sourceMappingURL=gltfmesh.js.map