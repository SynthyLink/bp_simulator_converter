import { IAction } from "../../Interfaces/IAction";
import { EmptyGameObject } from "../Abstract/EmptyGameObject";
import { IGameActionConverter } from "../Interfaces/IGameActionConverter";

export abstract class AbstractGameAcionConverter extends EmptyGameObject implements IGameActionConverter {

    abstract functT(s: IAction): IAction | undefined

    constructor() {
        super("", undefined)
        this.typeName = "AbstractGameAcionConverter"
        this.types.push("IGameAcionConverter")
        this.types.push("AbstractGameAcionConverter")
    }
}