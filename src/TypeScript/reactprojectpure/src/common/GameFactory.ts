import { Motion6DFactory } from "../Library/Motion6D/Motion6DFactory"
import { IIODirectoryFactory } from "../Library/IO/Interfaces/IIODirectoryFactory"
import { IFileFactory } from "../Library/IO/Interfaces/IFileFactory"
import { ITextReaderFactory } from "../Library/IO/Interfaces/ITextReaderFactory"
import { IMtlDetector } from "../Library/Abstract3DConverters/Interfaces/IMtlDetector"
import { ILoaderFactory } from "../Library/Interfaces/ILoaderFactory"
import { GameLoaderFactory } from "./GameLoader"
import { IStringSplitter } from "../Library/Utilities/String/Interfaces/IStringSplitter"
import { LineEndSplitter } from "../Library/Utilities/String/LineEndSplitter"
import { ITextReader } from "../Library/IO/Interfaces/ITextReader"
import { IFile } from "../Library/IO/Interfaces/IFile"
import { IIODirectory } from "../Library/IO/Interfaces/IIODirectory"
import { IObject } from "../Library/Interfaces/IObject"
import Game from "./game"
import { SceneHolder } from "./SceneHolder"
import { IPathFactory } from "../Library/IO/Interfaces/IPathFactory"
import { PurePathFactory } from "../Library/IO/PurePathFactory"


// lass FileSystemFactory implements IObject, ITextReaderFactory, 
export class GameFactory extends Motion6DFactory implements IIODirectoryFactory, IFileFactory, ITextReaderFactory {
    constructor() {
        super()
        this.types.push("IIODirectoryFactory")
        this.types.push("IFileFactory")
        this.types.push("ITextReaderFactory")
        this.types.push("GameFactory")
        this.typeName = "GameFactory"
        this.addFactory<IMtlDetector>(new GameMtlDetector(), "IMtlDetector")
        this.addFactory<ILoaderFactory>(new GameLoaderFactory(), "ILoaderFactory")
        this.addFactory<IStringSplitter>(new LineEndSplitter(), "IStringSplitter")
        this.addFactory<IPathFactory>(new PurePathFactory(), "IPathFactory")
        this.addFactory<IIODirectoryFactory>(this, "IIODirectoryFactory")
        this.addFactory<IFileFactory>(this, "IFileFactory")
        this.addFactory<ITextReaderFactory>(this, "ITextReaderFactory")
    }

    getTextReader(obj: any, url: string): ITextReader {
        return new SceneReader(obj, url)
    }
    createFile(obj: any): IFile {
        return new SceneFile(obj)
    }
    createDirectoryFactory(object: any): IIODirectory {
        return new SceneDirectory(object)
    }
}
class GameMtlDetector implements IMtlDetector, IObject {
    getName(): string {
        return "";
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "GameMtlDetector";

    protected types: string[] = ["IObject", "IMtlDetector", "GameMtlDetector"];

    detectMtl(url: string, obj: any): string[] {
        let game = obj as Game
        var str = game.loader.resources[url] as string
        return str.split('\n')
    }

}

class SceneDirectory extends SceneHolder implements IIODirectory {
    constructor(object: any) {
        super(object)
        this.types.push("IIODirectory")
        this.types.push("SceneDirectory")
        this.typeName = "SceneDirectory"
    }

    getDirectoryFiles(directory: string): string[] {
        return this.scene.getDirectoryFiles(directory)
    }

}
class SceneFile extends SceneHolder implements IFile {
    constructor(object: any) {
        super(object)
        this.types.push("IFile")
        this.types.push("SceneFile")
        this.typeName = "SceneFile"
    }
    existsFile(fileName: string): boolean {
        return this.scene.fileExists(fileName)
    }
}

class SceneReader extends SceneHolder implements ITextReader {
    constructor(object: any, url: string) {
        super(object)
        this.types.push("ITextReader")
        this.types.push("SceneReader")
        this.typeName = "SceneReader"
        this.text = this.scene.getResourceText(url)
        this.split()
    }
    getStrings(): string[] {
        return this.strings;
    }

    reset(): void {
        this.n = 0;
        this.end = false
    }

    readToEnd(): string {
        this.end = true;
        return this.text;
    }

    readLine(): string {
        let s = this.strings[this.n];
        this.n++;
        if (this.n >= this.strings.length) this.end = true;
        return s;
    }

    eof(): boolean {
        return this.end;
    }

    protected split(): void {
        var s = this.text.split("\n")
        for (var str of s) {
            this.strings.push(str.replace("\r", ""))
        }
    }

    strings: string[] = [];

    text: string = "";

    end: boolean = false;

    n : number = 0;
}