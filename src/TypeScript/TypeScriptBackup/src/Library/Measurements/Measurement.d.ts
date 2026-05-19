import type { IMeasurement } from "./Interfaces/IMeasurement";
export declare class Measurement implements IMeasurement {
    name: string;
    type: any;
    constructor(name: string, type: any);
    getMeasurementName(): string;
    getMeasurementType(): any;
    getMeasurementValue(): void;
}
//# sourceMappingURL=Measurement.d.ts.map