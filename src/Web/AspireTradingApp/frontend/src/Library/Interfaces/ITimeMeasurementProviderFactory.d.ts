import type { ITimeMeasurementProvider } from "../Measurements/Interfaces/ITimeMeasurementProvider";
export interface ITimeMeasurementProviderFactory {
    Create(isAbsolute: boolean, timeUnit: string, reason: string): ITimeMeasurementProvider;
}
//# sourceMappingURL=ITimeMeasurementProviderFactory.d.ts.map