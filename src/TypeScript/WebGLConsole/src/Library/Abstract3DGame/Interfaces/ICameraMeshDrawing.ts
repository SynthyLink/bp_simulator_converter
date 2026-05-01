import { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import { IFuncT } from "../../Interfaces/IFuncT";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";

export interface ICameraMeshDrawing extends IFuncT<IGameActionConverter, BasicCamera> {
}
