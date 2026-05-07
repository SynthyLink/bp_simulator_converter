"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractActionT = void 0;
const EmptyObject_1 = require("../../EmptyObject");
class AbstractActionT extends EmptyObject_1.EmptyObject {
    constructor() {
        super("");
        this.typeName = "AbstractActionT";
        this.types.push("IActionT");
        this.types.push("AbstractActionT");
    }
    isEmptyActionT() {
        return false;
    }
}
exports.AbstractActionT = AbstractActionT;
//# sourceMappingURL=AbstractActionT.js.map