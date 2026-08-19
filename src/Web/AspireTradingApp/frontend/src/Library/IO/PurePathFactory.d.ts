import type { IPathFactory } from "./Interfaces/IPathFactory";
import type { IObject } from "../Interfaces/IObject";
import type { IPath } from "./Interfaces/IPath";
export declare class PurePathFactory implements IPathFactory, IObject {
    createPath(obj: any): IPath;
    getName(): string;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    protected typeName: string;
    protected types: string[];
    protected name: string;
    protected any: any;
}
//# sourceMappingURL=PurePathFactory.d.ts.map