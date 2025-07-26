import { IAlias } from "./Interfaces/IAlias";
import { IAliasName } from "./Interfaces/IAliasName";

export class AliasName implements IAliasName
{

    alias !: IAlias;

    name: string = "";

    constructor(alias: IAlias, name: string) {
        this.alias = alias;
        this.name = name;
    }
    getAlias(): IAlias {
        return this.alias;
    }
    getAliasNameValue(): any
    {
        return this.alias.getAliasValue(this.name);
    }


    setAliasNameValue(value: any): void {
    }

    getNameOfAliasName(): string {
        return this.name;
    }
}