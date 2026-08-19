import type { IAcceleration } from "./Interfaces/IAcceleration";
import type { IAngularAcceleration } from "./Interfaces/IAngularAcceleration";
import { Motion6DFrame } from "./Motion6DFrame";
import { ReferenceFrame } from "./ReferenceFrame";
export declare class Motion6DAcceleratedFrame extends Motion6DFrame implements IAcceleration, IAngularAcceleration {
    protected relativeAcceleration: number[];
    protected acceleration: number[];
    protected angularAcceleration: number[];
    protected temp: number[];
    protected tempV: number[];
    constructor();
    setReferenceFrame(baseFrame: ReferenceFrame, relative: ReferenceFrame): void;
    getAngularAcceleration(): number[];
    getLineraAcceleration(): number[];
    getRelativeAcceleration(): number[];
}
//# sourceMappingURL=Motion6DAcceleratedFrame.d.ts.map