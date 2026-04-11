import { IActionAddRemove } from "./IActionAddRemove";
import { IObject } from "./IObject";
import { IRealtimeCollection } from "./IRealtimeCollection";

export interface IExternalUpdate {
    getExtenalUpdate(obj : IObject | undefined, realime: IRealtimeCollection): IActionAddRemove 
}