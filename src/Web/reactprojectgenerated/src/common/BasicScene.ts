import Camera from "./camera";
import FlyCameraController from "./camera-controllers/fly-camera-controller";
import { Scene } from "./game";
import Mesh from "./mesh";
import ShaderProgram from "./shader-program";

export abstract class BasicScene extends Scene {
    protected programs: { [name: string]: ShaderProgram } = {};
    protected camera: Camera;
    protected controller: FlyCameraController;
    protected meshes: { [name: string]: Mesh } = {};
    protected textures: { [name: string]: WebGLTexture } = {};
    protected samplers: { [name: string]: WebGLSampler } = {};

 
    protected time: number = 0;
    protected Score: number = 0;
    protected lifes: number = 15;

    Space_Displacement: number = -70;

}