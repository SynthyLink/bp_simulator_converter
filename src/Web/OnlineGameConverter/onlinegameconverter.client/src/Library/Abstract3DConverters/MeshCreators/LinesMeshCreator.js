"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinesMeshCreator = void 0;
class LinesMeshCreator {
    constructor(url, sep, obj, factory) {
        this.text = [];
        this.url = "";
        this.url = url;
        this.sep = sep;
        this.factory = factory;
        this.obj = obj;
    }
    getURL() {
        return this.url;
    }
    load(obj) {
        let s = obj;
        let text = s.split(this.sep);
        this.loadText(text);
    }
}
exports.LinesMeshCreator = LinesMeshCreator;
//# sourceMappingURL=LinesMeshCreator.js.map