import { EmptyObject } from "../../EmptyObject";
import { IAction } from "../../Interfaces/IAction";
import { IGameAcionConverter } from "../Interfaces/IGameAcionConverter";

export abstract class AbstractGameAcionConverter extends EmptyObject implements IGameAcionConverter {
    abstract functT(s: IAction): IAction | undefined

    constructor() {
        super("")
        this.typeName = "AbstractGameAcionConverter"
        this.types.push("IGameAcionConverter")
        this.types.push("AbstractGameAcionConverter")
    }
}