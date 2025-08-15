"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentrialEquationSolverFormula = void 0;
const DataConsumerVariadbleMeasurementsStarted_1 = require("../../DataConsumerVariadbleMeasurementsStarted");
const Variable_1 = require("../../Variables/Variable");
class DifferentrialEquationSolverFormula extends DataConsumerVariadbleMeasurementsStarted_1.DataConsumerVariadbleMeasurementsStarted {
    constructor(desktop, name) {
        super(desktop, name);
        this.derivations = new Map();
        this.deri = [];
        this.typeName = "DifferentrialEquationSolverFormula";
        this.types.push("IDifferentialEquationSolver");
        this.types.push("IPostSetArrow");
        this.types.push("DifferentrialEquationSolverFormula");
    }
    setDifferentialEquationSolverTimePovider(time) {
        throw new Error("Method not implemented.");
    }
    getDifferentialEquationSolverTimePovider() {
        throw new Error("Method not implemented.");
    }
    calculateDerivations() {
        this.feedback.setFeedBackAliases();
        this.performer.updateChildrenData(this);
        this.calculateTree();
        this.save();
    }
    copyVariablesToSolver(offset, variables) {
        let n = this.output.length;
        for (var i = 0; i < n; i++) {
            this.output[i].setIValue(variables[i + offset]);
        }
    }
    calculateTree() {
    }
    save() {
    }
    init() {
    }
    addVariableValue(name, type, value) {
        let variable = new Variable_1.Variable(name, type, value);
        let derivation = new Variable_1.Variable("D" + name, 0, 0);
        variable.setDerivation(derivation);
        this.derivations.set(name, derivation);
        this.addVariable(variable);
        this.deri.push(derivation);
    }
    postSetArrow() {
        this.init();
        this.setInitial();
        this.setFeedback();
    }
}
exports.DifferentrialEquationSolverFormula = DifferentrialEquationSolverFormula;
//# sourceMappingURL=DifferentrialEquationSolverFormula.js.map