import { ILoaderFactory } from "../Library/Interfaces/ILoaderFactory";
import { IObject } from "../Library/Interfaces/IObject";
import { ILoader } from "../Library/Interfaces/ILoader";
import { ScadaScene } from "./ScadaScene";
import { Performer } from "../Library/Performer";
import { Basic3DShape } from "../Library/Motion6D/Objects/Shapes/Basic3DShape";
import { Object3DPrimitive } from "./Primitives/Object3DPrimive";

export class GameLoaderFactory implements ILoaderFactory, IObject {

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "GameLoaderFactory";

    protected types: string[] = ["IObject", "ILoaderFactory", "GameLoaderFactory"];

    protected name: string = "";

    getLoader(object: any): ILoader {
        var scene = object as unknown as ScadaScene;
        return new GameLoader(scene)
    }

}
class GameLoader implements ILoader
{
    performer : Performer = new Performer()
    constructor(scene: ScadaScene) {
        this.scene = scene
    }
    getLoader(object: any): ILoader {
        return this;
    }
   
    loadObject(parent: IObject, child: IObject): void {
        var b = this.performer.convertObject<Basic3DShape, IObject>(child, "Basic3DShape")
        if (b.length > 0) {
            var name = b[0].getName();
            new Object3DPrimitive(name, this.scene, b[0])
            return
        }
    }

    scene: ScadaScene

}