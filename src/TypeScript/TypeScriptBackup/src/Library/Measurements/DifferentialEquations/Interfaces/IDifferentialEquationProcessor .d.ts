import type { IStepAction } from "../../Interfaces/IStepAction";
import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import type { IDifferentialEquationSolver } from "./IDifferentialEquationSolver";
export interface IDifferentialEquationProcessor extends IStepAction {
    getDifferentialEquations(): IDifferentialEquationSolver[];
    addRangeDifferentialEquations(equations: IDifferentialEquationSolver[]): void;
    stepDifferentialEquations(start: number, finish: number): void;
    updateDimension(): void;
    getDifferentialEquationsTimeProvider(): ITimeMeasurementProvider;
    setDifferentialEquationsTimeProvider(time: ITimeMeasurementProvider): void;
    clearDifferentialEquations(): void;
    newDifferentialEquations(): IDifferentialEquationProcessor;
}
//# sourceMappingURL=IDifferentialEquationProcessor%20.d.ts.map