"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelRenderPass = void 0;
const gl_matrix_1 = require("gl-matrix");
const auxiliaries_1 = require("../auxiliaries");
const tuples_1 = require("../tuples");
const camera_1 = require("../camera");
const changelookup_1 = require("../changelookup");
const context_1 = require("../context");
const framebuffer_1 = require("../framebuffer");
const initializable_1 = require("../initializable");
const program_1 = require("../program");
const shader_1 = require("../shader");
const texture2d_1 = require("../texture2d");
const glyphvertices_1 = require("./glyphvertices");
const color_1 = require("../color");
const fontface_1 = require("./fontface");
const label_1 = require("./label");
const labelgeometry_1 = require("./labelgeometry");
const position2dlabel_1 = require("./position2dlabel");
const position3dlabel_1 = require("./position3dlabel");
const projected3dlabel_1 = require("./projected3dlabel");
/* spellchecker: enable */
/**
 * This class allows rendering of multiple dynamic as well as static labels. While preparing for frame, all label
 * geometry is packed into single buffers for the GPU and drawing is done with as few draw calls as possible. The
 * preparation tries to reduce state changes when labels of same color and same font are provided consecutively.
 * It might be beneficial to not render labels of large static texts and some often changing dynamic texts using the
 * same label render pass object. Often changing texts should be out into separate passed for better performance.
 */
class LabelRenderPass extends initializable_1.Initializable {
    /**
     * Default AA step scale: more crisp text rendering (the value is optimized for multi-frame sampling).
     */
    static DEFAULT_AA_STEP_SCALE = 0.6666;
    /**
     * Alterable auxiliary object for tracking changes on render pass inputs and lazy updates.
     */
    _altered = Object.assign(new changelookup_1.ChangeLookup(), {
        any: false,
        camera: false,
        geometry: false,
        labels: false,
        aaStepScale: false,
        aaSampling: false,
    });
    /**
     * Context, used to get context information and WebGL API access.
     */
    _context;
    /** @see {@link target} */
    _target;
    /** @see {@link camera} */
    _camera;
    /** @see {@link ndcOffset} */
    _ndcOffset = [0.0, 0.0];
    /** @see {@link depthMask} */
    _depthMask = false;
    /** @see {@link depthFunc} */
    _depthFunc;
    /** @see {@link aaStepScale} */
    _aaStepScale;
    /** @see {@link aaSampling} */
    _aaSampling = LabelRenderPass.Sampling.Smooth1;
    _program;
    _uViewProjection;
    _uNdcOffset;
    _uColor;
    _uAAStepScale;
    _uTransform;
    _uDynamic;
    _uAASampling;
    _labels = new Array();
    /**
     * Stores for each label (same index in _labels) the range within the geometry.
     */
    _ranges = new Array();
    /**
     * Stores typeset glyph vertices data per label and is used as cache to avoid unnecessary typesetting.
     */
    _verticesPerLabel = new Array();
    _geometry;
    /**
     * Creates a render pass for labels.
     * @param context - Valid context to create the object for.
     */
    constructor(context) {
        super();
        this._context = context;
        this._depthFunc = context.gl.LESS;
        this._program = new program_1.Program(context, 'LabelRenderProgram');
        this._geometry = new labelgeometry_1.LabelGeometry(this._context, 'LabelGeometry');
        this._aaStepScale = LabelRenderPass.DEFAULT_AA_STEP_SCALE;
    }
    /**
     * Typesets and renders 2D and 3D labels.
     */
    prepare() {
        const frameSize = this._camera.viewport;
        for (let i = 0; i < this._labels.length; ++i) {
            const label = this._labels[i];
            let vertices;
            const forceTypeset = this._altered.labels && this._verticesPerLabel[i] === undefined;
            if (label instanceof position2dlabel_1.Position2DLabel) {
                label.frameSize = frameSize;
                vertices = label.typeset(forceTypeset);
            }
            else if (label instanceof projected3dlabel_1.Projected3DLabel) {
                label.camera = this._camera;
                vertices = label.typeset(forceTypeset);
            }
            else if (label instanceof position3dlabel_1.Position3DLabel) {
                vertices = label.typeset(forceTypeset);
            }
            if (vertices === undefined) {
                vertices = this._verticesPerLabel[i];
            }
            else {
                this._verticesPerLabel[i] = vertices;
            }
            const rangeStart = i > 0 ? this._ranges[i - 1][1] : 0;
            const rangeEnd = rangeStart + (vertices === undefined ? 0 : vertices.length);
            this._ranges[i] = [rangeStart, rangeEnd];
        }
        const data = glyphvertices_1.GlyphVertices.concat(this._verticesPerLabel);
        this._geometry.update(data.origins, data.tangents, data.ups, data.texCoords);
    }
    draw() {
        const gl = this._context.gl;
        /* Try to avoid unnecessary binds when texture or color does not change and accumulate draw calls as long as
        both remain unchanged. */
        const range = [0, 0];
        let currentColor;
        let currentFontFace;
        const identity = gl_matrix_1.mat4.create();
        for (let i = 0; i < this._labels.length; ++i) {
            const label0 = this._labels[i];
            range[1] = this._ranges[i][1];
            /* Skip labels that have no depictable glyphs. */
            if (range[0] === range[1] || (i < this._labels.length - 1 && !label0.valid)) {
                continue;
            }
            /* If the next/subsequent label has no depictable glyphs or has the same font and color, then increase
            draw range. */
            const label1 = i < this._labels.length - 1 ? this._labels[i + 1] : undefined;
            const bothStatic = label1 && label0.type === label_1.Label.Type.Static && label1.type === label_1.Label.Type.Static;
            const sameColor = label1 && label0.color.equals(label1.color);
            const sameFontFace = label1 && label0.fontFace === label1.fontFace;
            const sameUnit = label1 && label0.fontSizeUnit === label1.fontSizeUnit;
            if (label1 && (this._ranges[i + 1][0] === this._ranges[i + 1][1]
                || (bothStatic && sameColor && sameFontFace && sameUnit))) {
                continue;
            }
            const dynamic = label0.type === label_1.Label.Type.Dynamic;
            gl.uniform1i(this._uDynamic, dynamic);
            if (dynamic) {
                gl.uniformMatrix4fv(this._uTransform, false, label0.dynamicTransform);
            }
            if (currentColor === undefined || !currentColor.equals(label0.color)) {
                gl.uniform4fv(this._uColor, label0.color.rgbaF32);
                currentColor = label0.color;
            }
            if (currentFontFace !== label0.fontFace) {
                label0.fontFace.glyphTexture.bind(gl.TEXTURE0);
                currentFontFace = label0.fontFace;
            }
            switch (label0.fontSizeUnit) {
                case label_1.Label.Unit.Pixel:
                    gl.uniformMatrix4fv(this._uViewProjection, false, identity);
                    break;
                case label_1.Label.Unit.World:
                case label_1.Label.Unit.Mixed:
                default:
                    gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
            }
            this._geometry.draw(range[0], range[1] - range[0]);
            range[0] = range[1];
        }
    }
    @initializable_1.Initializable.initialize()
    initialize() {
        const gl = this._context.gl;
        this._geometry.initialize();
        this._context.enable(['OES_standard_derivatives']);
        const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'glyph.vert');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        vert.initialize(require(`./glyph.vert`));
        const frag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'glyph.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        frag.initialize(require(`./glyph.frag`));
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._geometry.vertexLocation);
        this._program.attribute('a_texCoord', this._geometry.texCoordLocation);
        this._program.attribute('a_origin', this._geometry.originLocation);
        this._program.attribute('a_tangent', this._geometry.tangentLocation);
        this._program.attribute('a_up', this._geometry.upLocation);
        this._program.link();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uNdcOffset = this._program.uniform('u_ndcOffset');
        this._uColor = this._program.uniform('u_color');
        this._uAAStepScale = this._program.uniform('u_aaStepScale');
        this._uAASampling = this._program.uniform('u_aaSampling');
        this._uTransform = this._program.uniform('u_transform');
        this._uDynamic = this._program.uniform('u_dynamic');
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_glyphs'), 0);
        gl.uniform1f(this._uAAStepScale, this._aaStepScale);
        gl.uniform1i(this._uAASampling, this._aaSampling);
        this._program.unbind();
        return true;
    }
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._geometry.uninitialize();
        this._program.uninitialize();
        this._uViewProjection = undefined;
        this._uNdcOffset = undefined;
        this._uColor = undefined;
        this._uAAStepScale = undefined;
        this._uAASampling = undefined;
        this._uTransform = undefined;
        this._uDynamic = undefined;
    }
    /**
     * @param override - If enabled, everything will be updated, regardless of tracked alterations.
     */
    @initializable_1.Initializable.assert_initialized()
    update(override = false) {
        const gl = this._context.gl;
        this._program.bind();
        if (override || this._altered.camera || this._camera.altered) {
            gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        }
        if (override || this._altered.aaStepScale) {
            gl.uniform1f(this._uAAStepScale, this._aaStepScale);
        }
        if (override || this._altered.aaSampling) {
            gl.uniform1i(this._uAASampling, this._aaSampling);
        }
        /* Some labels need the camera to update their font size and position. */
        let labelsAltered = override || this._altered.labels || this._altered.camera || this._camera.altered;
        let i = 0;
        while (labelsAltered === false && i < this._labels.length) {
            labelsAltered = this._labels[i].altered;
            ++i;
        }
        if (labelsAltered) {
            this.prepare();
        }
        this._altered.reset();
    }
    /**
     * This invokes draw calls on all labels. Thereby it aims to avoid unnecessary binds when texture or color does
     * not change and accumulate draw calls as long as both remain unchanged. Further more, draw calls will be
     * accumulated as much as possible (static labels only).
     */
    @initializable_1.Initializable.assert_initialized()
    frame() {
        if (this._geometry.numGlyphs === 0 || this._labels.length === 0) {
            return;
        }
        (0, auxiliaries_1.assert)(this._target && this._target.valid, `valid target expected`);
        const gl = this._context.gl;
        const size = this._target.size;
        gl.viewport(0, 0, size[0], size[1]);
        /* CULL FACE is expected to be disabled. */
        // gl.disable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(this._depthFunc);
        if (this._depthMask === false) {
            gl.depthMask(this._depthMask);
        }
        gl.enable(gl.BLEND);
        /* Note that WebGL supports separate blend by default. */
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        /* Use the following plain blend mode when relying on premultiplied colors. */
        // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this._program.bind();
        gl.uniform2fv(this._uNdcOffset, this._ndcOffset);
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        /* Controlling renderer is expected to bind the appropriate target, thus, unbinding is not
        necessary. */
        this._target.bind();
        this._geometry.bind();
        this.draw();
        /** Every stage is expected to bind its own vao when drawing, unbinding is not necessary. */
        // this._geometry.unbind();
        /** Every stage is expected to bind its own program when drawing, unbinding is not necessary. */
        // this._program.unbind();
        gl.bindTexture(gl.TEXTURE_2D, texture2d_1.Texture2D.DEFAULT_TEXTURE);
        if (this._depthMask === false) {
            gl.depthMask(true);
        }
        gl.depthFunc(gl.LESS);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
    }
    /**
     * Unbind the label geometry.
     */
    @initializable_1.Initializable.assert_initialized()
    unbind() {
        if (this._geometry.valid) {
            this._geometry.unbind();
        }
        if (this._program.valid) {
            this._program.unbind();
        }
    }
    /**
     * Sets the framebuffer the quads are rendered to.
     * @param target - Framebuffer to render into.
     */
    set target(target) {
        this.assertInitialized();
        this._target = target;
    }
    /**
     * The NDC offset is used for vertex displacement within subpixel space for anti-aliasing over
     * multiple intermediate frames (multi-frame sampling).
     * @param offset - Subpixel offset used for vertex displacement (multi-frame anti-aliasing).
     */
    set ndcOffset(offset) {
        this.assertInitialized();
        this._ndcOffset = offset;
    }
    /**
     * The camera's viewProjection is used for 3D label placement calculation.
     */
    set camera(camera) {
        this.assertInitialized();
        if (this._camera === camera) {
            return;
        }
        this._camera = camera;
        this._altered.alter('camera');
    }
    /**
     * Allows to restrict writing into the depth buffer. If the mask is set to `true`, labels might affect the depth
     * buffer and apply fragment-based discard in order to reduce blank glyph areas to override depth values. If this
     * mode is used, labels should be the last or one of the later rendering passes. If the mask is set to `false`, the
     * common transparency/blending etc issues might occur when several labels overlap or other, e.g., transparent
     * areas are rendered afterwards... However, if only labels of the same color can overlap and no other objects can
     * interfere, this might be the better choice.
     * By default, writing to the depth buffer is disabled (depth mask is false).
     */
    set depthMask(flag) {
        this._depthMask = flag;
    }
    get depthMask() {
        return this._depthMask;
    }
    /**
     * Allows to specify the value used for depth buffer comparisons.
     */
    set depthFunc(func) {
        this._depthFunc = func;
    }
    get depthFunc() {
        return this._depthFunc;
    }
    /**
     * Access to the labels that should be rendered. Note that label preparation is currently done per
     * label-render pass instance, so drawing the same label with multiple renderers should be avoided. Label
     * preparation will be invoked on update, iff the labels or the font face have changed.
     */
    set labels(labels) {
        this._labels = labels;
        this._ranges.length = this._labels.length;
        this._verticesPerLabel.length = this._labels.length;
        this._verticesPerLabel.fill(undefined);
        this._altered.alter('labels');
    }
    get labels() {
        return this._labels;
    }
    /**
     * Allows to specify the basic AA step scale which is more of a hack to provide seemingly smoother (e.g., >= 1.0)
     * or crisper (e.g., between 0.0 and 1.0) contours without specific multi sampling. Its just scaling the outcome
     * of the derivatives.
     */
    set aaStepScale(scale) {
        if (this._aaStepScale === scale) {
            return;
        }
        this._aaStepScale = scale;
        this._altered.alter('aaStepScale');
    }
    get aaStepScale() {
        return this._aaStepScale;
    }
    /**
     * Specify the sampling pattern/mode (anti-aliasing / no anti-aliasing) for glyph rendering. The sampling should be
     * increased when rendering small text, e.g., starting at font size of 16px or less. With larger text, there is no
     * perceptual benefit with more than one derivative sample, i.e., LabelRenderPass.Sampling.Smooth1.
     */
    set aaSampling(sampling) {
        if (this._aaSampling === sampling) {
            return;
        }
        this._aaSampling = sampling;
        this._altered.alter('aaSampling');
    }
    get aaSampling() {
        return this._aaSampling;
    }
    /**
     * Read-only access (leaky) to the actual label geometry (VAO) used to draw this pass's labels.
     */
    get geometry() {
        return this._geometry;
    }
    /**
     * Read-only access (leaky) to the actual label geometry (VAO) used to draw this pass's labels.
     */
    get program() {
        return this._program;
    }
}
exports.LabelRenderPass = LabelRenderPass;
(function (LabelRenderPass) {
    let Sampling;
    (function (Sampling) {
        Sampling[Sampling["None"] = 0] = "None";
        Sampling[Sampling["Smooth1"] = 1] = "Smooth1";
        Sampling[Sampling["Horizontal3"] = 2] = "Horizontal3";
        Sampling[Sampling["Vertical3"] = 3] = "Vertical3";
        Sampling[Sampling["Grid3x3"] = 4] = "Grid3x3";
        Sampling[Sampling["Grid4x4"] = 5] = "Grid4x4";
    })(Sampling = LabelRenderPass.Sampling || (LabelRenderPass.Sampling = {}));
})(LabelRenderPass || (exports.LabelRenderPass = LabelRenderPass = {}));
//# sourceMappingURL=labelrenderpass.js.map