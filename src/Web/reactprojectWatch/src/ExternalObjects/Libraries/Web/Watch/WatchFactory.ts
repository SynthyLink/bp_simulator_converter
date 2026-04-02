import type { IActionAddRemove } from "../../../../Library/Interfaces/IActionAddRemove";
import type { IPlayEngine } from "../../../../Library/Interfaces/IPlayEngine";
import type { ITimer } from "../../../../Library/Interfaces/ITimer";
import type { ITimerFactory } from "../../../../Library/Interfaces/ITimerFactory";
import type { IMeasurement } from "../../../../Library/Measurements/Interfaces/IMeasurement";
import type { ITimeMeasurementProvider } from "../../../../Library/Measurements/Interfaces/ITimeMeasurementProvider";
import { TimeSpan } from "../../../../Library/Utilities/DateTime/TimeSpan";
import { ActionArray } from "../../../../Library/Utilities/Generic/ActionArray";

export class WatchFactory implements ITimerFactory, IPlayEngine, IMeasurement, ITimeMeasurementProvider
{
    enabled: boolean = false;

    engineEnabled: boolean = false;

    currentTime: number = 0

    timers: Timer[] = [];


    getTimeMeasurement(): IMeasurement {
        return this;
    }
    getTime(): number {
        return this.currentTime * 0.001
    }
    setTime(time: number): void {
    }
    getStep(): number {
        return 0;
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



    isEngineEnabled(): boolean {
        return this.engineEnabled
    }

    setEngineEnabled(enabled: boolean): void {
        if (enabled == this.engineEnabled) return;
        if (!enabled) return;
        this.engineEnabled = true;
        this.loop(0)
    }

    getTimerFromFactory(timeSpan: TimeSpan): ITimer {
        let t = new Timer(this, timeSpan)
        this.timers.push(t)
        return t
    }

    public setEnabled(isEnabled: boolean): void {
        if (isEnabled == this.enabled) return
        this.enabled = isEnabled
    }

    public isEnabled(): boolean {
        return this.enabled

    }


    private loop(time: DOMHighResTimeStamp) {
        this.currentTime = time
        if (time > 1000) return
        requestAnimationFrame((time) => this.loop(time));
        for (let timer of this.timers) {
            timer.setTime(time)
        }
    }

}

class Timer implements ITimer
{
    constructor(factory: WatchFactory, span: TimeSpan) {
        this.span = span
        this.factory = factory
        this.interval = span.getTotalMilliseconds()
        console.log(span)
        console.log(this.interval)
    }

    getTimerTimeSpan(): TimeSpan {
        return this.span
    }

    isTimerEnabled(): boolean {
        return this.factory.isEnabled()
    }

    setTimerEnabled(enabled: boolean): void {
        var b = this.factory.isEnabled()
        if (b != enabled) this.factory.setEnabled(enabled)
    }

    getTimerEvent(): IActionAddRemove {
        return this.action
    }

    setTime(time: number): void {
        if (this.last == this.lt) {
            this.last = time
            return
        }
     if (time > this.last + this.interval) {
            this.action.action();
            this.last = time
       }
    }



    factory: WatchFactory

    span: TimeSpan = new TimeSpan(1000000)

    last: number = Math.min()

    lt: number = Math.min()

    action: IActionAddRemove = new ActionArray()

    interval: number = 0;

}