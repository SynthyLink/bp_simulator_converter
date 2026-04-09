"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineTimerProvider = void 0;
const OwnNotImplemented_1 = require("../ErrorHandler/OwnNotImplemented");
class EngineTimerProvider {
    constructor(playEngine) {
        this.currentTime = 0;
        this.playEngine = playEngine;
        playEngine.getEngineAction().addActionT(this);
    }
    actionT(t) {
        this.currentTime = t;
    }
    getTimeMeasurement() {
        return this;
    }
    getTime() {
        return this.currentTime;
    }
    setTime(time) {
    }
    getStep() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    setStep(time) {
    }
    getMeasurementName() {
        return "Time";
    }
    getMeasurementType() {
        return 0;
    }
    getMeasurementValue() {
        return this.currentTime;
    }
}
exports.EngineTimerProvider = EngineTimerProvider;
//# sourceMappingURL=EngineTimerProvider.js.map