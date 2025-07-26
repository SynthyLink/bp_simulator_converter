import { IAliasName } from "../Interfaces/IAliasName";
import { AliasNameMeasurement } from "./AliasNameMeasurement";

export class AliasNameMeasurementFull extends AliasNameMeasurement {
    constructor(alias: IAliasName) {
        super(alias.getAlias(), alias.getNameOfAliasName());
    }
}