"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeasurementsAction = void 0;
class UpdateMeasurementsAction {
    action() {
        console.log(this.m);
        this.m.updateMeasurements();
    }
    constructor(m) {
        this.m = m;
        console.log("MMM", this.m);
    }
}
exports.UpdateMeasurementsAction = UpdateMeasurementsAction;
//# sourceMappingURL=UpdateMeasurementsAction.js.map