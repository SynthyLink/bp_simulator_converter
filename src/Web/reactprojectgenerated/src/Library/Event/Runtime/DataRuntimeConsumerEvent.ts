import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IComponentCollection } from "../../Interfaces/IComponentCollection";
import type { IEvent } from "../../Interfaces/IEvent";
import type { IEventHandler } from "../../Interfaces/IEventHandler";
import type { IRealtimeCollection } from "../../Interfaces/IRealtimeCollection";
import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import type { ITimerFactory } from "../../Interfaces/ITimerFactory";
import type { IDataConsumer } from "../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumer } from "../../Runtime/DataRuntimeConsumer";
import { PerformerEvents } from "../PerformerEvents";

export class DataRuntimeConsumerEvent extends DataRuntimeConsumer implements IRealtimeCollection {

    protected ePerformer: PerformerEvents = new PerformerEvents()

    protected isEnabled: boolean = false

    constructor(dataConsumer: IDataConsumer) {
        super(dataConsumer);
    }

    protected prepare(dataConsumer: IDataConsumer) {
        super.prepare(dataConsumer)
        let x = this.performer.convertObject<IEventHandler, IDataConsumer>(dataConsumer, "IEventHandler")
        if (x.length == 0) return
        let evetns = x[0].getChildernT();
        for (let event of evetns) {
            let y = this.performer.convertObject<ICategoryObject, IEvent>(event, "ICategoryObject")
            if (y.length > 0) {
                let z = y[0]
                if (!this.categoryObjects.includes(z)) {
                    this.categoryObjects.push(z)
                }
            }
        }

    }

    getComponentCollection(): IComponentCollection {
        return this
    }
    setComponentCollection(collection: IComponentCollection): void {
        
    }
    isComponentCollectionRunning(): boolean {
        return this.isEnabled
    }

    setComponentCollectionRunning(running: boolean): void {
        if (this.isEnabled == running) return
        this.isEnabled = running
        this.ePerformer.setComponentCollectionEnabled(this, running)
    }

    public setTimerFactory(timerFactory: ITimerFactory): void {
        this.ePerformer.setComponentCollectionTimer(this, timerFactory);
    }

    public setTimeProvider(timeProvider: ITimeMeasurementProvider): void {
        this.mPerformer.setTimeProviderCollection(this, timeProvider)
    }
}