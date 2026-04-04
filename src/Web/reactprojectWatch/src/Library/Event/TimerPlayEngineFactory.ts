import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IActionT } from "../Interfaces/IActionT";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { ITimer } from "../Interfaces/ITimer";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";
import { TimeSpan } from "../Utilities/DateTime/TimeSpan";
import { ActionArray } from "../Utilities/Generic/ActionArray";

export class TimerPlayEngineFactory implements ITimerFactory, IActionT<number> {

    constructor(engine: IPlayEngine) {
        this.engine = engine;
        engine.getEngineAction().addActionT(this);
    }
    actionT(t: number): void {
        for (let timer of this.timers) {
            timer.setTime(t)
        }
    }

    isTimerFactoryEnabled(): boolean {
        throw new Error("Method not implemented.");
    }
    setTimerFactoryEnabled(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    getTimerFromFactory(timeSpan: TimeSpan): ITimer {
        var t = new Timer(this, timeSpan)
        this.timers.push(t)
        return t
    }

    timers : Timer[] = []

    engine !: IPlayEngine

}


class Timer implements ITimer {
    constructor(factory: TimerPlayEngineFactory, span: TimeSpan) {
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
        return this.factory.isTimerFactoryEnabled()
    }

    setTimerEnabled(enabled: boolean): void {
        var b = this.factory.isTimerFactoryEnabled()
        if (b != enabled) this.factory.setTimerFactoryEnabled(enabled);
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



    factory: TimerPlayEngineFactory

    span: TimeSpan = new TimeSpan(1000000)

    last: number = Math.min()

    lt: number = Math.min()

    action: IActionAddRemove = new ActionArray()

    interval: number = 0;

}