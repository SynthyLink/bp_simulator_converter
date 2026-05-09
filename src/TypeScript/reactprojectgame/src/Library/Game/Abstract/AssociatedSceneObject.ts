import type { IScene } from "../../Game/Interfaces/IScene"
import type { IAssociatedObject } from "../../Interfaces/IAssociatedObject"
import type { IFactory } from "../../Interfaces/IFactory"
import type { IObject } from "../../Interfaces/IObject"
import { AbstractSceneObject } from "./AbstractSceneObject"

export abstract class AssociatedSceneObject extends AbstractSceneObject implements IAssociatedObject {

    protected object !: IObject
    constructor(scene: IScene, object: IObject) {
        super(scene, object.getName())
        this.types.push("IAssociatedObject")
        this.types.push("AbstractSceneObject")
        this.typeName = "AbstractSceneObject"
        this.object = object
        this.factory = scene.getConsumerFactory()
    }

    getAssociatedObject(): IObject {
        return this.object
    }
    setAssociatedObject(obj: IObject): void {
    }

    protected factory !: IFactory


}