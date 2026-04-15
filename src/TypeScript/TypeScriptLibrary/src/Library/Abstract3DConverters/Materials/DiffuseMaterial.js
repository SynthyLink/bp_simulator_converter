"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffuseMaterial = void 0;
const SimpleMaterial_1 = require("./SimpleMaterial");
class DiffuseMaterial extends SimpleMaterial_1.SimpleMaterial {
    constructor() {
        super(...arguments);
        this.opacity = 0;
        this.images = [];
    }
    getTextureImages() {
        return this.images;
    }
    getOpacity() {
        return this.opacity;
    }
    setOpacity(p) {
        this.opacity = p;
    }
}
exports.DiffuseMaterial = DiffuseMaterial;
//# sourceMappingURL=DiffuseMaterial.js.map