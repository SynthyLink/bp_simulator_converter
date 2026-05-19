import type { IDesktop } from "../Interfaces/IDesktop";
import type { ISequenceFilter } from "../Utilities/Filters/Interfaces/ISequenceFilter";
import { DataConsumerMeasurements } from "./DataConsumerMeasurements";
import type { IMeasurement } from "./Interfaces/IMeasurement";
export declare class SequenceFilterWrapper extends DataConsumerMeasurements implements IMeasurement {
    protected type: string;
    protected mimax: boolean;
    protected count: number;
    protected input: string;
    protected result: number | undefined;
    protected measurement: IMeasurement;
    filter: ISequenceFilter;
    constructor(desktop: IDesktop, name: string);
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    ficI: number;
    getMeasurementName(): string;
    getMeasurementType(): number;
    getMeasurementValue(): number | undefined;
    updateMeasurements(): void;
    protected setFilter(): void;
    protected setMeasurement(): void;
    postSetArrow(): void;
}
//# sourceMappingURL=SequenserFilterWrapper.d.ts.map