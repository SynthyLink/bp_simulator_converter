import { OwnNotImplemented } from "../ErrorHandler/OwnNotImplemented";
import { IEvent } from "../Interfaces/IEvent";
import { IEventHandler } from "../Interfaces/IEventHandler";

export class FictiveEventHandler implements IEventHandler {
    getChildernT(): IEvent[] {
        throw new OwnNotImplemented();
    }
    addChildT(child: IEvent): void {
        throw new OwnNotImplemented();
    }
    removeChildT(child: IEvent): void {
        throw new OwnNotImplemented();
    }

}