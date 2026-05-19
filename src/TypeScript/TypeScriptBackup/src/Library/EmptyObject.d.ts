import type { IObject } from "./Interfaces/IObject";
import { Performer } from "./Performer";
export declare class EmptyObject implements IObject {
    protected performer: Performer;
    constructor(name: string);
    getName(): string;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    protected typeName: string;
    protected types: string[];
    protected name: string;
}
//# sourceMappingURL=EmptyObject.d.ts.map