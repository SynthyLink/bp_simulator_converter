import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IEvent } from "../Interfaces/IEvent";

export class FictiveEvent implements IEvent {
    setEventEnabled(enabled: boolean): void {
        throw new OwnNotImplemented();
    }
    eventAction(): IActionAddRemove {
        throw new OwnNotImplemented();
    }
    isEventEnabled(): boolean {
        throw new OwnNotImplemented();
    }
    async setEnabled(enabled: boolean): Promise<void> {
    }

}