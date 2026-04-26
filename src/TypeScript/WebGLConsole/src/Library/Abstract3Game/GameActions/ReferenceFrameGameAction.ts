import { IMeshAction } from "../../Abstract3DConverters/Interfaces/IMeshAction";
import { IAction } from "../../Interfaces/IAction";
import { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import { IObject } from "../../Interfaces/IObject";
import { IReferenceFrame } from "../../Motion6D/Interfaces/IReferenceFrame";
import { Motion6DPerformer } from "../../Motion6D/Motion6DPerformer";
import { ActionArray } from "../../Utilities/Generic/ActionArray";
import { AbstractGameAction } from "../Abstract/AbstractGameAction";
import { IMeshActionFactory } from "../Interfaces/IMeshActionFactory";
import { ISceneObject } from "../Interfaces/ISceneObject";

export class ReferenceFrameGameAction extends AbstractGameAction
    implements IMeshActionFactory {
    constructor(frame : IReferenceFrame) {
        super()
        this.typeName = "ReferenceFrameGameAction"
        this.types.push("IMeshActionFactory")
        this.types.push("ReferenceFrameGameAction")
        this.frame = frame
    }
    createMeshActions(object: ISceneObject): IMeshAction[] {
        return []
    }

  
    frame !: IReferenceFrame;



    mPerformer: Motion6DPerformer = new Motion6DPerformer()

    functT(s: ISceneObject): IAction | undefined {
        var cc = this.createMeshActions(s)
        if (cc == undefined) return undefined
        if (cc.length == 0) return undefined
        if (cc.length == 1) return cc[0].action
        let act: IActionAddRemove = new ActionArray(); 
        for (var c of cc) {
            act.addAction(c.action)
        }
        return act;
    }

}