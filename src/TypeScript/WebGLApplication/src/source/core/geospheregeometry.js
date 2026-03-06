"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeosphereGeometry = void 0;
const auxiliaries_1 = require("../auxiliaries");
const buffer_1 = require("../buffer");
const context_1 = require("../context");
const geometry_1 = require("../geometry");
const icosahedron_1 = require("./icosahedron");
/**
 * @todo Refine this based on https://github.com/cginternals/webgl-operate/issues/183
 */
class GeosphereGeometry extends geometry_1.Geometry {
    /**
     * Diameter of the sphere
     */
    _diameter = 1.0;
    /**
     * Is the sphere textured?
     */
    _textured = false;
    /**
     *
     */
    _size = 0; // Number of indices to render.
    /**
     * Attribute location of the vertex position
     */
    _vertexLocation;
    /**
     * Attribute location of the texture coordinate
     */
    _texCoordLocation;
    /**
     * Object constructor, requires a context and an identifier.
     * @param context - Valid context to create the object for.
     * @param identifier - Meaningful name for identification of this instance.
     * @param diameter - Diameter of the sphere (default: 1.0)
     * @param textured - Is the box textured? (default: true)
     */
    constructor(context, identifier, diameter = 1.0, textured = true) {
        super(context, identifier);
        /* Generate identifier from constructor name if none given. */
        identifier = identifier !== undefined && identifier !== `` ? identifier : this.constructor.name;
        /* Save configuration. */
        this._diameter = diameter;
        this._textured = textured;
        /* Generate vertex buffers. */
        const indexBuffer = new buffer_1.Buffer(context, identifier + 'IndexBuffer');
        this._buffers.push(indexBuffer);
        const vertexVBO = new buffer_1.Buffer(context, identifier + 'VBO');
        this._buffers.push(vertexVBO);
        if (this._textured) {
            const uvVBO = new buffer_1.Buffer(context, identifier + 'UV');
            this._buffers.push(uvVBO);
        }
    }
    /**
     * Binds the vertex buffer object (VBO) to an attribute binding point of a given, pre-defined index.
     */
    bindBuffers( /*indices: Array<GLuint>*/) {
        /* Please note the implicit bind in attribEnable */
        this._buffers[0].bind();
        this._buffers[1].attribEnable(this._vertexLocation, 3, this.context.gl.FLOAT, false, 0, 0, true, false);
        if (this._textured) {
            this._buffers[2].attribEnable(this._texCoordLocation, 2, this.context.gl.FLOAT, false, 0, 0, true, false);
        }
    }
    /**
     * Unbinds the vertex buffer object (VBO) and disables the binding point.
     */
    unbindBuffers( /*indices: Array<GLuint>*/) {
        /* Please note the implicit unbind in attribEnable is skipped */
        this._buffers[0].unbind();
        this._buffers[1].attribDisable(this._vertexLocation, true, true);
        if (this._textured) {
            this._buffers[2].attribDisable(this._texCoordLocation, true, true);
        }
    }
    /**
     * Creates the vertex buffer object (VBO) and creates and initializes the buffer's data store.
     * @param aVertex - Attribute binding point for vertices.
     * @param aTexCoord - Attribute binding point for texture coordinates.
     */
    initialize(aVertex = 0, aTexCoord = 1) {
        const gl = this.context.gl;
        this._vertexLocation = aVertex;
        this._texCoordLocation = aTexCoord;
        const valid = super.initialize([gl.ELEMENT_ARRAY_BUFFER, gl.ARRAY_BUFFER, gl.ARRAY_BUFFER], [8, aVertex, aTexCoord]);
        (0, auxiliaries_1.assert)(this._buffers[0] !== undefined && this._buffers[0].object instanceof WebGLBuffer, `expected valid WebGLBuffer`);
        (0, auxiliaries_1.assert)(this._buffers[1] !== undefined && this._buffers[1].object instanceof WebGLBuffer, `expected valid WebGLBuffer`);
        if (this._textured) {
            (0, auxiliaries_1.assert)(this._buffers[2] !== undefined && this._buffers[2].object instanceof WebGLBuffer, `expected valid WebGLBuffer`);
        }
        /* Generate icosahedron geometry. */
        const icosahedron = new icosahedron_1.Icosahedron();
        icosahedron.generateGeometry(3);
        if (this._textured) {
            icosahedron.generateTextureCoordinates();
        }
        /* Generate index buffer. */
        const faces = icosahedron.faces;
        const indexBuffer = new Uint16Array(faces.length * 3);
        let i = 0;
        for (const face of faces) {
            indexBuffer[i + 0] = face[0];
            indexBuffer[i + 1] = face[1];
            indexBuffer[i + 2] = face[2];
            i += 3;
        }
        this._buffers[0].data(indexBuffer, gl.STATIC_DRAW);
        this._size = faces.length * 3;
        /* Generate vertex buffer. */
        const vertices = icosahedron.vertices;
        const vertexBuffer = new Float32Array(vertices.length * 3);
        i = 0;
        for (const v of vertices) {
            vertexBuffer[i + 0] = v[0] * this._diameter;
            vertexBuffer[i + 1] = v[1] * this._diameter;
            vertexBuffer[i + 2] = v[2] * this._diameter;
            i += 3;
        }
        this._buffers[1].data(vertexBuffer, gl.STATIC_DRAW);
        /* Generate texture coordinate buffer. */
        if (this._textured) {
            const texcoords = icosahedron.texcoords;
            const uvBuffer = new Float32Array(texcoords.length * 2);
            if (texcoords && texcoords.length > 0) {
                i = 0;
                for (const uv of texcoords) {
                    uvBuffer[i + 0] = uv[0];
                    uvBuffer[i + 1] = uv[1];
                    i += 2;
                }
            }
            this._buffers[2].data(uvBuffer, gl.STATIC_DRAW);
        }
        return valid;
    }
    /**
     * Draws the sphere.
     */
    draw() {
        const gl = this.context.gl;
        gl.drawElements(gl.TRIANGLES, this._size, gl.UNSIGNED_SHORT, 0);
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
exports.GeosphereGeometry = GeosphereGeometry;
//# sourceMappingURL=geospheregeometry.js.map