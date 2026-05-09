import fs from 'fs';
import type { IResourceItem } from "../../Library/Resources/Infrefaces/IResourceItem";
import { FileResourceFunc } from "./FileResourceFunc";

export class FileResourceFuncText extends FileResourceFunc {
    functT(s: IResourceItem) {
        if (s.ext.includes("jpg")) return undefined
        let path = this.getFillPath(s.url)
        return fs.readFileSync(path, "utf-8").replaceAll("\r\n", "\n")
    }

    constructor(directory: string) {
        super(directory)
        this.types.push("FileResourceFuncText")
        this.typeName = "FileResourceFuncText";
   }

}

