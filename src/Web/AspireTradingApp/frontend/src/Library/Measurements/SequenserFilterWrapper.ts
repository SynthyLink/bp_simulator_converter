import type { IDesktop } from "../Interfaces/IDesktop";
import type { ISequenceFilter } from "../Utilities/Filters/Interfaces/ISequenceFilter";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import { AverageSequenceFilter } from "../Utilities/Filters/AverageSequenceFilter";
import { DonchianSequenceFilter } from "../Utilities/Filters/DonchianSequenceFilter";
import { SequenceFilterType } from "../Utilities/Filters/Interfaces/SequenceFilterType";
import { DataConsumerMeasurements } from "./DataConsumerMeasurements";

export class SequenceFilterWrapper extends DataConsumerMeasurements implements IMeasurement {

    protected type: string = SequenceFilterType.Avarage;

    protected mimax: boolean = true;

    protected count: number = 2;

    protected input: string = "";

    protected result: number | undefined = undefined;

    protected measurement !: IMeasurement;

    filter: ISequenceFilter = new DonchianSequenceFilter(2, true);

    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.types.push("IMeasurement")
        this.types.push("SequenceFilterWrapper")
        this.typeName = "SequenceFilterWrapper"
    }

    getMeasurementsCount(): number {
        return 1;
    }

    getMeasurement(i: number): IMeasurement {
        this.ficI = i
        return this;
    }

    ficI: number = 0

    getMeasurementName(): string {
        return "Output";
    }
    getMeasurementType() {
        return 0;
    }
    getMeasurementValue() {
        return this.result;
    }

    updateMeasurements(): void {
        this.performer.updateChildrenData(this);
        var x = this.measurement.getMeasurementValue()
        if (typeof x === 'number') {
            var a = x as any as number;
            this.result = this.filter.getFilterValue(a);
        }

    }

    public getFilter(): ISequenceFilter {
        return this.filter
    }


    protected setFilter(): void {
        if (this.type == SequenceFilterType.Avarage) {
            this.filter = new AverageSequenceFilter(this.count)
            return;
        }
        this.filter = new DonchianSequenceFilter(this.count, this.mimax)
    }

    protected setMeasurement(): void {
        this.measurement = this.performer.getMeasurementDC(this, this.input)
    }

    postSetArrow(): void {
        this.setFilter();
        this.setMeasurement();
    }

    

}