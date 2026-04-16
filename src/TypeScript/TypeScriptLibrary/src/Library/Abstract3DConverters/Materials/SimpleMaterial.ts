import { ColorTexture } from "../ColorTexture";
import { Material } from "./Material";

export class SimpleMaterial extends Material {

    constructor(color: ColorTexture) {
        super()
        this.color = color
    }
    color: ColorTexture = new ColorTexture([]);
}