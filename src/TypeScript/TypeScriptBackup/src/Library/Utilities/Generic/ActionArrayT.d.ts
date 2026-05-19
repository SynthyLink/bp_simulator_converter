import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IObject } from "../../Interfaces/IObject";
import type { IActionT } from "../../Interfaces/IActionT";
import { Performer } from "../../Performer";
export declare class ActionArrayT<T> implements IActionAddRemoveT<T>, IObject {
    isEmptyActionT(): boolean;
    addActionT(action: IActionT<T> | undefined): void;
    removeActionT(action: IActionT<T>): void;
    clearActionsT(): void;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    getName(): string;
    actionT(t: T): void;
    protected actions: IActionT<T>[];
    protected typeName: string;
    protected types: string[];
    protected performer: Performer;
}
//# sourceMappingURL=ActionArrayT.d.ts.map