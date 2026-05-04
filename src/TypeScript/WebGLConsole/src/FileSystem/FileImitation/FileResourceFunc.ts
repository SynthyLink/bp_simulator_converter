import { EmptyObject } from "../../Library/EmptyObject";
import { IPath } from "../../Library/IO/Interfaces/IPath";
import { PurePath } from "../../Library/IO/PurePath";
import { IResourceFunc } from "../../Library/Resources/Infrefaces/IResourceFunc";
import { IResourceItem } from "../../Library/Resources/Infrefaces/IResourceItem";

export abstract class FileResourceFunc extends EmptyObject implements IResourceFunc {
    constructor(directory: string) {
        super("")
        this.types.push("FlileResourceFunc")
        this.typeName = "FlileResourceFunc";
        this.directory = directory
    }

    abstract functT(s: IResourceItem) : any

    protected directory: string = "";

    protected getFillPath(path: string): string {
        return this.path.pathCombine(this.directory, path)

    }

    protected path: IPath = new PurePath();
}