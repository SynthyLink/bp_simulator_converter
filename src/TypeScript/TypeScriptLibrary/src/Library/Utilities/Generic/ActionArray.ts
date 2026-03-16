import { IAction } from "../../Interfaces/IAction";
import { IObject } from "../../Interfaces/IObject";

export class ActionArray implements IAction, IObject {
    getClassName(): string {
        return this.typeName;
    }
    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) > 0;
    }
    getName(): string {
        return "";
    }
    action(): void {
        for (let action of this.actions)
            action.action();
    }

    protected actions: IAction[] = [];

    protected typeName: string = "ActionArray";

    protected types: string[] = ["IAction", "IObject", "ActionArray"];

    public addAction(action: IAction): void {
        this.actions.push(action)
    }
}