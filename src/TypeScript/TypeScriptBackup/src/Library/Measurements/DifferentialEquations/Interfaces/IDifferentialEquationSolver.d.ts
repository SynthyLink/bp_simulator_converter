import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
export interface IDifferentialEquationSolver {
    calculateDerivations(): void;
    copyVariablesToSolver(offset: number, variables: number[]): void;
    setDifferentialEquationSolverTimeProvider(time: ITimeMeasurementProvider): void;
    getDifferentialEquationSolverTimeProvider(): ITimeMeasurementProvider;
}
//# sourceMappingURL=IDifferentialEquationSolver.d.ts.map