import { AbstractGameActionFactory } from "../Abstract/AbstractGameActionFactory";
import { IGameAction } from "../Interfaces/IGameAction";
import { EmptyGameAction } from "./EmptyGameAction";

export class EmptyGameActionFactory extends AbstractGameActionFactory {

    constructor() {
        super()
        this.typeName = "EmptyGameActionFactory"
        this.types.push("EmptyGameActionFactory")
    }

    action: IGameAction = new EmptyGameAction();

    getGameAction(object: any): IGameAction | undefined {
        return this.action
    }

}