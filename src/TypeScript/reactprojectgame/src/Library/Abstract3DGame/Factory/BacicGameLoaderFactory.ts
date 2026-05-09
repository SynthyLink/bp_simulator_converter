import { AbstractGameLoaderFactory } from "../../Game/Abstract/AbstractGameLoaderFactory"
import type { ILoader } from "../../Interfaces/ILoader"
import { Object3DLoader } from "./Object3DLoader"

export class BasicGameLoaderFactory extends AbstractGameLoaderFactory {

    constructor() {
        super()
        this.typeName = "BasicGameLoaderFactory"
        this.types.push("BasicGameLoaderFactory")
    }
    getLoader(object: any): ILoader {
        return new Object3DLoader()
    }

}