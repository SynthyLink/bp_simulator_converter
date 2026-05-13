//import type { IMtlDetector } from "../Library/Abstract3DConverters/Interfaces/IMtlDetector";

import { BasicGameLoaderFactory } from "../Library/Abstract3DGame/Factory/BacicGameLoaderFactory"
import type { IGameActionFactory } from "../Library/Game/Interfaces/IGameActionFactory"
import type { IGameLoaderFactory } from "../Library/Game/Interfaces/IGameLoaderFactory"
import type { IFuncT } from "../Library/Interfaces/IFuncT"
import { Motion6DFactory } from "../Library/Motion6D/Motion6DFactory"
import { ConsoleShowObject } from "../Library/Show/ConsoleShowObject"
import type { IShowData } from "../Library/Show/Interfaces/IShowData"
import type { IShowObject } from "../Library/Show/Interfaces/IShowObject"
import  { ShowObject } from "../Library/Show/ShowObject"
import type { IStringSplitter } from "../Library/Utilities/String/Interfaces/IStringSplitter"
import { LineEndSplitter } from "../Library/Utilities/String/LineEndSplitter"

export class GameGLFactory extends Motion6DFactory {
    constructor(gameActionFactory: IGameActionFactory) {
        super()

        this.types.push("GameGLFactory")
        this.typeName = "GameGLFactory"
        this.addFactory<IGameLoaderFactory>(new BasicGameLoaderFactory(), "IGameLoaderFactory")
        this.addFactory<IStringSplitter>(new LineEndSplitter(), "IStringSplitter")
        this.addFactory<IGameActionFactory>(gameActionFactory, "IGameActionFactory")
        this.showO = new ShowObject(this)
        this.addFactory<IShowObject>(this.showO, "IShowObject")
        this.showO.addActionT(new ConsoleShowObject(new Filrer()))
    }

    showO !: ShowObject
}

class Filrer implements IFuncT<boolean, IShowData> {
    functT(sd: IShowData): boolean | undefined {
        var s = sd.name
        if (s == undefined) return true
        if (s.includes("Rotation")) return false
        return true

    }

}