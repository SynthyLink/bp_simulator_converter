import { BasicScene } from "../common/BasicScene";
import { Performer } from "../Library/Performer";
import { IObject } from "../Library/Interfaces/IObject";

export class SceneHolder implements IObject {

    protected performer : Performer = new Performer()
    constructor(scene: any) {
        this.performer = new Performer()
        this.scene = this.performer.convertObject<BasicScene, any>(scene, "BasicScene")[0]
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

    protected typeName: string = "SceneHolder";

    protected types: string[] = ["IObject", "SceneHolder"];

    protected name: string = ""

    protected  scene: BasicScene
}