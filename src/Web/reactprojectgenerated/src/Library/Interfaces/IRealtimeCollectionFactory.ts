import { IComponentCollection } from "./IComponentCollection";
import { IRealtimeCollection } from "./IRealtimeCollection";
import { IDataConsumer } from "../Measurements/Interfaces/IDataConsumer";

export interface IRealtimeCollectionFactory {

    createRealtimeFromCollection(collection: IComponentCollection): IRealtimeCollection
    createRealtimeFromDataConsumer(consumer: IDataConsumer): IRealtimeCollection
}