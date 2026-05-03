import { IPath } from "./IPath";

export interface IPathFactory {
    createPath(obj: any): IPath
}