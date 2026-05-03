import { IRealtimeCollection } from "../Interfaces/IRealtimeCollection";
import { IComponentCollection } from "../Interfaces/IComponentCollection";
import { ITimerFactory } from "../Interfaces/ITimerFactory";
import { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";

export class FictiveRealtimeCollection implements IRealtimeCollection {
    setComponentCollection(collection: IComponentCollection): void {
        throw new Error("Method not implemented.");
    }
    getComponentCollection(): IComponentCollection {
        throw new Error("Method not implemented.");
    }
    isComponentCollectionRunning(): boolean {
        throw new Error("Method not implemented.");
    }
    setComponentCollectionRunning(running: boolean): void {
        throw new Error("Method not implemented.");
    }
    setTimerFactory(timerFactory: ITimerFactory): void {
        throw new Error("Method not implemented.");
    }
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void {
        throw new Error("Method not implemented.");
    }

}