import { ImageTexture } from "../ImageTexture";
import { IImageHolder } from "../Interfaces/IImageHolder";
import { SimpleMaterial } from "./SimpleMaterial";

export class DiffuseMaterial extends SimpleMaterial implements IImageHolder {
    getTextureImages(): ImageTexture[] {
        return this.images
    }

    getOpacity(): number {
        return this.opacity
    }

    setOpacity(p: number) {
        this.opacity = p
    }

    opacity: number = 0;

    images: ImageTexture[] = []
}