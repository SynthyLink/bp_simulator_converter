import { IObject } from "../../Interfaces/IObject";
import { IGameAction } from "../Interfaces/IGameAction";
import { IGameActionFactory } from "../Interfaces/IGameActionFactory";

export abstract class AbstractGameActionFactory implements IObject, IGameActionFactory {
    abstract getGameAction(object: any): IGameAction | undefined

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "AbstractGameActionFactory";

    protected types: string[] = ["IObject", "IGameActionFactory", "AbstractGameActionFactory"];

    protected name: string = "";
}