"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FictionTrading = void 0;
const CategoryObject_1 = require("../../../Library/CategoryObject");
class FictionTrading extends CategoryObject_1.CategoryObject {
    async initializeTaskAsync(controller) {
    }
    constructor(desktop, name) {
        super(desktop, name);
        this.typeName = "FictionTrading";
        this.types.push("FictionTrading");
        this.types.push("IInitializeTask");
    }
}
exports.FictionTrading = FictionTrading;
//# sourceMappingURL=FictionTrading.js.map