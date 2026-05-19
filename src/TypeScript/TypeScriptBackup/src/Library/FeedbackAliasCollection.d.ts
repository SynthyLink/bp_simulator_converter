import { FeedbackCollection } from "./FeedbackCollection";
import type { ICategoryObject } from "./Interfaces/ICategoryObject";
import type { IDesktop } from "./Interfaces/IDesktop";
import type { IMeasurements } from "./Measurements/Interfaces/IMeasurements";
export declare class FeedbackAliasCollection extends FeedbackCollection {
    constructor(map: Map<string, string>, measurements: IMeasurements, obj: ICategoryObject);
    fillFeedBackAliases(): void;
    protected desktop: IDesktop;
    protected measurements: IMeasurements;
}
//# sourceMappingURL=FeedbackAliasCollection.d.ts.map