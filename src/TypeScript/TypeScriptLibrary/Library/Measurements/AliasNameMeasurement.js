"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasNameMeasurement = void 0;
class AliasNameMeasurement {
    constructor(alias, name) {
        this.name = name;
        this.alias = alias;
        this.type = alias.getAliasType(name);
    }
    getMeasurementName() {
        return this.name;
    }
    getMeasurementType() {
        return this.type;
    }
    getMeasurementValue() {
        return this.alias.getAliasValue(this.name);
    }
}
exports.AliasNameMeasurement = AliasNameMeasurement;
//# sourceMappingURL=AliasNameMeasurement.js.map