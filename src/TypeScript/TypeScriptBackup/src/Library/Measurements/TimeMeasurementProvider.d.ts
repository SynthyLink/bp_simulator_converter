import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { ITimeMeasurementProvider } from "./Interfaces/ITimeMeasurementProvider";
export declare class TimeMeasurementProvider implements ITimeMeasurementProvider, IMeasurement {
    getMeasurementName(): string;
    getMeasurementType(): number;
    getMeasurementValue(): number;
    getTimeMeasurement(): IMeasurement;
    setTime(time: number): void;
    getStep(): number;
    setStep(time: number): void;
    getTime(): any;
    time: number;
    step: number;
}
//# sourceMappingURL=TimeMeasurementProvider.d.ts.map