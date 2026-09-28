import type { IFactory } from "../../Interfaces/IFactory";
import { AbstractGameObject } from "../Abstract/AbstractGameObject";
import type { IGameAction } from "../Interfaces/IGameAction";
import type { IGameActionConverter } from "../Interfaces/IGameActionConverter";

export abstract class AbstractGameAcionConverter extends AbstractGameObject
    implements IGameActionConverter {

    abstract functT(s: IGameAction): IGameAction | undefined

    constructor(factory: IFactory | undefined) {
        super("", factory)
        this.typeName = "AbstractGameAcionConverter"
        this.types.push("IGameActionConverter")
        this.types.push("AbstractGameAcionConverter")
    }
}