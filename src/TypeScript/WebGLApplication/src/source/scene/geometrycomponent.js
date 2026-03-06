"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeometryComponent = void 0;
const scenenodecomponent_1 = require("./scenenodecomponent");
const geometry_1 = require("../geometry");
const material_1 = require("./material");
/**
 * This component specifies the geometry contained in a `SceneNode`.
 * Multiple of these components can be present in a single `SceneNode`.
 */
class GeometryComponent extends scenenodecomponent_1.SceneNodeComponent {
    _geometry;
    _material;
    constructor() {
        super('GeometryComponent');
    }
    set geometry(geometry) {
        this._geometry = geometry;
    }
    get geometry() {
        return this._geometry;
    }
    set material(material) {
        this._material = material;
    }
    get material() {
        return this._material;
    }
}
exports.GeometryComponent = GeometryComponent;
//# sourceMappingURL=geometrycomponent.js.map