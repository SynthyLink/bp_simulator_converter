import type { IAliasName } from "./Interfaces/IAliasName";
import type { IInitialValue } from "./Interfaces/IInitialValue";
import type { IValue } from "./Interfaces/IValue";
export declare class AliasInitialValue implements IInitialValue {
    getInitValue(): any;
    resetInitValue(): void;
    constructor(alias: IAliasName, value: IValue);
    protected alias: IAliasName;
    protected value: IValue;
}
//# sourceMappingURL=AliasInitialValue.d.ts.map