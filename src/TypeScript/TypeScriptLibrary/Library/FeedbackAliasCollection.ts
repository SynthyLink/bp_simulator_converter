import { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import { IFeedbackAliasCollection } from "./Interfaces/IFeedbackAliasCollection";

export class FeedbackAliasCollection implements IFeedbackAliasCollection
{

    getFeedbackAliasCollectionMap(): Map<string, string> {
        return this.map;
    }
    getFeedbackAliasCollectionAliases(): IFeedbackAlias[] {
        return this.aliases;
    }
    addFeedbackAliasCollectionAlias(alias: IFeedbackAlias): void {
        this.aliases.push(alias);
    }

    setFeedBackAliases(): void
    {
        for (var a of this.aliases)
        {
            a.setFeedBackAlias();
        }
    }

    fillFeedBackAliases(): void
    {

    }

    protected aliases: IFeedbackAlias[] = [];

    protected map: Map<string, string> = new Map();
}