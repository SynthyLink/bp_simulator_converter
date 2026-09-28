import { mat4 } from "gl-matrix";
import Mesh from "../mesh";
import { Material } from "./Material";

// This will represent an object in 3D space
export interface Object3D {
    mesh: Mesh,
    material: Material,
    modelMatrix: mat4
};
