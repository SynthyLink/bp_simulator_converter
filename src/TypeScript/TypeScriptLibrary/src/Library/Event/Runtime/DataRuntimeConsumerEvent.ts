import type { IActionAddRemove } from "../../Interfaces/IActionAddRemove";
import type { ICategoryObject } from "../../Interfaces/ICategoryObject";
import type { IComponentCollection } from "../../Interfaces/IComponentCollection";
import type { IEvent } from "../../Interfaces/IEvent";
import type { IEventHandler } from "../../Interfaces/IEventHandler";
import type { IExternalUpdate } from "../../Interfaces/IExternalUpdate";
import type { IExternalUpdateClient } from "../../Interfaces/IExternalUpdateClient";
import type { IObject } from "../../Interfaces/IObject";
import type { IRealtimeCollection } from "../../Interfaces/IRealtimeCollection";
import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import type { ITimerFactory } from "../../Interfaces/ITimerFactory";
import type { IDifferentialEquationProcessor } from "../../Measurements/DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IDataConsumer } from "../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumerODE } from "../../Runtime/DataRuntimeConsumerODE";
import { PerformerEvents } from "../PerformerEvents";

export class DataRuntimeConsumerEvent extends DataRuntimeConsumerODE implements IRealtimeCollection, IExternalUpdate
{

    protected ePerformer: PerformerEvents = new PerformerEvents()

    protected isEnabled: boolean = false

    constructor(dataConsumer: IDataConsumer, processor: IDifferentialEquationProcessor) {
        super(dataConsumer, processor)
        var up = this.dataConsumer as unknown as IExternalUpdateClient
        var ob = this.dataConsumer as unknown as IObject;
        up.setExternalUpdate(this.getExtenalUpdate(ob, this))
        console.log("UPPP", up)
    }

    getExtenalUpdate(obj: IObject | undefined, realime: IRealtimeCollection): IActionAddRemove {
        return  this.mPerformer.createUpdateMeasurementsAction(this)
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