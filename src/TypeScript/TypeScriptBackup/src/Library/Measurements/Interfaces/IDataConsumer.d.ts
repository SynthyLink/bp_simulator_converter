import type { IMeasurements } from "./IMeasurements";
export interface IDataConsumer {
    getAllMeasurements(): IMeasurements[];
    addMeasurements(item: IMeasurements): void;
    resetDataConsumer(): void;
}
//# sourceMappingURL=IDataConsumer.d.ts.map