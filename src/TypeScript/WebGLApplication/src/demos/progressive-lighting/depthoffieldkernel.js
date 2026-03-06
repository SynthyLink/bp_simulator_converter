"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepthOfFieldKernel = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
/* spellchecker: enable */
class DepthOfFieldKernel extends webgl_operate_2.KernelF32 {
    /**
     * DepthOfFieldKernel is fixed to one-dimension (x-axis) and 2-components per sample.
     * @param width - Width of the kernel along its x-axis.
     */
    constructor(width) {
        super(2, width);
        this.generate();
    }
    generate() {
        webgl_operate_1.auxiliaries.assert(this.width > 0, `expected every kernel to comprise at least one element`);
        this.set([0.0, 0.0], 0);
        for (let i = 1; i < this.width; ++i) {
            this.set([webgl_operate_1.auxiliaries.rand(-1.0, +1.0), webgl_operate_1.auxiliaries.rand(-1.0, +1.0)], i);
        }
        this.sort(webgl_operate_2.AbstractKernel.SortApproach.BySquaredLength);
    }
    get width() {
        return this._width;
    }
    set width(width) {
        if (this._width === width) {
            return;
        }
        this._width = width;
        this.resize();
        this.generate();
    }
}
exports.DepthOfFieldKernel = DepthOfFieldKernel;
//# sourceMappingURL=depthoffieldkernel.js.map