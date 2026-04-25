import { IObject } from "../../Interfaces/IObject";
import { Performer } from "../../Performer";
import { IScene } from "../Interfaces/IScene";

export class SceneHolder implements IObject {

    protected performer: Performer = new Performer()
    constructor(scene: any) {
        this.performer = new Performer()
        this.scene = this.performer.convertObject<IScene, any>(scene, "IScene")[0]
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

    protected scene: IScene
}