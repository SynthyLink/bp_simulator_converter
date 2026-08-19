import type { IVelocity } from "./Interfaces/IVelocity";
import { ReferenceFrame } from "./ReferenceFrame";
import { RotatedFrame } from "./RotatedFrame";
export declare class Motion6DFrame extends RotatedFrame implements IVelocity {
    protected velocity: number[];
    protected hv: number[];
    protected der: number[];
    protected qd: number[];
    constructor();
    getVelocity(): number[];
    setReferenceFrame(baseFrame: ReferenceFrame, relative: ReferenceFrame): void;
}
//# sourceMappingURL=Motion6DFrame.d.ts.map