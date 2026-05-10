import type { IScene } from "../../Game/Interfaces/IScene"
import type { IAssociatedObject } from "../../Interfaces/IAssociatedObject"
import type { IObject } from "../../Interfaces/IObject"
import type { IShowObject } from "../../Interfaces/IShowObject"
import type { ITextReaderFactory } from "../../IO/Interfaces/ITextReaderFactory"
import type { IResourceFuncFactory } from "../../Resources/Infrefaces/IResourceFuncFactory"
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
        this.show = this.factory.getFactory<IShowObject>("IShowObject")
        this.textFactory = this.factory.getFactory<ITextReaderFactory>("ITextReaderFactory")
        this.resourceFactory = this.factory.getFactory<IResourceFuncFactory>("IResourceFuncFactory")
        if (this.textFactory == undefined) {
            if (this.resourceFactory != undefined) {

            }
        }

    }

    protected showObject(object: any, str?: string | undefined): void {
        if (this.show != undefined) this.show.show(object, str)
    }

    getAssociatedObject(): IObject {
        return this.object
    }

    setAssociatedObject(obj: IObject): void {
        this.object = obj
    }


    show: IShowObject | undefined = undefined

    protected textFactory: ITextReaderFactory | undefined = undefined

    protected resourceFactory: IResourceFuncFactory | undefined = undefined



}