import type { IScene } from "../../Game/Interfaces/IScene";
import type { IFuncT } from "../../Interfaces/IFuncT";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera.1";

export interface IFindCamera extends IFuncT<BasicCamera, IScene> { }