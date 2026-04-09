import Camera from "./camera";
import FlyCameraController from "./camera-controllers/fly-camera-controller";
import Game, { Scene } from "./game";
import Mesh from "./mesh";
import ShaderProgram from "./shader-program";
import type { IObjectCollection } from "../Library/Interfaces/IObjectCollection";
import { IObject } from "../Library/Interfaces/IObject";

export abstract class BasicScene extends Scene implements IObjectCollection {
    protected programs: { [name: string]: ShaderProgram } = {};
    protected camera: Camera;
    protected controller: FlyCameraController;
    protected meshes: { [name: string]: Mesh } = {};
    protected textures: { [name: string]: WebGLTexture } = {};
    protected samplers: { [name: string]: WebGLSampler } = {};

    protected iobjects: IObject[] = []

 
    protected time: number = 0;
    protected Score: number = 0;
    protected lifes: number = 15;

    Space_Displacement: number = -70;

    public getGame(): Game {
        return this.game;
    }


    public addObjectToScene(object: IObject) {
        this.iobjects.push(object);
    }

    getObjectCollection(): IObject[] {
        return this.iobjects
    }



}