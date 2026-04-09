import { ReferenceFrame } from "../ReferenceFrame";
import { IPosition } from "./IPosition";

export interface IReferenceFrame extends IPosition {

    getOwnFrame(): ReferenceFrame | undefined;
}