import type { IGameAction } from "../../Game/Interfaces/IGameAction";
import type { IGameActionFactory } from "../../Game/Interfaces/IGameActionFactory";
import type { IObject } from "../../Interfaces/IObject";

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