
import { DataRuntimeConsumerEvent } from "../../../Event/Runtime/DataRuntimeConsumerEvent";
import type { IDataConsumer } from "../../../Measurements/Interfaces/IDataConsumer";

export class DataRuntimeConsumerMotion6DEvent extends DataRuntimeConsumerEvent {
    constructor(dataConsumer: IDataConsumer) {
        super(dataConsumer);
    }
}