"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorScaleExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class ColorScaleRenderer extends webgl_operate_2.Renderer {
    _extensions = false;
    _positions = new Array();
    _presets = [
        ['smithwalt', 'viridis', 7, false],
        ['smithwalt', 'viridis', 64, false],
        ['smithwalt', 'inferno', 7, false],
        ['smithwalt', 'inferno', 64, false],
        ['marcosci', 'cividis', 7, false],
        ['marcosci', 'cividis', 64, false],
        ['smithwalt', 'magma', 7, false],
        ['smithwalt', 'magma', 64, false],
        ['colorbrewer', 'Greys', 4, true],
        ['colorbrewer', 'Greys', 7, true],
        ['smithwalt', 'plasma', 7, false],
        ['smithwalt', 'plasma', 64, false],
        ['colorbrewer', 'Spectral', 7, true],
        ['colorbrewer', 'Spectral', 64, true],
        ['mikhailov', 'turbo', 16, false],
        ['mikhailov', 'turbo', 128, false],
        ['colorbrewer', 'BrBG', 7, true],
        ['colorbrewer', 'RdBu', 64, true],
        ['colorbrewer', 'RdYlBu', 7, true],
        ['colorbrewer', 'PuOr', 7, true],
        ['colorbrewer', 'OrRd', 4, false],
        ['colorbrewer', 'OrRd', 7, false],
        ['colorbrewer', 'RdPu', 4, false],
        ['colorbrewer', 'RdPu', 7, false],
        ['colorbrewer', 'Accent', 7, false],
        ['colorbrewer', 'Paired', 7, false],
        ['colorbrewer', 'Pastel2', 7, false],
        ['colorbrewer', 'Dark2', 7, false],
    ];
    _labelPass;
    _labels = new Array();
    _textures = new Array();
    _ndcrect;
    _program;
    _uExtent;
    _uOffset;
    _camera;
    _defaultFBO;
    _fontFace;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback) {
        const gl = context.gl;
        /* Create framebuffers, textures, and render buffers. */
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._ndcrect = new webgl_operate_2.NdcFillingRectangle(this._context);
        this._ndcrect.initialize();
        const vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'colorscale.vert');
        vert.initialize(require('./data/colorscale.vert'));
        const frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'colorscale.frag');
        frag.initialize(require('./data/colorscale.frag'));
        this._program = new webgl_operate_2.Program(context, 'ColorScaleProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_position', this._ndcrect.vertexLocation);
        this._program.link();
        this._program.bind();
        this._uExtent = this._program.uniform('u_extent');
        this._uOffset = this._program.uniform('u_offset');
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        this._program.unbind();
        /* Create and configure test navigation. */
        this._camera = new webgl_operate_2.Camera();
        /* Create and configure label pass. */
        this._labelPass = new webgl_operate_2.LabelRenderPass(context);
        this._labelPass.initialize();
        this._labelPass.camera = this._camera;
        this._labelPass.target = this._defaultFBO;
        this._labelPass.depthMask = false;
        webgl_operate_2.FontFace.fromFile('./data/opensans2048p160d16.fnt', context)
            .then((fontFace) => {
            for (const label of this._labelPass.labels) {
                label.fontFace = fontFace;
            }
            this._fontFace = fontFace;
            this.updateLabels();
            this.finishLoading();
            this.invalidate();
        })
            .catch((reason) => webgl_operate_1.auxiliaries.log(webgl_operate_1.auxiliaries.LogLevel.Error, reason));
        const createLabeledColorScaleRect = (i, source, preset, steps, invert) => {
            this._positions[i] = webgl_operate_1.vec2.create();
            this._labels[i] = new webgl_operate_2.Position2DLabel(new webgl_operate_2.Text(`${source}: ${preset} #${steps}`), webgl_operate_2.Label.Type.Dynamic);
            this._labels[i].lineAnchor = webgl_operate_2.Label.LineAnchor.Top;
            this._textures[i] = new webgl_operate_2.Texture2D(context, `Texture${preset}`);
            this._textures[i].initialize(steps, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
            webgl_operate_2.ColorScale.fromPreset(`data/${source}.json`, preset, steps).then((scale) => {
                if (invert) {
                    scale.invert();
                }
                const data = scale.bitsUI8(webgl_operate_2.Color.Space.RGB, false);
                this._textures[i].data(data, true, false);
            });
        };
        this._positions.length = this._labels.length = this._textures.length = this._presets.length;
        for (let i = 0; i < this._presets.length; ++i) {
            createLabeledColorScaleRect(i, this._presets[i][0], this._presets[i][1], this._presets[i][2], this._presets[i][3]);
        }
        this._labelPass.labels = this._labels;
        for (const label of this._labelPass.labels) {
            label.fontSize = 15.0 * webgl_operate_2.Label.devicePixelRatio();
            label.color.fromHex('#fff');
            label.fontSizeUnit = webgl_operate_2.Label.Unit.Pixel;
        }
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        this._defaultFBO.uninitialize();
        this._labelPass.uninitialize();
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
        for (const label of this._labelPass.labels) {
            if (label.altered || label.color.altered) {
                return true;
            }
        }
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
            for (let i = 0; i < this._presets.length; ++i) {
                const [x, y] = [i % 4, Math.floor(i / 4)];
                this._positions[i][0] = (x + 1) * 0.05 + x * 0.45 - 1.0;
                this._positions[i][1] = (y + 1) * 0.15 + y * 0.10 - 1.0 + 0.05;
            }
            this.updateLabels();
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._labelPass.update();
        this._altered.reset();
        this._camera.altered = false;
    }
    /**
     * After (1) update and (2) preparation are invoked, a frame is invoked. Renders both 2D and 3D labels.
     * @param frameNumber - for intermediate frames in accumulation rendering
     */
    onFrame(frameNumber) {
        const gl = this._context.gl;
        gl.viewport(0, 0, this._camera.viewport[0], this._camera.viewport[1]);
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        this._labelPass.frame();
        this._program.bind();
        gl.uniform2f(this._uExtent, 0.40, 0.40 / 7.0 * this._camera.aspect);
        for (let i = 0; i < this._presets.length; ++i) {
            this._textures[i].bind(gl.TEXTURE0);
            gl.uniform2fv(this._uOffset, this._positions[i]);
            this._ndcrect.draw();
        }
        this._program.unbind();
    }
    updateLabels() {
        if (!this._labelPass.initialized) {
            return;
        }
        const s05 = webgl_operate_1.vec2.fromValues(this._canvasSize[0] * 0.5, this._canvasSize[1] * 0.5);
        for (let i = 0; i < this._presets.length; ++i) {
            this._labels[i].position = webgl_operate_1.vec2.mul(webgl_operate_1.vec2.create(), this._positions[i], s05);
        }
    }
}
class ColorScaleExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new ColorScaleRenderer();
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
exports.ColorScaleExample = ColorScaleExample;
//# sourceMappingURL=colorscale-example.js.map