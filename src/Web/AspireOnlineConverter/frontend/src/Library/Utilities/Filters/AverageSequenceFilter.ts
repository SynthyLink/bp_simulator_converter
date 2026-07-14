import { QueueFilter } from "./QueueFilter";

export class AverageSequenceFilter extends QueueFilter {

    constructor(count: number) {
        super(count);
    }


    getFilterValue(a: number): number | undefined
    {

        var val = super.getFilterValue(a);
        if (val === undefined) { return undefined }
        return this.performer.calculateAverage(this.array())
    }
 }