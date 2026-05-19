import { CategoryArrow } from "../../CategoryArrow";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IDesktop } from "../../Interfaces/IDesktop";
import type { INodeT } from "../../NamedTree/Interfaces/INodeT";
import type { IPosition } from "../Interfaces/IPosition";
import type { IReferenceFrame } from "../Interfaces/IReferenceFrame";
export declare class ReferenceFrameArrow extends CategoryArrow {
    constructor(desktop: IDesktop, name: string);
    getSource(): ICategoryObject;
    getTagret(): ICategoryObject;
    setSource(source: ICategoryObject): void;
    setTarget(target: ICategoryObject): void;
    position: IPosition;
    positionNode: INodeT<IPosition>;
    frame: IReferenceFrame;
}
//# sourceMappingURL=ReferenceFrameArrow.d.ts.map