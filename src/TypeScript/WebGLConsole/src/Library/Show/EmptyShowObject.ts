import { FactoryObject } from "../FactorytObject";
import type { IFactory } from "../Interfaces/IFactory";
import type { IShowObject } from "../Interfaces/IShowObject";

export class EmptyShowObject extends FactoryObject implements IShowObject {
    constructor(factory: IFactory) {
        super("", factory)
        console.log("EmptyShowObject ", this)
        this.types.push("IShowObject")
        this.types.push("EmptyShowObject")
        this.typeName = "EmptyShowObject"
        console.log("EmptyShowObject 1 ", this)
       
    }

    show(object: any, str?: string | undefined): void {
        this.object = object
        this.str = str
    }


    protected object: any

    protected str: string | undefined = undefined
}