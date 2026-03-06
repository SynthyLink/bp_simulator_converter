"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasSizeExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class CanvasSizeRenderer extends webgl_operate_1.Renderer {
    static SHADER_SOURCE_VERT = `precision lowp float;

#if __VERSION__ == 100
    attribute vec2 a_vertex;
#else
    in vec2 a_vertex;
    #define varying out
#endif

varying vec2 v_uv;

void main(void)
{
    v_uv = a_vertex * 0.5 + 0.5;
    gl_Position = vec4(a_vertex, 0.0, 1.0);
}
`;
    static SHADER_SOURCE_FRAG = `precision highp float;

#if __VERSION__ == 100
    #define fragColor gl_FragColor
#else
    layout(location = 0) out vec4 fragColor;
    #define varying in
#endif

varying vec2 v_uv;

const float CELL_WIDTH = 1.0 / 64.0;

void main(void)
{
    vec3 x3 = vec3(gl_FragCoord.x) + vec3(0.0, 1.0, 2.0);
    vec3 y3 = vec3(gl_FragCoord.y) + vec3(0.0, 1.0, 2.0);

    vec3 x = step(mod(x3, vec3(3.0)), vec3(1.0));
    vec3 y = step(mod(y3, vec3(3.0)), vec3(1.0));

    float cell = step(mod(gl_FragCoord.x * CELL_WIDTH + floor(gl_FragCoord.y * CELL_WIDTH), 2.0), 1.0);
    fragColor = vec4(mix(x, y, cell), 1.0);
}
`;
    _extensions = false;
    _defaultFBO;
    _ndcTriangle;
    _program;
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
        /* Create and configure canvas-size test pattern pass. */
        const gl = this._context.gl;
        this._ndcTriangle = new webgl_operate_1.NdcFillingTriangle(this._context, 'NdcFillingTriangle');
        this._ndcTriangle.initialize();
        const vert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'ndcvertices (in-line)');
        vert.initialize(CanvasSizeRenderer.SHADER_SOURCE_VERT);
        const frag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'pattern (in-line)');
        frag.initialize(CanvasSizeRenderer.SHADER_SOURCE_FRAG);
        this._program = new webgl_operate_1.Program(this._context, 'CanvasSizeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._program.link();
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
        // if (this._altered.canvasSize) {
        //     this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        //     this._camera.viewport = this._canvasSize;
        // }
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
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
    }
}
class CanvasSizeExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new CanvasSizeRenderer();
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
exports.CanvasSizeExample = CanvasSizeExample;
//# sourceMappingURL=canvassize-example.js.map