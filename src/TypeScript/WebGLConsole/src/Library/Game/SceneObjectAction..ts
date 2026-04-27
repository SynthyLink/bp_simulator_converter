import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IGameAction } from "../Game/Interfaces/IGameAction";
import { IGameActionFactory } from "../Game/Interfaces/IGameActionFactory";
import { IScene } from "../Game/Interfaces/IScene";
import { ISceneObject } from "../Game/Interfaces/ISceneObject";
import { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import { IActionT } from "../Interfaces/IActionT";

export class SceneObjectAction implements IActionT<ISceneObject> {

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
        else {
            throw new OwnNotImplemented()
        }
        this.action = scene.getInternalAction()
    }

    isEmptyActionT(): boolean {
        return false;
    }

    gameAcion !: IGameAction;

    scene !: IScene;

    action !: IActionAddRemove

}