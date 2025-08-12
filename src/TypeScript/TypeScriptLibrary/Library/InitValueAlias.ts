import { FictiveAliasName } from "./Fiction/FictiveAliasName";
import { FictiveValue } from "./Fiction/FictiveValue";
import { IAliasName } from "./Interfaces/IAliasName";
import { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import { IValue } from "./Interfaces/IValue";

export class InitValueAlias implements IFeedbackAlias
{

    value: IValue = new FictiveValue();
    alias: IAliasName = new FictiveAliasName();

    constructor(alias: IAliasName, value: IValue) {
        this.alias = alias;
        this.value = value;
    }
    getFeedBackAlias(): IAliasName {
        return this.alias;
    }
    setFeedBackAlias(): void {
        var x = this.value.getIValue();
        if (x != undefined) {
            this.alias.setAliasNameValue(x);
        }
    }
}