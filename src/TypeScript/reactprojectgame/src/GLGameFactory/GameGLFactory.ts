//import type { IMtlDetector } from "../Library/Abstract3DConverters/Interfaces/IMtlDetector";
import type { IGameActionFactory } from "../Library/Game/Interfaces/IGameActionFactory";
import type { IGameLoaderFactory } from "../Library/Game/Interfaces/IGameLoaderFactory";
import type { IShowObject } from "../Library/Interfaces/IShowObject";
import type { IStringSplitter } from "../Library/Utilities/String/Interfaces/IStringSplitter";
import { LineEndSplitter } from "../Library/Utilities/String/LineEndSplitter";
import { Motion6DFactory } from "../Library/Motion6D/Motion6DFactory";
import { BasicGameLoaderFactory } from "../Library/Abstract3DGame/Factory/BacicGameLoaderFactory";
import { ShowObject } from "../Library/Show/ShowObject";
import { ConsoleShowObject } from "../Library/Show/ConsoleShowObject";

export class GameGLFactory extends Motion6DFactory {
    constructor(gameActionFactory: IGameActionFactory) {
        super()

        this.types.push("GameGLFactory")
        this.typeName = "GameGLFactory"
        this.addFactory<IGameLoaderFactory>(new BasicGameLoaderFactory(), "IGameLoaderFactory")
        //this.addFactory<IMtlDetector>(mtl, "IMtlDetector")
        this.addFactory<IStringSplitter>(new LineEndSplitter(), "IStringSplitter")
        this.addFactory<IGameActionFactory>(gameActionFactory, "IGameActionFactory")
        this.showO = new ShowObject(this)
        this.addFactory<IShowObject>(this.showO, "IShowObject")
        this.showO.addActionT(new ConsoleShowObject())
       
    }

    showO !: ShowObject
}