import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { ITimer } from "../Interfaces/ITimer";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";
import { TimeSpan } from "../Utilities/DateTime/TimeSpan";

export class FictiveTimerFactory implements ITimerFactory {
    getTimerFromFactory(timeSpan: TimeSpan): ITimer {
        throw new OwnNotImplemented();
    }

}