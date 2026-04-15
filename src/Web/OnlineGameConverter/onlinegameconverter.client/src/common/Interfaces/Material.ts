import { vec3 } from "gl-matrix";
// This will store the material properties
// To be more consistent with modern workflows, we use what is called albedo to define the diffuse and ambient
// And since specular power (shininess) is in the range 0 to infinity and the more popular roughness paramater is in the range 0 to 1, we read the roughness from the image and convert it to shininess (specular power)
// We also add an emissive properties in case the object itself emits light
// Finally, while the ambient is naturally the same a the diffuse, some areas recieve less ambient than other (e.g. folds), so we use the ambient occlusion texture to darken the ambient in these areas
// We also add tints and scales to control the properties without using multiple textures
export interface Material {
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
