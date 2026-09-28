"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object3DPrimitive = void 0;
const BasicPrimitive_1 = require("./BasicPrimitive");
const gl_matrix_1 = require("gl-matrix");
const MeshUtils = __importStar(require("../../common/mesh-utils"));
const TextureUtils = __importStar(require("../../common/texture-utils"));
class Object3DPrimitive extends BasicPrimitive_1.BasicPrimitive {
    constructor(name, scene, shape) {
        super(name, scene);
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
    }
    startPrimitive() {
        this.loadMesh();
    }
    loadMesh() {
        let map = this.shape.getSaveGrahicalData();
        for (let key of map.keys()) {
            let obj = this.game.loader.resources[key];
            let n = key.lastIndexOf(".obj");
            if (n > 0) {
                console.log(obj);
                this.mesh = MeshUtils.LoadOBJMesh(this.gl, obj);
                var spt = obj;
                var spp = spt.split("\n");
                for (let i = 0; i < spp.length; i++) {
                    console.log(i);
                    console.log(spp[i]);
                }
                console.log(this.mesh);
                continue;
            }
            console.log(obj);
            n = key.lastIndexOf(".mtl");
            if (n >= 0) {
                continue;
            }
            let txt = TextureUtils.LoadImage(this.gl, obj);
            this.textures[key] = txt;
            console.log(txt);
        }
    }
}
exports.Object3DPrimitive = Object3DPrimitive;
//# sourceMappingURL=Object3DPrimive.js.map