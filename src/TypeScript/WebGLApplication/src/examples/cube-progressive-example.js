"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressiveCubeExample = exports.ProgressiveCubeRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class ProgressiveCubeRenderer extends webgl_operate_1.Renderer {
    _camera;
    _navigation;
    _depthRenderbuffer;
    _colorRenderTexture;
    _intermediateFBO;
    _ndcOffsetKernel;
    _uNdcOffset;
    _cuboid;
    _texture;
    _program;
    _uViewProjection;
    _defaultFBO;
    _accumulate;
    _blit;
    _zoomSrcBounds;
    _zoomDstBounds;
    /**
     * Initializes and sets up buffer, cube geometry, camera and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = context.gl;
        const gl2facade = this._context.gl2facade;
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        const internalFormatAndType = webgl_operate_1.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, webgl_operate_1.Wizard.Precision.half);
        this._colorRenderTexture = new webgl_operate_1.Texture2D(this._context, 'ColorRenderTexture');
        this._colorRenderTexture.initialize(1, 1, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        this._colorRenderTexture.filter(gl.LINEAR, gl.LINEAR);
        this._depthRenderbuffer = new webgl_operate_1.Renderbuffer(this._context, 'DepthRenderbuffer');
        this._depthRenderbuffer.initialize(1, 1, gl.DEPTH_COMPONENT16);
        this._intermediateFBO = new webgl_operate_1.Framebuffer(this._context, 'IntermediateFBO');
        this._intermediateFBO.initialize([
            [gl2facade.COLOR_ATTACHMENT0, this._colorRenderTexture],
            [gl.DEPTH_ATTACHMENT, this._depthRenderbuffer]
        ]);
        this._cuboid = new webgl_operate_1.CuboidGeometry(context, 'Cuboid', true, [2.0, 2.0, 2.0]);
        this._cuboid.initialize();
        const vert = new webgl_operate_1.Shader(context, gl.VERTEX_SHADER, 'mesh-progressive.vert');
        vert.initialize(require('./data/mesh-progressive.vert'));
        const frag = new webgl_operate_1.Shader(context, gl.FRAGMENT_SHADER, 'mesh.frag');
        frag.initialize(require('./data/mesh.frag'));
        this._program = new webgl_operate_1.Program(context, 'CubeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._cuboid.vertexLocation);
        this._program.attribute('a_texCoord', this._cuboid.uvCoordLocation);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uNdcOffset = this._program.uniform('u_ndcOffset');
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
        this._camera = new webgl_operate_1.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 5.0);
        this._camera.near = 1.0;
        this._camera.far = 8.0;
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._accumulate = new webgl_operate_1.AccumulatePass(context);
        this._accumulate.initialize();
        this._accumulate.precision = this._framePrecision;
        this._accumulate.texture = this._colorRenderTexture;
        this._blit = new webgl_operate_1.BlitPass(this._context);
        this._blit.initialize();
        this._blit.readBuffer = gl2facade.COLOR_ATTACHMENT0;
        this._blit.target = this._defaultFBO;
        this._blit.drawBuffer = gl.BACK;
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
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        if (this._altered.frameSize) {
            this._intermediateFBO.resize(this._frameSize[0], this._frameSize[1]);
            this._camera.viewport = this._canvasSize;
            const aspect = this._frameSize[0] / this._frameSize[1];
            this._zoomSrcBounds = gl_matrix_1.vec4.fromValues(this._frameSize[0] * (0.3333 - 0.02), this._frameSize[1] * (0.6666 - 0.02 * aspect), this._frameSize[0] * (0.3333 + 0.02), this._frameSize[1] * (0.6666 + 0.02 * aspect));
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._zoomDstBounds = gl_matrix_1.vec4.fromValues(this._canvasSize[0] * (1.0 - 0.374), this._canvasSize[1] * (1.0 - 0.374 * this._camera.aspect), this._canvasSize[0] * (1.0 - 0.008), this._canvasSize[1] * (1.0 - 0.008 * this._camera.aspect));
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
            this._intermediateFBO.clearColor(this._clearColor);
        }
        if (this._altered.multiFrameNumber) {
            this._ndcOffsetKernel = new webgl_operate_1.AntiAliasingKernel(this._multiFrameNumber);
        }
        this._accumulate.update();
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        this._intermediateFBO.bind();
        this._intermediateFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        const ndcOffset = this._ndcOffsetKernel.get(frameNumber);
        ndcOffset[0] = 2.0 * ndcOffset[0] / this._frameSize[0];
        ndcOffset[1] = 2.0 * ndcOffset[1] / this._frameSize[1];
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._texture.bind(gl.TEXTURE0);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        gl.uniform2fv(this._uNdcOffset, ndcOffset);
        this._cuboid.bind();
        this._cuboid.draw();
        this._cuboid.unbind();
        this._program.unbind();
        this._texture.unbind(gl.TEXTURE0);
        gl.cullFace(gl.BACK);
        gl.disable(gl.CULL_FACE);
        this._accumulate.frame(frameNumber);
    }
    onSwap() {
        this._blit.framebuffer = this._accumulate.framebuffer ?
            this._accumulate.framebuffer : this._intermediateFBO;
        this._blit.frame();
        this._blit.srcBounds = this._zoomSrcBounds;
        this._blit.dstBounds = this._zoomDstBounds;
        this._blit.frame();
        this._blit.srcBounds = this._blit.dstBounds = undefined;
    }
}
exports.ProgressiveCubeRenderer = ProgressiveCubeRenderer;
class ProgressiveCubeExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 64;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.half;
        this._canvas.frameScale = [0.5, 0.5];
        this._renderer = new ProgressiveCubeRenderer();
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
exports.ProgressiveCubeExample = ProgressiveCubeExample;
//# sourceMappingURL=cube-progressive-example.js.map