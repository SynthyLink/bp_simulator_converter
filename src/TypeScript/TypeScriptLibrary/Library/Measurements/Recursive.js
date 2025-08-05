"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recursive = void 0;
const DataConsumerVariableMeasurements_1 = require("./DataConsumerVariableMeasurements");
class Recursive extends DataConsumerVariableMeasurements_1.DataConsumerVariadbleMeasurements {
    constructor(desktop, name) {
        super(desktop, name);
        this.inputs = [];
        this.feedback = new Map();
        this.arguments = [];
        this.initial = new Map();
        this.operationNames = new Map();
        this.typeName = "Recursive";
        this.types.push("ISarted");
        this.types.push("IPostSetArrow");
        this.types.push("Recursive");
        this.alias = this;
    }
    startedStart(start) {
        var keys = this.initial.keys();
        var vari = this.variables;
        for (var key of keys) {
            var v = vari.get(key);
            v === null || v === void 0 ? void 0 : v.setIValue(this.initial.get(key));
        }
    }
    setIniitial() {
        var names = this.getAliasNames();
        for (var name of names) {
            this.initial.set(name, this.getAliasValue(name));
        }
    }
    init() {
    }
    postSetArrow() {
        this.init();
    }
    getAllMeasurements() {
        return this.inputs;
    }
    addMeasurements(item) {
        this.inputs.push(item);
    }
    calculateTree() {
    }
    save() {
    }
    updateMeasurements() {
        this.calculateTree();
        this.save();
    }
}
exports.Recursive = Recursive;
//# sourceMappingURL=Recursive.js.map