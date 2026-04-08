import { BasicPrimitive } from "./BasicPrimitive";
import { BasicScene } from "../BasicScene";
import { vec3, mat4 } from "gl-matrix";
import Mesh from "../mesh";

export class Object3DPrimitive extends BasicPrimitive {
    constructor(name: string, scene: BasicScene) {
        super(name, scene)
    }

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