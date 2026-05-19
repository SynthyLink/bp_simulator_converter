import type { IActionT } from "../../Interfaces/IActionT";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
import type { IMeasurement } from "../../Measurements/Interfaces/IMeasurement";
import type { ITimeMeasurementProvider } from "../../Measurements/Interfaces/ITimeMeasurementProvider";
export declare class EngineTimerProvider implements IMeasurement, ITimeMeasurementProvider, IActionT<number> {
    timeScale: number;
    constructor(playEngine: IPlayEngine);
    actionT(t: number): void;
    isEmptyActionT(): boolean;
    getTimeMeasurement(): IMeasurement;
    getTime(): number;
    setTime(time: number): void;
    getStep(): number;
    setStep(time: number): void;
    getMeasurementName(): string;
    getMeasurementType(): number;
    getMeasurementValue(): number;
    currentTime: number;
    playEngine: IPlayEngine;
}
//# sourceMappingURL=EngineTimerProvider.d.ts.map