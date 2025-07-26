import { IAlias } from "../Interfaces/IAlias";
import { IAliasName } from "../Interfaces/IAliasName";
import { IMeasurement } from "./Interfaces/IMeasurement";

export class AliasNameMeasurement implements IMeasurement
{
    constructor(alias: IAlias, name: string) {
        this.name = name;
        this.alias = alias;
        this.type = alias.getAliasType(name);
    }
    getMeasurementName(): string {
        return this.name;
    }
    getMeasurementType() {
        return this.type;
    }

   
    getMeasurementValue() : any {
        return this.alias.getAliasValue(this.name)
    }
    name !: string;
    type !: any;
    alias !: IAlias;
}