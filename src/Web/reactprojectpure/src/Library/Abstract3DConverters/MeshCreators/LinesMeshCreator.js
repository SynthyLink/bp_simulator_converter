"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinesMeshCreator = void 0;
const AbstractMeshCreator_1 = require("./AbstractMeshCreator");
class LinesMeshCreator extends AbstractMeshCreator_1.AbstractMeshCreator {
    constructor(url, directory, obj, factory) {
        super(url, directory, obj, factory);
        this.lines = [];
        this.globalString = "";
        var r = this.textReaderFactory.getTextReader(obj, url);
        this.globalString = r.readToEnd();
        this.loadMeshCreator();
    }
    loadMeshCreator() {
        this.lines = this.textConverter.splitStrings(this.obj, this.globalString);
        this.loadLines();
    }
    loadStrings(url) {
        var r = this.textReaderFactory.getTextReader(this.obj, url);
        return r.getStrings();
    }
    getName() {
        return this.name;
    }
}
exports.LinesMeshCreator = LinesMeshCreator;
//# sourceMappingURL=LinesMeshCreator.js.map