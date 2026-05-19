import { Performer } from "./Performer";
import type { ICategoryArrow } from "./Interfaces/ICategoryArrow";
import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { ICheck } from "./Interfaces/ICheck";
import type { IDesktop } from "./Interfaces/IDesktop";
import type { IObject } from "./Interfaces/IObject";
export declare class Desktop implements IDesktop, IObject {
    getClassName(): string;
    imlplementsType(type: string): boolean;
    protected typeName: string;
    protected types: string[];
    protected categoryObjects: ICategoryObject[];
    protected categoryArrows: ICategoryArrow[];
    protected objects: IObject[];
    protected name: string;
    protected arrow: ICategoryArrow;
    protected source: ICategoryObject;
    protected target: ICategoryObject;
    protected check: ICheck;
    protected mapObjects: Map<string, ICategoryObject>;
    protected performer: Performer;
    initializeTaksAsync(cancel: AbortController): Promise<void>;
    loadAsync(cancel: AbortController): Promise<void>;
    finish(): void;
    getObjectCollection(): IObject[];
    addObject(obj: IObject): void;
    getObjects(): IObject[];
    setCheck(check: ICheck): void;
    getCheck(): ICheck;
    getCategoryObject(name: string): ICategoryObject;
    getCategoryObjects(): ICategoryObject[];
    getCategoryArrows(): ICategoryArrow[];
    addCategoryObject(obj: ICategoryObject): void;
    addCategoryArrow(arr: ICategoryArrow): void;
    getName(): string;
}
//# sourceMappingURL=Desktop.d.ts.map