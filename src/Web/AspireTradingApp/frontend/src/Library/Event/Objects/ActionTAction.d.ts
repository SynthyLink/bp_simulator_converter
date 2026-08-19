import { EmptyObject } from "../../EmptyObject";
import type { IAction } from "../../Interfaces/IAction";
import type { IActionT } from "../../Interfaces/IActionT";
export declare class ActionTAction<T> extends EmptyObject implements IActionT<T> {
    constructor(action: IAction);
    actionT(t: T): void;
    isEmptyActionT(): boolean;
    any: any;
    protected action: IAction;
}
//# sourceMappingURL=ActionTAction.d.ts.map