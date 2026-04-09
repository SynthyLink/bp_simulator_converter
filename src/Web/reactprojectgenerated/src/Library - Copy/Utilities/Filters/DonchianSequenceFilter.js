"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonchianSequenceFilter = void 0;
const QueueFilter_1 = require("./QueueFilter");
class DonchianSequenceFilter extends QueueFilter_1.QueueFilter {
    constructor(count, max) {
        super(count);
        this.max = true;
        this.max = max;
    }
    getFilterValue(a) {
        var val = super.getFilterValue(a);
        if (val === undefined) {
            return undefined;
        }
        var x = this.array();
        var p = this.performer;
        return this.max ? p.findMaxWithReduce(x) : p.findMaxWithReduce(x);
    }
}
exports.DonchianSequenceFilter = DonchianSequenceFilter;
//# sourceMappingURL=DonchianSequenceFilter.js.map