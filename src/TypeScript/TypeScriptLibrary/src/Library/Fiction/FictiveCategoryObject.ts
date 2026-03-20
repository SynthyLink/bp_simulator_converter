import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { ICategoryObject } from "../Interfaces/ICategoryObject";
import { IDesktop } from "../Interfaces/IDesktop";

export class FictiveCategoryObject implements ICategoryObject {
    getObject(): Object {
        throw new OwnNotImplemented();
    }
    setObject(obj: Object): void {
        throw new OwnNotImplemented();
    }
    getCategoryObjectName(): string {
        throw new OwnNotImplemented();
    }
    getDesktop(): IDesktop {
        throw new OwnNotImplemented();
    }

}