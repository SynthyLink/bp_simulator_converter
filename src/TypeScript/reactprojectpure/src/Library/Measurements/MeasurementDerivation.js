"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementDerivation = void 0;
const FicvtiveMeasurement_1 = require("../Fiction/FicvtiveMeasurement");
const Measurement_1 = require("./Measurement");
class MeasurementDerivation extends Measurement_1.Measurement {
    constructor(measurement, derivation) {
        super(measurement.getMeasurementName(), measurement.getMeasurementType());
        this.measurement = new FicvtiveMeasurement_1.FictiveMeasurement();
        this.derivation = new FicvtiveMeasurement_1.FictiveMeasurement();
        this.measurement = measurement;
        this.derivation = derivation;
    }
    getDerivation() {
        return this.derivation;
    }
    setDerivation(derivation) {
    }
    getMeasurementValue() {
        return this.measurement.getMeasurementValue();
    }
}
exports.MeasurementDerivation = MeasurementDerivation;
//# sourceMappingURL=MeasurementDerivation.js.map