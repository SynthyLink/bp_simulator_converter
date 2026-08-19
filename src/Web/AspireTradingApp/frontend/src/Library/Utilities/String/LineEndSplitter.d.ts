import type { IObject } from "../../Interfaces/IObject";
import type { IStringSplitter } from "./Interfaces/IStringSplitter";
export declare class LineEndSplitter implements IObject, IStringSplitter {
    splitStrings(object: any, str: string): string[];
    getName(): string;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    protected typeName: string;
    protected types: string[];
    protected name: string;
    protected object: any;
}
//# sourceMappingURL=LineEndSplitter.d.ts.map