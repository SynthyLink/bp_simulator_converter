import { IMtlDetector } from "../../Abstract3DConverters/Interfaces/IMtlDetector";
import { ILoaderFactory } from "../../Interfaces/ILoaderFactory";
import { IObject } from "../../Interfaces/IObject";
import { IFile } from "../../IO/Interfaces/IFile";
import { IFileFactory } from "../../IO/Interfaces/IFileFactory";
import { IIODirectory } from "../../IO/Interfaces/IIODirectory";
import { IIODirectoryFactory } from "../../IO/Interfaces/IIODirectoryFactory";
import { IPathFactory } from "../../IO/Interfaces/IPathFactory";
import { ITextReader } from "../../IO/Interfaces/ITextReader";
import { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory";
import { PurePathFactory } from "../../IO/PurePathFactory";
import { Motion6DFactory } from "../../Motion6D/Motion6DFactory";
import { IStringSplitter } from "../../Utilities/String/Interfaces/IStringSplitter";
import { LineEndSplitter } from "../../Utilities/String/LineEndSplitter";

export class FactoryGameImitation extends Motion6DFactory implements IIODirectoryFactory, IFileFactory, ITextReaderFactory {
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



