import type { IDifferentialEquationProcessor } from "../Interfaces/IDifferentialEquationProcessor ";
import { DifferentialEquationProcessor } from "./DifferentialEquationProcessor";
export declare class EulerProcessor extends DifferentialEquationProcessor {
    w: number[];
    stepDifferentialEquations(start: number, finish: number): void;
    updateDimension(): void;
    newDifferentialEquations(): IDifferentialEquationProcessor;
}
//# sourceMappingURL=EulerProcessor.d.ts.map