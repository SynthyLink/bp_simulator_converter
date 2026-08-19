import { NumberMeasurement } from "../../Measurements/NumberMeasurement";
import { EulerAngles } from "../../Vector3D/EulerAngles";
export declare class EulerMeasurement extends NumberMeasurement {
    protected angles: EulerAngles;
    constructor(name: string, angles: EulerAngles);
    getRoll(name: string, angles: EulerAngles): RollMeasurement;
    getPitch(name: string, angles: EulerAngles): PitchMeasurement;
    getYaw(name: string, angles: EulerAngles): YawMeasurement;
}
declare class RollMeasurement extends EulerMeasurement {
    constructor(name: string, angles: EulerAngles);
    getMeasurementValue(): number;
}
declare class PitchMeasurement extends EulerMeasurement {
    constructor(name: string, angles: EulerAngles);
    getMeasurementValue(): number;
}
declare class YawMeasurement extends EulerMeasurement {
    constructor(name: string, angles: EulerAngles);
    getMeasurementValue(): number;
}
export {};
//# sourceMappingURL=EulerMeasurement.d.ts.map