import type { IDesktop } from "../Interfaces/IDesktop";
import type { ISequenceFilter } from "../Utilities/Filters/Interfaces/ISequenceFilter";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import { DataConsumerMeasurements } from "./DataConsumerMeasurements";
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
    getMeasurementValue(): number;
    updateMeasurements(): void;
    getFilter(): ISequenceFilter;
    protected setFilter(): void;
    protected setMeasurement(): void;
    postSetArrow(): void;
}
//# sourceMappingURL=SequenserFilterWrapper.d.ts.map