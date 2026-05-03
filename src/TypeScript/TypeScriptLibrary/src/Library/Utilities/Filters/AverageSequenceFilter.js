"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageSequenceFilter = void 0;
const QueueFilter_1 = require("./QueueFilter");
class AverageSequenceFilter extends QueueFilter_1.QueueFilter {
    constructor(count) {
        super(count);
    }
    getFilterValue(a) {
        var val = super.getFilterValue(a);
        if (val === undefined) {
            return undefined;
        }
        return this.performer.calculateAverage(this.array());
    }
}
exports.AverageSequenceFilter = AverageSequenceFilter;
//# sourceMappingURL=AverageSequenceFilter.js.map