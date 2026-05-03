"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FictiveFunc = void 0;
const OwnNotImplemented_1 = require("../ErrorHandler/OwnNotImplemented");
class FictiveFunc {
    func() {
        throw new OwnNotImplemented_1.OwnNotImplemented();
    }
}
exports.FictiveFunc = FictiveFunc;
//# sourceMappingURL=FictiveFunc.js.map