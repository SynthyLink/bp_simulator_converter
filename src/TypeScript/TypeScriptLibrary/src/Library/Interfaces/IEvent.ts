import { IAction } from "./IAction";

export interface IEvent {

    eventAction(): IAction

    isEventEnabled(): boolean

    setEnabled(enabled: boolean): void
}
