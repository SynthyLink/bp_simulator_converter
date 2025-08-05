import { IANAZone } from "luxon";
import { FictiveAlias } from "./FictiveAlias";
import { FictiveAliasName } from "./FictiveAliasName";
import { FictiveValue } from "./FictiveValue";
import { IAliasName } from "./Interfaces/IAliasName";
import { IValue } from "./Interfaces/IValue";
import { IFeedbackAlias } from "./Interfaces/IFeedbackAlias";
import { AliasName } from "./AliasName";

export class InitValueAlias implements IFeedbackAlias {

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