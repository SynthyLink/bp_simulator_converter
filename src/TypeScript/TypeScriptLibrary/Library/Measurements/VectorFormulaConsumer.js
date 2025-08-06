"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorFormulaConsumer = void 0;
const DataConsumerVariableMeasurements_1 = require("./DataConsumerVariableMeasurements");
class VectorFormulaConsumer extends DataConsumerVariableMeasurements_1.DataConsumerVariadbleMeasurements {
    constructor(desktop, name) {
        super(desktop, name);
        this.arguments = [];
        this.operationNames = new Map();
        this.typeName = "VectorFormulaConsumer";
        this.types.push("VectorFormulaConsumer");
        this.types.push("IPostSetArrow");
    }
    updateMeasurements() {
        this.calculateTree();
        this.save();
    }
    calculateTree() {
    }
    init() {
    }
    save() {
    }
    postSetArrow() {
        this.init();
    }
}
exports.VectorFormulaConsumer = VectorFormulaConsumer;
//export default VectorFormulaConsumer;
//# sourceMappingURL=VectorFormulaConsumer.js.map