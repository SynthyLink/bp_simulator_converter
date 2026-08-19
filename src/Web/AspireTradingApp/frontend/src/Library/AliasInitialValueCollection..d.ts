import { InitialValueCollection } from "./InitialValueCollection";
import type { IAlias } from "./Interfaces/IAlias";
import type { IMeasurements } from "./Measurements/Interfaces/IMeasurements";
import { Performer } from "./Performer";
export declare class AliasInitialValueCollection extends InitialValueCollection {
    performer: Performer;
    constructor(alias: IAlias, measurements: IMeasurements);
}
//# sourceMappingURL=AliasInitialValueCollection..d.ts.map