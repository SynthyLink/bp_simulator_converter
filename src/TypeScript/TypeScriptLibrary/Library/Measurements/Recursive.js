"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recursive = void 0;
const DataConsumerVariableMeasurements_1 = require("./DataConsumerVariableMeasurements");
const FictiveAlias_1 = require("../Fiction/FictiveAlias");
const FictionInitialValueCollection_1 = require("../Fiction/FictionInitialValueCollection");
const AliasInitialValueCollection_1 = require("../AliasInitialValueCollection.");
class Recursive extends DataConsumerVariableMeasurements_1.DataConsumerVariadbleMeasurements {
    constructor(desktop, name) {
        super(desktop, name);
        this.inputs = [];
        this.arguments = [];
        //  protected initial: Map<string, any> = new Map();
        this.operationNames = new Map();
        this.alias = new FictiveAlias_1.FictiveAlias();
        this.initial = new FictionInitialValueCollection_1.FictionInitialValueCollection();
        this.typeName = "Recursive";
        this.types.push("IStarted");
        this.types.push("IPostSetArrow");
        this.types.push("IFeedbackAliasCollectionHolder");
        this.types.push("Recursive");
        this.alias = this;
    }
    startedStart(start) {
        this.initial.resetInitialValues();
    }
    setIniitial() {
        this.initial = new AliasInitialValueCollection_1.AliasInitialValueConnection(this, this);
    }
    init() {
    }
    postSetArrow() {
        this.init();
        this.setFeedback();
        this.setIniitial();
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
        this.feedback.setFeedBackAliases();
        //        this.performer.updateChildrenData(this);
        this.calculateTree();
        this.save();
    }
}
exports.Recursive = Recursive;
//# sourceMappingURL=Recursive.js.map