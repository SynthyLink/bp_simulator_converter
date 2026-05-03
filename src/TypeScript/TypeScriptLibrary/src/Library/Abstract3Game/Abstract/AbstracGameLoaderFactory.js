"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstracGameLoaderFactory = void 0;
class AbstracGameLoaderFactory {
    constructor() {
        this.typeName = "CategoryArrow";
        this.types = ["IObject", "ICategoryArrow", "CategoryArrow"];
        this.name = "";
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
exports.AbstracGameLoaderFactory = AbstracGameLoaderFactory;
//# sourceMappingURL=AbstracGameLoaderFactory.js.map