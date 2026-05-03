import { IAction } from "../../Interfaces/IAction";
import { IFactory } from "../../Interfaces/IFactory";
import { IGameActionConverter } from "../Interfaces/IGameActionConverter";
import { EngineGameImitation } from "./EngineGameImitation";

export class EngineGameImitationAction extends EngineGameImitation implements IGameActionConverter {

    constructor(name: string, factory: IFactory) {
        super(name, factory)
        this.types.push("IGameActionConverter")
        this.types.push("EngineGameImitationAction")
        this.typeName = "EngineGameImitationAction"
        factory.addFactory(this, "IGameActionConverter")
    }
    functT(s: IAction): IAction | undefined {
        return s
    }

}
