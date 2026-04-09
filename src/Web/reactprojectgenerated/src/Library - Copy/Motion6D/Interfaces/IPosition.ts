import { INodeT } from "../../NamedTree/Interfaces/INodeT";
import type { IReferenceFrame } from "./IReferenceFrame";

export interface IPosition extends INodeT<IPosition> {

    getPosition(): number[];

    getParentFrame(): IReferenceFrame | undefined;

    setParentFrame(parent: IReferenceFrame): void;


    getParameters(): any;

    setParameters(parameters: any): void


    updateReferenceFrame(): void;

}