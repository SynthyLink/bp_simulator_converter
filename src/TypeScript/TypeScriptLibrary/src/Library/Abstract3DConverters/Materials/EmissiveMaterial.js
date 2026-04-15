"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmissiveMaterial = void 0;
const ImageTexture_1 = require("../ImageTexture");
const SimpleMaterial_1 = require("./SimpleMaterial");
class EmissiveMaterial extends SimpleMaterial_1.SimpleMaterial {
    constructor() {
        super(...arguments);
        this.image = new ImageTexture_1.ImageTexture("");
    }
}
exports.EmissiveMaterial = EmissiveMaterial;
//# sourceMappingURL=EmissiveMaterial.js.map