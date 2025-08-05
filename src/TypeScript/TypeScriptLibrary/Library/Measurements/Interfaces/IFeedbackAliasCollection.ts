import { IFeedbackAlias } from "../../Interfaces/IFeedbackAlias";

export interface IFeedbackAliasCollection {
    addFeedbackAlias(feedbackAlias: IFeedbackAlias): void;
    updateFeedbackAliasCollection(): void;
    getExternalAliasDictionary(): Map<string, string>;
    getExternalAlias(name: string): string;
    addExternalAlias(name: string, value: string): void;
}