import { AbstractActionT } from "./AbstractActionT";
export declare class EmptyActionT<T> extends AbstractActionT<T> {
    constructor();
    actionT(t: T): void;
    isEmptyActionT(): boolean;
    t: T;
}
//# sourceMappingURL=EmptyActionT.d.ts.map