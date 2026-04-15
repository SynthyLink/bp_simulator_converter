import { SimpleMaterial } from "./SimpleMaterial";

export class SpecularMaterial extends SimpleMaterial {


    getSpecularPower(): number {
        return this.specularPower
    }

    setSpecularPover(p: number) {
        this.specularPower = p
    }

    specularPower: number = 0;
}