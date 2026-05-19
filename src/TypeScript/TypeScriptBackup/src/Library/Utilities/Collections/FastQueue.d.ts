import type { IArray } from "./Interfaces/IArray";
import type { IQueue } from "./Interfaces/IQueue";
export declare class FastQueue<T> implements IQueue<T>, IArray<T> {
    private items;
    protected head: number;
    array(): T[];
    enqueue(element: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
}
//# sourceMappingURL=FastQueue.d.ts.map