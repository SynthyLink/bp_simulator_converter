import type { IDesktop } from "../Interfaces/IDesktop";
import type { IFeedbackCollection } from "../Interfaces/IFeedbackCollection";
import type { IInitialValueCollection } from "../Interfaces/IInitialValueCollection";
import { DataConsumerVariableMeasurements } from "./DataConsumerVariableMeasurements";
import type { IFeedbackHolder } from "./Interfaces/IFeedbackHolder";
import type { IStarted } from "./Interfaces/IStarted";
export declare class DataConsumerVariableMeasurementsStarted extends DataConsumerVariableMeasurements implements IStarted, IFeedbackHolder {
    protected initial: IInitialValueCollection;
    constructor(desktop: IDesktop, name: string);
    getFeedbackCollection(): IFeedbackCollection;
    startedStart(start: number): void;
    protected fictiveStart: number;
    setInitial(): void;
    setFeedback(): void;
    feedback: IFeedbackCollection;
}
//# sourceMappingURL=DataConsumerVariableMeasurementsStarted.d.ts.map