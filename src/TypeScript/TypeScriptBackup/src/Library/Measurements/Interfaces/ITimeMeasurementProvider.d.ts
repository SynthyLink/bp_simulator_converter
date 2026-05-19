import type { IMeasurement } from "./IMeasurement";
export interface ITimeMeasurementProvider {
    getTimeMeasurement(): IMeasurement;
    getTime(): number;
    setTime(time: number): void;
    getStep(): number;
    setStep(time: number): void;
}
//# sourceMappingURL=ITimeMeasurementProvider.d.ts.map