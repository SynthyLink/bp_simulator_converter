import { IScene } from "../../Game/Interfaces/IScene";
import { IFuncT } from "../../Interfaces/IFuncT";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";

export interface IFindFrame extends IFuncT<IReferenceFrame, IScene> { }