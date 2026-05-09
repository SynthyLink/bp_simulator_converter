import { AbstractActionT } from "./AbstractActionT"

export class EmptyActionT<T> extends AbstractActionT<T> {
    constructor() {
        super()
        this.typeName = "EmptyActionT"
        this.types.push("EmptyActionT")
    }

    actionT(t : T): void {
    }

    isEmptyActionT(): boolean {
        return true
    }
}