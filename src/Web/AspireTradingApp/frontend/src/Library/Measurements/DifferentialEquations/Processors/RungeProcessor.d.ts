import type { IDifferentialEquationProcessor } from "../Interfaces/IDifferentialEquationProcessor ";
import { DifferentialEquationProcessor } from "./DifferentialEquationProcessor";
export declare class RungeProcessor extends DifferentialEquationProcessor {
    w: number[];
    z: number[];
    f: number[];
    k: number[][];
    a: number[];
    stepDifferentialEquations(t0: number, t1: number): void;
    updateDimension(): void;
    newDifferentialEquations(): IDifferentialEquationProcessor;
}
//# sourceMappingURL=RungeProcessor.d.ts.map