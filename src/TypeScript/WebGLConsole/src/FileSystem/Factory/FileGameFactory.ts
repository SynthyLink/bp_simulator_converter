import { IMtlDetector } from "../../Library/Abstract3DConverters/Interfaces/IMtlDetector"
import { MtlDetectorTextReader } from "../../Library/Abstract3DConverters/MeshCreators/MtlDetectorTextReader"
import { BasicGameLoaderFactory } from "../../Library/Abstract3DGame/Factory/BacicGameLoaderFactory"
import { GameAcionConverterFactory } from "../../Library/Game/GameActions/GameAcionConverterFactory"
import { IGameAcionConverterFactory } from "../../Library/Game/Interfaces/IGameAcionConverterFactory"
import { IGameActionFactory } from "../../Library/Game/Interfaces/IGameActionFactory"
import { IGameLoaderFactory } from "../../Library/Game/Interfaces/IGameLoaderFactory"
import { IPath } from "../../Library/IO/Interfaces/IPath"
import { Motion6DFactory } from "../../Library/Motion6DFactory"
import { IStringSplitter } from "../../Library/Utilities/String/Interfaces/IStringSplitter"
import { LineEndSplitter } from "../../Library/Utilities/String/LineEndSplitter"
import { FilePath } from "../IO/FilePath"
import { RelativeFileSystemFactory } from "../IO/RelativeFileSystemFactory"


export class FileGameFactory extends Motion6DFactory {
    rpath: string = ""

    path: IPath = new FilePath()
    constructor(path: string, gameActionFactory: IGameActionFactory) {
        super()
        this.typeName = "RelativeFileSystemDirectory"
        this.types.push("RelativeFileSystemDirectory")
        this.rpath = path;
        var f = new RelativeFileSystemFactory(path)
        f.setFactory(this)
        var mtl = new MtlDetectorTextReader(f)
        this.addFactory<IGameLoaderFactory>(new BasicGameLoaderFactory(), "IGameLoaderFactory")
        this.addFactory<IMtlDetector>(mtl, "IMtlDetector")
        this.addFactory<IStringSplitter>(new LineEndSplitter(), "IStringSplitter")
        this.addFactory<IGameActionFactory>(gameActionFactory, "IGameActionFactory")
        this.addFactory<IGameAcionConverterFactory>(new GameAcionConverterFactory(),
            "IGameAcionConverterFactory")

    }
}
