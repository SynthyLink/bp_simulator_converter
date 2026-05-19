import { Performer } from "../../../Performer";
import type { IMeasurements } from "../../Interfaces/IMeasurements";
import type { INormalizable } from "../../Interfaces/INormalizable";
import type { ITimeMeasurementProvider } from "../../Interfaces/ITimeMeasurementProvider";
import type { IDifferentialEquationProcessor } from "../Interfaces/IDifferentialEquationProcessor ";
import type { IDifferentialEquationSolver } from "../Interfaces/IDifferentialEquationSolver";
export declare class DifferentialEquationProcessor implements IDifferentialEquationProcessor {
    actionT2(t1: number, t2: number): void;
    isEmptyActionT2(): boolean;
    getName(): string;
    getClassName(): string;
    imlplementsType(type: string): boolean;
    getDifferentialEquations(): IDifferentialEquationSolver[];
    addRangeDifferentialEquations(equations: IDifferentialEquationSolver[]): void;
    stepDifferentialEquations(start: number, finish: number): void;
    fstart: number;
    ffinish: number;
    updateDimension(): void;
    getDifferentialEquationsTimeProvider(): ITimeMeasurementProvider;
    setDifferentialEquationsTimeProvider(time: ITimeMeasurementProvider): void;
    clearDifferentialEquations(): void;
    newDifferentialEquations(): IDifferentialEquationProcessor;
    getDifferentialEquationsDimention(): number;
    protected performer: Performer;
    protected dimension: number;
    protected equations: IDifferentialEquationSolver[];
    protected norm: INormalizable[];
    protected measurements: IMeasurements[];
    protected timeProvider: ITimeMeasurementProvider;
    protected typeName: string;
    protected types: string[];
    protected name: string;
}
//# sourceMappingURL=DifferentialEquationProcessor.d.ts.map