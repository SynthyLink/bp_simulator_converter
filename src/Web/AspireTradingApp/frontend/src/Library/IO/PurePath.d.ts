import type { IPath } from "./Interfaces/IPath";
import type { IObject } from "../Interfaces/IObject";
export declare class PurePath implements IPath, IObject {
    pathCombine(path1: string, path2: string): string;
    getFileName(fileName: string): string;
    getFileExtension(fileName: string): string;
    getFileNameWithoutExtension(fileName: string): string;
    getDirectoryName(fileName: string): string;
    getName(): string;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    protected typeName: string;
    protected types: string[];
    protected name: string;
}
//# sourceMappingURL=PurePath.d.ts.map