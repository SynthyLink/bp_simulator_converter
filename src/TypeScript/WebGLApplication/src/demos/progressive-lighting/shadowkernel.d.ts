import { KernelF32 } from 'webgl-operate';
import { DiskLight } from './arealight';
export declare class ShadowKernel extends KernelF32 {
    protected _diskLight: DiskLight;
    constructor(width: number, diskLight: DiskLight);
    protected generate(): void;
    get width(): GLsizei;
    set width(width: GLsizei);
}
//# sourceMappingURL=shadowkernel.d.ts.map