import { BasicPrimitive } from "./BasicPrimitive";
import { BasicScene } from "../BasicScene";
import { vec3, mat4 } from "gl-matrix";
import Mesh from "../mesh";
import { Basic3DShape } from "../../Library/Motion6D/Objects/Shapes/Basic3DShape";
import { IStartPrimitive } from "../Interfaces/IStartPrimitive";
import * as MeshUtils from  "../../common/mesh-utils"
import * as TextureUtils from '../../common/texture-utils';

export class Object3DPrimitive extends BasicPrimitive implements IStartPrimitive {
    constructor(name: string, scene: BasicScene, shape: Basic3DShape) {
        super(name, scene)
        this.shape = shape
        this.typeName = "Object3DPrimitive"
        this.types.push("Object3DPrimitive")
        this.types.push("IStartPrimitive")
    }
    startPrimitive(): void {
        this.loadMesh()
    }

    loadMesh(): void {
        let map = this.shape.getSaveGrahicalData()
        for (let key of map.keys()) {
            let n = key.lastIndexOf(".obj")
            if (n > 0) {
                let obj = this.game.loader.resources[key];
                console.log(obj)
                this.mesh = MeshUtils.LoadOBJMesh(this.gl, obj)
            }
        }
    }

    shape !: Basic3DShape
    mesh: Mesh; // which mesh to draw
    texture: WebGLTexture; // which texture to attach
    tint: [number, number, number, number]; // the color tint of the object
    currentModelMatrix: mat4; // The model matrix of the object in the current frame
    previousModelMatrix: mat4; // The model matrix of the object in the previous frame

    //Move Controllers
    type: 'orthographic' | 'perspective' = 'perspective';

    position: vec3 = vec3.fromValues(0, 0, 0);
    direction: vec3 = vec3.fromValues(0, 0, 1);
    up: vec3 = vec3.fromValues(0, 1, 0);

    perspectiveFoVy: number = Math.PI / 2;
    orthographicHeight: number = 10;
    aspectRatio: number = 1;
    near: number = 0.01;
    far: number = 1000;
}