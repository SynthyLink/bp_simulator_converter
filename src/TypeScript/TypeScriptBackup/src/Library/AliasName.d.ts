import type { IAlias } from "./Interfaces/IAlias";
import type { IAliasName } from "./Interfaces/IAliasName";
export declare class AliasName implements IAliasName {
    alias: IAlias;
    name: string;
    constructor(alias: IAlias, name: string);
    getAlias(): IAlias;
    getAliasNameValue(): any;
    setAliasNameValue(value: any): void;
    getNameOfAliasName(): string;
}
//# sourceMappingURL=AliasName.d.ts.map