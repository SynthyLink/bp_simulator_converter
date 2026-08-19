import { EmptyObject } from "../../EmptyObject";
import type { IActionAddRemoveT2 } from "../../Interfaces/IActionAddRemoveT2";
import type { IActionT2 } from "../../Interfaces/IActionT2";
export declare class ActionArrayT2<T1, T2> extends EmptyObject implements IActionAddRemoveT2<T1, T2> {
    isEmptyActionT2(): boolean;
    addActionT2(action: IActionT2<T1, T2> | undefined): void;
    removeActionT2(action: IActionT2<T1, T2>): void;
    clearActionsT2(): void;
    actionT2(t1: T1, t2: T2): void;
    protected actions: IActionT2<T1, T2>[];
}
//# sourceMappingURL=ActionArrayT2.d.ts.map