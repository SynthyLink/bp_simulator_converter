"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position3DLabel = void 0;
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
 * A Label that can be positioned in 3D space. The unit for positions, size and transformations, is the abstract World
 * Unit.
 */
class Position3DLabel extends label_1.Label {
    static DEFAULT_FONTSIZE_WORLD = 0.05;
    /** @see {@link position} */
    _position;
    /** @see {@link direction} */
    _direction;
    /** @see {@link up} */
    _up;
    /**
     * Constructs a pre-configured 3D-label with given text. Depending on the label type, transformations are applied
     * once when typesetting (static) or every frame during rendering (dynamic).
     * @param text - The text that is displayed by this label.
     * @param type - Either static or dynamic. If static is used, all transformations are baked and modifications to
     * on any of the label's transformations are expected to occur less often.
     * @param fontFace - The font face that should be used for that label, or undefined if set later.
     */
    constructor(text, type, fontFace) {
        super(text, type, fontFace);
        this._position = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._direction = gl_matrix_1.vec3.fromValues(1.0, 0.0, 0.0);
        this._up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._fontSize = Position3DLabel.DEFAULT_FONTSIZE_WORLD;
        this._fontSizeUnit = label_1.Label.Unit.World;
    }
    /**
     * If altered, creates a position, direction, and up-vector, then prepares the vertex storage and invokes
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
        const transform = gl_matrix_1.mat4.create();
        /* Compute position and direction transform. */
        gl_matrix_1.mat4.translate(transform, (0, gl_matrix_extensions_1.m4)(), this._position);
        const normal = gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), this._direction, this._up);
        const rotation = gl_matrix_1.mat4.fromValues(this._direction[0], this._direction[1], this._direction[2], 0.0, this._up[0], this._up[1], this._up[2], 0.0, normal[0], normal[1], normal[2], 0.0, 0.0, 0.0, 0.0, 1.0);
        gl_matrix_1.mat4.mul(transform, transform, rotation);
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
        /* Check whether or not to (re)typeset and reset alterations. */
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
     * Sets the 3D position of the label's reference point.
     */
    set position(position) {
        this._position = gl_matrix_1.vec3.clone(position);
        this._altered.alter(this._type);
    }
    get position() {
        return this._position;
    }
    /**
     * Sets the 3D direction of the label, i.e., the direction of the baseline.
     */
    set direction(direction) {
        gl_matrix_1.vec3.normalize(this._direction, direction);
        this._altered.alter(this._type);
    }
    get direction() {
        return this._direction;
    }
    /**
     * Sets the up-vector of the label. It should be orthogonal to the direction to ensure that the label is not skewed.
     */
    set up(up) {
        this._up = gl_matrix_1.vec3.normalize(this._up, up);
        this._altered.alter(this._type);
    }
    get up() {
        return this._up;
    }
    /**
     * This unit is used for the font size. This method overrides the super.fontSizeUnit, since `Position3DLabel` only
     * supports world unit for now. Neither pixel (px) nor point (pt) are supported.
     * (@see {@link fontSize})
     * @param unit - Unit to be used, though, this label type only supports world units.
     */
    set fontSizeUnit(unit) {
        (0, auxiliaries_1.logIf)(unit !== label_1.Label.Unit.World, auxiliaries_1.LogLevel.Warning, `font size unit other than 'world' are not supported in position-3d-label, given ${unit}`);
    }
    get fontSizeUnit() {
        return this._fontSizeUnit;
    }
}
exports.Position3DLabel = Position3DLabel;
//# sourceMappingURL=position3dlabel.js.map