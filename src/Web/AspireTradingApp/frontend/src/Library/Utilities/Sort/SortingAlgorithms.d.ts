import type { IComparator } from "./Interfaces/IComparator";
export declare class SortingAlgorithms {
    constructor();
    mergesort<T>(unsorted: T[], comparator: IComparator<T>): T[];
    protected merge<T>(left: T[], right: T[], comparator: IComparator<T>): T[];
}
//# sourceMappingURL=SortingAlgorithms.d.ts.map