import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IActionT } from "../Interfaces/IActionT";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { ITimer } from "../Interfaces/ITimer";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";
import { TimeSpan } from "../Utilities/DateTime/TimeSpan";
export declare class TimerPlayEngineFactory implements ITimerFactory {
    constructor(engine: IPlayEngine);
    actionT(t: number): void;
    isEmptyActionT(): boolean;
    isTimerFactoryEnabled(): boolean;
    setTimerFactoryEnabled(enabled: boolean): void;
    enabled: boolean;
    getTimerFromFactory(timeSpan: TimeSpan): ITimer;
    timers: Timer[];
    engine: IPlayEngine;
}
declare class Timer implements ITimer {
    actionT: IActionT<number>;
    constructor(factory: TimerPlayEngineFactory, span: TimeSpan);
    setTimerEventT(action: IActionT<number>): void;
    getTimerTimeSpan(): TimeSpan;
    isTimerEnabled(): boolean;
    setTimerEnabled(enabled: boolean): void;
    getTimerEvent(): IActionAddRemove;
    setTime(time: number): void;
    factory: TimerPlayEngineFactory;
    span: TimeSpan;
    last: number;
    lt: number;
    action: IActionAddRemove;
    interval: number;
}
export {};
//# sourceMappingURL=TimerPlayEngineFactory.d.ts.map