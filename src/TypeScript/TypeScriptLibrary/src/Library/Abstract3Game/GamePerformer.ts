import { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import { IActionT } from "../Interfaces/IActionT";
import { IFactory } from "../Interfaces/IFactory";
import { Performer } from "../Performer";
import { IGameAction } from "./Interfaces/IGameAction";
import { IGameActionFactory } from "./Interfaces/IGameActionFactory";
import { IScene } from "./Interfaces/IScene";
import { ISceneObject } from "./Interfaces/ISceneObject";

export class GamePerformer extends Performer {
    scene !: IScene
    factory !: IFactory
    
    constructor(scene: IScene) {
        super()
        this.scene = scene;
        this.factory = scene.getConsumerFactory()
    }

    public createSceneAction(): void {
        var s = this.scene
        var act = new SceneObjectAction(s)
        this.forEach<ISceneObject>(s, act, "ISceneObject")
    }
}

class SceneObjectAction implements IActionT<ISceneObject> {
    actionT(t: ISceneObject): void {
        var a = this.gameAcion.functT(t)
        this.action.addAction(a)
    }

    constructor(scene: IScene) {
        this.scene = scene;
        var f = scene.getConsumerFactory();
        var ff = f.getFactory<IGameActionFactory>("IGameActionFactory")
        var a = ff?.getGameAction(scene)
        if (a != undefined) {
            this.gameAcion = a
        }
        this.action = scene.getInternalAction()
        this.action.clearActions()
    }

    gameAcion !: IGameAction;

    scene !: IScene;

    action !: IActionAddRemove

}