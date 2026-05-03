import type { IMeasurement } from "../Measurements/Interfaces/IMeasurement";

export class FictiveMeasurement implements IMeasurement {
    getMeasurementName(): string {
        return "Fiction";
    }
    getMeasurementType() {
        return 0;
    }
    getMeasurementValue() {
        return 0;
    }

}