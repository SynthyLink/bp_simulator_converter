import type { IFactory } from "../Interfaces/IFactory";
import { EmptyShowObject } from "./EmptyShowObject";

export class ConsoleShowObject extends EmptyShowObject {
    constructor(factory: IFactory) {
        super(factory)
        this.types.push("ConsoleShowObject")
        this.typeName = "ConsoleShowObject"
    }

    show(object: any, str?: string | undefined): void {
        super.show(object, str)
        console.log("STR ", str)
        console.log("OBJ ", object)
    }

}