import type { IAliasName } from "./Interfaces/IAliasName";
import type { IFeedback } from "./Interfaces/IFeedback";
import type { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import type { IValue } from "./Interfaces/IValue";
export declare class FeedbackAlias implements IFeedback, IFeedbackAlias {
    constructor(alias: IAliasName, value: IValue);
    setFeedback(): void;
    getFeedBackAlias(): IAliasName;
    protected value: IValue;
    protected alias: IAliasName;
}
//# sourceMappingURL=FeedbackAlias.d.ts.map