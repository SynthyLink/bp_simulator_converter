import { IAddRemove } from "../../Interfaces/IAddRemove";
import { IDataConsumer } from "../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumer } from "../../Runtime/DataRuntimeConsumer";

export class DataRuntimeConsumerMotion6D extends DataRuntimeConsumer {
    constructor(dataConsumer: IDataConsumer) {
        super(dataConsumer)
    }

    protected prepare(dataConsumer: IDataConsumer): void {
        super.prepare(dataConsumer)
    }

}