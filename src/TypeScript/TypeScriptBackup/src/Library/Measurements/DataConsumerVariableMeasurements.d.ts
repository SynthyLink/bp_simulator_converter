import type { IAlias } from "../Interfaces/IAlias";
import type { IDesktop } from "../Interfaces/IDesktop";
import { DataConsumer } from "./DataConsumer";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import { PerformerMeasuremets } from "./PerformerMeasuremets";
import { Variable } from "./Variables/Variable";
export declare class DataConsumerVariableMeasurements extends DataConsumer implements IMeasurements, IAlias {
    constructor(desktop: IDesktop, name: string);
    protected output: Variable[];
    protected variables: Map<string, Variable>;
    protected aliasTypes: Map<string, any>;
    protected aliasValues: Map<string, any>;
    protected aliasNames: string[];
    protected dataVariable: any;
    protected alias: IAlias;
    protected pMeasurements: PerformerMeasuremets;
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    fict: IMeasurement;
    addMeasurement(measurement: IMeasurement): void;
    updateMeasurements(): void;
    getAliasType(name: string): any;
    getAliasNames(): string[];
    getAliasValue(name: string): any;
    setAliasValue(name: string, value: any): void;
    protected addVariableValue(name: string, type: any, value: any): void;
    protected addVariable(variable: Variable): void;
}
//# sourceMappingURL=DataConsumerVariableMeasurements.d.ts.map