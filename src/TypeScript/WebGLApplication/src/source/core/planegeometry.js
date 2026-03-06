"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaneGeometry = void 0;
const gl_matrix_1 = require("gl-matrix");
const buffer_1 = require("../buffer");
const context_1 = require("../context");
const geometry_1 = require("../geometry");
class PlaneGeometry extends geometry_1.Geometry {
    static VERTICES = new Float32Array([
        -1.0, 0.0, -1.0,
        -1.0, 0.0, +1.0,
        +1.0, 0.0, -1.0,
        +1.0, 0.0, +1.0,
    ]);
    static UV = new Float32Array([
        -1.0, -1.0,
        -1.0, +1.0,
        +1.0, -1.0,
        +1.0, +1.0,
    ]);
    static INDICES = new Uint8Array([0, 1, 2, 3]);
    _vertexLocation = 0;
    _texCoordLocation = 1;
    /** @see {@link translation} */
    _translation;
    /** @see {@link scale} */
    _scale;
    /** @see {@link rotation} */
    _rotation;
    /**
     * Object constructor, requires a context and an identifier.
     * @param context - Valid context to create the object for.
     * @param identifier - Meaningful name for identification of this instance.
     */
    constructor(context, identifier) {
        super(context, identifier);
        this._translation = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this._scale = gl_matrix_1.vec3.fromValues(1, 1, 1);
        this._rotation = gl_matrix_1.quat.create();
        /* Generate identifier from constructor name if none given. */
        identifier = identifier !== undefined && identifier !== `` ? identifier : this.constructor.name;
        const vertexVBO = new buffer_1.Buffer(context, identifier + 'VertexVBO');
        const texCoordVBO = new buffer_1.Buffer(context, identifier + 'TexCoordVBO');
        const indexBuffer = new buffer_1.Buffer(context, identifier + 'IndexBuffer');
        this._buffers.push(vertexVBO);
        this._buffers.push(texCoordVBO);
        this._buffers.push(indexBuffer);
    }
    /**
     * Binds the vertex buffer object (VBO) to an attribute binding point of a given, pre-defined index.
     */
    bindBuffers() {
        /* Please note the implicit bind in attribEnable */
        this._buffers[0].attribEnable(this._vertexLocation, 3, this.context.gl.FLOAT, false, 0, 0, true, false);
        this._buffers[1].attribEnable(this._texCoordLocation, 2, this.context.gl.FLOAT, false, 0, 0, true, false);
        this._buffers[2].bind();
    }
    /**
     * Unbinds the vertex buffer object (VBO) and disables the binding point.
     */
    unbindBuffers() {
        /* Please note the implicit unbind in attribEnable is skipped */
        this._buffers[0].attribDisable(this._vertexLocation, true, true);
        this._buffers[1].attribDisable(this._texCoordLocation, true, true);
        this._buffers[2].unbind();
    }
    /**
     * Creates the vertex buffer object (VBO) and creates and initializes the buffer's data store.
     * @param aVertex - Attribute binding point for vertices.
     */
    initialize(aVertex = 0, aTexCoord = 1) {
        const gl = this.context.gl;
        this._vertexLocation = aVertex;
        this._texCoordLocation = aTexCoord;
        const valid = super.initialize([gl.ARRAY_BUFFER, gl.ARRAY_BUFFER, gl.ELEMENT_ARRAY_BUFFER], [aVertex, aTexCoord, 8]);
        this._buffers[0].data(PlaneGeometry.VERTICES, gl.STATIC_DRAW);
        this._buffers[1].data(PlaneGeometry.UV, gl.STATIC_DRAW);
        this._buffers[2].data(PlaneGeometry.INDICES, gl.STATIC_DRAW);
        return valid;
    }
    /**
     * Specifies/invokes the draw of this plane.
     */
    draw() {
        const gl = this.context.gl;
        gl.drawElements(gl.TRIANGLE_STRIP, PlaneGeometry.INDICES.length, gl.UNSIGNED_BYTE, 0);
    }
    /**
     * Set the translation of the plane.
     */
    set translation(t) {
        this._translation = t;
    }
    /**
     * Set the extents of the plane in x and y direction.
     */
    set scale(s) {
        this._scale = gl_matrix_1.vec3.fromValues(s[0], 1.0, s[1]);
    }
    /**
     * Set the rotation of the plane.
     */
    set rotation(q) {
        this._rotation = q;
    }
    /**
     * Get the transformation matrix to transform the unit plane to the specified translation, scale and rotation.
     */
    get transformation() {
        const out = gl_matrix_1.mat4.create();
        return gl_matrix_1.mat4.fromRotationTranslationScale(out, this._rotation, this._translation, this._scale);
    }
    /**
     * Attribute location to which this geometrys vertices are bound to.
     */
    get vertexLocation() {
        return this._vertexLocation;
    }
    /**
     * Attribute location to which this geometrys texture coordinates are bound to.
     */
    get texCoordLocation() {
        return this._texCoordLocation;
    }
}
exports.PlaneGeometry = PlaneGeometry;
//# sourceMappingURL=planegeometry.js.map