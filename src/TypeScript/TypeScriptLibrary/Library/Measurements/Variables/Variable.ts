import { IObject } from "../../Interfaces/IObject";
import { IValue } from "../../Interfaces/IValue";
import { Performer } from "../../Performer";
import { IMeasurement } from "../Interfaces/IMeasurement";


export class Variable implements IMeasurement, IObject, IValue {
    value: any = new Object();;
    type: any = new Object();
    name: string = "";

    className: string = "Variable";

    types: string[] = ["Variable", "IMeasurement", "IObject", "IValue"];

    performer: Performer = new Performer();

    constructor(name: string, type: any, value: any) {
        this.name = name;
        this.type = type;
        this.value = value;

    }
    getIValue() {
        return this.value;
    }
    setIValue(value: any): void {
        this.value = value;
    }


    getClassName(): string {
        return this.className;
    }
    imlplementsType(type: string): boolean {
        return this.types.indexOf(type) >= 0;
    }
    getName(): string {
        return this.name;
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



}
