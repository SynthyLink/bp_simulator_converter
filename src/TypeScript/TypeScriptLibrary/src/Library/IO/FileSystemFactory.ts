import fs from 'fs';
import type { IFile } from './Interfaces/IFile';
import type { IFileFactory } from './Interfaces/IFileFactory';
import type { ITextReader } from './Interfaces/ITextReader';
import type { ITextReaderFactory } from './Interfaces/ITextReaderFactory';
import type { IIODirectoryFactory } from './Interfaces/IIODirectoryFactory';
import type { IIODirectory } from './Interfaces/IIODirectory';
import type { IFactory } from '../Interfaces/IFactory';
import type { IObject } from '../Interfaces/IObject';
import type { IPathFactory } from './Interfaces/IPathFactory';
import type { IPath } from './Interfaces/IPath';
import { FilePath } from './FilePath';
import { StreamReader } from './StreamReader';
import { FileSystemDirectory } from './FileSystemDirectory';

export class FileSystemFactory implements IObject, ITextReaderFactory, IFileFactory, IIODirectoryFactory,
    IPathFactory {
    createPath(obj: any): IPath {
        return new FilePath()
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

    protected typeName: string = "FileSystemFactory";

    protected types: string[] = ["IObject", "ITextReaderFactory", "IFileFactory", "IIODirectoryFactory",
        "IPathFactory", "FileSystemFactory"];

    protected name: string = "";

    createDirectoryFacrory(object: any): IIODirectory {
        return new FileSystemDirectory()
    }
    createFile(obj: any): IFile {
        return new FileSystemFile()
    }
    getTextReader(obj: any, url: string): ITextReader {
        return new StreamReader(url)
    }

    public setFactory(factory: IFactory): void {
        let ff = new FileSystemFactory();
        factory.addFactory<ITextReaderFactory>(ff, "ITextReaderFactory")
        factory.addFactory<IFileFactory>(ff, "IFileFactory")
        factory.addFactory<IIODirectoryFactory>(ff, "IIODirectoryFactory")
        factory.addFactory<IPathFactory>(ff, "IPathFactory")
    }
}
class FileSystemFile implements IFile {
    existsFile(fileName: string): boolean {
        return fs.existsSync(fileName)
    }
}

