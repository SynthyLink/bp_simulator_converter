"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
const context_1 = require("../context");
class Material {
    _context;
    _name;
    _isTransparent;
    constructor(context, name) {
        this._context = context;
        this._name = name;
        this._isTransparent = false;
    }
    get name() {
        return this._name;
    }
    get isTransparent() {
        return this._isTransparent;
    }
    set isTransparent(val) {
        this._isTransparent = val;
    }
}
exports.Material = Material;
//# sourceMappingURL=material.js.map