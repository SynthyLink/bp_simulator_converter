import fs from 'fs';
import { IFile } from './Interfaces/IFile';
import { IFileFactory } from './Interfaces/IFileFactory';
import { ITextReader } from './Interfaces/ITextReader';
import { ITextReaderFactory } from './Interfaces/ITextReaderFactory';
import { LinesTextReader } from './LinesTextReader';
import { IIODirectoryFactory } from './Interfaces/IIODirectoryFactory';
import { IIODirectory } from './Interfaces/IIODirectory';
import { FileSystemDirectory } from './FileSystemDirectory';

export class FileTSystemFactory implements ITextReaderFactory, IFileFactory, IIODirectoryFactory {
    createDirectoryFacrory(object: any): IIODirectory {
        return new FileSystemDirectory()
    }
    createFile(obj: any): IFile {
        return new FileSystemFile()
    }
    getTextReader(obj: any, url: string): ITextReader {
        return new StreamReader(url)
    }

}


export class FileSystemFile implements IFile {
    existsFile(fileName: string): boolean {
        return fs.existsSync(fileName)
    }

}

class StreamReader extends LinesTextReader {
    constructor(fullpath: string) {
        super()
        this.text = fs.readFileSync(fullpath, 'utf-8')
        this.split()
    }
}
