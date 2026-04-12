import type { IRealtimeCollectionFactory } from "../../../Interfaces/IRealtimeCollectionFactory";
import type { IComponentCollection } from "../../../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumerMotion6DEvent } from "./DataRuntimeConsumerMotion6DEvent";
import { Performer } from "../../../Performer";
import { PerformerMeasuremets } from "../../../Measurements/PerformerMeasuremets";
import { FictiveRealtimeCollection } from "../../../Fiction/FictiveRealtimeCollection";
import { RungeProcessor } from "../../../Measurements/DifferentialEquations/Processors/RungeProcessor";

export class Motion6DRealtimeFactory implements IRealtimeCollectionFactory {
    constructor() {
    }
    protected performer: Performer = new Performer();

    protected mPerformer: PerformerMeasuremets = new PerformerMeasuremets()

    createRealtimeFromCollection(collection: IComponentCollection): IRealtimeCollection {
        let processor = new RungeProcessor()
      return new FictiveRealtimeCollection()
    }
    createRealtimeFromDataConsumer(consumer: IDataConsumer): IRealtimeCollection {
        let processor = new RungeProcessor();
        return new DataRuntimeConsumerMotion6DEvent(consumer, processor)
    }

}