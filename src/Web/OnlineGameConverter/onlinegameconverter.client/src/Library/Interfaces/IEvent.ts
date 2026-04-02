import type  { IActionAddRemove } from "./IActionAddRemove";

export interface IEvent {

    eventAction(): IActionAddRemove

    isEventEnabled(): boolean

    setEnabled(enabled: boolean): Promise<void>
}
