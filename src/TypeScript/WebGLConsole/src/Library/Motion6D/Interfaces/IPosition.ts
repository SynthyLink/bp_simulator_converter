import { IObject } from "../../Interfaces/IObject";
import { INodeT } from "../../NamedTree/Interfaces/INodeT";
import type { IReferenceFrame } from "./IReferenceFrame";

export interface IPosition extends INodeT<IPosition>, IObject {

    getPosition(): number[];

    getParentFrame(): IReferenceFrame | undefined;

    setParentFrame(parent: IReferenceFrame): void;

    getParameters(): any;

    setParameters(parameters: any): void


    updateReferenceFrame(): void;

}