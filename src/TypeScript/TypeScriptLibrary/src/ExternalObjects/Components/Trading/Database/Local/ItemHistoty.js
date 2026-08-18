"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemHistory = void 0;
const Item_class_1 = require("../../../../Library/IndexedDB/Item.class");
class ItemHistory extends Item_class_1.Item {
    constructor(id, message) {
        super(id);
        this.requestId = message.requestId;
        this.date = message.date;
        this.open = message.open;
        this.high = message.high;
        this.low = message.low;
        this.close = message.close;
        this.volume = message.volume;
        this.count = message.count;
        this.wap = message.wap;
        this.hasGaps = message.hasGaps;
    }
    requestId;
    date;
    open;
    high;
    low;
    close;
    volume;
    count;
    wap;
    hasGaps;
}
exports.ItemHistory = ItemHistory;
//# sourceMappingURL=ItemHistoty.js.map