import type { IMeasurement } from "../Measurements/Interfaces/IMeasurement";

export interface ITimeMeasurementProvider {
    /// <summary>
    /// Time measurement
    /// </summary>
    getTimeMeasurement(): IMeasurement

    getTime(): number

    setTime(time: number): void

    getStep(): number

    setStep(time: number): void

}