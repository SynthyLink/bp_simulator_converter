import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IGameAction } from "../Game/Interfaces/IGameAction";
import { IGameActionFactory } from "../Game/Interfaces/IGameActionFactory";
import { IScene } from "../Game/Interfaces/IScene";
import { ISceneObject } from "../Game/Interfaces/ISceneObject";
import { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import { IActionT } from "../Interfaces/IActionT";
import { GamePerformer } from "./GamePerformer";
import { IGameActionConverter } from "./Interfaces/IGameActionConverter";
import { IGameActionConverterFactory } from "./Interfaces/IGameActionConverterFactory";

export class SceneObjectAction implements IActionT<ISceneObject> {

    performer: GamePerformer = new GamePerformer()

    conv !: IGameActionConverter;

    current !: IActionT<ISceneObject>
    

    actionT(t: ISceneObject): void
    {
        var a = this.gameAcion.functT(t)
        if (this.conv != undefined) {
            if (a != undefined) {
                var b = this.conv.functT(a)
                this.action.addAction(b)
                return;
            }
        }
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
            throw new OwnNotImplemented();
        }

        var conv = f.getFactory<IGameActionConverter>("IGameActionConverter")
        if (conv != undefined) {
            this.conv = conv
        }
        var fc = f.getFactory<IGameActionConverterFactory>("IGameActionConverterFactory")
        if (fc != undefined) {
            var conv = fc.getGameActionConverter(scene)
            if (conv != undefined) {
                this.conv = conv
            }
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