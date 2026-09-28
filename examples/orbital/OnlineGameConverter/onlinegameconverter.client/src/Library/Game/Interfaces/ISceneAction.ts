import type { IFuncT } from "../../Interfaces/IFuncT";
import type { IGameAction } from "./IGameAction";
import type { IScene } from "./IScene";

export interface ISceneAction extends IFuncT<IGameAction | undefined, IScene> {
}