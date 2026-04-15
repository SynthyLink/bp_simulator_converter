import { vec3 } from "gl-matrix";

export interface SpotLight {
    type: 'spot',
    enabled: boolean,
    color: vec3,
    position: vec3,
    direction: vec3,
    attenuation_quadratic: number,
    attenuation_linear: number,
    attenuation_constant: number,
    inner_cone: number,
    outer_cone: number
};
