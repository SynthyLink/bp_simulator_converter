import { IAction } from "../../Interfaces/IAction";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import { Motion6DPerformer } from "../../Motion6D/Motion6DPerformer";
import { AbstractGameAction } from "../Abstract/AbstractGameAction";
import { ISceneObject } from "../Interfaces/ISceneObject";

export class ReferenceFrameGameAction extends AbstractGameAction {
    constructor(frame : IReferenceFrame) {
        super()
        this.typeName = "ReferenceFrameGameAction"
        this.types.push("ReferenceFrameGameAction")
        this.frame = frame
    }

    frame !: IReferenceFrame;

    mPerformer: Motion6DPerformer = new Motion6DPerformer()

    functT(s: ISceneObject): IAction | undefined {

        return undefined;
    }

}