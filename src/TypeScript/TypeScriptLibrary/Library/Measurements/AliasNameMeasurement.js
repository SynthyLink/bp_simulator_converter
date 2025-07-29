"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasNameMeasurement = void 0;
const Variable_1 = require("./Variable");
class AliasNameMeasurement extends Variable_1.Variable {
    constructor(alias, name) {
        super(name, undefined, undefined);
        this.alias = alias;
        this.type = alias.getAliasType(name);
    }
    getMeasurementValue() {
        return this.alias.getAliasValue(this.name);
    }
    setValue(value) {
        this.alias.setAliasValue(this.name, value);
    }
}
exports.AliasNameMeasurement = AliasNameMeasurement;
//# sourceMappingURL=AliasNameMeasurement.js.map