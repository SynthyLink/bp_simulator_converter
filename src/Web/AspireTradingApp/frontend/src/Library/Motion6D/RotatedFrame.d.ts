import type { IAngularVelocityMotion6D } from "./Interfaces/IAngularVelocityMotion6D";
import { ReferenceFrame } from "./ReferenceFrame";
export declare class RotatedFrame extends ReferenceFrame implements IAngularVelocityMotion6D {
    constructor();
    protected omega: number[];
    getOmega(): number[];
    setReferenceFrame(baseFrame: ReferenceFrame, relative: ReferenceFrame): void;
}
//# sourceMappingURL=RotatedFrame.d.ts.map