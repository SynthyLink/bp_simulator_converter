"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInterval = void 0;
const Item_class_1 = require("../../../../Library/IndexedDB/Item.class");
class ItemInterval extends Item_class_1.Item {
    begin = 0;
    end = 0;
    constructor(id, begin, end) {
        super(id);
        this.begin = begin;
        this.end = end;
    }
}
exports.ItemInterval = ItemInterval;
//# sourceMappingURL=ItemInterval.js.map