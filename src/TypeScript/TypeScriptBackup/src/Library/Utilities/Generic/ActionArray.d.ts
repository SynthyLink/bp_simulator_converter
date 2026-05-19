import type { IAction } from "../../Interfaces/IAction";
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { IObject } from "../../Interfaces/IObject";
import { Performer } from "../../Performer";
export declare class ActionArray implements IActionAddRemove, IObject {
    isEmptyAction(): boolean;
    addAction(action: IAction | undefined): void;
    removeAction(action: IAction): void;
    clearActions(): void;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    getName(): string;
    action(): void;
    addActionArray(actions: IAction[]): void;
    protected actions: IAction[];
    protected typeName: string;
    protected types: string[];
    protected performer: Performer;
}
//# sourceMappingURL=ActionArray.d.ts.map