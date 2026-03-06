"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForwardSceneRenderPass = void 0;
const gl_matrix_1 = require("gl-matrix");
const auxiliaries_1 = require("../auxiliaries");
const tuples_1 = require("../tuples");
const camera_1 = require("../camera");
const changelookup_1 = require("../changelookup");
const context_1 = require("../context");
const framebuffer_1 = require("../framebuffer");
const geometry_1 = require("../geometry");
const initializable_1 = require("../initializable");
const program_1 = require("../program");
const geometrycomponent_1 = require("./geometrycomponent");
const material_1 = require("./material");
const scenenode_1 = require("./scenenode");
const scenerenderpass_1 = require("./scenerenderpass");
const transformcomponent_1 = require("./transformcomponent");
/**
 * This class renders a SceneNode hierarchy. It uses one single program for rendering the whole scene.
 * If different programs are necessary to render a scene, multiple SceneNodes should be used for each
 * program that is used.
 * This renderpass calls callbacks such as `updateModelTransform`, which have to be set by the renderer
 * using this renderpass.
 */
class ForwardSceneRenderPass extends scenerenderpass_1.SceneRenderPass {
    /**
     * Alterable auxiliary object for tracking changes on render pass inputs and lazy updates.
     */
    _altered = Object.assign(new changelookup_1.ChangeLookup(), {
        any: false,
        camera: false,
    });
    /** @see {@link target} */
    _target;
    /** @see {@link camera} */
    _camera;
    /** @see {@link ndcOffset} */
    _ndcOffset;
    /** @see {@link clearColor} */
    _clearColor;
    /** @see {@link program} */
    _program;
    /**
     * These maps are used to map from a material to all geometries using this material.
     * Alongside the geometry a transform is saved, that is generated during a preprocessing traverse.
     */
    _opaqueGeometryMap;
    _transparentGeometryMap;
    updateModelTransform;
    updateViewProjectionTransform;
    bindMaterial;
    bindGeometry;
    bindUniforms;
    /**
     * Creates a pass that renders a SceneNode and all of its children.
     * @param context - @todo The WebGL context for rendering the scene.
     */
    constructor(context) {
        super();
        this._context = context;
        this._opaqueGeometryMap = new Map();
        this._transparentGeometryMap = new Map();
    }
    /**
     * Sort all geometries by their material and save their transform given by a scene traversal.
     * With this information, rendering can be sped up later on by avoiding material changes
     * during rendering of the scene.
     */
    preprocessScene() {
        (0, auxiliaries_1.assert)(this._scene !== undefined, 'Scene was undefined during preprocessing.');
        if (this._scene === undefined) {
            return;
        }
        this._opaqueGeometryMap.clear();
        this._transparentGeometryMap.clear();
        this.preprocessNode(this._scene, gl_matrix_1.mat4.create());
    }
    /**
     * Handle a single node during preprocessing. Each GeometryComponent of the node will be added
     * to the preprocessing maps.
     * Afterwards all children of the node will also be processed recursively.
     */
    preprocessNode(node, transform) {
        const nodeTransform = gl_matrix_1.mat4.clone(transform);
        const transformComponents = node.componentsOfType('TransformComponent');
        (0, auxiliaries_1.assert)(transformComponents.length <= 1, `SceneNode can not have more than one transform component`);
        if (transformComponents.length === 1) {
            const transformComponent = transformComponents[0];
            gl_matrix_1.mat4.mul(nodeTransform, nodeTransform, transformComponent.transform);
        }
        const geometryComponents = node.componentsOfType('GeometryComponent');
        for (const geometryComponent of geometryComponents) {
            const currentComponent = geometryComponent;
            const material = currentComponent.material;
            const geometry = currentComponent.geometry;
            if (material.isTransparent) {
                let map = this._transparentGeometryMap.get(material);
                if (map === undefined) {
                    map = [];
                }
                map.push([geometry, nodeTransform]);
                this._transparentGeometryMap.set(material, map);
            }
            else {
                let map = this._opaqueGeometryMap.get(material);
                if (map === undefined) {
                    map = [];
                }
                map.push([geometry, nodeTransform]);
                this._opaqueGeometryMap.set(material, map);
            }
        }
        if (node.nodes === undefined) {
            return;
        }
        for (const child of node.nodes) {
            this.preprocessNode(child, nodeTransform);
        }
    }
    /**
     * Render a preprocessed map, where geometries are already sorted by material.
     * Thus, each material only needs to be bound once.
     */
    renderGeometryMap(map) {
        for (const material of Array.from(map.keys())) {
            this.bindMaterial(material);
            const geometryTuples = map.get(material);
            for (const [geometry, transform] of geometryTuples) {
                geometry.bind();
                if (this.bindGeometry !== undefined) {
                    this.bindGeometry(geometry);
                }
                this.updateModelTransform(transform);
                geometry.draw();
                geometry.unbind();
            }
        }
    }
    @initializable_1.Initializable.initialize()
    initialize() {
        return true;
    }
    @initializable_1.Initializable.uninitialize()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    uninitialize() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    prepare() { }
    /**
     * @param override - If enabled, everything will be updated, regardless of tracked alterations.
     */
    @initializable_1.Initializable.assert_initialized()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    update(override = false) { }
    /**
     * Triggers rendering a frame of the given hierarchy. All nodes in the hierarchy will be visited recursively
     * and rendered. If nodes contain transformations, they are applied and used for the whole subtree.
     */
    @initializable_1.Initializable.assert_initialized()
    frame() {
        (0, auxiliaries_1.assert)(this._target && this._target.valid, `valid target expected`);
        (0, auxiliaries_1.assert)(this._program && this._program.valid, `valid program expected`);
        (0, auxiliaries_1.assert)(this.updateModelTransform !== undefined, `Model transform function needs to be initialized.`);
        (0, auxiliaries_1.assert)(this.updateViewProjectionTransform !== undefined, `View Projection transform function needs to be initialized.`);
        (0, auxiliaries_1.assert)(this.bindMaterial !== undefined, `Material binding function needs to be initialized.`);
        if (this._scene === undefined) {
            return;
        }
        const gl = this._context.gl;
        // gl.disable(gl.CULL_FACE);
        // gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        const size = this._target.size;
        gl.viewport(0, 0, size[0], size[1]);
        //const c = this._clearColor;
        //gl.clearColor(c[0], c[1], c[2], c[3]);
        //this._target.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        this._program.bind();
        if (this.bindUniforms !== undefined) {
            this.bindUniforms();
        }
        this.updateViewProjectionTransform(this._camera.viewProjection);
        this.drawCalls();
        this._program.unbind();
        // gl.cullFace(gl.BACK);
        // gl.disable(gl.CULL_FACE);
        gl.disable(gl.BLEND);
    }
    /**
     * Encapsulates the draw calls made to webgl. This is useful if state should not be changed before rendering,
     * e.g. for shadow mapping.
     */
    @initializable_1.Initializable.assert_initialized()
    drawCalls(renderTransparentMaterials = true) {
        if (this._scene === undefined) {
            return;
        }
        /**
         * Render geometries by material.
         * First render opaque materials, then transparent ones.
         */
        this.renderGeometryMap(this._opaqueGeometryMap);
        if (renderTransparentMaterials) {
            this.renderGeometryMap(this._transparentGeometryMap);
        }
    }
    /**
     * Sets the framebuffer the quads are rendered to.
     * @param target - Framebuffer to render into.
     */
    set target(target) {
        this.assertInitialized();
        this._target = target;
    }
    /**
     * The NDC offset is used for vertex displacement within subpixel space for anti-aliasing over
     * multiple intermediate frames (multi-frame sampling).
     * @param offset - Subpixel offset used for vertex displacement (multi-frame anti-aliasing).
     */
    set ndcOffset(offset) {
        this.assertInitialized();
        this._ndcOffset = offset;
    }
    /**
     * The camera's viewProjection is used for 3D label placement calculation.
     */
    set camera(camera) {
        this.assertInitialized();
        if (this._camera === camera) {
            return;
        }
        this._camera = camera;
        this._altered.alter('camera');
    }
    /**
     * Sets the clear color for rendering.
     */
    set clearColor(color) {
        this._clearColor = color;
    }
    set program(program) {
        this._program = program;
    }
}
exports.ForwardSceneRenderPass = ForwardSceneRenderPass;
//# sourceMappingURL=forwardscenerenderpass.js.map