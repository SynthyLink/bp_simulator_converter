import type { IAction } from "../Interfaces/IAction";
import type { IPosition } from "./Interfaces/IPosition";
export declare class UpdatePositionAction implements IAction {
    position: IPosition;
    constructor(position: IPosition);
    action(): void;
    isEmptyAction(): boolean;
}
//# sourceMappingURL=UpdatePositionAction.d.ts.map