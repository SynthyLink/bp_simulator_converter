import { DataRuntimeConsumer } from "./DataRuntimeConsumer";
import type { IFactory } from "../Interfaces/IFactory";
import type { IDifferentialEquationProcessor } from "../Measurements/DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IDifferentialEquationSolver } from "../Measurements/DifferentialEquations/Interfaces/IDifferentialEquationSolver";
import type { IDataConsumer } from "../Measurements/Interfaces/IDataConsumer";
import type { IStepActionHolder } from "../Measurements/Interfaces/IStepActionHolder";
import type { IStepAction } from "../Measurements/Interfaces/IStepAction";
import type { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";
export declare class DataRuntimeConsumerODE extends DataRuntimeConsumer implements IStepActionHolder {
    protected processor: IDifferentialEquationProcessor;
    protected differentialEquations: IDifferentialEquationSolver[];
    constructor(consumer: IDataConsumer, factory: IFactory);
    getStepAction(): IStepAction | undefined;
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void;
    stepRuntime(begin: number, end: number): void;
}
//# sourceMappingURL=DataRuntimeConsumerODE.d.ts.map