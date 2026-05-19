import type { IDesktop } from "../../../Interfaces/IDesktop";
import type { IPostSetArrow } from "../../../Interfaces/IPostSetArrow";
import type { IValue } from "../../../Interfaces/IValue";
import { DataConsumerVariableMeasurementsStarted } from "../../DataConsumerVariableMeasurementsStarted";
import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import type { IDifferentialEquationSolver } from "../Interfaces/IDifferentialEquationSolver";
export declare class DifferentialEquationSolverFormula extends DataConsumerVariableMeasurementsStarted implements IDifferentialEquationSolver, IPostSetArrow {
    constructor(desktop: IDesktop, name: string);
    setDifferentialEquationSolverTimeProvider(time: ITimeMeasurementProvider): void;
    getDifferentialEquationSolverTimeProvider(): ITimeMeasurementProvider;
    startedStart(start: number): void;
    fs: number;
    calculateDerivations(): void;
    copyVariablesToSolver(offset: number, variables: number[]): void;
    calculateTree(): void;
    save(): void;
    init(): void;
    protected addVariableValue(name: string, type: any, value: any): void;
    postSetArrow(): void;
    protected derivations: Map<string, IValue>;
    protected deri: IValue[];
    time: ITimeMeasurementProvider;
}
//# sourceMappingURL=DifferentialEquationSolverFormula.d.ts.map