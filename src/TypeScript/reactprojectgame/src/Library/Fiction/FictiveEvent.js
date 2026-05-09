"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FictiveEvent = void 0;
const OwnNotImplemented_1 = require("../ErrorHandler/OwnNotImplemented");
class FictiveEvent {
    setEventEnabled(enabled) {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    eventAction() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    isEventEnabled() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    async setEnabled(enabled) {
    }
}
exports.FictiveEvent = FictiveEvent;
//# sourceMappingURL=FictiveEvent.js.map