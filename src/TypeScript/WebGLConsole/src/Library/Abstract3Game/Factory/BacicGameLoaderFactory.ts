import { AbstractGameLoaderFactory } from "../../Game/Abstract/AbstractGameLoaderFactory"
import { ILoader } from "../../Interfaces/ILoader"
import { Object3DLoader } from "./Object3DLoader"

export class BacicGameLoaderFactory extends AbstractGameLoaderFactory {

    constructor() {
        super()
        this.typeName = "BacicGameLoaderFactory"
        this.types.push("BacicGameLoaderFactory")
    }
    getLoader(object: any): ILoader {
        return new Object3DLoader()
    }

}