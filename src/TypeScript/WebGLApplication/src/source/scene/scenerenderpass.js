"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneRenderPass = void 0;
const context_1 = require("../context");
const initializable_1 = require("../initializable");
const scenenode_1 = require("./scenenode");
/**
 * This is the base class for all render passes that render scenes.
 * A `SceneNode` must be given, which is the root node that will be rendered.
 * All children of this node will be rendered recursively.
 */
class SceneRenderPass extends initializable_1.Initializable {
    /**
     * Context, used to get context information and WebGL API access.
     */
    _context;
    /** @see {@link scene} */
    _scene;
    /**
     * Setter for the scene of this render pass.
     * @param scene - Scene to be rendered
     */
    set scene(scene) {
        this._scene = scene;
        if (this._scene !== undefined) {
            this.preprocessScene();
        }
    }
    /**
     * The scene which will be rendered by this pass.
     */
    get scene() {
        return this._scene;
    }
}
exports.SceneRenderPass = SceneRenderPass;
//# sourceMappingURL=scenerenderpass.js.map