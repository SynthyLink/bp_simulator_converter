import { Performer } from "../Performer";
import type { IComparator } from "../Utilities/Sort/Interfaces/IComparator";
import type { IDataConsumer } from "./Interfaces/IDataConsumer";
import type { IMeasurements } from "./Interfaces/IMeasurements";
export declare class MeasurementsComparator implements IComparator<IMeasurements> {
    constructor(performer: Performer);
    compare(x: IMeasurements, y: IMeasurements): number;
    protected isSource(dc: IDataConsumer, m: IMeasurements): boolean;
    performer: Performer;
}
//# sourceMappingURL=MeasurementsComparator.d.ts.map