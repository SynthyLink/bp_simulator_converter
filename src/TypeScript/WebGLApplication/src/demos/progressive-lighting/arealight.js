"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskLight = exports.SphereLight = void 0;
const gl_matrix_1 = require("gl-matrix");
// tslint:disable:max-classes-per-file
class SphereLight {
    center;
    radius;
    luminance;
    constructor(center, radius, luminance) {
        this.center = center;
        this.radius = radius;
        this.luminance = luminance;
    }
}
exports.SphereLight = SphereLight;
class DiskLight {
    center;
    radius;
    luminance;
    direction;
    fovy;
    constructor(center, radius, luminance, direction, fovy) {
        this.center = center;
        this.radius = radius;
        this.luminance = luminance;
        this.direction = direction;
        this.fovy = fovy;
    }
}
exports.DiskLight = DiskLight;
//# sourceMappingURL=arealight.js.map