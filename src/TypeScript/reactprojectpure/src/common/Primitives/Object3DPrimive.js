"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object3DPrimitive = void 0;
const BasicPrimitive_1 = require("./BasicPrimitive");
const gl_matrix_1 = require("gl-matrix");
const Obj3DCreator_1 = require("../../Library/Abstract3DConverters/MeshCreators/Obj3DCreator");
class Object3DPrimitive extends BasicPrimitive_1.BasicPrimitive {
    constructor(name, scene, shape) {
        super(name, scene);
        this.meshes = [];
        //Move Controllers
        this.type = 'perspective';
        this.textures = {};
        this.position = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this.direction = gl_matrix_1.vec3.fromValues(0, 0, 1);
        this.up = gl_matrix_1.vec3.fromValues(0, 1, 0);
        this.perspectiveFoVy = Math.PI / 2;
        this.orthographicHeight = 10;
        this.aspectRatio = 1;
        this.near = 0.01;
        this.far = 1000;
        this.shape = shape;
        this.typeName = "Object3DPrimitive";
        this.types.push("Object3DPrimitive");
        this.types.push("IStartPrimitive");
        console.log(this);
    }
    startPrimitive() {
        this.loadMesh();
    }
    loadMesh() {
        console.log("LOADM");
        let map = this.shape.getSaveGrahicalData();
        for (let key of map.keys()) {
            let obj = this.game.loader.resources[key];
            let n = key.lastIndexOf(".obj");
            if (n > 0) {
                //this.mesh = MeshUtils.LoadOBJMesh(this.gl, obj)
                //var spt = obj as string
                // var spp = spt.split("\n");
                console.log("MMMMMMSSSS");
                console.log(this.factory);
                var creator = new Obj3DCreator_1.Obj3DCreator(key, "", this.scene, this.factory);
                this.meshes = creator.getMeshCreatorMeshes();
                console.log(this.meshes.length);
                console.log("MMMMMM");
            }
        }
    }
}
exports.Object3DPrimitive = Object3DPrimitive;
//# sourceMappingURL=Object3DPrimive.js.map