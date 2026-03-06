"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position2DLabel = void 0;
const gl_matrix_1 = require("gl-matrix");
const auxiliaries_1 = require("../auxiliaries");
const gl_matrix_extensions_1 = require("../gl-matrix-extensions");
const tuples_1 = require("../tuples");
const fontface_1 = require("./fontface");
const glyphvertices_1 = require("./glyphvertices");
const label_1 = require("./label");
const text_1 = require("./text");
const typesetter_1 = require("./typesetter");
/* spellchecker: enable */
/**
 * A Label that can be positioned in 2D space. The unit for positions, size and transformations, is pixel (px).
 */
class Position2DLabel extends label_1.Label {
    static DEFAULT_FONTSIZE_PX = 20;
    /** @see {@link position} */
    _position;
    /** @see {@link direction} */
    _direction;
    /** @see {@link frameSize} */
    _frameSize;
    /**
     * Constructs a pre-configured 2D-label with given text
     * @param text - The text that is displayed by this label.
     * @param fontFace - The font face that should be used for that label, or undefined if set later.
     */
    constructor(text, type, fontFace) {
        super(text, type, fontFace);
        this._position = gl_matrix_1.vec2.fromValues(0.0, 0.0);
        this._direction = gl_matrix_1.vec2.fromValues(1.0, 0.0);
        this._frameSize = gl_matrix_1.vec2.create();
        this._fontSize = Position2DLabel.DEFAULT_FONTSIZE_PX;
        this._fontSizeUnit = label_1.Label.Unit.Pixel;
    }
    /**
     * If altered, creates a position and direction-vector, then prepares the vertex storage and invokes
     * typesetting. Depending on the label's type (static or dynamic) the transform is stored and applied either during
     * typesetting (static) or passed as single transform to the vertex shader during rendering (dynamic).
     */
    typeset(force = false) {
        const typeset = force || this._altered.typesetting || this._altered.static || this._altered.text
            || this.text.altered;
        if (!typeset && !this._altered.dynamic && !force) {
            return undefined;
        }
        if (!this.valid) {
            return new glyphvertices_1.GlyphVertices(0);
        }
        /** @todo meaningful margins from label.margins or config.margins ? */
        const margins = gl_matrix_1.vec4.create();
        /** @todo this will be required for point units */
        // const ppiScale = Label.devicePixelRatio();
        /* compute transform matrix */
        const transform = gl_matrix_1.mat4.create();
        /* translate to lower left in NDC */
        gl_matrix_1.mat4.translate(transform, (0, gl_matrix_extensions_1.m4)(), gl_matrix_1.vec3.fromValues(-1.0, -1.0, 0.0));
        /* scale glyphs to NDC size, this._frameSize should be the viewport size */
        gl_matrix_1.mat4.scale(transform, transform, gl_matrix_1.vec3.fromValues(2.0 / this._frameSize[0], 2.0 / this._frameSize[1], 1.0));
        /* scale glyphs to pixel size with respect to the displays ppi */
        // mat4.scale(transform, transform, vec3.fromValues(ppiScale, ppiScale, ppiScale));
        /* translate to origin in point space - scale origin within margined extend
         * (i.e., viewport with margined areas removed)
         */
        const marginedExtent = gl_matrix_1.vec2.sub((0, gl_matrix_extensions_1.v2)(), gl_matrix_1.vec2.fromValues(this._frameSize[0], this._frameSize[1]), gl_matrix_1.vec2.fromValues(margins[3] + margins[1], margins[2] + margins[0]));
        const v3 = gl_matrix_1.vec3.fromValues(0.5 * marginedExtent[0], 0.5 * marginedExtent[1], 0);
        gl_matrix_1.vec3.add(v3, v3, gl_matrix_1.vec3.fromValues(margins[3], margins[2], 0.0));
        gl_matrix_1.mat4.translate(transform, transform, v3);
        /* apply user transformations (position, direction) */
        gl_matrix_1.mat4.translate(transform, transform, gl_matrix_1.vec3.fromValues(this._position[0], this._position[1], 0));
        const n = gl_matrix_1.vec2.fromValues(1.0, 0.0);
        let angle = gl_matrix_1.vec2.angle(n, this._direction);
        /* perp dot product for signed angle */
        if (n[0] * this._direction[1] - n[1] * this._direction[0] < 0.0) {
            angle = -angle;
        }
        gl_matrix_1.mat4.rotateZ(transform, transform, angle);
        switch (this._type) {
            case label_1.Label.Type.Static:
                this.staticTransform = gl_matrix_1.mat4.clone(transform);
                this.dynamicTransform = (0, gl_matrix_extensions_1.m4)();
                break;
            case label_1.Label.Type.Dynamic:
                this.staticTransform = (0, gl_matrix_extensions_1.m4)();
                this.dynamicTransform = gl_matrix_1.mat4.clone(transform);
                break;
            default:
        }
        this._altered.reset();
        this._text.altered = false;
        this._color.altered = false;
        if (!typeset) {
            return undefined;
        }
        const vertices = this.vertices();
        typesetter_1.Typesetter.typeset(this, vertices);
        return vertices;
    }
    /**
     * Width and height of targeted frame used to account for font size in px or pt units. Changing the frame size
     * invalidates the transform.
     */
    set frameSize(size) {
        if (gl_matrix_1.vec2.equals(this._frameSize, size)) {
            return;
        }
        gl_matrix_1.vec2.max(this._frameSize, size, [1.0, 1.0]);
        this._altered.alter(this._type);
    }
    get frameSize() {
        return this._frameSize;
    }
    /**
     * Sets the 2D position of the label's reference point.
     */
    set position(position) {
        if (gl_matrix_1.vec2.equals(this._position, position)) {
            return;
        }
        this._position = gl_matrix_1.vec2.clone(position);
        this._altered.alter(this._type);
    }
    get position() {
        return this._position;
    }
    /**
     * Sets the 2D direction of the label, i.e., the direction of the baseline.
     */
    set direction(direction) {
        gl_matrix_1.vec2.normalize(this._direction, direction);
        this._altered.alter(this._type);
    }
    get direction() {
        return this._direction;
    }
    /**
     * This unit is used for the font size. This method overrides the super.fontSizeUnit, since `Position2DLabel` only
     * supports Pixel, for now.
     * (@see {@link fontSize})
     * @param newUnit - Unit to be used, though, this label type only supports pixel units (px).
     */
    set fontSizeUnit(unit) {
        (0, auxiliaries_1.logIf)(unit !== label_1.Label.Unit.Pixel, auxiliaries_1.LogLevel.Warning, `font size unit other than 'px' are not supported in position-2d-label, given ${unit}`);
    }
    get fontSizeUnit() {
        return this._fontSizeUnit;
    }
}
exports.Position2DLabel = Position2DLabel;
//# sourceMappingURL=position2dlabel.js.map