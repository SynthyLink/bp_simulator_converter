import type { IAction } from "../Interfaces/IAction";
import type { IDataRuntime } from "../Interfaces/IDataRuntime";
import type { IArrayElementMeasurement } from "./Interfaces/IArrayElemetMeasurements";
import type { IDataConsumer } from "./Interfaces/IDataConsumer";
import type { IMeasurement } from "./Interfaces/IMeasurement";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import type { ITimeMeasurementProvider } from "./Interfaces/ITimeMeasurementProvider";
import type { IFunc } from "../Interfaces/IFunc";
import type { IComparator } from "../Utilities/Sort/Interfaces/IComparator";
import type { IComponentCollection } from "../Interfaces/IComponentCollection";
import type { IDifferentialEquationProcessor } from "./DifferentialEquations/Interfaces/IDifferentialEquationProcessor ";
import type { IRealtimeCollectionFactory } from "../Interfaces/IRealtimeCollectionFactory";
import type { IActionAddRemove } from "../Interfaces/IActionAddRemove";
import type { IObjectCollection } from "../Interfaces/IObjectCollection";
import { Performer } from "../Performer";
export declare class PerformerMeasuremets {
    processor: IDifferentialEquationProcessor;
    realtimeEventFactory: IRealtimeCollectionFactory;
    getDifferentialEquationProcessor(): IDifferentialEquationProcessor;
    setDifferentialEquationProcessor(p: IDifferentialEquationProcessor): void;
    getRealtimeEventFactory(): IRealtimeCollectionFactory;
    setRealtimeEventFactory(f: IRealtimeCollectionFactory): void;
    createUpdateMeasurementsAction(collection: IObjectCollection, act: IActionAddRemove): void;
    constructor();
    performer: Performer;
    protected mCompatator: IComparator<IMeasurements>;
    setTimeProvider(timeProvider: ITimeMeasurementProvider, measurements: IMeasurements[]): void;
    setTimeProviderCollection(objects: IComponentCollection, timeProvider: ITimeMeasurementProvider): void;
    getArrayMeasurements(array: IArrayElementMeasurement): IMeasurement[];
    initStart(array: IArrayElementMeasurement, x: []): void;
    getDependentPrivate(dataConsumer: IDataConsumer, measurements: IMeasurements[]): void;
    peformCondDCFixedStepCalculation(runtime: IDataRuntime, dataConsumer: IDataConsumer, conditionName: string, stop: IFunc<boolean>, start: number, step: number, steps: number, act: IAction): void;
    peformCondFixedStepCalculation(runtime: IDataRuntime, condition: IFunc<boolean>, stop: IFunc<boolean>, start: number, step: number, steps: number, act: IAction): void;
    performFixedStepCalculation(runtime: IDataRuntime, start: number, step: number, steps: number, stop: IFunc<boolean>, act: IAction): void;
    fullReset(consumer: IDataConsumer): void;
}
//# sourceMappingURL=PerformerMeasuremets.d.ts.map