import { IMeasurement } from "./Interfaces/IMeasurement";

export class Variable implements IMeasurement {
    value !: any;
    type !: any;
    name !: string;

    constructor(name: string, type: any, value: any) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

    getMeasurementName(): string {
        return this.name;
    }

    getMeasurementType() {
        return this.type;
    }

    getMeasurementValue() {
        return this.value;
    }

    public setValue(value: any) {
        this.value = value;
    }


}