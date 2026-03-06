"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneNodeComponent = void 0;
/**
 * This is the base class for components that can be added to a `SceneNode`.
 */
class SceneNodeComponent {
    /** @see {@link type} */
    _type;
    constructor(type) {
        this._type = type;
    }
    /**
     * The name of this type of component. This can be used by `SceneNode` to filter specific component types.
     */
    get type() {
        return this._type;
    }
}
exports.SceneNodeComponent = SceneNodeComponent;
//# sourceMappingURL=scenenodecomponent.js.map