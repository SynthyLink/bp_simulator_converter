import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { IFunc } from "../Interfaces/IFunc";

export class FictiveFunc<T> implements IFunc<T> {
    func(): T {
        throw new OwnNotImplemented();
    }

}