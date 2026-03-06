"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelElideExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class LabelElideRenderer extends webgl_operate_2.Renderer {
    _extensions = false;
    _labelPass;
    _labelSize;
    _labelLeft;
    _labelMiddle;
    _labelRight;
    _labelCustom;
    _camera;
    _defaultFBO;
    _fontFace;
    _interval;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback) {
        /* Create framebuffers, textures, and render buffers. */
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        /* Create and configure test navigation. */
        this._camera = new webgl_operate_2.Camera();
        /* Create and configure label pass. */
        this._labelPass = new webgl_operate_2.LabelRenderPass(context);
        this._labelPass.initialize();
        this._labelPass.camera = this._camera;
        this._labelPass.target = this._defaultFBO;
        this._labelPass.depthMask = true;
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
        this.setupScene();
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        this._defaultFBO.uninitialize();
        this._labelPass.uninitialize();
        if (this._interval !== undefined) {
            clearTimeout(this._interval);
            this._interval = undefined;
        }
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        if (this._interval !== undefined) {
            clearTimeout(this._interval);
            this._interval = undefined;
        }
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
    onFrame( /*frameNumber: number*/) {
        const gl = this._context.gl;
        gl.viewport(0, 0, this._camera.viewport[0], this._camera.viewport[1]);
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        this._labelPass.frame();
    }
    /**
     * Sets up an example scene with 2D and 3D labels and sets the corresponding data on LabelGeometries. The
     * FontFace is set on each label by the LabelRenderPass.
     */
    setupScene() {
        /** Wrapped labels, showcasing Ellipsis and NewLine */
        const werther = 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings \
of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was \
created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere \
tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present \
moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour \
around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few \
stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, \
as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world \
among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the \
presence of the Almighty, who formed us in his own image, and the breath of that universal love which bears and \
sustains us, as it floats around us in an eternity of bliss;  and then, my friend, when darkness overspreads my eyes, \
and heaven and earth seem to dwell in my soul and absorb its power, like the form of a beloved mistress, then I often \
think with longing, Oh, would I could describe these conceptions, could impress upon paper all that is living so full \
and warm within me, that it might be the mirror of my soul, as my soul is the mirror of the infinite God!';
        this._labelSize = new webgl_operate_2.Position2DLabel(new webgl_operate_2.Text(), webgl_operate_2.Label.Type.Dynamic);
        this._labelSize.fontSize = 20;
        this._labelSize.fontSizeUnit = webgl_operate_2.Label.Unit.Pixel;
        this._labelSize.alignment = webgl_operate_2.Label.Alignment.Left;
        this._labelSize.lineAnchor = webgl_operate_2.Label.LineAnchor.Baseline;
        this._labelSize.color.fromHex('#27aae1');
        this._labelLeft = new webgl_operate_2.Position2DLabel(new webgl_operate_2.Text(`Label.Elide.Right |  ${werther}`), webgl_operate_2.Label.Type.Dynamic);
        this._labelLeft.fontSizeUnit = webgl_operate_2.Label.Unit.Pixel;
        this._labelLeft.elide = webgl_operate_2.Label.Elide.Right;
        this._labelLeft.alignment = webgl_operate_2.Label.Alignment.Left;
        this._labelLeft.lineAnchor = webgl_operate_2.Label.LineAnchor.Baseline;
        this._labelLeft.color.fromHex('#fff');
        this._labelRight = new webgl_operate_2.Position2DLabel(new webgl_operate_2.Text(`${werther}  | Label.Elide.Left`), webgl_operate_2.Label.Type.Dynamic);
        this._labelRight.fontSizeUnit = webgl_operate_2.Label.Unit.Pixel;
        this._labelRight.elide = webgl_operate_2.Label.Elide.Left;
        this._labelRight.alignment = webgl_operate_2.Label.Alignment.Right;
        this._labelRight.lineAnchor = webgl_operate_2.Label.LineAnchor.Baseline;
        this._labelRight.color.fromHex('#fff');
        this._labelMiddle = new webgl_operate_2.Position2DLabel(new webgl_operate_2.Text(`Label.Elide.Middle |  ${werther}  | Label.Elide.Middle`), webgl_operate_2.Label.Type.Dynamic);
        this._labelMiddle.fontSizeUnit = webgl_operate_2.Label.Unit.Pixel;
        this._labelMiddle.elide = webgl_operate_2.Label.Elide.Middle;
        this._labelMiddle.alignment = webgl_operate_2.Label.Alignment.Center;
        this._labelMiddle.lineAnchor = webgl_operate_2.Label.LineAnchor.Baseline;
        this._labelMiddle.color.fromHex('#fff');
        this._labelCustom = new webgl_operate_2.Position2DLabel(new webgl_operate_2.Text(`Custom Ellipsis |  ${werther}`), webgl_operate_2.Label.Type.Dynamic);
        this._labelCustom.fontSizeUnit = webgl_operate_2.Label.Unit.Pixel;
        this._labelCustom.elide = webgl_operate_2.Label.Elide.Right;
        this._labelCustom.alignment = webgl_operate_2.Label.Alignment.Left;
        this._labelCustom.lineAnchor = webgl_operate_2.Label.LineAnchor.Baseline;
        this._labelCustom.color.fromHex('#fff');
        this._labelPass.aaStepScale = 1.0;
        this._labelPass.labels = [this._labelSize,
            this._labelLeft, this._labelRight, this._labelMiddle, this._labelCustom];
        this._interval = window.setInterval(() => {
            if (!this.initialized) {
                return;
            }
            const size = 16 + Math.sin(performance.now() * 0.001) * 4.0;
            this._labelSize.text.text = `// label.fontSize = ${size.toFixed(2)} (${this._labelSize.fontSizeUnit})`;
            this._labelLeft.fontSize = size;
            this._labelRight.fontSize = size;
            this._labelMiddle.fontSize = size;
            this._labelCustom.ellipsis = '.'.repeat(Math.floor(Math.sin(performance.now() * 0.001) * 4.0) + 5);
            this.invalidate();
        }, 1000.0 / 60.0);
    }
    updateLabels() {
        if (!this._labelLeft.valid) {
            return;
        }
        const top = +this._canvasSize[1] * 0.5;
        const step = 32.0 * webgl_operate_2.Label.devicePixelRatio();
        const width = this._canvasSize[0] - 32.0 /* margin */ * webgl_operate_2.Label.devicePixelRatio();
        this._labelSize.position = [-width * 0.5, top - 1.0 * step];
        this._labelLeft.lineWidth = width;
        this._labelLeft.position = [-width * 0.5, top - 2.5 * step];
        this._labelRight.lineWidth = width;
        this._labelRight.position = [+width * 0.5, top - 3.5 * step];
        this._labelMiddle.lineWidth = width;
        this._labelMiddle.position = [0.0, top - 4.5 * step];
        this._labelCustom.lineWidth = width * 0.5;
        this._labelCustom.position = [-width * 0.5, top - 6.0 * step];
    }
}
class LabelElideExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new LabelElideRenderer();
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
exports.LabelElideExample = LabelElideExample;
//# sourceMappingURL=labelelide-example.js.map