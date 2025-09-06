import { ICategoryArrow } from "../Interfaces/ICategoryArrow";
import { ICategoryObject } from "../Interfaces/ICategoryObject";
import { IStarted } from "../Measurements/Interfaces/IStarted";
import { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";
import { IDataRuntime } from "../Runtime/Interfaces/IDataRuntime";

export class FictiveDataRuntime implements IDataRuntime {
    updateRuntime(): void {
        throw new Error("Method not implemented.");
    }
    refreshRuntime(): void {
        throw new Error("Method not implemented.");
    }
    startRuntime(time: number): void {
        throw new Error("Method not implemented.");
    }
    stepRuntime(begin: number, end: number): void {
        throw new Error("Method not implemented.");
    }
    addCategoryObjectToRuntime(object: ICategoryObject): void {
        throw new Error("Method not implemented.");
    }
    getRuntimeObject(name: string): ICategoryObject {
        throw new Error("Method not implemented.");
    }
    setTimeProvider(timeProvider: ITimeMeasurementProvider): void {
        throw new Error("Method not implemented.");
    }
    getTimeProvider(): ITimeMeasurementProvider {
        throw new Error("Method not implemented.");
    }
    getRuntimeObjects(): ICategoryObject[] {
        throw new Error("Method not implemented.");
    }
    getRuntimeArrows(): ICategoryArrow[] {
        throw new Error("Method not implemented.");
    }
    getStarted(): IStarted[] {
        throw new Error("Method not implemented.");
    }

}