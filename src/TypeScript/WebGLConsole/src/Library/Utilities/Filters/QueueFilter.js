"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueFilter = void 0;
const Performer_1 = require("../../Performer");
const FastQueue_1 = require("../Collections/FastQueue");
class QueueFilter {
    constructor(count) {
        this.queue = new FastQueue_1.FastQueue();
        this.count = 2;
        this.a = 0;
        this.b = 0;
        this.performer = new Performer_1.Performer();
        this.arr = this.queue;
        this.count = count;
    }
    getFilterCount() {
        return this.count;
    }
    setFilterCount(count) {
        this.count = count;
    }
    getFilterValue(a) {
        var c = this.queue.size();
        var l = c == this.count;
        this.a = a;
        if (l) {
            var x = this.queue.dequeue();
            if (x !== undefined) {
                this.b = x;
            }
        }
        this.queue.enqueue(a);
        return l ? 0 : undefined;
    }
    resetFilter() {
        this.queue.clear();
    }
    array() {
        return this.arr.array();
    }
}
exports.QueueFilter = QueueFilter;
//# sourceMappingURL=QueueFilter.js.map