"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FictiveOrientation = void 0;
const OwnNotImplemented_1 = require("../ErrorHandler/OwnNotImplemented");
class FictiveOrientation {
    getQuaternion() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
    getMatrix() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
}
exports.FictiveOrientation = FictiveOrientation;
//# sourceMappingURL=FictiveOrientation.js.map