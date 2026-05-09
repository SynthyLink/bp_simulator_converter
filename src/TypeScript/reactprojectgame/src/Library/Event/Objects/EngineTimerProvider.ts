import { OwnNotImplemented } from "../../ErrorHandler/OwnNotImplemented";
import type { IActionT } from "../../Interfaces/IActionT";
import type { IPlayEngine } from "../../Interfaces/IPlayEngine";
import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import type { IMeasurement } from "../../Measurements/Interfaces/IMeasurement";
import { PerformerEvents } from "../PerformerEvents";

export class EngineTimerProvider implements IMeasurement, ITimeMeasurementProvider,
    IActionT<number> {

    timeScale: number = 1;
    constructor(playEngine: IPlayEngine) {
        this.playEngine = playEngine
        playEngine.getEngineAction().addActionT(this)
        this.timeScale = PerformerEvents.getTimeScale()
    }

    actionT(t: number): void {
        this.currentTime = t * this.timeScale
    }
    isEmptyActionT(): boolean { return false }


    getTimeMeasurement(): IMeasurement {
        return this
    }

    getTime(): number {
        return this.currentTime
    }

    setTime(time: number): void {
    }

    getStep(): number {
        throw new OwnNotImplemented();
    }
    setStep(time: number): void {
    }


    getMeasurementName(): string {
        return "Time"
    }

    getMeasurementType() {
        return 0
    }

    getMeasurementValue() {
        return this.currentTime
    }

    currentTime: number = 0

    playEngine !: IPlayEngine;

}