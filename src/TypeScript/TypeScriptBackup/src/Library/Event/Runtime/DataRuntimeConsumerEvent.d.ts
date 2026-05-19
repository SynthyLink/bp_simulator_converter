import type { IAction } from "../../Interfaces/IAction";
import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { IComponentCollection } from "../../Interfaces/IComponentCollection";
import type { IExternalUpdate } from "../../Interfaces/IExternalUpdate";
import type { IFactory } from "../../Interfaces/IFactory";
import type { IObject } from "../../Interfaces/IObject";
import type { IRealtimeCollection } from "../../Interfaces/IRealtimeCollection";
import type { ITimerFactory } from "../../Interfaces/ITimerFactory";
import type { IDataConsumer } from "../../Measurements/Interfaces/IDataConsumer";
import type { ITimeMeasurementProvider } from "../../Measurements/Interfaces/ITimeMeasurementProvider";
import { DataRuntimeConsumerODE } from "../../Runtime/DataRuntimeConsumerODE";
import { PerformerEvents } from "../PerformerEvents";
export declare class DataRuntimeConsumerEvent extends DataRuntimeConsumerODE implements IRealtimeCollection, IExternalUpdate {
    protected ePerformer: PerformerEvents;
    protected isEnabled: boolean;
    constructor(dataConsumer: IDataConsumer, factory: IFactory);
    getExternalUpdate(obj: IObject | undefined, realime: IRealtimeCollection, action: IActionAddRemove): void;
    act: IAction;
    fo: IObject | undefined;
    fre: IRealtimeCollection;
    protected prepare(dataConsumer: IDataConsumer): void;
    getComponentCollection(): IComponentCollection;
    setComponentCollection(collection: IComponentCollection): void;
    protected fc: IComponentCollection;
    isComponentCollectionRunning(): boolean;
    setComponentCollectionRunning(running: boolean): void;
    setTimerFactory(timerFactory: ITimerFactory): void;
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void;
}
//# sourceMappingURL=DataRuntimeConsumerEvent.d.ts.map