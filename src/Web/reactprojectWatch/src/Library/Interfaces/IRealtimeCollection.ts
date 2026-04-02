import { IComponentCollection } from "./IComponentCollection";

export interface IRealtimeCollection
{
    setComponentCollection(collection: IComponentCollection): void

    getComponentCollection() : IComponentCollection

    isComponentCollectionRunning(): boolean

    setComponentCollectionRunning(running : boolean) : void

}