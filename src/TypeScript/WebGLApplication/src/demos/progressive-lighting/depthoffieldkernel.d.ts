import { KernelF32 } from 'webgl-operate';
export declare class DepthOfFieldKernel extends KernelF32 {
    /**
     * DepthOfFieldKernel is fixed to one-dimension (x-axis) and 2-components per sample.
     * @param width - Width of the kernel along its x-axis.
     */
    constructor(width: GLsizei);
    protected generate(): void;
    get width(): GLsizei;
    set width(width: GLsizei);
}
//# sourceMappingURL=depthoffieldkernel.d.ts.map