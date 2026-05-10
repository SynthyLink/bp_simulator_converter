import type { IFactory } from "../Interfaces/IFactory";
import { EmptyShowObject } from "./EmptyShowObject";

export class ConsoleShowObject extends EmptyShowObject {
    constructor(factory: IFactory) {
        super(factory)
    }

    show(object: any, str?: string | undefined): void {
        super.show(object, str)
        console.log(str)
        console.log(object)
    }

}