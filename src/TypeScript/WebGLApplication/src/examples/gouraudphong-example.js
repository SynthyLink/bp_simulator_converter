"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GouraudPhongExample = exports.GouraudPhongRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class GouraudPhongRenderer extends webgl_operate_2.Renderer {
    _loader;
    _navigation;
    _forwardPass;
    _camera;
    _texture;
    _framebuffer;
    _program;
    _uViewProjection;
    _uModel;
    _uNormal;
    _uEye;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        this._loader = new webgl_operate_2.GLTFLoader(this._context);
        this._framebuffer = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._framebuffer.initialize();
        const vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'phong.vert');
        vert.initialize(require('./data/phong.vert'));
        const frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'phong.frag');
        frag.initialize(require('./data/phong.frag'));
        this._program = new webgl_operate_2.Program(context, 'PhongProgram');
        this._program.initialize([vert, frag], true);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uModel = this._program.uniform('u_model');
        this._uEye = this._program.uniform('u_eye');
        this._uNormal = this._program.uniform('u_normal');
        /* Create and configure camera. */
        this._camera = new webgl_operate_2.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 1.0, 2.0);
        this._camera.near = 0.5;
        this._camera.far = 4.0;
        /* Create and configure navigation */
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /* Create and configure forward pass. */
        this._forwardPass = new webgl_operate_2.ForwardSceneRenderPass(context);
        this._forwardPass.initialize();
        this._forwardPass.camera = this._camera;
        this._forwardPass.target = this._framebuffer;
        this._forwardPass.program = this._program;
        this._forwardPass.updateModelTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uModel, false, matrix);
        };
        this._forwardPass.updateViewProjectionTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uViewProjection, false, matrix);
        };
        this._forwardPass.bindUniforms = () => {
            gl.uniform3fv(this._uEye, this._camera.eye);
            gl.uniform1i(this._uNormal, 2);
        };
        this._forwardPass.bindGeometry = (geometry) => {
        };
        this._forwardPass.bindMaterial = (material) => {
            const pbrMaterial = material;
            webgl_operate_1.auxiliaries.assert(pbrMaterial !== undefined, `Material ${material.name} is not a PBR material.`);
            pbrMaterial.normalTexture.bind(gl.TEXTURE2);
        };
        this.loadAsset();
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        // ToDo: make sure that all meshes and programs inside of the scene get cleaned
        // this._mesh.uninitialize();
        // this._meshProgram.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        this._altered.alter('frameSize');
        this._altered.alter('multiFrameNumber');
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
        const gl = this._context.gl;
        if (this._altered.canvasSize) {
            this._program.bind();
            gl.uniform2f(this._program.uniform('u_frameSize'), this._frameSize[0], this._frameSize[1]);
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        if (this.isLoading) {
            return;
        }
        this._forwardPass.frame();
    }
    onSwap() {
    }
    /**
     * Load asset from URI specified by the HTML select
     */
    loadAsset() {
        const uri = '/examples/data/matrix-chair.glb';
        this._forwardPass.scene = undefined;
        this._loader.uninitialize();
        this._loader.loadAsset(uri)
            .then(() => {
            this._forwardPass.scene = this._loader.defaultScene;
            this.finishLoading();
            this.invalidate(true);
        });
    }
}
exports.GouraudPhongRenderer = GouraudPhongRenderer;
class GouraudPhongExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new GouraudPhongRenderer();
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
exports.GouraudPhongExample = GouraudPhongExample;
//# sourceMappingURL=gouraudphong-example.js.map