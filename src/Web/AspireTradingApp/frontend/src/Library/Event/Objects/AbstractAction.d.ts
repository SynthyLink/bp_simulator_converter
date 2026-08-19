import { EmptyObject } from "../../EmptyObject";
import type { IAction } from "../../Interfaces/IAction";
export declare abstract class AbstractAction extends EmptyObject implements IAction {
    constructor();
    abstract action(): void;
    isEmptyAction(): boolean;
}
//# sourceMappingURL=AbstractAction.d.ts.map