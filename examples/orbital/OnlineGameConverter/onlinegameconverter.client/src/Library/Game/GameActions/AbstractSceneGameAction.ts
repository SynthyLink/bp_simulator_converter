import { AbstractGameObject } from "../Abstract/AbstractGameObject"
import type { ISceneObject } from "../../Game/Interfaces/ISceneObject"
import type { IFactory } from "../../Interfaces/IFactory"
import type { IObject } from "../../Interfaces/IObject"
import type { ISceneAction } from "../Interfaces/ISceneAction"
import type { IAction } from "../../Interfaces/IAction"
import type { IScene } from "../Interfaces/IScene"

export abstract class AbstractSceneAction extends AbstractGameObject implements ISceneAction {
    object!: ISceneObject
    add !: IObject
    constructor(object: ISceneObject, factory: IFactory | undefined) {
        super("", factory)
        this.typeName = "AbstractSceneGameAction"
        this.types.push("ISceneObjectAction")
        this.types.push("IAction")
        this.types.push("AbstractSceneGameAction")
        this.object = object;
    }

    abstract functT(s: IScene): IAction | undefined 

    getActionSceneObject(): ISceneObject {
        return this.object;
    }

    abstract getActionSceneAdditionalObject(): IObject | undefined
  
    abstract action(): void 

    isEmptyAction(): boolean {
        return false;
    }
}

