import { IAlias } from "../Interfaces/IAlias";
import { IDesktop } from "../Interfaces/IDesktop";
import { Performer } from "../Performer";
import { DataConsumer } from "./DataConsumer";
import { IMeasurement } from "./Interfaces/IMeasurement";
import { IMeasurements } from "./Interfaces/IMeasurements";
import { PefrormerMeasuremets } from "./PefrormerMeasuremets";
import { Variable } from "./Variable";

export class DataConsumerVariadbleMeasurements extends DataConsumer implements IMeasurements, IAlias {
    constructor(desktop: IDesktop, name: string) {
        super(desktop, name);
        this.alias = this;
        this.typeName = "DataConsumerVariadbleMeasurements";
        this.types.push("DataConsumerVariadbleMeasurements");
        this.types.push("IMeasurements");
        this.types.push("IAlias");
    }

  
    protected output: Variable[] = [];


    protected variables: Map<string, Variable> = new Map();


    protected aliasTypes: Map<string, any> = new Map();

    protected aliasValues: Map<string, any> = new Map();

    protected aliasNames: string[] = [];

    protected performer: Performer = new Performer();

    protected variable: any;

    protected alias !: IAlias;

    protected pMeasurements : PefrormerMeasuremets = new PefrormerMeasuremets();


    getMeasurementsCount(): number {
        return this.output.length;
    }

    getMeasurement(i: number): IMeasurement {
        return this.output[i];
    }



    

    addMeasurement(measurement: IMeasurement): void {
    }


    updateMeasurements(): void {
    }

    getAliasType(name: string): any {
        return this.aliasTypes.get(name);
    }



    getAliasNames(): string[] {
        return this.aliasNames;
    }



    getAliasValue(name: string) {
        return this.aliasValues.get(name);
    }

    setAliasValue(name: string, value: any) {
        this.performer.setAliasType(name, value, this.aliasTypes, this.aliasNames);
        this.aliasValues.set(name, value);
    }

    protected addVariable(variable: Variable): void
    {
        this.output.push(variable);
        this.variables.set(variable.getMeasurementName(), variable);
    }


}
