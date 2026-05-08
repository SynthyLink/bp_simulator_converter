import { AbstractGameActionFactory } from "../../Game/Abstract/AbstractGameActionFactory";
import { ReferenceFrameGameAction } from "./ReferenceFrameGameAction";
import { IGameAction } from "../../Game/Interfaces/IGameAction";
import { IScene } from "../../Game/Interfaces/IScene";
import { ISceneObject } from "../../Game/Interfaces/ISceneObject";
import { IAction } from "../../Interfaces/IAction";
import { IFindFrame } from "../Interfaces/IFindFrame";

export class ReferenceFrameGameActionFactory extends AbstractGameActionFactory
    implements IGameAction {
    constructor(find: IFindFrame) {
        super()
        this.typeName = "ReferenceFrameGameActionFactory"
        this.types.push("ReferenceFrameGameActionFactory")
        this.find = find;
    }
    functT(s: ISceneObject): IAction | undefined {
        return undefined;
    }
    getGameAction(object: any): IGameAction | undefined {
        var sc = object as unknown as IScene
        var fr = this.find.functT(sc)
        if (fr === undefined)
            return this
        return new ReferenceFrameGameAction(fr)
    }

    find !: IFindFrame
}