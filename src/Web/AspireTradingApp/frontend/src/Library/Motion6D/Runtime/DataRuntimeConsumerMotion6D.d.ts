import type { IFactory } from "../../Interfaces/IFactory";
import type { IDataConsumer } from "../../Measurements/Interfaces/IDataConsumer";
import { DataRuntimeConsumerODE } from "../../Runtime/DataRuntimeConsumerODE";
export declare class DataRuntimeConsumerMotion6D extends DataRuntimeConsumerODE {
    constructor(dataConsumer: IDataConsumer, factory: IFactory);
    protected prepare(dataConsumer: IDataConsumer): void;
}
//# sourceMappingURL=DataRuntimeConsumerMotion6D.d.ts.map