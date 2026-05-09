import EventEmitter from "events";
import type { IActionAddRemoveT } from "../../Interfaces/IActionAddRemoveT";
import type { IActionT } from "../../Interfaces/IActionT";

export class ListenerEventT<T> implements IActionAddRemoveT<T> {

    constructor(event: EventEmitter) {
        this.event = event
    }

    addActionT(action: IActionT<T> | undefined): void {
        if (action == undefined) return;
        var s = "action_" + this.n
        this.map.set(s, action)
        var t = (data: any) => action.actionT(data)
        this.event.on(s, t)
    }

    removeActionT(action: IActionT<T> | undefined): void {
    }

    clearActionsT(): void {
    }
    actionT(t: T): void {
    }
    isEmptyActionT(): boolean {
        return false;
    }

   

    map: Map<string, IActionT<T>> = new Map()

    n: number = 0;

    protected event !: EventEmitter 

}