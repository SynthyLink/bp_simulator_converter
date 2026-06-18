import type { IFactory } from "../../Interfaces/IFactory";
import type { IGameAction } from "../Interfaces/IGameAction";
import { AbstractGameObject } from "./AbstractGameObject";

export abstract class AbstractGameAction extends AbstractGameObject implements IGameAction {

    constructor(name: string, factory: IFactory | undefined) {
        super(name, factory)
        this.types.push("IGameAction")
        this.types.push("Action")
        this.types.push("AbstractGameAction")
        this.typeName = "AbstractGameAction"
    }
    abstract action(): void 

    abstract isEmptyAction(): boolean 
}