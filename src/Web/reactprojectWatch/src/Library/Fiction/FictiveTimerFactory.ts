import { TimeSpan } from "../Utilities/DateTime/TimeSpan";
import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { ITimer } from "../Interfaces/ITimer";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";

export class FictiveTimerFactory implements ITimerFactory {
    isTimerFactoryEnabled(): boolean {
        throw new OwnNotImplemented();
    }
    setTimerFactoryEnabled(enabled: boolean): void {
        throw new OwnNotImplemented();
    }
    getTimerFromFactory(timeSpan: TimeSpan): ITimer {
        throw new OwnNotImplemented();
    }

}