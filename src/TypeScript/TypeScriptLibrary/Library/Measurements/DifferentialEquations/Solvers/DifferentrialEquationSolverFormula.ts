import { IDesktop } from "../../../Interfaces/IDesktop";
import { IPostSetArrow } from "../../../Interfaces/IPostSetArrow";
import { IValue } from "../../../Interfaces/IValue";
import { DataConsumerVariadbleMeasurementsStarted } from "../../DataConsumerVariadbleMeasurementsStarted";
import { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import { Variable } from "../../Variables/Variable";
import { IDifferentialEquationSolver } from "../Interfaces/IDifferentialEquationSolver";

export class DifferentrialEquationSolverFormula extends DataConsumerVariadbleMeasurementsStarted
    implements IDifferentialEquationSolver, IPostSetArrow {

    constructor(desktop: IDesktop, name: string)
    {
        super(desktop, name);
        this.typeName = "DifferentrialEquationSolverFormula";
        this.types.push("IDifferentialEquationSolver");
        this.types.push("IPostSetArrow");
        this.types.push("DifferentrialEquationSolverFormula");
    }
    setDifferentialEquationSolverTimeProvider(time: ITimeMeasurementProvider): void {
        throw new Error("Method not implemented.");
    }
    getDifferentialEquationSolverTimeProvider(): ITimeMeasurementProvider {
        throw new Error("Method not implemented.");
    }


    calculateDerivations(): void
    {
        this.feedback.setFeedbacks();
        this.performer.updateChildrenData(this);
        this.calculateTree();
        this.save();
    }

    copyVariablesToSolver(offset: number, variables: number[]): void
    {
        let n = this.output.length;
        for (var i = 0; i < n; i++)
        {
            this.output[i].setIValue(variables[i + offset]);
        }
    }

    calculateTree(): void
    {

    }

    save(): void
    {

    }

    init(): void
    {

    }

    protected addVariableValue(name: string, type: any, value: any): void
    {
        let variable = new Variable(name, type, value);
        let derivation = new Variable("D" + name, 0, 0);
        variable.setDerivation(derivation);
        this.derivations.set(name, derivation);
        this.addVariable(variable);
        this.deri.push(derivation);
    }



    postSetArrow(): void
    {
        this.init();
        this.setInitial();
        this.setFeedback();
    }

    protected derivations: Map<string, IValue> = new Map();

    protected deri: IValue[] = [];


   
}