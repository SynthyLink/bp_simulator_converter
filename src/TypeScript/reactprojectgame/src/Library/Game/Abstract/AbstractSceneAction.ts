import type { IAction } from "../../Interfaces/IAction"
import type { IFactory } from "../../Interfaces/IFactory"
import type { ISceneAction } from "../Interfaces/ISceneAction"
import type { IScene } from "../Interfaces/IScene"
import { AbstractGameObject } from "./AbstractGameObject"

export abstract class AbstractSceneAction extends AbstractGameObject implements ISceneAction {

    scene !: IScene
    constructor(name: string, scene : IScene, factory: IFactory | undefined) {
        super(name, factory)
        this.scene = scene
        this.types.push("ISceneAction")
        this.types.push("AbstractGameSceneAction")
        this.typeName = "AbstractGameSceneAction"
    }

    getActionScene(): IScene {
        return this.scene
    }
    abstract functT(s: IScene): IAction | undefined
}