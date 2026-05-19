import { Performer } from "../../Performer";
import type { IQueue } from "../Collections/Interfaces/IQueue";
import type { IArray } from "../Collections/Interfaces/IArray";
import type { ISequenceFilter } from "./Interfaces/ISequenceFilter";
export declare class QueueFilter implements ISequenceFilter {
    protected queue: IQueue<number>;
    protected arr: IArray<number>;
    protected count: number;
    protected a: number;
    protected b: number;
    protected performer: Performer;
    constructor(count: number);
    getFilterCount(): number;
    setFilterCount(count: number): void;
    getFilterValue(a: number): number | undefined;
    resetFilter(): void;
    protected array(): number[];
}
//# sourceMappingURL=QueueFilter.d.ts.map