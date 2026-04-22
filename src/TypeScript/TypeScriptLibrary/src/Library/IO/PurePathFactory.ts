import { IPathFactory } from "./Interfaces/IPathFactory";
import { IObject } from "../Interfaces/IObject";
import { IPath } from "./Interfaces/IPath";
import { PurePath } from "./PurePath";

export class PurePathFactory implements IPathFactory, IObject {
    createPath(obj: any): IPath {
        return new PurePath();
    }


    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "PurePathFactory";

    protected types: string[] = ["IObject", "IPathFactory", "PurePathFactory"];

    protected name: string = "";

}