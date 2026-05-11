import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../Interfaces/IRealtimeCollection";
import type { ITimeMeasurementProvider } from "../Interfaces/ITimeMeasurementProvider";
import type { ITimerFactory } from "../Interfaces/ITimerFactory";

export class EmptyRealtimeCollection implements IRealtimeCollection {
    setComponentCollection(collection: IComponentCollection): void {
        this.collection = collection
    }
    getComponentCollection(): IComponentCollection {
        throw new Error("Method not implemented.");
    }
    isComponentCollectionRunning(): boolean {
        throw new Error("Method not implemented.");
    }
    setComponentCollectionRunning(running: boolean): void {
        this.running = running            
    }
    setTimerFactory(timerFactory: ITimerFactory): void {
        this.timerFactory = timerFactory
    }
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void {
        this.timeProvider = timeProvider
    }

    timeProvider!: ITimeMeasurementProvider

    timerFactory!: ITimerFactory

    running: boolean = false

    collection !: IComponentCollection
}
