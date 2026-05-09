import { AbstractGameActionFactory } from "../../Game/Abstract/AbstractGameActionFactory";
import type { IGameAction } from "../../Game/Interfaces/IGameAction";
import { EmptyGameAction } from "./EmptyGameAction";

export class EmptyGameActionFactory extends AbstractGameActionFactory {

    constructor() {
        super()
        this.typeName = "EmptyGameActionFactory"
        this.types.push("EmptyGameActionFactory")
    }

    action: IGameAction = new EmptyGameAction();

    getGameAction(object: any): IGameAction | undefined {
        this.any = object
        return this.action
    }

    any : any

}