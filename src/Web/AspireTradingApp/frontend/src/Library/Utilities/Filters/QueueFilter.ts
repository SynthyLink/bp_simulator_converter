import { Performer } from "../../Performer";
import { FastQueue } from "../Collections/FastQueue";
import type { IQueue } from "../Collections/Interfaces/IQueue";
import type { IArray } from "../Collections/Interfaces/IArray";
import type { ISequenceFilter } from "./Interfaces/ISequenceFilter";



export class QueueFilter implements ISequenceFilter {

    protected queue: IQueue<number> = new FastQueue();

    protected arr !: IArray<number>

    protected count: number = 2;

    protected a: number = 0;

    protected b: number | undefined = undefined;

    protected performer: Performer = new Performer()

    constructor(count: number) {
        this.arr = this.queue as unknown as IArray<number>
        this.count = count;
    }

    getFilterCount(): number {
        return this.count;
    }

    setFilterCount(count: number): void {
        this.count = count;
    }

    getFilterValue(a: number): number | undefined {
        var c = this.queue.size();
        var l = c >= this.count;
        this.a = a;
        if (l) {
            var x = this.queue.dequeue()
                this.b = x;
        }
        this.queue.enqueue(a);
        return l ? this.b : undefined;

    }

    resetFilter(): void {
        this.queue.clear()
    }

    protected array(): number[] {
        return this.arr.array()
    }

}