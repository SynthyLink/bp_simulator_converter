import { IObject } from "../../Interfaces/IObject";
import { IScene } from "./IScene";

export interface ISceneObject extends IObject {

    getScene(): IScene
}