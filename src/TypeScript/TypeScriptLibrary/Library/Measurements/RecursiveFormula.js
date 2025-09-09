"use strict";
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursiveFormula = void 0;
const DataConsumerVariableMeasurementsStarted_1 = require("./DataConsumerVariableMeasurementsStarted");
class RecursiveFormula extends DataConsumerVariableMeasurementsStarted_1.DataConsumerVariableMeasurementsStarted {
    constructor(desktop, name) {
        super(desktop, name);
        this.inputs = [];
        this.arguments = [];
        //  protected initial: Map<string, any> = new Map();
        this.operationNames = new Map();
        this.typeName = "RecursiveFormula";
        this.types.push("IPostSetArrow");
        this.types.push("RecursiveFormula");
    }
    init() {
    }
    setFeedback() {
        // this.feedback = new FeedbackAliasCollection()
    }
    postSetArrow() {
        this.init();
        this.setInitial();
        this.setFeedback();
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
    startedStart(start) {
        this.initial.resetInitialValues();
        if (this.feedback == undefined) {
            return;
        }
        this.feedback.setFeedbacks();
    }
    updateMeasurements() {
        if (this.feedback != undefined) {
            this.feedback.setFeedbacks();
        }
        this.calculateTree();
        this.save();
    }
}
exports.RecursiveFormula = RecursiveFormula;
//# sourceMappingURL=RecursiveFormula.js.map