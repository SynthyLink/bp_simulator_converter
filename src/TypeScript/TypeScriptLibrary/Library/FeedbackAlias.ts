import { FictiveAliasName } from "./Fiction/FictiveAliasName";
import { FictiveValue } from "./Fiction/FictiveValue";
import { IAliasName } from "./Interfaces/IAliasName";
import { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import { IValue } from "./Interfaces/IValue";

export class FeedbackAlias implements IFeedbackAlias
{
    constructor(alias: IAliasName, value: IValue) {
        this.alias = alias;
        this.value = value;
    }

    getFeedBackAlias(): IAliasName
    {
        return this.alias;
    }
    setFeedBackAlias(): void
    {
        var x = this.value.getIValue();
        if (x != undefined) {
            this.alias.setAliasNameValue(x);
        }
    }

    protected value: IValue = new FictiveValue();

    protected alias: IAliasName = new FictiveAliasName();

}