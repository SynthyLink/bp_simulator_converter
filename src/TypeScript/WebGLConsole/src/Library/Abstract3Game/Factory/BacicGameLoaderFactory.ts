import { ILoader } from "../../Interfaces/ILoader";
import { AbstractGameLoaderFactory } from "../Abstract/AbstractGameLoaderFactory";
import { Object3DLoader } from "./Object3DLoader";

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