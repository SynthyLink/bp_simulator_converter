import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { ICheck } from "./Interfaces/ICheck";
import type { IDesktop } from "./Interfaces/IDesktop";
import type { IObject } from "./Interfaces/IObject";
import { Performer } from "./Performer";
export declare class CategoryObject implements ICategoryObject, IObject {
    protected desktop: IDesktop;
    protected obj: Object;
    protected name: string;
    protected checker: ICheck;
    protected variable: any;
    protected types: string[];
    protected typeName: string;
    protected performer: Performer;
    protected fic: any;
    constructor(desktop: IDesktop, name: string);
    getName(): string;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    protected convert<T>(a: any): T;
    getDesktop(): IDesktop;
    getObject(): Object;
    setObject(obj: Object): void;
    getCategoryObjectName(): string;
    protected check(x: any): boolean;
    protected getObjectT<T, S>(s: S, type: string): T[];
}
//# sourceMappingURL=CategoryObject.d.ts.map