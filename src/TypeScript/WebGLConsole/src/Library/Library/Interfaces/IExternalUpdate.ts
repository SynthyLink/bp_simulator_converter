import type { IActionAddRemove } from "./IActionAddRemove";
import type { IObject } from "./IObject";
import type { IRealtimeCollection } from "./IRealtimeCollection";

export interface IExternalUpdate {
    getExtenalUpdate(obj: IObject | undefined, realime: IRealtimeCollection, action: IActionAddRemove): void 
}