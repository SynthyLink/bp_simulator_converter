import { IAction } from "../../Interfaces/IAction";
import { IFuncT } from "../../Interfaces/IFuncT";
import { ISceneObject } from "./ISceneObject";

export interface IGameAction extends IFuncT<IAction | undefined, ISceneObject>
{

}