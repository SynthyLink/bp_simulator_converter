import Camera from "./camera";
import FlyCameraController from "./camera-controllers/fly-camera-controller";
import Game, { Scene } from "./game";
import Mesh from "./mesh";
import ShaderProgram from "./shader-program";
import type { IObjectCollection } from "../Library/Interfaces/IObjectCollection";
import { IObject } from "../Library/Interfaces/IObject";
import { IFactory } from "../Library/Interfaces/IFactory";
import { ILoader } from "../Library/Interfaces/ILoader";
import { ILoaderFactory } from "../Library/Interfaces/ILoaderFactory";
import { IResourceCollection } from "../Library/Interfaces/IResouceCollection";

export abstract class BasicScene extends Scene implements IObject, IObjectCollection, IResourceCollection {
    protected programs: { [name: string]: ShaderProgram } = {};
    protected camera !: Camera;
    protected controller !: FlyCameraController;
    protected meshes: { [name: string]: Mesh } = {};
    protected textures: { [name: string]: WebGLTexture } = {};
    protected samplers: { [name: string]: WebGLSampler } = {};

    protected iobjects: IObject[] = []

 
    protected time: number = 0;
    protected Score: number = 0;
    protected lifes: number = 15;


    Space_Displacement: number = -70;

    public constructor(game: Game, factory: IFactory) {
        super(game)
        this.factory = factory
        let l = factory.getFactory<ILoaderFactory>("ILoaderFactory")
        if (l != undefined) {
            this.loader = l.getLoader(this)
        }
    }
    addResource(url: string): void {
        if (!this.resourceFiles.includes(url)) this.resourceFiles.push(url)
    }
    getResources(): string[] {
        return this.resourceFiles;
    }

    public getDirectoryFiles(dir: string): string[] {
        let l: string[] = [];
        for (let d of this.resourceFiles) {
            if (d.startsWith(dir)) l.push(d)
        }
        l.sort()
        return l
    }

    public fileExists(fileName: string): boolean {
        return this.resourceFiles.includes(fileName)
    }

    public getFactory(): IFactory {
        return this.factory
    }

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "BasicScene";

    protected types: string[] = ["IObject", "IObjectCollection", "BasicScene"];

    protected name: string = "";

    public getGame(): Game {
        return this.game;
    }


    public addObjectToScene(object: IObject) {
        this.iobjects.push(object);
    }

    getObjectCollection(): IObject[] {
        return this.iobjects
    }

    public getResourceText(url: string): string {
        return this.game.loader.resources[url];

    }

    protected factory !: IFactory

    protected loader !: ILoader

    protected resourceFiles: string[] =[]
}