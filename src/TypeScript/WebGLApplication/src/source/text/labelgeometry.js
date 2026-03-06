"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelGeometry = void 0;
const auxiliaries_1 = require("../auxiliaries");
const buffer_1 = require("../buffer");
const context_1 = require("../context");
const geometry_1 = require("../geometry");
const initializable_1 = require("../initializable");
/* spellchecker: enable */
/**
 * Gathers vertices and other data needed for drawing all labels using the glyphquad-shaders.
 *
 * Example usage:
 * ```
 * const labelGeometry = new LabelGeometry(this._context);
 * labelGeometry = new LabelGeometry(this._context);
 * ...
 * labelGeometry.initialize();
 *
 * program.initialize([vert, frag], false);
 * program.attribute('a_vertex', labelGeometry.vertexLocation);
 * program.attribute('a_texCoord', labelGeometry.texCoordLocation);
 * program.attribute('a_origin', labelGeometry.originLocation);
 * program.attribute('a_tangent', labelGeometry.tangentLocation);
 * program.attribute('a_up', labelGeometry.upLocation);
 *
 * program.link();
 * ...
 * labelGeometry.update(origins, tangents, ups, texCoords);
 * ...
 * labelGeometry.bind();
 * labelGeometry.draw();
 * labelGeometry.unbind();
 * ```
 */
class LabelGeometry extends geometry_1.Geometry {
    /**
     * These 2D vertices are equal for all quads, used for instanced rendering. Their actual position will be changed
     * in the vertex shader, based on origins, tangents and up-vector attributes.
     * 2-------4
     * |  \    |
     * |    \  |
     * 1-------3
     */
    static VERTICES = new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]);
    /**
     * Handle to the glyph template this geometry is based on.
     */
    _vertices;
    _texCoords;
    _origins;
    _tangents;
    _ups;
    /**
     * Number of glyphs encoded within the geometry.
     */
    _numberOfGlyphs = 0;
    _vertexLocation;
    _texCoordLocation;
    _originLocation;
    _tangentLocation;
    _upLocation;
    /**
     * Object constructor, requires a context and an identifier.
     * @param context - Valid context to create the object for.
     * @param identifier - Meaningful name for identification of this instance.
     */
    constructor(context, identifier) {
        super(context, identifier);
        (0, auxiliaries_1.assert)(context.isWebGL2 || context.supportsInstancedArrays, `expected extension 'ANGLE_instanced_arrays' to be supported`);
        /* Generate identifier from constructor name if none given. */
        identifier = identifier !== undefined && identifier !== `` ? identifier : this.constructor.name;
        this._vertices = new buffer_1.Buffer(context, `${identifier}VBO`);
        this._buffers.push(this._vertices);
        this._texCoords = new buffer_1.Buffer(context, `${identifier}TexCoordVBO`);
        this._buffers.push(this._texCoords);
        this._origins = new buffer_1.Buffer(context, `${identifier}OriginVBO`);
        this._buffers.push(this._origins);
        this._tangents = new buffer_1.Buffer(context, `${identifier}TangentVBO`);
        this._buffers.push(this._tangents);
        this._ups = new buffer_1.Buffer(context, `${identifier}UpVBO`);
        this._buffers.push(this._ups);
    }
    /**
     * Binds all vertex buffer objects (VBOs) to pre-set attribute binding points.
     * @param indices - Unused, since pre-set locations are used.
     */
    bindBuffers( /*indices: Array<GLuint>*/) {
        const gl = this.context.gl;
        const gl2facade = this.context.gl2facade;
        /* Please note the implicit bind in attribEnable */
        this._vertices.attribEnable(this._vertexLocation, 2, gl.FLOAT, false, 8, 0, true, false);
        gl2facade.vertexAttribDivisor(this._vertexLocation, 0);
        this._texCoords.attribEnable(this._texCoordLocation, 4, gl.FLOAT, false, 16, 0, true, false);
        gl2facade.vertexAttribDivisor(this._texCoordLocation, 1);
        this._origins.attribEnable(this._originLocation, 3, gl.FLOAT, false, 12, 0, true, false);
        gl2facade.vertexAttribDivisor(this._originLocation, 1);
        this._tangents.attribEnable(this._tangentLocation, 3, gl.FLOAT, false, 12, 0, true, false);
        gl2facade.vertexAttribDivisor(this._tangentLocation, 1);
        this._ups.attribEnable(this._upLocation, 3, gl.FLOAT, false, 12, 0, true, false);
        gl2facade.vertexAttribDivisor(this._upLocation, 1);
    }
    /**
     * Unbinds all vertex buffer objects (VBOs) and disables their attribute binding points.
     * @param indices - Unused, since pre-set locations are used.
     */
    unbindBuffers( /*indices: Array<GLuint>*/) {
        /* Please note the implicit unbind in attribEnable is skipped */
        this._vertices.attribDisable(this._vertexLocation, false, false);
        this._texCoords.attribDisable(this._texCoordLocation, false, false);
        this._origins.attribDisable(this._originLocation, false, false);
        this._tangents.attribDisable(this._tangentLocation, false, false);
        this._ups.attribDisable(this._upLocation, false, false);
    }
    /**
     * Creates the vertex buffer object (VBO) and creates and initializes the buffer's data store.
     * @param vertexLocation - Attribute binding point for vertices.
     * @param texCoordLocation - Attribute binding point for texture coordinates.
     * @param originLocation - Attribute binding point for glyph origin coordinates
     * @param tangentLocation - Attribute binding point for glyph tangent coordinates.
     * @param upLocation - Attribute binding point for glyph up-vector coordinates.
     */
    initialize(vertexLocation = 0, texCoordLocation = 1, originLocation = 2, tangentLocation = 3, upLocation = 4) {
        this._vertexLocation = vertexLocation;
        this._texCoordLocation = texCoordLocation;
        this._originLocation = originLocation;
        this._tangentLocation = tangentLocation;
        this._upLocation = upLocation;
        const gl = this.context.gl;
        const valid = super.initialize([gl.ARRAY_BUFFER, gl.ARRAY_BUFFER, gl.ARRAY_BUFFER, gl.ARRAY_BUFFER, gl.ARRAY_BUFFER]);
        /**
         * These vertices are equal for all quads. There actual position will be changed using
         * origin, tangent and up(-vector).
         */
        this._vertices.data(LabelGeometry.VERTICES, gl.STATIC_DRAW);
        return valid;
    }
    /**
     * Use this method to set (or update) the glyph coordinates, e.g. after typesetting or after the calculations
     * of a placement algorithm. The actual interpretation of those buffers depends on the shader, usually they are
     * 3-component vectors in world space (provided as flat array.)
     * @param origins - Coordinates of the lower left corner of every glyph.
     * @param tangents - Tangent vector for every glyph (direction along base line).
     * @param up - Up vector for every glyph (orthogonal to its tangent vector).
     * @param texCoords - The texture coordinates for every glyph, format: ll.x, ll.y, ur.x, ur.y.
     */
    update(origins, tangents, up, texCoords) {
        /** @todo The following buffers could be simplified to an interleaved buffer. */
        this._numberOfGlyphs = origins.length / 3;
        const gl = this.context.gl;
        this._texCoords.data(texCoords, gl.STATIC_DRAW);
        this._origins.data(origins, gl.STATIC_DRAW);
        this._tangents.data(tangents, gl.STATIC_DRAW);
        this._ups.data(up, gl.STATIC_DRAW);
    }
    /**
     * Specifies/invokes the draw of specific labels (ranges are supposed to be tracked/managed from outside).
     */
    @initializable_1.Initializable.assert_initialized()
    draw(offset = 0, count = 0) {
        const gl = this.context.gl;
        const gl2facade = this.context.gl2facade;
        this._vertices.attribEnable(this._vertexLocation, 2, gl.FLOAT, false, 8, 0, true, false);
        this._texCoords.attribEnable(this._texCoordLocation, 4, gl.FLOAT, false, 16, offset * 16, true, false);
        this._origins.attribEnable(this._originLocation, 3, gl.FLOAT, false, 12, offset * 12, true, false);
        this._tangents.attribEnable(this._tangentLocation, 3, gl.FLOAT, false, 12, offset * 12, true, false);
        this._ups.attribEnable(this._upLocation, 3, gl.FLOAT, false, 12, offset * 12, true, false);
        gl2facade.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);
    }
    get numGlyphs() {
        return this._numberOfGlyphs;
    }
    get valid() {
        const validVertex = this._vertices && this._vertices.valid;
        const validTexCoord = this._texCoords && this._texCoords.valid;
        const validOrigin = this._origins && this._origins.valid;
        const validTangent = this._tangents && this._tangents.valid;
        const validUp = this._ups && this._ups.valid;
        return this.initialized && validVertex && validTexCoord && validOrigin && validTangent && validUp;
    }
    /**
     * Attribute location to which this geometry's vertices are bound to.
     */
    get vertexLocation() {
        return this._vertexLocation;
    }
    /**
     * Attribute location to which this geometry's texture coordinates are bound to.
     */
    get texCoordLocation() {
        return this._texCoordLocation;
    }
    /**
     * Attribute location to which this geometry's origins are bound to.
     */
    get originLocation() {
        return this._originLocation;
    }
    /**
     * Attribute location to which this geometry's tangents are bound to.
     */
    get tangentLocation() {
        return this._tangentLocation;
    }
    /**
     * Attribute location to which this geometry's up vectors are bound to.
     */
    get upLocation() {
        return this._upLocation;
    }
}
exports.LabelGeometry = LabelGeometry;
//# sourceMappingURL=labelgeometry.js.map