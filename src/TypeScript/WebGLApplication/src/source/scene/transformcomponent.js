"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformComponent = void 0;
const scenenodecomponent_1 = require("./scenenodecomponent");
const gl_matrix_1 = require("gl-matrix");
/**
 * This component specified the transformation that a `SceneNode` applies in the scene hierarchy.
 * Renderers should check if this component exists on a given node and apply the transformation in this case.
 * Otherwise no transformation should be applied by a node.
 */
class TransformComponent extends scenenodecomponent_1.SceneNodeComponent {
    _transform;
    constructor(transform) {
        super('TransformComponent');
        this._transform = transform;
    }
    get transform() {
        return this._transform;
    }
}
exports.TransformComponent = TransformComponent;
//# sourceMappingURL=transformcomponent.js.map