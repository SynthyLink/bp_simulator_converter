"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerlinNoiseExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class PerlinNoiseRenderer extends webgl_operate_1.Renderer {
    _defaultFBO;
    _ndcTriangle;
    _program;
    _uMethod;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback) {
        /* Create framebuffers, textures, and render buffers. */
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        /* Create and configure ndc triangle for rendering noise onto. */
        const gl = this._context.gl;
        this._ndcTriangle = new webgl_operate_1.NdcFillingTriangle(this._context, 'NdcFillingTriangle');
        this._ndcTriangle.initialize();
        const vert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'perlin.vert');
        vert.initialize(require('./data/perlin.vert'));
        const frag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'pattern (in-line)');
        frag.initialize(require('./data/perlin.frag'));
        this._program = new webgl_operate_1.Program(this._context, 'CanvasSizeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._program.link();
        this._program.bind();
        this._uMethod = this._program.uniform('u_method');
        const aspect = this._canvasSize[0] / this._canvasSize[1];
        gl.uniform1f(this._program.uniform('u_aspect'), aspect);
        gl.uniform1f(this._program.uniform('u_seed'), Math.random());
        this._program.unbind();
        this.finishLoading();
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        this._ndcTriangle.uninitialize();
        this._program.uninitialize();
        this._defaultFBO.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
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
        if (this._altered.canvasSize) {
            const aspect = this._canvasSize[0] / this._canvasSize[1];
            this._program.bind();
            gl.uniform1f(this._program.uniform('u_aspect'), aspect);
            this._program.unbind();
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._altered.reset();
    }
    /**
     * After (1) update and (2) preparation are invoked, a frame is invoked. Renders both 2D and 3D labels.
     * @param frameNumber - for intermediate frames in accumulation rendering
     */
    onFrame( /*frameNumber: number*/) {
        const gl = this._context.gl;
        gl.viewport(0, 0, this._canvasSize[0], this._canvasSize[1]);
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        this._program.bind();
        const t = ((new Date()).getTime() % 10000000) * 0.001;
        gl.uniform1f(this._program.uniform('u_time'), t);
        this._ndcTriangle.bind();
        const b = 1.0;
        const w = this._frameSize[0];
        const h = (this._frameSize[1] - (3.0 - 1.0) * b) / 3.0;
        gl.enable(gl.SCISSOR_TEST);
        // Value Noise
        gl.scissor(0, (h + b) * 0, w, h);
        gl.uniform1i(this._uMethod, 2);
        this._ndcTriangle.draw();
        // Gradient Noise
        gl.scissor(0, (h + b) * 1, w, h);
        gl.uniform1i(this._uMethod, 1);
        this._ndcTriangle.draw();
        // Simplex Noise
        gl.scissor(0, (h + b) * 2, w, h);
        gl.uniform1i(this._uMethod, 0);
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
    }
    onSwap() {
        // this.invalidate(true);
    }
}
class PerlinNoiseExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new PerlinNoiseRenderer();
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
exports.PerlinNoiseExample = PerlinNoiseExample;
//# sourceMappingURL=perlinnoise-example.js.map