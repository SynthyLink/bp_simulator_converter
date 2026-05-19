import type { IDesktop } from "../Interfaces/IDesktop";
import type { IMeasurements } from "./Interfaces/IMeasurements";
import type { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { DataConsumerVariableMeasurementsStarted } from "./DataConsumerVariableMeasurementsStarted";
import { Performer } from "../Performer";
export declare class RecursiveFormula extends DataConsumerVariableMeasurementsStarted implements IPostSetArrow {
    protected inputs: IMeasurements[];
    protected arguments: string[];
    protected operationNames: Map<number, string>;
    protected performer: Performer;
    constructor(desktop: IDesktop, name: string);
    init(): void;
    setFeedback(): void;
    postSetArrow(): void;
    getAllMeasurements(): IMeasurements[];
    addMeasurements(item: IMeasurements): void;
    calculateTree(): void;
    save(): void;
    startedStart(start: number): void;
    protected fictiveStart: number;
    updateMeasurements(): void;
}
//# sourceMappingURL=RecursiveFormula.d.ts.map