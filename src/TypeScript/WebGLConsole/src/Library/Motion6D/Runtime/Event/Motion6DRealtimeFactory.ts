import type { IRealtimeCollectionFactory } from "../../../Interfaces/IRealtimeCollectionFactory";
import type { IComponentCollection } from "../../../Interfaces/IComponentCollection";
import type { IRealtimeCollection } from "../../../Interfaces/IRealtimeCollection";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";
import type { IObject } from "../../../Interfaces/IObject";
import { DataRuntimeConsumerMotion6DEvent } from "./DataRuntimeConsumerMotion6DEvent";
import { Performer } from "../../../Performer";
import { PerformerMeasuremets } from "../../../Measurements/PerformerMeasuremets";
import { FictiveRealtimeCollection } from "../../../Fiction/FictiveRealtimeCollection";
import { Motion6DFactory } from "../../Motion6DFactory";

export class Motion6DRealtimeFactory implements IRealtimeCollectionFactory, IObject {
    constructor() {
    }

    protected performer: Performer = new Performer();

    protected mPerformer: PerformerMeasuremets = new PerformerMeasuremets()

    getName(): string {
        return this.name;
    }


    getClassName(): string {
        return this.typeName;
    }

    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }


    createRealtimeFromCollection(collection: IComponentCollection): IRealtimeCollection {
        //  let processor = new RungeProcessor()
        console.log(collection)
        return new FictiveRealtimeCollection()
    }

    createRealtimeFromDataConsumer(consumer: IDataConsumer): IRealtimeCollection {
        return new DataRuntimeConsumerMotion6DEvent(consumer, new Motion6DFactory())
    }

    protected typeName: string = "Motion6DRealtimeFactory";

    protected types: string[] = ["IObject", "IRealtimeCollectionFactory", "Motion6DRealtimeFactory"];

    protected name: string = "";

}