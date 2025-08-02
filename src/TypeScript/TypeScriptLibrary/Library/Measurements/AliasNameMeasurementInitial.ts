import { AliasNameMeasurement } from "./AliasNameMeasurement";
import { IInitalValue } from "./Interfaces/IInitialValue";

export class AliasNameMeasurementInitial extends AliasNameMeasurement implements IInitalValue {
    init !: any;
    constructor(alias: IAlias, name: string, init: any) {
        super(alias, name);
        this.init = init;
    }
    setInitialValue(): void {
       this.value = this.init;
    }
}