import { IInitialValue } from "./IInitialValue";

export interface IInitialValueCollection
{
    getInitialValues(): IInitialValue[];
    resetInitialValues(): void;
    addInitilalValue(value: IInitialValue): void;
}