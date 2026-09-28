import type { IFuncT } from "../../Interfaces/IFuncT";
import type { IGameAction } from "./IGameAction";

export interface IGameActionConverter extends IFuncT<IGameAction | undefined, IGameAction>
{

}