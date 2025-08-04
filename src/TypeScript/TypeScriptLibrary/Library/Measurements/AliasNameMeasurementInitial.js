"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasNameMeasurementInitial = void 0;
const AliasNameMeasurement_1 = require("./AliasNameMeasurement");
class AliasNameMeasurementInitial extends AliasNameMeasurement_1.AliasNameMeasurement {
    constructor(alias, name, init) {
        super(alias, name);
        this.init = init;
    }
    setInitialValue() {
        this.value = this.init;
    }
}
exports.AliasNameMeasurementInitial = AliasNameMeasurementInitial;
//# sourceMappingURL=AliasNameMeasurementInitial.js.map