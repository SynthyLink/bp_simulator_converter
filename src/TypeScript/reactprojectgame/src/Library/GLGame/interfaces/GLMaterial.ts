import type { vec3 } from "gl-matrix"

export interface GLMaterial {
    albedo: WebGLTexture,    //ambient + diffuse
    albedo_tint: vec3,
    specular: WebGLTexture,  //shiness
    specular_tint: vec3
    roughness: WebGLTexture,
    roughness_scale: number,
    ambient_occlusion: WebGLTexture,
    emissive: WebGLTexture,
    emissive_tint: vec3
};