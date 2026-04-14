import { Color } from "../Color";
import { Material } from "./Material";

export class SimpleMaterial extends Material {

    constructor(color: Color) {
        super()
        this.color = color
    }
    color: Color = new Color([]);
}