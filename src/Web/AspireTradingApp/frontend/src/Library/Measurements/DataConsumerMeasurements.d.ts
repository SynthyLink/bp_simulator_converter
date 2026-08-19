import type { IAlias } from "../Interfaces/IAlias";
import type { IDesktop } from "../Interfaces/IDesktop";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import { Performer } from "../Performer";
import { DataConsumer } from "./DataConsumer";
export declare class DataConsumerMeasurements extends DataConsumer implements IMeasurements, IAlias {
    constructor(desktop: IDesktop, name: string);
    getAliasValue(name: string): any;
    protected output: IMeasurement[];
    protected aliasTypes: Map<string, any>;
    protected aliasValues: Map<string, any>;
    protected aliasNames: string[];
    protected performer: Performer;
    protected dataVariable: any;
    protected alias: IAlias;
    protected external: Map<string, string>;
    getMeasurementsCount(): number;
    getMeasurement(i: number): IMeasurement;
    addMeasurement(measurement: IMeasurement): void;
    updateMeasurements(): void;
    getAliasType(name: string): any;
    getAliasNames(): string[];
    getAliasVаlue(name: string): any;
    setAliasValue(name: string, value: any): void;
    setExternalAliases(map: Map<string, string>): void;
    protected fmap: Map<string, string>;
}
//# sourceMappingURL=DataConsumerMeasurements.d.ts.map