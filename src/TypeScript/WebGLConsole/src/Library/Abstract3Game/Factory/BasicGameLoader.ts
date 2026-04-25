import type { ILoader } from "../../Interfaces/ILoader";
import type { IObject } from "../../Interfaces/IObject";
import type { IScene } from "../Interfaces/IScene";
import { Performer } from "../../Performer";

export class BasicGameLoader extends Performer implements ILoader
{
    scene !: IScene
    object !: IObject

    loadObject(parent: IObject, child: IObject): void {
        this.scene = this.convertObject<IScene, IObject>(parent, "IScene")[0]
        this.object = child
    }
}