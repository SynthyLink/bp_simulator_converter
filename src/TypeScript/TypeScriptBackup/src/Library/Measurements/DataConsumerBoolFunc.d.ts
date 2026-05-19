import type { IFunc } from "../Interfaces/IFunc";
import { Performer } from "../Performer";
import type { IDataConsumer } from "./Interfaces/IDataConsumer";
import type { IMeasurement } from "./Interfaces/IMeasurement";
export declare class DataConsumerBoolFunc implements IFunc<boolean> {
    constructor(dataConsumer: IDataConsumer, name: string);
    func(): boolean;
    measurement: IMeasurement;
    performer: Performer;
}
//# sourceMappingURL=DataConsumerBoolFunc.d.ts.map