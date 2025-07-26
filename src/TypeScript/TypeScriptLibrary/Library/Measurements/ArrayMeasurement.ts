import { IArrayElementMeasurement } from "./Interfaces/IArrayElemetMeasurements";
import { IMeasurement } from "./Interfaces/IMeasurement";

export class ArrayMeasurement implements IMeasurement {
    array !: [];
    name: string = "";
    type !: any;
    n: number = 0;

    constructor(arrElement: IArrayElementMeasurement, n: number) {
        this.n = n;
        this.name = arrElement.getMeasurementNames()[n];
        this.type = arrElement.getMeasurementTypes()[n];
        this.array = arrElement.getMeasurementValues();
    }

    getMeasurementName(): string {
        return this.name;
    }
    getMeasurementType() : any {
        return this.type;
    }
    getMeasurementValue() : any {
        return this.array[this.n];
    }
}

