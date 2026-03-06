"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneExample = exports.SceneExampleMaterial = exports.SceneRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
/**
 * @todo comment
 */
class SceneRenderer extends webgl_operate_1.Renderer {
    _navigation;
    _forwardPass;
    _camera;
    _scene;
    _texture;
    _framebuffer;
    _program;
    _uViewProjection;
    _uModel;
    _uTexture;
    _uTextured;
    _aMeshVertex;
    _aMeshTexCoord;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        this._framebuffer = new webgl_operate_1.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._framebuffer.initialize();
        /* Create mesh rendering program. */
        const vert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'mesh.vert');
        vert.initialize(require('./data/mesh.vert'));
        const frag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'scene.frag');
        frag.initialize(require('./data/scene.frag'));
        this._program = new webgl_operate_1.Program(this._context, 'MeshProgram');
        this._program.initialize([vert, frag], false);
        this._aMeshVertex = this._program.attribute('a_vertex', 0);
        this._aMeshTexCoord = this._program.attribute('a_texCoord', 1);
        this._program.link();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uModel = this._program.uniform('u_model');
        this._uTexture = this._program.uniform('u_texture');
        this._uTextured = this._program.uniform('u_textured');
        this._aMeshVertex = this._program.attribute('a_vertex', 0);
        this._aMeshTexCoord = this._program.attribute('a_texCoord', 1);
        /* Create and configure camera. */
        if (this._camera === undefined) {
            this._camera = new webgl_operate_1.Camera();
            this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
            this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._camera.eye = gl_matrix_1.vec3.fromValues(-0.5, 2.0, 2.0);
            this._camera.near = 1.0;
            this._camera.far = 16.0;
        }
        /* Create and configure navigation */
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /* Create and configure forward pass. */
        this._forwardPass = new webgl_operate_1.ForwardSceneRenderPass(context);
        this._forwardPass.initialize();
        this._forwardPass.camera = this._camera;
        this._forwardPass.target = this._framebuffer;
        /* Create scene. */
        this.generateScene();
        this._forwardPass.scene = this._scene;
        this._forwardPass.program = this._program;
        this._forwardPass.updateModelTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uModel, false, matrix);
        };
        this._forwardPass.updateViewProjectionTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uViewProjection, false, matrix);
        };
        this._forwardPass.bindMaterial = (material) => {
            const sceneMaterial = material;
            if (sceneMaterial.textured) {
                sceneMaterial.texture.bind(gl.TEXTURE0);
                gl.uniform1i(this._uTexture, 0);
            }
            gl.uniform1i(this._uTextured, sceneMaterial.textured);
        };
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        // TODO: make sure that all meshes and programs inside of the scene get cleaned
        // this._mesh.uninitialize();
        // this._meshProgram.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('frameSize');
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
    }
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * Updates the navigaten and the AntiAliasingKernel.
     * @returns whether to redraw
     */
    onUpdate() {
        if (this._altered.frameSize) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        }
        if (this._altered.clearColor) {
            this._forwardPass.clearColor = this._clearColor;
        }
        this._navigation.update();
        this._forwardPass.update();
        return this._altered.any || this._camera.altered;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        this._forwardPass.prepare();
        this._altered.reset();
        this._camera.altered = false;
    }
    /**
     * @todo comment
     * @param frameNumber - for intermediate frames in accumulation rendering.
     */
    onFrame(frameNumber) {
        if (this.isLoading) {
            return;
        }
        this._forwardPass.frame();
    }
    /**
     * @todo comment ...
     */
    onSwap() {
    }
    /**
     *  @todo comment
     */
    generateScene() {
        this._scene = new webgl_operate_1.SceneNode('root');
        this.generateSphereNode(this._scene);
        this.generatePlaneNode(this._scene);
        this.generateBoxNode(this._scene);
    }
    generateSphereNode(parent) {
        const gl = this._context.gl;
        /* Create node and transform */
        const node = parent.addNode(new webgl_operate_1.SceneNode('sphere'));
        const translate = gl_matrix_1.mat4.fromTranslation(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(-0.5, 0.0, 0.0));
        const scale = gl_matrix_1.mat4.fromScaling(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(0.3, 0.3, 0.3));
        const transformMatrix = gl_matrix_1.mat4.multiply(gl_matrix_1.mat4.create(), translate, scale);
        const transform = new webgl_operate_1.TransformComponent(transformMatrix);
        node.addComponent(transform);
        /* Create and load texture. */
        const texture = new webgl_operate_1.Texture2D(this._context, 'Texture');
        texture.initialize(1, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
        texture.fetch('/examples/data/concrete_floor_02_diff_1k.webp').then(() => {
            this.finishLoading();
            this.invalidate(true);
        });
        /* Create material */
        const material = new SceneExampleMaterial(this._context, 'ExampleMaterial1');
        material.texture = texture;
        material.textured = true;
        /* Create geometry. */
        const geometry = new webgl_operate_1.GeosphereGeometry(this._context, 'mesh', 1.0, true);
        geometry.initialize(this._aMeshVertex, this._aMeshTexCoord);
        const sphere = new webgl_operate_1.GeometryComponent();
        sphere.geometry = geometry;
        sphere.material = material;
        node.addComponent(sphere);
        return node;
    }
    generatePlaneNode(parent) {
        /* Create node and transform */
        const node = parent.addNode(new webgl_operate_1.SceneNode('plane'));
        const translate = gl_matrix_1.mat4.fromTranslation(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(0.0, -0.4, 0.0));
        const scale = gl_matrix_1.mat4.fromScaling(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(20.0, 1.0, 20.0));
        const transformMatrix = gl_matrix_1.mat4.multiply(gl_matrix_1.mat4.create(), translate, scale);
        const transform = new webgl_operate_1.TransformComponent(transformMatrix);
        node.addComponent(transform);
        /* Create material */
        const material = new SceneExampleMaterial(this._context, 'ExampleMaterial2');
        material.textured = false;
        /* Create geometry. */
        const geometry = new webgl_operate_1.PlaneGeometry(this._context);
        geometry.initialize(this._aMeshVertex);
        const sphere = new webgl_operate_1.GeometryComponent();
        sphere.geometry = geometry;
        sphere.material = material;
        node.addComponent(sphere);
        return node;
    }
    generateBoxNode(parent) {
        const gl = this._context.gl;
        /* Create node and transform */
        const node = parent.addNode(new webgl_operate_1.SceneNode('box'));
        const translate = gl_matrix_1.mat4.fromTranslation(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(0.5, 0.0, 0.0));
        const scale = gl_matrix_1.mat4.fromScaling(gl_matrix_1.mat4.create(), gl_matrix_1.vec3.fromValues(0.5, 0.5, 0.5));
        const transformMatrix = gl_matrix_1.mat4.multiply(gl_matrix_1.mat4.create(), translate, scale);
        const transform = new webgl_operate_1.TransformComponent(transformMatrix);
        node.addComponent(transform);
        /* Create and load texture. */
        const texture = new webgl_operate_1.Texture2D(this._context, 'Texture');
        texture.initialize(1, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
        texture.fetch('/examples/data/blue-painted-planks-diff-1k-modified.webp').then(() => {
            this.invalidate(true);
        });
        /* Create material */
        const material = new SceneExampleMaterial(this._context, 'ExampleMaterial3');
        material.texture = texture;
        material.textured = true;
        /* Create geometry. */
        const geometry = new webgl_operate_1.CuboidGeometry(this._context, 'mesh', true);
        geometry.initialize(this._aMeshVertex, this._aMeshTexCoord);
        const box = new webgl_operate_1.GeometryComponent();
        box.geometry = geometry;
        box.material = material;
        node.addComponent(box);
        return node;
    }
}
exports.SceneRenderer = SceneRenderer;
class SceneExampleMaterial extends webgl_operate_1.Material {
    _texture;
    _textured;
    set texture(texture) {
        this._texture = texture;
    }
    get texture() {
        return this._texture;
    }
    set textured(value) {
        this._textured = value;
    }
    get textured() {
        return this._textured;
    }
}
exports.SceneExampleMaterial = SceneExampleMaterial;
class SceneExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._canvas.clearColor.fromHex('ffffff');
        this._renderer = new SceneRenderer();
        this._canvas.renderer = this._renderer;
        return true;
    }
    onUninitialize() {
        this._canvas.dispose();
        this._renderer.uninitialize();
    }
    get canvas() {
        return this._canvas;
    }
    get renderer() {
        return this._renderer;
    }
}
exports.SceneExample = SceneExample;
//# sourceMappingURL=scene-example.js.map