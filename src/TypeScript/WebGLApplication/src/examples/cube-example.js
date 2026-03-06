"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeExample = exports.CubeRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class CubeRenderer extends webgl_operate_1.Renderer {
    _camera;
    _navigation;
    _cuboid;
    _texture;
    _program;
    _uViewProjection;
    _defaultFBO;
    /**
     * Initializes and sets up buffer, cube geometry, camera and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        const gl = context.gl;
        this._cuboid = new webgl_operate_1.CuboidGeometry(context, 'Cuboid', true, [2.0, 2.0, 2.0]);
        this._cuboid.initialize();
        const vert = new webgl_operate_1.Shader(context, gl.VERTEX_SHADER, 'mesh.vert');
        vert.initialize(require('./data/mesh.vert'));
        const frag = new webgl_operate_1.Shader(context, gl.FRAGMENT_SHADER, 'mesh.frag');
        frag.initialize(require('./data/mesh.frag'));
        this._program = new webgl_operate_1.Program(context, 'CubeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._cuboid.vertexLocation);
        this._program.attribute('a_texCoord', this._cuboid.uvCoordLocation);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        const identity = gl_matrix_1.mat4.identity(gl_matrix_1.mat4.create());
        gl.uniformMatrix4fv(this._program.uniform('u_model'), false, identity);
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        gl.uniform1i(this._program.uniform('u_textured'), false);
        this._texture = new webgl_operate_1.Texture2D(context, 'Texture');
        this._texture.initialize(1, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
        this._texture.wrap(gl.REPEAT, gl.REPEAT);
        this._texture.filter(gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR);
        this._texture.maxAnisotropy(webgl_operate_1.Texture2D.MAX_ANISOTROPY);
        this._texture.fetch('/examples/data/blue-painted-planks-diff-1k-modified.webp').then(() => {
            const gl = context.gl;
            this._program.bind();
            gl.uniform1i(this._program.uniform('u_textured'), true);
            this.finishLoading();
            this.invalidate(true);
        });
        if (this._camera === undefined) {
            this._camera = new webgl_operate_1.Camera();
            this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
            this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 5.0);
            this._camera.near = 1.0;
            this._camera.far = 8.0;
        }
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        return true;
    }
    /**
     * Uninitializes buffers, geometry and program.
     */
    onUninitialize() {
        super.uninitialize();
        this._cuboid.uninitialize();
        this._program.uninitialize();
        this._defaultFBO.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
    }
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * @returns whether to redraw
     */
    onUpdate() {
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._camera.viewport = this._canvasSize;
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame() {
        if (this.isLoading) {
            return;
        }
        const gl = this._context.gl;
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._texture.bind(gl.TEXTURE0);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        this._cuboid.bind();
        this._cuboid.draw();
        this._cuboid.unbind();
        this._program.unbind();
        this._texture.unbind(gl.TEXTURE0);
        gl.cullFace(gl.BACK);
        gl.disable(gl.CULL_FACE);
    }
    onSwap() { }
}
exports.CubeRenderer = CubeRenderer;
class CubeExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new CubeRenderer();
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
exports.CubeExample = CubeExample;
//# sourceMappingURL=cube-example.js.map