"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowKernel = void 0;
const webgl_operate_1 = require("webgl-operate");
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_2 = require("webgl-operate");
const arealight_1 = require("./arealight");
/* spellchecker: enable */
class ShadowKernel extends webgl_operate_2.KernelF32 {
    _diskLight;
    constructor(width, diskLight) {
        super(3, width);
        this._diskLight = diskLight;
        this.generate();
    }
    generate() {
        webgl_operate_1.auxiliaries.assert(this.width > 0, `expected every kernel to comprise at least one element`);
        const center = this._diskLight.center;
        this.set([center[0], center[1], center[2]], 0);
        for (let i = 1; i < this.width; ++i) {
            const offset = gl_matrix_1.vec3.random(gl_matrix_1.vec3.create(), this._diskLight.radius);
            const eye = gl_matrix_1.vec3.add(gl_matrix_1.vec3.create(), center, offset);
            this.set([eye[0], eye[1], eye[2]], i);
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
exports.ShadowKernel = ShadowKernel;
//# sourceMappingURL=shadowkernel.js.map