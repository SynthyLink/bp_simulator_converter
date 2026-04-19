import path from 'path/posix';
import { IPath } from "./Interfaces/IPath"

export class FilePath implements IPath {
    getFileNameWithoutExtension(fileName: string): string {
        return path.parse(fileName).name
    }
    getDirectoryName(fileName: string): string {
        return path.dirname(fileName)
    }

    pathCombine(path1: string, path2: string): string {
        return path.join(path1, path2)
    }
    getFileName(fileName: string): string {
        return path.basename(fileName)
    }
    getFileExtension(fileName: string): string {
        return path.extname(fileName)
    }
}