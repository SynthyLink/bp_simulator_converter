import type { IRealtimeCollectionFactory } from "../../../Interfaces/IRealtimeCollectionFactory";
import type { IComponentCollection } from "../../../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumerMotion6DEvent } from "./DataRuntimeConsumerMotion6DEvent";

export class Motion6DRealtimeFactory implements IRealtimeCollectionFactory {
    createRealtimeFromCollection(collection: IComponentCollection): IRealtimeCollection {
        throw new Error("Method not implemented.");
    }
    createRealtimeFromDataConsumer(consumer: IDataConsumer): IRealtimeCollection {
        return new  DataRuntimeConsumerMotion6DEvent(consumer)
    }

}