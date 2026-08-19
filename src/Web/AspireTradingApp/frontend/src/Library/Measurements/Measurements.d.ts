import { CategoryObject } from "../CategoryObject";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { IMeasurements } from "./Interfaces/IMeasurements";
export declare class Measurements extends CategoryObject implements IMeasurements {
    constructor(desktop: IDesktop, name: string);
    addMeasurement(measurement: IMeasurement): void;
    protected measurements: IMeasurement[];
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    updateMeasurements(): void;
}
//# sourceMappingURL=Measurements.d.ts.map