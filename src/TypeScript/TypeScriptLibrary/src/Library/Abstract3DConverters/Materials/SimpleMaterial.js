"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleMaterial = void 0;
const Color_1 = require("../Color");
const Material_1 = require("./Material");
class SimpleMaterial extends Material_1.Material {
    constructor(color) {
        super();
        this.color = new Color_1.Color([]);
        this.color = color;
    }
}
exports.SimpleMaterial = SimpleMaterial;
//# sourceMappingURL=SimpleMaterial.js.map