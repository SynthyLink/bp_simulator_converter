import { IComponentCollection } from "./IComponentCollection";
import { IRealtimeCollection } from "./IRealtimeCollection";
import { IDataConsumer } from "../Measurements/Interfaces/IDataConsumer";
import { IFactory } from "./IFactory";

export interface IRealtimeCollectionFactory {

    createRealtimeFromCollection(collection: IComponentCollection, factory: IFactory): IRealtimeCollection
    createRealtimeFromDataConsumer(consumer: IDataConsumer, factory: IFactory): IRealtimeCollection
}