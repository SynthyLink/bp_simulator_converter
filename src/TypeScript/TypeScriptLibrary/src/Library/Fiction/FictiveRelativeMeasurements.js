"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FictiveRelativeMeasurements = void 0;
const RelativeMeasurements_1 = require("../Motion6D/Objects/RelativeMeasurements");
class FictiveRelativeMeasurements extends RelativeMeasurements_1.RelativeMeasurements {
    constructor(desktop, name) {
        super(desktop, name);
        this.typeName = "FictiveRelativeMeasurements";
        this.types.push("FictiveRelativeMeasurements");
    }
}
exports.FictiveRelativeMeasurements = FictiveRelativeMeasurements;
//# sourceMappingURL=FictiveRelativeMeasurements.js.map