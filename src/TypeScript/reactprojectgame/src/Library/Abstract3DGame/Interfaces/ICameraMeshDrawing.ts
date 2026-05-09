import type { IGameActionConverter } from "../../Game/Interfaces/IGameActionConverter";
import type { IFuncT } from "../../Interfaces/IFuncT";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera.1";

export interface ICameraMeshDrawing extends IFuncT<IGameActionConverter, BasicCamera> {
}
