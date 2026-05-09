import { EmptyObject } from "../../EmptyObject"
import type { IActionT } from "../../Interfaces/IActionT"

export abstract class AbstractActionT<T> extends EmptyObject implements IActionT<T> {
    constructor() {
        super("")
        this.typeName = "AbstractActionT"
        this.types.push("IActionT")
        this.types.push("AbstractActionT")
    }

    abstract actionT(t: T): void 

    isEmptyActionT(): boolean {
        return false
    }
}