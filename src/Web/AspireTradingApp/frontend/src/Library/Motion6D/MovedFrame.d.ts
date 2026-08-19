import type { IVelocity } from "./Interfaces/IVelocity";
import { ReferenceFrame } from "./ReferenceFrame";
export declare class MovedFrame extends ReferenceFrame implements IVelocity {
    getVelocity(): number[];
    protected velocity: number[];
}
//# sourceMappingURL=MovedFrame.d.ts.map