import { IAlias } from "../Interfaces/IAlias";
import { Variable } from "./Variables/Variable";


export class AliasNameMeasurement extends Variable {
    constructor(alias: IAlias, name: string) {
        super(name, undefined, undefined);
        this.alias = alias;
        this.type = alias.getAliasType(name);
    }


    getMeasurementValue(): any {
        return this.alias.getAliasValue(this.name);
    }

    public setValue(value: any): void {
        this.alias.setAliasValue(this.name, value);
    }

    alias!: IAlias;
}
