import { IAction } from "../../Interfaces/IAction";
import { AbstractGameActionFactory } from "../Abstract/AbstractGameActionFactory";
import { IGameAction } from "../Interfaces/IGameAction";
import { IScene } from "../Interfaces/IScene";
import { ISceneObject } from "../Interfaces/ISceneObject";
import { IFindFrame } from "./Interfaces/IFindFrame";
import { ReferenceFrameGameAction } from "./ReferenceFrameGameAction";

export class ReferenceFrameGameActionFactory extends AbstractGameActionFactory implements IGameAction {
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