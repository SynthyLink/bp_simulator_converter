import type { ITimerFactory } from "./ITimerFactory";

export interface ITimerConsumer {
    setTimer(timerFactory: ITimerFactory): void
}