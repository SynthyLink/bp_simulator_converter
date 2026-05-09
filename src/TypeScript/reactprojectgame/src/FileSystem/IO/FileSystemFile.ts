import fs from 'fs';
import type { IFile } from "../../Library/IO/Interfaces/IFile";
import type { IObject } from '../../Library/Interfaces/IObject';

export class FileSystemFile implements IObject, IFile {

    existsFile(fileName: string): boolean {
        return fs.existsSync(fileName)
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

    protected typeName: string = "CategoryArrow";

    protected types: string[] = ["IObject", "IFile", "FileSystemFile"];

    protected name: string = "";

}
