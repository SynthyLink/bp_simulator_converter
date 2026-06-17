import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { ICategoryObject } from "../Interfaces/ICategoryObject";
import type { IDesktop } from "../Interfaces/IDesktop";

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
