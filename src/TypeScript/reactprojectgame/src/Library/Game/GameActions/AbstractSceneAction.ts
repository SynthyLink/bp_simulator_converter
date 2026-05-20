import { AbstractGameObject } from "../Abstract/AbstractGameObject"
import type { IFactory } from "../../Interfaces/IFactory"
import type { IObject } from "../../Interfaces/IObject"
import type { ISceneAction } from "../Interfaces/ISceneAction"
import type { IAction } from "../../Interfaces/IAction"
import type { IScene } from "../Interfaces/IScene"

export abstract class AbstractSceneAction extends AbstractGameObject implements ISceneAction {
    object!: IScene
    add !: IObject
    constructor(object: IScene, factory: IFactory | undefined) {
        super("", factory)
        this.typeName = "AbstractSceneAction"
        this.types.push("ISceneAction")
        this.types.push("IAction")
        this.types.push("AbstractSceneAction")
        this.object = object;
    }
    getActionScene(): IScene {
        return this.object
    }

    abstract functT(s: IScene): IAction | undefined


  
    abstract action(): void 

    isEmptyAction(): boolean {
        return false;
    }
}

