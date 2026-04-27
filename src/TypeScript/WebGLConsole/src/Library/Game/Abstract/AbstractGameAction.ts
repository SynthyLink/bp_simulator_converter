import { IGameAction } from "../../Game/Interfaces/IGameAction";
import { ISceneObject } from "../../Game/Interfaces/ISceneObject";
import { IAction } from "../../Interfaces/IAction";
import { IObject } from "../../Interfaces/IObject";

export abstract class AbstractGameAction implements IObject, IGameAction {

    abstract functT(s: ISceneObject): IAction | undefined

    getName(): string {
        return this.name;
    }

    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }

    protected typeName: string = "AbstractGameAction";

    protected types: string[] = ["IObject", "IGameAction", "AbstractGameAction"];

    protected name: string = "";

}