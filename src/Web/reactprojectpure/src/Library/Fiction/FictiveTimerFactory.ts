import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { ITimer } from "../Interfaces/ITimer";
import { ITimerFactory } from "../Interfaces/ITimerFactory";
import { TimeSpan } from "../Utilities/DateTime/TimeSpan";

export class FictiveTimerFactory implements ITimerFactory {
    getTimerFromFactory(timeSpan: TimeSpan): ITimer {
        throw new OwnNotImplemented();
    }

}