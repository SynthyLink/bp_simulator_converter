import type { IDesktop } from "../Interfaces/IDesktop";
import type { IPostSetArrow } from "../Interfaces/IPostSetArrow";
import { DataConsumerVariableMeasurements } from "./DataConsumerVariableMeasurements";
export declare class VectorFormulaConsumer extends DataConsumerVariableMeasurements implements IPostSetArrow {
    constructor(desktop: IDesktop, name: string);
    updateMeasurements(): void;
    calculateTree(): void;
    init(): void;
    save(): void;
    postSetArrow(): void;
}
//# sourceMappingURL=VectorFormulaConsumer.d.ts.map