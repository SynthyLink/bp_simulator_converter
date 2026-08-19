import type { IAction } from "../../Interfaces/IAction";
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import { AbstractEngine } from "./AbstracrtEngine";
export declare class ActionWatch extends AbstractEngine implements IAction {
    constructor(interval: number, external: IActionAddRemove);
    action(): void;
    isEmptyAction(): boolean;
    setEngineEnabled(enabled: boolean): boolean;
    protected last: number;
    protected startTime: number;
}
//# sourceMappingURL=ActionWatch.d.ts.map