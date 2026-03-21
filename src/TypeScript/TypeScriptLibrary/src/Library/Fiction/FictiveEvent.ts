import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IAction } from "../Interfaces/IAction";
import { IEvent } from "../Interfaces/IEvent";

export class FictiveEvent implements IEvent {
    eventAction(): IAction {
        throw new OwnNotImplemented();
    }
    isEventEnabled(): boolean {
        throw new OwnNotImplemented();
    }
    setEnabled(enabled: boolean): void {
        throw new OwnNotImplemented();
    }

}