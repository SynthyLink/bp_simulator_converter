"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DfdxDfdyExample = exports.DfdxDfdyRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class DfdxDfdyRenderer extends webgl_operate_1.Renderer {
    _extensions = false;
    _colorRenderTexture;
    _intermediateFBO;
    _ndcTriangle;
    _texture;
    _program;
    _defaultFBO;
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
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        /* Enable required extensions. */
        if (this._extensions === false && this._context.isWebGL1) {
            webgl_operate_1.auxiliaries.assert(this._context.supportsStandardDerivatives, `expected OES_standard_derivatives support`);
            /* tslint:disable-next-line:no-unused-expression */
            this._context.standardDerivatives;
            this._extensions = true;
        }
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        const internalFormatAndType = webgl_operate_1.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, webgl_operate_1.Wizard.Precision.half);
        this._colorRenderTexture = new webgl_operate_1.Texture2D(this._context, 'ColorRenderTexture');
        this._colorRenderTexture.initialize(1, 1, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        this._colorRenderTexture.filter(gl.LINEAR, gl.LINEAR);
        this._intermediateFBO = new webgl_operate_1.Framebuffer(this._context, 'IntermediateFBO');
        this._intermediateFBO.initialize([
            [gl2facade.COLOR_ATTACHMENT0, this._colorRenderTexture]
        ]);
        const vert = new webgl_operate_1.Shader(context, gl.VERTEX_SHADER, 'dfdx-dfdy-example.vert');
        vert.initialize(require('./data/dfdx-dfdy-example.vert'));
        const frag = new webgl_operate_1.Shader(context, gl.FRAGMENT_SHADER, 'dfdx-dfdy-example.frag');
        frag.initialize(require('./data/dfdx-dfdy-example.frag'));
        this._program = new webgl_operate_1.Program(context, 'SpaceFillingProgram');
        this._program.initialize([vert, frag], false);
        this._ndcTriangle = new webgl_operate_1.NdcFillingTriangle(this._context);
        const aVertex = this._program.attribute('a_vertex', 0);
        this._program.link();
        this._program.bind();
        this._ndcTriangle.initialize(aVertex);
        this._blit = new webgl_operate_1.BlitPass(this._context);
        this._blit.initialize();
        this._blit.framebuffer = this._intermediateFBO;
        this._blit.readBuffer = gl2facade.COLOR_ATTACHMENT0;
        this._blit.target = this._defaultFBO;
        this._blit.drawBuffer = gl.BACK;
        this.finishLoading();
        return true;
    }
    /**
     * Uninitializes buffers, geometry and program.
     */
    onUninitialize() {
        super.uninitialize();
        this._ndcTriangle.uninitialize();
        this._program.uninitialize();
        this._defaultFBO.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('frameSize');
    }
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * @returns whether to redraw
     */
    onUpdate() {
        return this._altered.any;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        const gl = this._context.gl;
        if (this._altered.frameSize) {
            this._intermediateFBO.resize(this._frameSize[0], this._frameSize[1]);
            const aspect = this._frameSize[0] / this._frameSize[1];
            // Lower-left inset
            this._zoomSrcBounds = gl_matrix_1.vec4.fromValues(0.0, 0.0, this._frameSize[0] * 0.04, this._frameSize[1] * 0.04 * aspect);
            this._program.bind();
            gl.uniform2f(this._program.uniform('u_frameSize'), this._frameSize[0], this._frameSize[1]);
            this._program.unbind();
        }
        if (this._altered.canvasSize) {
            const aspect = this._canvasSize[0] / this._canvasSize[1];
            this._zoomDstBounds = gl_matrix_1.vec4.fromValues(this._canvasSize[0] * (1.0 - 0.37), this._canvasSize[1] * (1.0 - 0.37 * aspect), this._canvasSize[0] * (1.0 - 0.02), this._canvasSize[1] * (1.0 - 0.02 * aspect));
        }
        this._altered.reset();
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        this._intermediateFBO.bind();
        this._intermediateFBO.clear(gl.COLOR_BUFFER_BIT, false, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        this._program.bind();
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
        this._program.unbind();
    }
    onSwap() {
        this._blit.frame();
        this._blit.srcBounds = this._zoomSrcBounds;
        this._blit.dstBounds = this._zoomDstBounds;
        this._blit.frame();
        this._blit.srcBounds = this._blit.dstBounds = undefined;
    }
}
exports.DfdxDfdyRenderer = DfdxDfdyRenderer;
class DfdxDfdyExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.half;
        // this._canvas.frameScale = [0.5, 0.5];
        this._canvas.frameScale = [0.07760416716337204, 0.08425925672054291];
        this._renderer = new DfdxDfdyRenderer();
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
exports.DfdxDfdyExample = DfdxDfdyExample;
//# sourceMappingURL=dfdx-dfdy-example.js.map