import type { IRealtimeCollectionFactory } from "../../../Interfaces/IRealtimeCollectionFactory";
import type { IComponentCollection } from "../../../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumerMotion6DEvent } from "./DataRuntimeConsumerMotion6DEvent";
import { Performer } from "../../../Performer";
import { PerformerMeasuremets } from "../../../Measurements/PerformerMeasuremets";

export class Motion6DRealtimeFactory implements IRealtimeCollectionFactory {
    protected performer: Performer = new Performer();

    protected mPerformer: PerformerMeasuremets = new PerformerMeasuremets()

    createRealtimeFromCollection(collection: IComponentCollection): IRealtimeCollection {
        throw new Error("Method not implemented.");
    }
    createRealtimeFromDataConsumer(consumer: IDataConsumer): IRealtimeCollection {
        return new DataRuntimeConsumerMotion6DEvent(consumer, PerformerMeasuremets.getDifferentialEquationProcessor())
    }

}