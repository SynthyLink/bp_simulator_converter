import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import { IActionT } from "../Interfaces/IActionT";
import { IGameAction } from "./Interfaces/IGameAction";
import { IGameActionFactory } from "./Interfaces/IGameActionFactory";
import { IScene } from "./Interfaces/IScene";
import { ISceneObject } from "./Interfaces/ISceneObject";

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