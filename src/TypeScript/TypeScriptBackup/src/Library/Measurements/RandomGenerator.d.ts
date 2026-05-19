import type { IDesktop } from "../Interfaces/IDesktop";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import { Measurements } from "./Measurements";
export declare class RandomGenerator extends Measurements implements IMeasurement {
    a: number;
    value: number;
    constructor(desktop: IDesktop, name: string);
    getMeasurementName(): string;
    getMeasurementType(): any;
    getMeasurementValue(): any;
    updateMeasurements(): void;
}
//# sourceMappingURL=RandomGenerator.d.ts.map