import type { IFeedbackAlias } from "./IFeedbackAlias";
export interface IFeedbackAliasCollection {
    getFeedbackAliasCollectionMap(): Map<string, string>;
    getFeedbackAliasCollectionAliases(): IFeedbackAlias[];
    addFeedbackAliasCollectionAlias(alias: IFeedbackAlias): void;
    setFeedBackAliases(): void;
    fillFeedBackAliases(): void;
}
//# sourceMappingURL=IFeedbackAliasCollection.d.ts.map