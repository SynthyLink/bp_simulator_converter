import { ImageTexture } from "./ImageTexture";
import { MaterialTexture } from "./Materials/MaterialTexture";

export class EffectTexture {

    constructor(effects: Map<string, EffectTexture>, name: string, material: MaterialTexture, image: ImageTexture) {
        this.name = name
        this.material = material
        this.image = image
        if (!effects.has(name)) {
            effects.set(name, this)
        }
    }

    material !: MaterialTexture

    image !: ImageTexture

    name: string = ""

}