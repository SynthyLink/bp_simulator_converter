import { Measurement } from "./Measurement";
import type { IDerivation } from "./Interfaces/IDerivation";
import type { IMeasurement } from "./Interfaces/IMeasurement";
export declare class MeasurementDerivation extends Measurement implements IDerivation {
    measurement: IMeasurement;
    derivation: IMeasurement;
    constructor(measurement: IMeasurement, derivation: IMeasurement);
    getDerivation(): IMeasurement;
    setDerivation(derivation: IMeasurement): void;
    fderivation: IMeasurement;
    getMeasurementValue(): any;
}
//# sourceMappingURL=MeasurementDerivation.d.ts.map