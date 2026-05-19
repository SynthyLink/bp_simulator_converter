import type { IInitialValue } from "./Interfaces/IInitialValue";
import type { IInitialValueCollection } from "./Interfaces/IInitialValueCollection";
export declare class InitialValueCollection implements IInitialValueCollection {
    addInitialValue(value: IInitialValue): void;
    getInitialValues(): IInitialValue[];
    resetInitialValues(): void;
    protected values: IInitialValue[];
}
//# sourceMappingURL=InitialValueCollection.d.ts.map