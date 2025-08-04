
import { IObject } from "../../Interfaces/IObject";
import { Performer } from "../../Performer";
import { IMeasurement } from "../Interfaces/IMeasurement";
import { ISetValue } from "../../Interfaces/ISetValue";

export class Variable implements IMeasurement, IObject, ISetValue
{
    value !: any;
    type !: any;
    name !: string;

    className: string = "";

    types: string[] = ["Variable", "IMeasurement", "IObject", "ISetValue"];

    performer: Performer = new Performer();

    constructor(name: string, type: any, value: any) {
        this.name = name;
        this.type = type;
        this.value = value;
        
    }
    setOwnValue(value: any): void {
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