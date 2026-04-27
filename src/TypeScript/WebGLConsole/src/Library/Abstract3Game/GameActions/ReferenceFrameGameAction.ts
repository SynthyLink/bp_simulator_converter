import { EmptyObject } from "../../EmptyObject";
import { AbstractGameAction } from "../../Game/Abstract/AbstractGameAction";
import { ISceneObjectActionHolder } from "../../Game/Interfaces/ISceneObejctActionHolder";
import { ISceneObject } from "../../Game/Interfaces/ISceneObject";
import { ISceneObjectAction } from "../../Game/Interfaces/ISceneObjectAction";
import { IAction } from "../../Interfaces/IAction";
import { IAssociatedObject } from "../../Interfaces/IAssociatedObject";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import { Motion6DPerformer } from "../../Motion6D/Motion6DPerformer";
import { ReferenceFrame } from "../../Motion6D/ReferenceFrame";
import { AbstractSceneGameAction } from "./AbstractSceneGameAction";

export class ReferenceFrameGameAction extends AbstractGameAction
    implements ISceneObjectActionHolder {
    constructor(frame: IReferenceFrame) {
        super()
        this.typeName = "ReferenceFrameGameAction"
        this.types.push("ISceneObjectActionHolder")
        this.types.push("ReferenceFrameGameAction")
        this.frame = frame
    }
    getSceneObjectAction(): ISceneObjectAction {
        return this.holder
    }

    protected createHolder(obj: ISceneObject) {
        this.holder = new RotationAction(obj, this.frame)
    }
  
    frame !: IReferenceFrame;
    holder !: ISceneObjectAction


    mPerformer: Motion6DPerformer = new Motion6DPerformer()

    functT(s: ISceneObject): IAction | undefined {
        this.createHolder(s)
        return this.getSceneObjectAction()
    }
}

class RotationAction extends AbstractSceneGameAction {
    frame !: IReferenceFrame
    target !: IReferenceFrame
    rf : ReferenceFrame = new ReferenceFrame()
    constructor(object: ISceneObject, frame: IReferenceFrame | undefined) {
        super(object, frame)
        this.typeName = "RotationAction"
        this.types.push("RotationAction")
        this.object = object;
        if (frame != undefined) this.frame = frame
        var ao = object as unknown as IAssociatedObject
        var ass = ao.getAssociatedObject()
        var ps = ass as unknown as IReferenceFrame
        this.target = ps

    }

    action(): void {
    }

    isEmptyAction(): boolean {
        return (this.frame == undefined) || (this.target == undefined)
    }

}

