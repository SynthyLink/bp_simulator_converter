import type { IFeedback } from "./Interfaces/IFeedback";
import type { IFeedbackCollection } from "./Interfaces/IFeedbackCollection";
import { Performer } from "./Performer";
export declare class FeedbackCollection implements IFeedbackCollection {
    constructor(map: Map<string, string>);
    getFeedbacks(): IFeedback[];
    setFeedbacks(): void;
    getFeedbacksMap(): Map<string, string>;
    addFeedback(feedback: IFeedback): void;
    isEmpty(): boolean;
    protected performer: Performer;
    protected feedbacks: IFeedback[];
    protected map: Map<string, string>;
}
//# sourceMappingURL=FeedbackCollection.d.ts.map