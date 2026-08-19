import type { IStarted } from "../Measurements/Interfaces/IStarted";
import type { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";
import type { ICategoryArrow } from "./ICategoryArrow";
import type { ICategoryObject } from "./ICategoryObject";
export interface IDataRuntime {
    updateRuntime(): void;
    refreshRuntime(): void;
    startRuntime(time: number): void;
    stepRuntime(begin: number, end: number): void;
    addCategoryObjectToRuntime(object: ICategoryObject): void;
    getRuntimeObject(name: string): ICategoryObject;
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void;
    getTimeProvider(): ITimeMeasurementProvider;
    getRuntimeObjects(): ICategoryObject[];
    getRuntimeArrows(): ICategoryArrow[];
    getStarted(): IStarted[];
}
//# sourceMappingURL=IDataRuntime.d.ts.map