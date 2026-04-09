import { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import { IObject } from "../../Interfaces/IObject";
import { IActionT } from "../../Interfaces/IActionT";
import { IAction } from "../../Interfaces/IAction";
import { Performer } from "../../Performer";

export class ActionArrayT<T> implements IActionAddRemoveT<T>, IObject {
    addActionT(action: IActionT<T> | undefined): void {
        if (action === undefined) return;
        this.actions.push(action)
    }
    removeActionT(action: IActionT<T>): void {
        if (action === undefined) return;
        this.performer.remove(this.actions, action)
    }
    clearActionsT(): void {
        this.actions = [];
    }
    getClassName(): string {
        return this.typeName;
    }
    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) > 0;
    }
    getName(): string {
        return "";
    }
    actionT(t : T): void {
        for (let action of this.actions)
            action.actionT(t);
    }

    protected actions: IActionT<T>[] = [];

    protected typeName: string = "ActionArrayT";

    protected types: string[] = ["IActionT", "IActionArrayT", "IObject", "ActionArrayT"];

    protected performer: Performer = new Performer();

}