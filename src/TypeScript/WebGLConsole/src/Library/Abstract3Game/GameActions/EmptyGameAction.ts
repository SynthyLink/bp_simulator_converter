import { AbstractGameAction } from "../Abstract/AbstractGameAction";
import { ISceneObject } from "../Interfaces/ISceneObject";
import { IAction } from "../../Interfaces/IAction";

export class EmptyGameAction extends AbstractGameAction implements IAction {
    constructor() {
        super()
        this.typeName = "EmptyGameAction"
        this.types.push("EmptyGameAction")
    }

    action(): void {

    }

    isEmptyAction(): boolean {
        return false;
    }
    functT(s: ISceneObject): IAction | undefined {
        return this;
    }

}