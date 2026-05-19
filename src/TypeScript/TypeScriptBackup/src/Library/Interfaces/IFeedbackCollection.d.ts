import type { IFeedback } from "./IFeedback";
export interface IFeedbackCollection {
    getFeedbacksMap(): Map<string, string>;
    addFeedback(feedback: IFeedback): void;
    getFeedbacks(): IFeedback[];
    setFeedbacks(): void;
    isEmpty(): boolean;
}
//# sourceMappingURL=IFeedbackCollection.d.ts.map