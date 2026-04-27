import { IScene } from "../../Game/Interfaces/IScene"
import { IAssociatedObject } from "../../Interfaces/IAssociatedObject"
import { IObject } from "../../Interfaces/IObject"
import { AbstractSceneObject } from "./AbstractSceneObject"

export class AssociatedSceneObject extends AbstractSceneObject implements IAssociatedObject {

    protected object !: IObject
    constructor(scene: IScene, object: IObject) {
        super(scene, object.getName())
        this.types.push("IAssociatedObject")
        this.types.push("AbstractSceneObject")
        this.typeName = "AbstractSceneObject"
        this.object = object
 }

    getAssociatedObject(): IObject {
        return this.object
    }
    setAssociatedObject(obj: IObject): void {
    }

}