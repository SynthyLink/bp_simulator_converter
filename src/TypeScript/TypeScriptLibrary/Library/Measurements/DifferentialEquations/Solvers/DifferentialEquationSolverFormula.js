"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentialEquationSolverFormula = void 0;
const DataConsumerVariadbleMeasurementsStarted_1 = require("../../DataConsumerVariadbleMeasurementsStarted");
const Variable_1 = require("../../Variables/Variable");
class DifferentialEquationSolverFormula extends DataConsumerVariadbleMeasurementsStarted_1.DataConsumerVariadbleMeasurementsStarted {
    constructor(desktop, name) {
        super(desktop, name);
        this.derivations = new Map();
        this.deri = [];
        this.typeName = "DifferentialEquationSolverFormula";
        this.types.push("IDifferentialEquationSolver");
        this.types.push("IPostSetArrow");
        this.types.push("DifferentrialEquationSolverFormula");
    }
    setDifferentialEquationSolverTimeProvider(time) {
        throw new Error("Method not implemented.");
    }
    getDifferentialEquationSolverTimeProvider() {
        throw new Error("Method not implemented.");
    }
    calculateDerivations() {
        this.feedback.setFeedbacks();
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
exports.DifferentialEquationSolverFormula = DifferentialEquationSolverFormula;
//# sourceMappingURL=DifferentialEquationSolverFormula.js.map