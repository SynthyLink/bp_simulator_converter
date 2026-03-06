"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlyphExtExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class GlyphExtRenderer extends webgl_operate_2.Renderer {
    _extensions = false;
    _labelPass;
    _labelWrap;
    _camera;
    _navigation;
    _defaultFBO;
    _fontFace;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        /* Create framebuffers, textures, and render buffers. */
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        /* Create and configure test navigation. */
        this._camera = new webgl_operate_2.Camera();
        this._camera.eye = webgl_operate_1.vec3.fromValues(0.0, 0.0, 1.0);
        this._camera.center = webgl_operate_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = webgl_operate_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.near = 0.1;
        this._camera.far = 4.0;
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /* Create and configure label pass. */
        this._labelPass = new webgl_operate_2.LabelRenderPass(context);
        this._labelPass.initialize();
        this._labelPass.camera = this._camera;
        this._labelPass.target = this._defaultFBO;
        this._labelPass.depthMask = false;
        webgl_operate_2.FontFace.fromFiles('./data/opensans2048p160d16.fnt', new Map([[0, './data/timesnewroman2080p160d16.png']]), context)
            .then((fontFace) => {
            for (const label of this._labelPass.labels) {
                label.fontFace = fontFace;
            }
            this._fontFace = fontFace;
            this.finishLoading();
            this.invalidate(true);
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
    }
    /**
     * Sets up an example scene with 2D and 3D labels and sets the corresponding data on LabelGeometries. The
     * FontFace is set on each label by the LabelRenderPass.
     */
    setupScene() {
        /** Wrapped labels, showcasing Ellipsis and NewLine */
        const kafka = 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in \
his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his \
brown belly, slightly domed and divided by arches into stiff sections.';
        this._labelWrap = new webgl_operate_2.Position3DLabel(new webgl_operate_2.Text(`Wrap: ${kafka}`), webgl_operate_2.Label.Type.Static);
        this._labelWrap.wrap = true;
        this._labelWrap.lineWidth = 0.8;
        this._labelWrap.position = [-0.3, 0.3, 0.0];
        this._labelWrap.up = [0.0, 1.0, 0.0];
        this._labelPass.labels = [this._labelWrap];
        for (const label of this._labelPass.labels) {
            label.fontSize = 0.05;
            label.color.fromHex('#fff');
            label.fontSizeUnit = webgl_operate_2.Label.Unit.World;
        }
    }
}
class GlyphExtExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new GlyphExtRenderer();
        this._canvas.renderer = this._renderer;
        // Create a target cross as reference for coordinate origin [0,0,0]
        const hlStyle = 'z-index: 1; position: absolute; width: 100%; margin: 0; margin-left: 0%;'
            + 'border: none; border-bottom: 1pt solid #1c75bc; border-top: 1pt solid #1c75bc;';
        const vlStyle = 'z-index: 1; position: absolute; height: 100%; margin: 0; margin-top: 0%;'
            + 'border: none; border-left: 1pt solid #1cbc75; border-right: 1pt solid #1cbc75;';
        const hl = document.createElement('hl');
        hl.setAttribute('style', `${hlStyle} top: 50%;`);
        const vl = document.createElement('vl');
        vl.setAttribute('style', `${vlStyle} left: 50%;`);
        const parent = this._canvas.element.parentElement;
        const reference = this._canvas.element;
        parent.insertBefore(hl, reference);
        parent.insertBefore(vl, reference);
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
exports.GlyphExtExample = GlyphExtExample;
//# sourceMappingURL=glyph-ext-example.js.map