import type { IAction } from "../Interfaces/IAction";
import type { IMeasurements } from "./Interfaces/IMeasurements";
export declare class UpdateMeasurementsAction implements IAction {
    action(): void;
    isEmptyAction(): boolean;
    constructor(m: IMeasurements);
    m: IMeasurements;
}
//# sourceMappingURL=UpdateMeasurementsAction.d.ts.map