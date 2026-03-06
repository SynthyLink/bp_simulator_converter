import { vec3 } from 'gl-matrix';
export declare class SphereLight {
    center: vec3;
    radius: number;
    luminance: vec3;
    constructor(center: vec3, radius: number, luminance: vec3);
}
export declare class DiskLight {
    center: vec3;
    radius: number;
    luminance: vec3;
    direction: vec3;
    fovy: number;
    constructor(center: vec3, radius: number, luminance: vec3, direction: vec3, fovy: number);
}
//# sourceMappingURL=arealight.d.ts.map