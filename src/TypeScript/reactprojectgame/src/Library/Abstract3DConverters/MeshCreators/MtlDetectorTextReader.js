"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MtlDetectorTextReader = void 0;
class MtlDetectorTextReader {
    constructor(factory) {
        this.typeName = "CategoryArrow";
        this.types = ["IObject", "ICategoryArrow", "CategoryArrow"];
        this.name = "";
        this.factory = factory;
    }
    detectMtl(url, obj) {
        var reader = this.factory.getTextReader(obj, url);
        return reader.getStrings();
    }
    getName() {
        return this.name;
    }
    getClassName() {
        return this.typeName;
    }
    imlplementsType(type) {
        return this.types.indexOf(type) >= 0;
    }
}
exports.MtlDetectorTextReader = MtlDetectorTextReader;
//# sourceMappingURL=MtlDetectorTextReader.js.map