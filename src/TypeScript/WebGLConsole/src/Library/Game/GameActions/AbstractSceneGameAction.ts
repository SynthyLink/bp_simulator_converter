import { ISceneObject } from "../../Game/Interfaces/ISceneObject"
import { ISceneObjectAction } from "../../Game/Interfaces/ISceneObjectAction"
import { IObject } from "../../Interfaces/IObject"
import { EmptyGameObject } from "../Abstract/EmptyGameObject"

export abstract class AbstractSceneGameAction extends EmptyGameObject implements ISceneObjectAction {
    object!: ISceneObject
    add !: IObject
    constructor(object: ISceneObject) {
        super("")
        this.typeName = "AbstractSceneGameAction"
        this.types.push("ISceneObjectAction")
        this.types.push("IAction")
        this.types.push("AbstractSceneGameAction")
        this.object = object;
    }

    getActionSceneObject(): ISceneObject {
        return this.object;
    }

    abstract getActionSceneAdditionalObject(): IObject | undefined
  
    abstract action(): void 

    isEmptyAction(): boolean {
        return false;
    }
}

