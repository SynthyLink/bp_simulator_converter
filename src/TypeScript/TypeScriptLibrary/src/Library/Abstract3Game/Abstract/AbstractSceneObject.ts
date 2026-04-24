import type { IScene } from "../Interfaces/IScene";
import type { ISceneObject } from "../Interfaces/ISceneObject";

export class AbstractSceneObject implements ISceneObject {

    constructor(scene: IScene, name: string) {
        this.scene = scene
        scene.addChildT(this)
        this.name = name;
        
    }

    protected scene !: IScene
    protected typeName: string = "AbstractSceneObject";

    protected types: string[] = ["IObject", "ISceneObject", "AbstractSceneObject"];

    protected name: string = "";

    getScene(): IScene {
        return this.scene
    }
    getClassName(): string {
        throw new Error("Method not implemented.");
    }
    imlplementsType(type: string): boolean {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }

}