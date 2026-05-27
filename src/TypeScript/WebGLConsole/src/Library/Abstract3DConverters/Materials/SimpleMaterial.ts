import { ColorTexture } from "../ColorTexture";
import { ImageTexture } from "../ImageTexture";
import { MaterialTexture } from "./MaterialTexture";

export class SimpleMaterial extends MaterialTexture {

    constructor(name : string, color: ColorTexture) {
        super(name)
        this.color = color
        this.types.push("SimpleMaterial")
        this.typeName = "SimpleMaterial"
    }
    protected color: ColorTexture = new ColorTexture([])

    protected image !: ImageTexture


}