import { IFuncT } from "../../Interfaces/IFuncT";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import { IFrameAction } from "./IFrameAction";

export interface IFrameActionFactoty extends IFuncT<IFrameAction, IReferenceFrame> {

}