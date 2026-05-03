import { BasicPrimitive } from "./BasicPrimitive";
import { BasicScene } from "../BasicScene";
import { vec3, mat4 } from "gl-matrix";
import Mesh from "../mesh";
import { Basic3DShape } from "../../Library/Motion6D/Objects/Shapes/Basic3DShape";
import { IStartPrimitive } from "../Interfaces/IStartPrimitive";
import { IMesh } from "../../Library/Abstract3DConverters/Interfaces/IMesh";
import { Obj3DCreator } from "../../Library/Abstract3DConverters/MeshCreators/Obj3DCreator";
import { ScadaScene } from "../ScadaScene";

export class Object3DPrimitive extends BasicPrimitive implements IStartPrimitive {
    constructor(name: string, scene: ScadaScene, shape: Basic3DShape) {
        super(name, scene)
        this.shape = shape
        this.typeName = "Object3DPrimitive"
        this.types.push("Object3DPrimitive")
        this.types.push("IStartPrimitive")
    }

    startPrimitive(start: boolean): void {
        if (this.isRunning == start) return
        this.isRunning = start;
        if (start) {
            this.loadMesh()

        }
    }

    loadMesh(): void {
        console.log("LOADM")
        let map = this.shape.getSaveGrahicalData()
        for (let key of map.keys()) {
            let obj = this.game.loader.resources[key];
            let n = key.lastIndexOf(".obj")
            if (n > 0) {
                //this.mesh = MeshUtils.LoadOBJMesh(this.gl, obj)
                //var spt = obj as string
                // var spp = spt.split("\n");
                console.log("MMMMMMSSSS")
                console.log(this.factory)
                var creator = new Obj3DCreator(key, "", this.scene, this.factory);
                this.meshes = creator.getMeshCreatorMeshes()
                console.log(this.meshes.length)
                console.log("MMMMMM")
            }

        }
    }

    shape !: Basic3DShape
    mesh !: Mesh; // which mesh to draw
    texture !: WebGLTexture; // which texture to attach
    tint !: [number, number, number, number]; // the color tint of the object
    currentModelMatrix: mat4; // The model matrix of the object in the current frame
    previousModelMatrix: mat4; // The model matrix of the object in the previous frame

    meshes : IMesh[] = []
    //Move Controllers
    type: 'orthographic' | 'perspective' = 'perspective';
    protected textures: { [name: string]: WebGLTexture } = {};

    position: vec3 = vec3.fromValues(0, 0, 0);
    direction: vec3 = vec3.fromValues(0, 0, 1);
    up: vec3 = vec3.fromValues(0, 1, 0);

    perspectiveFoVy: number = Math.PI / 2;
    orthographicHeight: number = 10;
    aspectRatio: number = 1;
    near: number = 0.01;
    far: number = 1000;
}