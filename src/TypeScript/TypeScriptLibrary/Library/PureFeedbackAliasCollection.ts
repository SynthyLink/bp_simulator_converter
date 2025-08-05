import { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import { IFeedbackAliasCollection } from "./Interfaces/IFeedbackAliasCollection";

export class PureFeedbackAliasCollection implements IFeedbackAliasCollection
{
    constructor(map: Map<string, string>)
    {
        var keys = map.keys();
        for (var key of keys)
        {
            var v = map.get(key);
            if (v != undefined)
            {
                this.map.set(key, v);
            }
        }
    }

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