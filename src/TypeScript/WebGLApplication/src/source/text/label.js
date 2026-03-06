"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const gl_matrix_1 = require("gl-matrix");
const changelookup_1 = require("../changelookup");
const color_1 = require("../color");
const tuples_1 = require("../tuples");
const fontface_1 = require("./fontface");
const glyphvertices_1 = require("./glyphvertices");
const text_1 = require("./text");
/* spellchecker: enable */
/**
 * Object comprising a text reference, a font face, and additional typographic information for type setting, rendering,
 * and interaction. Multiple labels might reference the same text, but could be placed at different locations or
 * rendered applying different font faces, styles etc.
 */
class Label {
    static DEFAULT_COLOR = [0.1098, 0.4588, 0.7373, 1.0];
    static DEFAULT_ELLIPSIS = '...';
    /** @see {@link text} */
    _text;
    /** @see {@link alignment} */
    _alignment = Label.Alignment.Left;
    /** @see {@link lineAnchor} */
    _lineAnchor = Label.LineAnchor.Baseline;
    /** @see {@link lineWidth} */
    _lineWidth = NaN;
    /** @see {@link fontSize} */
    _fontSize;
    /** @see {@link fontSizeUnit} */
    _fontSizeUnit = Label.Unit.World;
    /** @see {@link fontFace} */
    _fontFace;
    /** @see {@link color} */
    _color = new color_1.Color(Label.DEFAULT_COLOR);
    /** @see {@link background} */
    _backgroundColor;
    /** @see {@link type} */
    _type;
    /** @see {@link staticTransform} */
    _staticTransform;
    /** @see {@link dynamicTransform} */
    _dynamicTransform;
    /** @see {@link extent} */
    _extent;
    /** @see {@link altered} */
    _altered = Object.assign(new changelookup_1.ChangeLookup(), {
        any: false, color: false, resources: false, text: false, typesetting: false,
        static: false, dynamic: false,
    });
    /** @see {@link wrap} */
    _wrap = false;
    /** @see {@link elide} */
    _elide = Label.Elide.None;
    /** @see {@link ellipsis} */
    _ellipsis = Label.DEFAULT_ELLIPSIS;
    /**
     * Returns the window device pixel ratio. If this is not available/undefined 1.0 is returned.
     */
    static devicePixelRatio() {
        if (window === undefined || typeof window.devicePixelRatio !== 'number') {
            return 1.0;
        }
        return window.devicePixelRatio;
    }
    /**
     * Constructs an unconfigured, empty label. Depending on the label type, transformations are applied
     * once when typesetting (static) or every frame during rendering (dynamic).
     * @param text - The text that is displayed by this label.
     * @param type - Either static or dynamic. If static is used, all transformations are baked and modifications to
     * any of the label's transformations are expected to occur less often.
     * @param fontFace - The font face that should be used for that label, or undefined if set later.
     */
    constructor(text, type, fontFace) {
        this._text = text;
        this._type = type;
        this._staticTransform = gl_matrix_1.mat4.create();
        this._dynamicTransform = gl_matrix_1.mat4.create();
        this._extent = [0, 0];
        if (fontFace) {
            this._fontFace = fontFace;
        }
    }
    /**
     * Creates an Array of glyph vertices, ready to be used in the Typesetter.
     */
    vertices() {
        const vertices = new glyphvertices_1.GlyphVertices(this.length + this.ellipsis.length);
        return vertices;
    }
    /**
     * Returns the character at the specified index.
     * @param index - The zero-based index of the desired character.
     * @returns character at the specified index
     */
    charAt(index) {
        return this._text.charAt(index);
    }
    /**
     * Returns the Unicode value (codepoint) of the character at the specified location.
     * @param index - The zero-based index of the desired character. If there is no character at the specified index,
     * NaN is returned.
     * @returns - codepoint of the char at given index or NaN
     */
    charCodeAt(index) {
        return this._text.charCodeAt(index);
    }
    /**
     * Returns, whether or not the character at a given index is equal to the default or the text's line feed character.
     * @param index - The zero-based index of the desired character. If there is no character at the specified index,
     * NaN is returned.
     * @returns - true if char at given index equals the text's line feed character
     */
    lineFeedAt(index) {
        return this.charAt(index) === this.lineFeed;
    }
    /**
     * Gets the kerning value before (i.e., left in left-to-right writing systems) the given glyph index.
     * @param index - index of the glyph in this label
     * @returns - kerning value before glyph at given index
     */
    kerningBefore(index) {
        if (index < 1 || index > this.length) {
            return NaN;
        }
        return this._fontFace.kerning(this.charCodeAt(index - 1), this.charCodeAt(index));
    }
    /**
     * Gets the kerning value after (i.e., right in left-to-right writing systems) the given glyph index.
     * @param index - index of the glyph in this label
     * @returns - kerning value after glyph at given index
     */
    kerningAfter(index) {
        if (index < 0 || index > this.length - 1) {
            return NaN;
        }
        return this._fontFace.kerning(this.charCodeAt(index), this.charCodeAt(index + 1));
    }
    /**
     * Returns the advancement of the glyph at given index.
     * @param index - The zero-based index of the desired character. If there is no character at the specified index,
     * NaN is returned.
     * @returns - advancement of the glyph at given index or NaN
     */
    advance(index) {
        if (index < 0 || index > this.length) {
            return NaN;
        }
        return this._fontFace.glyph(this.charCodeAt(index)).advance;
    }
    /**
     * Convenience getter to the label's text as string.
     * @returns the label's text as string
     */
    toString() {
        if (this._text instanceof text_1.Text) {
            return this._text.text;
        }
        return this._text;
    }
    /**
     * Intended for resetting alteration status.
     */
    reset() {
        this._altered.reset();
    }
    /**
     * Text that is to be rendered.
     */
    set text(text) {
        this._altered.alter('text');
        this._text = text;
    }
    get text() {
        return this._text;
    }
    /**
     * Read-only access to this labels type specified at construction time. Static labels are baking as much
     * transformations as possible into the glyph vertices (used for GPU). This means, when the position or size
     * changes, the label must be typeset again and vertices are fully re-computed. For dynamic labels, only most
     * relevant transformations are applied and dynamic transformations such as rotation, translation, scale etc,
     * are applied during rendering without requiring re-typesetting or re-computation of vertices. The type,
     * however, does not relate to the text. Whenever the text changes, re-typesetting etc. have to be invoked.
     */
    get type() {
        return this._type;
    }
    /**
     * Length of the text, i.e., number of characters within the text.
     */
    get length() {
        return this._text.length;
    }
    /**
     * Character that is to be used for Line feed.
     */
    get lineFeed() {
        if (this._text instanceof text_1.Text) {
            return this._text.lineFeed;
        }
        return text_1.Text.DEFAULT_LINE_FEED;
    }
    /**
     * If enabled, breaks lines automatically at line width (while typesetting). Note that elide mode takes precedence.
     */
    set wrap(flag) {
        this._wrap = flag;
    }
    get wrap() {
        return this._wrap;
    }
    /**
     * If enabled, shrinks the label to line width. Depending on the elide mode, the ellipses is put left, middle, or
     * right. The ellipsis string can be adjusted (@see {@link ellipsis}). If the labels text does not exceed the line
     * width no elide will be applied.
     */
    set elide(elide) {
        this._elide = elide;
    }
    get elide() {
        return this._elide;
    }
    /**
     * Allows to override/customize the ellipsis string used for text elide (@see {@link elide}).
     */
    set ellipsis(ellipsis) {
        if (this._ellipsis === ellipsis) {
            return;
        }
        this._ellipsis = ellipsis;
        if (this._elide !== Label.Elide.None) {
            this._altered.alter('typesetting');
        }
    }
    get ellipsis() {
        return this._ellipsis;
    }
    /**
     * Line width used to either maximum length for elide or maximum length for line breaks due to word wrap. The line
     * width is expected in font size.
     */
    set lineWidth(lineWidth) {
        if (this._lineWidth === lineWidth) {
            return;
        }
        this._lineWidth = lineWidth;
        this._altered.alter('typesetting');
    }
    /**
     * Width of a single line in typesetting space (the unit used while Typesetting, i.e., the unit as the font face's
     * glyph texture atlas). Since the font face needs to be defined in order to typeset, we assume here that the label
     * has a defined fontFace.
     */
    get lineWidth() {
        /* this.fontSize and lineWidth use the same unit (i.e., this.fontSizeUnit),
         * this._lineWidth is expected to be in the same unit as the fontFace's glyph texture atlas */
        return this._lineWidth * this._fontFace.size / this.fontSize;
    }
    /**
     * Horizontal text alignment for typesetting.
     */
    set alignment(alignment) {
        if (this._alignment === alignment) {
            return;
        }
        this._alignment = alignment;
        this._altered.alter('typesetting');
    }
    get alignment() {
        return this._alignment;
    }
    /**
     * Vertical text anchor point used for positional reference.
     */
    set lineAnchor(anchor) {
        if (this._lineAnchor === anchor) {
            return;
        }
        this._lineAnchor = anchor;
        this._altered.alter('typesetting');
    }
    get lineAnchor() {
        return this._lineAnchor;
    }
    /**
     * The currently used font size.
     * (@see {@link fontSizeUnit})
     */
    set fontSize(size) {
        if (this._fontSize === size) {
            return;
        }
        this._fontSize = size;
        this._altered.alter('typesetting');
    }
    get fontSize() {
        return this._fontSize;
    }
    /**
     * This unit is used for the font size.
     * (@see {@link fontSize})
     */
    set fontSizeUnit(unit) {
        if (this._fontSizeUnit === unit) {
            return;
        }
        this._fontSizeUnit = unit;
        this._altered.alter('typesetting');
    }
    get fontSizeUnit() {
        return this._fontSizeUnit;
    }
    /**
     * Font face used for typesetting, transformation, and rendering. To avoid unnecessary state changes when rendering,
     * prefer to add labels of the same font face consecutively (since this specifies draw sequence and state change
     * occurs whenever font face changes between two subsequent labels).
     */
    set fontFace(fontFace) {
        if (this._fontFace === fontFace) {
            return;
        }
        this._fontFace = fontFace;
        this._altered.alter('typesetting');
        this._altered.alter('resources');
    }
    get fontFace() {
        return this._fontFace;
    }
    /**
     * Color used for text rendering.
     */
    set color(color) {
        if (this._color.equals(color)) {
            return;
        }
        this._color = color;
        this._altered.alter('color');
    }
    get color() {
        return this._color;
    }
    /**
     * Color used for background of text rendering.
     */
    set backgroundColor(color) {
        if (this._backgroundColor.equals(color)) {
            return;
        }
        this._backgroundColor = color;
        this._altered.alter('color');
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    /**
     * Transformation used to move, scale, rotate, skew, etc. the label into an arbitrary coordinate space (e.g.,
     * screen space, world space, ...). This can be set either explicitly or implicitly using various transformation
     * utility functions. @todo review/refine this.
     */
    set staticTransform(transform) {
        if (gl_matrix_1.mat4.equals(this._staticTransform, transform)) {
            return;
        }
        this._staticTransform = transform;
        this._altered.alter('static');
    }
    get staticTransform() {
        const s = this.fontSize / this._fontFace.size;
        const t = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.scale(t, this._staticTransform, gl_matrix_1.vec3.fromValues(s, s, s));
        return t;
    }
    /**
     * Stores the resulting dynamic transform. This is intended to be used when in dynamic mode.
     * (e.g., for calculations to the final transform).
     */
    set dynamicTransform(t) {
        this._altered.alter('dynamic');
        this._dynamicTransform = t;
    }
    get dynamicTransform() {
        return this._dynamicTransform;
    }
    /**
     * The typesetter sets this extent after typesetting and applying the static transform. Don't set this manually
     * without typesetting.
     */
    set extent(e) {
        this._extent = e;
    }
    /**
     * Returns the width and height of the typset label in fontSizeUnit. Both are zero if not typeset yet. The static
     * transform is already applied.
     */
    get extent() {
        return this._extent;
    }
    /*
    * Whether or not any property or the referenced text has changed requiring, e.g., the new typesetting.
    * The alteration status can be reset using `reset` (@see {@link reset}).
    */
    get altered() {
        return this._altered.any || this._text.altered || this._color.altered;
    }
    /**
     * Returns whether or not this label is ready to be rendered (aka has a font face with valid texture
     * as well as a text with a length > 0).
     */
    get valid() {
        return this._fontFace !== undefined && this._fontFace.glyphTexture.valid && this._text.length > 0;
    }
}
exports.Label = Label;
(function (Label) {
    let Type;
    (function (Type) {
        Type["Static"] = "static";
        Type["Dynamic"] = "dynamic";
    })(Type = Label.Type || (Label.Type = {}));
    let Elide;
    (function (Elide) {
        Elide["None"] = "none";
        Elide["Left"] = "left";
        Elide["Middle"] = "middle";
        Elide["Right"] = "right";
    })(Elide = Label.Elide || (Label.Elide = {}));
    let Alignment;
    (function (Alignment) {
        Alignment["Left"] = "left";
        Alignment["Center"] = "center";
        Alignment["Right"] = "right";
    })(Alignment = Label.Alignment || (Label.Alignment = {}));
    let LineAnchor;
    (function (LineAnchor) {
        LineAnchor["Top"] = "top";
        LineAnchor["Ascent"] = "ascent";
        LineAnchor["Center"] = "center";
        LineAnchor["Baseline"] = "baseline";
        LineAnchor["Descent"] = "descent";
        LineAnchor["Bottom"] = "bottom";
    })(LineAnchor = Label.LineAnchor || (Label.LineAnchor = {}));
    /**
     * This unit is used for the font size and related calculations.
     */
    let Unit;
    (function (Unit) {
        /* abstract world unit */
        Unit["World"] = "world";
        /* screen pixel */
        Unit["Pixel"] = "pixel";
        /* mixed: world unit for positioning, px unit for font size*/
        Unit["Mixed"] = "mixed";
        /** @todo Pt for point unit */
        /* Point = 'point', */
    })(Unit = Label.Unit || (Label.Unit = {}));
})(Label || (exports.Label = Label = {}));
//# sourceMappingURL=label.js.map