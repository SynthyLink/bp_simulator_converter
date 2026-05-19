import type { IRealtimeCollectionFactory } from "../../../Interfaces/IRealtimeCollectionFactory";
import type { IComponentCollection } from "../../../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
import { Motion6DFactory } from "../../Motion6DFactory";
import { FactoryObject } from "../../../FactorytObject";
export declare class Motion6DRealtimeFactory extends FactoryObject implements IRealtimeCollectionFactory {
    constructor(mF: Motion6DFactory);
    createRealtimeFromCollection(collection: IComponentCollection): IRealtimeCollection;
    collection: IComponentCollection;
    mF: Motion6DFactory;
    createRealtimeFromDataConsumer(consumer: IDataConsumer): IRealtimeCollection;
}
//# sourceMappingURL=Motion6DRealtimeFactory.d.ts.map