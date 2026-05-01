import { IAction } from "../../Interfaces/IAction";
import { IFuncT } from "../../Interfaces/IFuncT";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";

export interface IFrameAction extends IFuncT<IAction, IReferenceFrame> {

}