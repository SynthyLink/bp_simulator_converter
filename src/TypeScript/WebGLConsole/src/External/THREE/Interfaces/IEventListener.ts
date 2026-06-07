import type { EventDispatcher } from "../core/EventDispatcher";

export interface IEventListener1 {
    call(handler: EventDispatcher, event: any): void
}