import { IFactory } from "../../Interfaces/IFactory";
import type { IScene } from "../Interfaces/IScene";
import type { ISceneObject } from "../Interfaces/ISceneObject";

export class AbstractSceneObject implements ISceneObject {

    constructor(scene: IScene, name: string) {
        this.scene = scene
        scene.addChildT(this)
        this.name = name;
        
    }

    setConsumerFactory(factory: IFactory): void {
        this.factory = factory
    }

    getConsumerFactory(): IFactory {
        return this.factory
    }

    protected factory !: IFactory;
    protected scene !: IScene
    protected typeName: string = "AbstractSceneObject";

    protected types: string[] = ["IObject", "ISceneObject", "IFactoryConsumer", "AbstractSceneObject"];

    protected name: string = "";

    getScene(): IScene {
        return this.scene
    }

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        var b = this.types.includes(type)
        return b
    }
}