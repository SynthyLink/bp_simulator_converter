import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { ICategoryArrow } from "../Interfaces/ICategoryArrow";
import type { ICategoryObject } from "../Interfaces/ICategoryObject";
import type { ICheck } from "../Interfaces/ICheck";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IObject } from "../Interfaces/IObject";

export class FictiveDesktop implements IDesktop {
    getCategoryObjects(): ICategoryObject[] {
        throw new OwnNotImplemented()
    }
    getCategoryArrows(): ICategoryArrow[] {
        throw new OwnNotImplemented()
    }
    addCategoryObject(obj: ICategoryObject): void {
        throw new OwnNotImplemented()
    }
    addCategoryArrow(arr: ICategoryArrow): void {
        throw new OwnNotImplemented()
    }
    addObject(obj: IObject): void {
        throw new OwnNotImplemented()
    }
    getObjectCollection(): IObject[] {
        throw new OwnNotImplemented()
    }
    getCheck(): ICheck {
        throw new OwnNotImplemented()
    }
    setCheck(check: ICheck): void {
        throw new OwnNotImplemented()
    }
    getCategoryObject(name: string): ICategoryObject {
        throw new OwnNotImplemented()
    }
    initializeTaksAsync(cancel: AbortController): Promise<void> {
        throw new OwnNotImplemented()
    }
    finish(): void {
        throw new OwnNotImplemented()
    }

}