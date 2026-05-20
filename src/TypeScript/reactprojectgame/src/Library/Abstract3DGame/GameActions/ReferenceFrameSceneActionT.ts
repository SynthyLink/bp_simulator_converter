import type { ISceneObjectActionHolder } from "../../Game/Interfaces/ISceneObejctActionHolder";
import type { ISceneObjectAction } from "../../Game/Interfaces/ISceneObjectAction";
import type { IAction } from "../../Interfaces/IAction";
import type { IObject } from "../../Interfaces/IObject";
import type { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IScene } from "../../Game/Interfaces/IScene";
import { ReferenceFrame } from "../../Motion6D/ReferenceFrame";
import { Game3DPerformer } from "../Game3DPerformer";
import { AbstractSceneAction } from "../../Game/GameActions/AbstractSceneAction";

export class ReferenceFrameSceneAction1 extends AbstractSceneAction
    implements ISceneObjectActionHolder {
    action(): void {
        throw new Error("Method not implemented.");
    }
    constructor(frame: IReferenceFrame, name: string, scene: IScene, factory: IFactory | undefined) {
        super(scene, factory)
        this.typeName = "ReferenceFrameGameAction"
        this.types.push("ISceneObjectActionHolder")
        this.types.push("ReferenceFrameGameAction")
        this.frame = frame
    }
    getSceneObjectAction(): ISceneObjectAction {
        return this.holder
    }

    protected createHolder(obj: IScene) {
       // this.holder = new RotationAction(obj, this.frame)
    }
  
    frame !: IReferenceFrame;

    holder !: ISceneObjectAction

    mPerformer: Game3DPerformer = new Game3DPerformer()

    functT(s: IScene): IAction | undefined {
        this.createHolder(s)
        return this.getSceneObjectAction()
    }
}

class RotationAction extends AbstractSceneAction  {
    functT(s: IScene): IAction | undefined {
        throw new Error("Method not implemented.");
    }
    baseFrame !: ReferenceFrame
    target !: ReferenceFrame
    relative: ReferenceFrame = new ReferenceFrame()
    motionPerformer: Game3DPerformer = new Game3DPerformer()
    constructor(object: IScene, frame: IReferenceFrame | undefined) {
        super(object, object.getConsumerFactory())
        this.typeName = "RotationAction"
        this.types.push("RotationAction")
        this.object = object;
        if (frame != undefined) {
            var fr = this.motionPerformer.getOwnFrame(frame)
            if (fr != undefined) this.baseFrame = fr
        }
        var bf = this.motionPerformer.getOwnFrame(object)
        if (bf != undefined) this.target = bf

    }

    action(): void {
        this.motionPerformer.getRelativeFrame(this.baseFrame, this.target, this.relative)
    }

    isEmptyAction(): boolean {
        return (this.baseFrame == undefined) || (this.target == undefined)
    }
    getActionSceneAdditionalObject(): IObject | undefined {
        return this.relative
    }
}
