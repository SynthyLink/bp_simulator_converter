"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasNameMeasurementFull = void 0;
const AliasNameMeasurement_1 = require("./AliasNameMeasurement");
class AliasNameMeasurementFull extends AliasNameMeasurement_1.AliasNameMeasurement {
    constructor(alias) {
        super(alias.getAlias(), alias.getNameOfAliasName());
    }
}
exports.AliasNameMeasurementFull = AliasNameMeasurementFull;
//# sourceMappingURL=AliasNameMeasurementFull.js.map