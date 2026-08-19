import { Performer } from "../Performer";
import type { IActionAddRemoveT } from "../Interfaces/IActionAddRemoveT";
import type { IActionT } from "../Interfaces/IActionT";
import type { IRealtimeUpdate } from "./Interfaces/IRealtimeUpdate";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
export declare class RealtimeUpdateCollection implements IRealtimeUpdate, IActionT<IRealtimeUpdate> {
    pefrormer: Performer;
    getRealtimeUpdate(): IActionT<number>;
    constructor(collection: IObjectCollection);
    actionT(t: IRealtimeUpdate): void;
    isEmptyActionT(): boolean;
    action: IActionAddRemoveT<number>;
}
//# sourceMappingURL=RealtimeUpdateCollection.d.ts.map