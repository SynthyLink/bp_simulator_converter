"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCollection = void 0;
const Material_1 = require("./Material");
class MaterialCollection extends Material_1.Material {
    constructor() {
        super();
        this.materials = [];
        this.types.push("IChildrenT<Material>");
        this.types.push("MaterialCollection");
    }
    getChildernT() {
        return this.materials;
    }
    addChildT(child) {
        this.materials.push(child);
    }
    removeChildT(child) {
        this.performer.remove(this.materials, child);
    }
}
exports.MaterialCollection = MaterialCollection;
//# sourceMappingURL=MaterialCollection.js.map