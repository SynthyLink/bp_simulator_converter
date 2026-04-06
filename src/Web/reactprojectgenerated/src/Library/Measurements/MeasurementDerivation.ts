import { FictiveMeasurement } from "../Fiction/FicvtiveMeasurement";
import { Measurement } from "./Measurement";
import type { IDerivation } from "./Interfaces/IDerivation";
import type { IMeasurement } from "./Interfaces/IMeasurement";

export class MeasurementDerivation extends Measurement implements IDerivation
{
    measurement: IMeasurement = new FictiveMeasurement();

    derivation: IMeasurement = new FictiveMeasurement();

    constructor(measurement: IMeasurement, derivation: IMeasurement) {
        super(measurement.getMeasurementName(), measurement.getMeasurementType())
        this.measurement = measurement
        this.derivation = derivation;
    }
    getDerivation(): IMeasurement {
        return this.derivation;
    }
    setDerivation(derivation: IMeasurement): void {
    }


    getMeasurementValue() {
        return this.measurement.getMeasurementValue();
    }

}