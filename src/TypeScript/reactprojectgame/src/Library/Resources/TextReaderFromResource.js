"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextReaderFromResource = void 0;
const LinesTextReaderFromAny_1 = require("../IO/LinesTextReaderFromAny");
class TextReaderFromResource {
    constructor(items, func) {
        this.items = [];
        this.map = new Map();
        this.func = func;
        for (let r of items) {
            if (r.type == "text") {
                this.map.set(r.url, r);
            }
        }
    }
    functT(url) {
        if (!this.map.has(url))
            return undefined;
        let r = this.map.get(url);
        if (r != undefined) {
            let any = this.func.functT(r);
            return new LinesTextReaderFromAny_1.LinesTextReaderFromAny(any);
        }
        return undefined;
    }
}
exports.TextReaderFromResource = TextReaderFromResource;
//# sourceMappingURL=TextReaderFromResource.js.map