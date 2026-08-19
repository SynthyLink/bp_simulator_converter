import { QueueFilter } from "./QueueFilter";
export declare class DonchianSequenceFilter extends QueueFilter {
    constructor(count: number, max: boolean);
    protected max: boolean;
    getFilterValue(a: number): number | undefined;
}
//# sourceMappingURL=DonchianSequenceFilter.d.ts.map