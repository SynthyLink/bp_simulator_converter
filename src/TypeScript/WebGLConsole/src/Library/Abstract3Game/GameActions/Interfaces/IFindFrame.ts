import { IFuncT } from "../../../Interfaces/IFuncT";
import { IObject } from "../../../Interfaces/IObject";
import { IReferenceFrame } from "../../../Motion6D/Interfaces/IReferenceFrame";
import { IScene } from "../../Interfaces/IScene";

export interface IFindFrame extends IFuncT<IReferenceFrame, IScene> { }