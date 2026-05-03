import { IAction } from "../../Interfaces/IAction";
import { IObject } from "../../Interfaces/IObject";
import { ISceneObject } from "./ISceneObject";

export interface ISceneObjectAction extends IAction {
    getActionSceneObject(): ISceneObject
    getActionSceneAdditionalObject(): IObject | undefined
}