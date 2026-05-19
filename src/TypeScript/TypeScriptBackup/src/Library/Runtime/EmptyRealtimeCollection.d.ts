import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../Interfaces/IRealtimeCollection";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";
import type { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";
export declare class EmptyRealtimeCollection implements IRealtimeCollection {
    setComponentCollection(collection: IComponentCollection): void;
    getComponentCollection(): IComponentCollection;
    isComponentCollectionRunning(): boolean;
    setComponentCollectionRunning(running: boolean): void;
    setTimerFactory(timerFactory: ITimerFactory): void;
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void;
    timeProvider: ITimeMeasurementProvider;
    timerFactory: ITimerFactory;
    running: boolean;
    collection: IComponentCollection;
}
//# sourceMappingURL=EmptyRealtimeCollection.d.ts.map