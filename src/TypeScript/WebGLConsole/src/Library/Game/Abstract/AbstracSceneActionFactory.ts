import { FactoryObject } from "../../FactorytObject"
import type { IFactory } from "../../Interfaces/IFactory"
import type { ISceneAction } from "../Interfaces/ISceneAction"
import type { IScene } from "../Interfaces/IScene"
import type { IGameActionConverter } from "../Interfaces/IGameActionConverter"
import type { IGameAction } from "../Interfaces/IGameAction"

export abstract class AbstracSceneAction extends FactoryObject
    implements ISceneAction {
    constructor(factory: IFactory | undefined) {
        super("", factory)
        this.types.push("ISceneAction")
        this.types.push("AbstractGameSceneActionFactory")
        this.typeName = "AbstractGameSceneActionFactory"
        let conv = factory?.getFactory<IGameActionConverter>("IGameActionConverter")
        if (conv != undefined) this.converter = conv;
    }

    abstract functT(s: IScene): IGameAction | undefined 

    protected converter !: IGameActionConverter


}