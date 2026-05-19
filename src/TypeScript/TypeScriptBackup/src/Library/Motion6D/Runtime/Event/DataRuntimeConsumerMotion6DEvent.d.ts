import { DataRuntimeConsumerEvent } from "../../../Event/Runtime/DataRuntimeConsumerEvent";
import { Motion6DPerformer } from "../../Motion6DPerformer";
import type { IActionAddRemove } from "../../../Interfaces/IActionAddRemove";
import type { IFactory } from "../../../Interfaces/IFactory";
import type { IObject } from "../../../Interfaces/IObject";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
export declare class DataRuntimeConsumerMotion6DEvent extends DataRuntimeConsumerEvent {
    protected motionPeformer: Motion6DPerformer;
    constructor(dataConsumer: IDataConsumer, factory: IFactory);
    protected prepare(dataConsumer: IDataConsumer): void;
    getExternalUpdate(obj: IObject | undefined, realime: IRealtimeCollection, act: IActionAddRemove): void;
}
//# sourceMappingURL=DataRuntimeConsumerMotion6DEvent.d.ts.map