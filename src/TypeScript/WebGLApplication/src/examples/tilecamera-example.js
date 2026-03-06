"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileCameraExample = exports.TileCameraRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class TileCameraRenderer extends webgl_operate_2.Renderer {
    static TILE_SIZE = [128, 128];
    static TARGET_SIZE = [3840, 2160];
    _camera;
    _navigation;
    _cuboid;
    _texture;
    _program;
    _uViewProjection;
    _defaultFBO;
    _intermediateFBOs = new Array(4);
    _colorRenderTextures = new Array(4);
    _depthRenderbuffers = new Array(4);
    _targetSize = TileCameraRenderer.TARGET_SIZE;
    _blitPass;
    _generators = new Array(3);
    _isLoaded = false;
    /**
     * Initializes and sets up buffer, cube geometry, camera and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        this.showSpinner();
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        const gl = context.gl;
        const gl2facade = context.gl2facade;
        for (let i = 0; i < this._intermediateFBOs.length; ++i) {
            this._colorRenderTextures[i] = new webgl_operate_2.Texture2D(this._context, 'ColorRenderTexture');
            this._depthRenderbuffers[i] = new webgl_operate_2.Renderbuffer(this._context, 'DepthRenderbuffer');
            this._intermediateFBOs[i] = new webgl_operate_2.Framebuffer(this._context, 'IntermediateFBO');
            this._colorRenderTextures[i].initialize(this._targetSize[0], this._targetSize[1], this._context.isWebGL2 ? gl.RGBA8 : gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
            this._depthRenderbuffers[i].initialize(this._targetSize[0], this._targetSize[1], gl.DEPTH_COMPONENT16);
            this._intermediateFBOs[i].initialize([
                [gl2facade.COLOR_ATTACHMENT0, this._colorRenderTextures[i]],
                [gl.DEPTH_ATTACHMENT, this._depthRenderbuffers[i]]
            ]);
        }
        this._blitPass = new webgl_operate_2.BlitPass(this._context);
        this._blitPass.initialize();
        this._blitPass.readBuffer = gl2facade.COLOR_ATTACHMENT0;
        this._blitPass.srcBounds = gl_matrix_1.vec4.fromValues(0, 0, this._targetSize[0], this._targetSize[1]);
        this._blitPass.filter = gl.LINEAR;
        this._blitPass.target = this._defaultFBO;
        this._blitPass.drawBuffer = gl.BACK;
        this._cuboid = new webgl_operate_2.CuboidGeometry(context, 'Cuboid', true, [4.0, 4.0, 4.0]);
        this._cuboid.initialize();
        const vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'mesh.vert');
        vert.initialize(require('./data/mesh.vert'));
        const frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'mesh.frag');
        frag.initialize(require('./data/mesh.frag'));
        this._program = new webgl_operate_2.Program(context, 'CubeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._cuboid.vertexLocation);
        this._program.attribute('a_texCoord', this._cuboid.uvCoordLocation);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        const identity = gl_matrix_1.mat4.identity(gl_matrix_1.mat4.create());
        gl.uniformMatrix4fv(this._program.uniform('u_model'), gl.FALSE, identity);
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        gl.uniform1i(this._program.uniform('u_textured'), false);
        this._texture = new webgl_operate_2.Texture2D(context, 'Texture');
        this._texture.initialize(1, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
        this._texture.wrap(gl.REPEAT, gl.REPEAT);
        this._texture.filter(gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR);
        this._texture.maxAnisotropy(webgl_operate_2.Texture2D.MAX_ANISOTROPY);
        this._texture.fetch('/examples/data/blue-painted-planks-diff-1k-modified.webp').then(() => {
            const gl = context.gl;
            this._program.bind();
            gl.uniform1i(this._program.uniform('u_textured'), true);
            this._isLoaded = true;
            this.hideSpinner();
            this.invalidate(true);
        });
        this._camera = new webgl_operate_2.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 5.0);
        this._camera.near = 0.1;
        this._camera.far = 8.0;
        this._camera.aspect = this._targetSize[0] / this._targetSize[1];
        this._camera.viewport = this._targetSize;
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        for (let i = 0; i < this._generators.length; ++i) {
            this._generators[i] = new webgl_operate_2.TileCameraGenerator();
            this._generators[i].sourceCamera = this._camera;
            this._generators[i].tileSize = TileCameraRenderer.TILE_SIZE;
            this._generators[i].sourceViewport = this._targetSize;
        }
        this._generators[0].algorithm = webgl_operate_2.TileCameraGenerator.Algorithm.ScanLine;
        this._generators[1].algorithm = webgl_operate_2.TileCameraGenerator.Algorithm.HilbertCurve;
        this._generators[2].algorithm = webgl_operate_2.TileCameraGenerator.Algorithm.ZCurve;
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
        for (let i = 0; i < this._intermediateFBOs.length; ++i) {
            this._colorRenderTextures[i].uninitialize();
            this._depthRenderbuffers[i].uninitialize();
            this._intermediateFBOs[i].uninitialize();
        }
        this._blitPass.uninitialize();
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
     * @returns whether to redraw
     */
    onUpdate() {
        this._navigation.update();
        return this._altered.any || this._camera.altered;
        // || this._tileCameraScanLineGenerator.hasNextTile() ||
        //  this._tileCameraHilbertGenerator.hasNextTile() || this._tileCameraZCurveGenerator.hasNextTile();
    }
    getViewportDividableByTwo(viewport) {
        const x = (viewport[0] & 1) === 0 ? viewport[0] : viewport[0] - 1;
        const y = (viewport[1] & 1) === 0 ? viewport[1] : viewport[1] + 1;
        return [x, y];
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        for (const generator of this._generators) {
            generator.reset();
        }
        if (this._altered.canvasSize) {
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
            for (const fbo of this._intermediateFBOs) {
                fbo.clearColor(this._clearColor);
            }
        }
        if (this._camera.altered) {
            for (const generator of this._generators) {
                generator.sourceCameraChanged();
            }
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        // if (frameNumber === 0) {
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT, true, true);
        // }
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        this._texture.bind(gl.TEXTURE0);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, gl.GL_FALSE, this._camera.viewProjection);
        this._cuboid.bind();
        if (frameNumber === 0) {
            this._intermediateFBOs[0].bind();
            gl.viewport(0, 0, this._targetSize[0], this._targetSize[1]);
            this._intermediateFBOs[0].clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
            this._cuboid.draw();
        }
        for (let i = 0; i < this._generators.length; ++i) {
            this._intermediateFBOs[i + 1].bind();
            if (frameNumber === 0) {
                gl.viewport(0, 0, this._targetSize[0], this._targetSize[1]);
                this._intermediateFBOs[i + 1].clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
            }
            if (!this._generators[i].nextTile())
                continue;
            const viewport = this._generators[i].viewport;
            gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
            gl.uniformMatrix4fv(this._uViewProjection, gl.GL_FALSE, this._generators[i].camera.viewProjection);
            this._cuboid.draw();
        }
        this._cuboid.unbind();
        this._program.unbind();
        this._texture.unbind(gl.TEXTURE0);
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
    }
    onSwap() {
        const w05 = this._canvasSize[0] / 2 - 3;
        const h05 = this._canvasSize[1] / 2 - 3;
        this._blitPass.framebuffer = this._intermediateFBOs[0];
        this._blitPass.dstBounds = gl_matrix_1.vec4.fromValues(2, 4 + h05, 2 + w05, 4 + 2 * h05);
        this._blitPass.frame();
        this._blitPass.framebuffer = this._intermediateFBOs[1];
        this._blitPass.dstBounds = gl_matrix_1.vec4.fromValues(4 + w05, 4 + h05, 4 + 2 * w05, 4 + 2 * h05);
        this._blitPass.frame();
        this._blitPass.framebuffer = this._intermediateFBOs[2];
        this._blitPass.dstBounds = gl_matrix_1.vec4.fromValues(2, 2, 2 + w05, 2 + h05);
        this._blitPass.frame();
        this._blitPass.framebuffer = this._intermediateFBOs[3];
        this._blitPass.dstBounds = gl_matrix_1.vec4.fromValues(4 + w05, 2, 4 + 2 * w05, 2 + h05);
        this._blitPass.frame();
    }
    /**
     * Show a spinner that indicates that the example is still loading.
     */
    showSpinner() {
        const spinnerElement = document.getElementsByClassName('spinner').item(0);
        spinnerElement.style.display = 'inline';
    }
    /**
     * Hide the loading spinner.
     */
    hideSpinner() {
        const spinnerElement = document.getElementsByClassName('spinner').item(0);
        spinnerElement.style.display = 'none';
    }
}
exports.TileCameraRenderer = TileCameraRenderer;
class TileCameraExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber =
            Math.ceil(TileCameraRenderer.TARGET_SIZE[0] / TileCameraRenderer.TILE_SIZE[0]) *
                Math.ceil(TileCameraRenderer.TARGET_SIZE[1] / TileCameraRenderer.TILE_SIZE[1]);
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new TileCameraRenderer();
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
exports.TileCameraExample = TileCameraExample;
//# sourceMappingURL=tilecamera-example.js.map