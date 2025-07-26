"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayMeasurement = void 0;
class ArrayMeasurement {
    constructor(arrElement, n) {
        this.name = "";
        this.n = 0;
        this.n = n;
        this.name = arrElement.getMeasurementNames()[n];
        this.type = arrElement.getMeasurementTypes()[n];
        this.array = arrElement.getMeasurementValues();
    }
    getMeasurementName() {
        return this.name;
    }
    getMeasurementType() {
        return this.type;
    }
    getMeasurementValue() {
        return this.array[this.n];
    }
}
exports.ArrayMeasurement = ArrayMeasurement;
//# sourceMappingURL=ArrayMeasurement.js.map