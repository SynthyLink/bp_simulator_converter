import path from 'path/posix';
import { IPath } from "./Interfaces/IPath"

export class FilePath implements IPath
{
    getFileNameWithoutExtension(fileName: string): string {
        return path.parse(fileName).name
    }

    getDirectoryName(fileName: string): string {
        const fn = this.getFileName(fileName)
        return fileName.substring(0, fileName.length - fn.length - 1)
    }

    pathCombine(path1: string, path2: string): string {
        return path.join(path1, path2)
    }

    getFileName(path: string): string {
        var parts = path.split("/");
        if (parts.length == 1) {
            parts = path.split("\\")
        }
        const fileNameWithExtension = parts[parts.length - 1];

    //    const fileNameParts = fileNameWithExtension.split(".");

      //  const fileName = fileNameParts[0].slice(0, -1);

        return fileNameWithExtension;
    }
    getFileExtension(fileName: string): string {
        return path.extname(fileName)
    }
}