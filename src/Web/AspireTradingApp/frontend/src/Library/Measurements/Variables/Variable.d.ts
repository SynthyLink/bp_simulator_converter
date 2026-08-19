import type { IObject } from "../../Interfaces/IObject";
import type { IValue } from "../../Interfaces/IValue";
import { Performer } from "../../Performer";
import type { IDerivation } from "../Interfaces/IDerivation";
import type { IMeasurement } from "../Interfaces/IMeasurement";
export declare class Variable implements IMeasurement, IObject, IValue, IDerivation {
    value: any;
    type: any;
    name: string;
    className: string;
    types: string[];
    performer: Performer;
    measurement: IMeasurement;
    derivation: Variable;
    constructor(name: string, type: any, value: any);
    getIValue(): any;
    setIValue(value: any): void;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    getName(): string;
    getMeasurementName(): string;
    getMeasurementType(): any;
    getMeasurementValue(): any;
    getDerivation(): IMeasurement;
    setDerivation(derivation: IMeasurement): void;
    setDerivationVarible(variable: Variable): void;
}
//# sourceMappingURL=Variable.d.ts.map