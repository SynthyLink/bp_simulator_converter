"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recursive = void 0;
const DataConsumerMeasurements_1 = require("./DataConsumerMeasurements");
class Recursive extends DataConsumerMeasurements_1.DataConsumerMeasurements {
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
        for (var key of keys) {
            this.setAliasValue(key, this.initial.get(key));
        }
    }
    setIniitial() {
        var names = this.getAliasNames();
        for (var name of names) {
            this.initial.set(name, this.getAliasValue(name));
        }
    }
    postSetArrow() {
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