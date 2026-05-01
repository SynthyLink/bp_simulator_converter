import { IScene } from "../../Game/Interfaces/IScene";
import { IFuncT } from "../../Interfaces/IFuncT";
import { BasicCamera } from "../../Motion6D/Visible/BasicCamera";

export interface IFindCamera extends IFuncT<BasicCamera, IScene> { }