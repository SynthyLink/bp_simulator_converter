import { QueueFilter } from "./QueueFilter";

export class DonchianSequenceFilter extends QueueFilter {


    constructor(count: number, max: boolean) {
        super(count)
        this.max = max
    }

    protected max: boolean = true

    getFilterValue(a: number): number | undefined {

        var val = super.getFilterValue(a)
        if (val === undefined) { return undefined }
        var x = this.array()
        var p = this.performer
        return this.max ? p.findMaxWithReduce(x) : p.findMaxWithReduce(x)
    }


}