"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadbackPass = void 0;
const gl_matrix_1 = require("gl-matrix");
const auxiliaries_1 = require("./auxiliaries");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const context_1 = require("./context");
const framebuffer_1 = require("./framebuffer");
const initializable_1 = require("./initializable");
const ndcfillingtriangle_1 = require("./ndcfillingtriangle");
const program_1 = require("./program");
const shader_1 = require("./shader");
const texture2d_1 = require("./texture2d");
const tuples_1 = require("./tuples");
/* spellchecker: enable */
/**
 * This stage provides means to sample G-Buffers, in order to give access to world space coordinates, depth values and
 * IDs. World space coordinates are calculated by sampling the depth value and unprojecting the normalized device
 * coordinates. Depth and ID values are read from the GPU by rendering the requested pixel to a 1x1 texture and reading
 * back the value from this texture. Note that depth and ID values are cached as long as no redraw (frame) was invoked.
 */
class ReadbackPass extends initializable_1.Initializable {
    /**
     * Read-only access to the objects context, used to get context information and WebGL API access.
     */
    _context;
    /** @see {@link cache} */
    _cache = false;
    /** @see {@link depthFBO} */
    _depthFBO; // This is used if depth is already uint8x3 encoded
    /** @see {@link depthAttachment} */
    _depthAttachment = 0;
    /**
     * Cache providing previously read depth values for a given position hash.
     */
    _cachedDepths = new Map();
    /** @see {@link idFBO} */
    _idFBO;
    /** @see {@link idAttachment} */
    _idAttachment;
    /**
     * Cache providing previously read id values for a given position hash.
     */
    _cachedIDs = new Map();
    /**
     * Buffer to read into.
     */
    _buffer = new Uint8Array(4);
    /**
     * Properties required for 24bit depth readback workaround. If a valid depth format is available as renderable
     * texture format, a single fragment is rasterized in order to encode the depth of at a specific location into
     * uint8x3 format, rendered into a RGBA texture for readback. This workaround is currently necessary since reading
     * back depth buffer data is not supported. All following protected properties are undefined when this workaround
     * is not required (i.e., in IE11), since the depth texture is already rendered explicitly in a previous render
     * pass.
     */
    _texture;
    _framebuffer;
    /**
     * Coordinate reference size @see {@link coordinateReferenceSize}.
     */
    _referenceSize;
    /**
     * Geometry used to draw on. This is not provided by default to allow for geometry sharing. If no triangle is given,
     * the ndc triangle will be created and managed internally.
     */
    _ndcTriangle;
    /**
     * Tracks ownership of the ndc-filling triangle.
     */
    _ndcTriangleShared = false;
    _program;
    _uOffset;
    _uScale;
    /**
     * Read the the depth of a fragment in normalized device coordinates. The implementation of this function is
     * assigned at initialization based on the available WebGL features.
     * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
     * @param y - Vertical coordinate for the upper left corner of the viewport origin.
     */
    readDepthAt;
    /**
     * Returns the maximal depth value that can be encoded when using a uint8[3] - @see{@link depthAt}.
     */
    static maxClearDepth() {
        return (0, gl_matrix_extensions_1.decode_float24x1_from_uint8x3)(gl_matrix_1.vec3.fromValues(255, 255, 255));
    }
    constructor(context) {
        super();
        this._context = context;
    }
    /**
     * Frame implementation clearing depth and ID caches. To avoid unnecessary readbacks (potentially causing sync
     * points), the requested and found IDs and depths are cached by position. Hence, these cached values have to be
     * cleared whenever the framebuffers are written/rendered to.
     */
    onFrame() {
        this._cachedDepths.clear();
        this._cachedIDs.clear();
    }
    /**
     * Create a numerical hash that can be used for efficient look-up (number preferred, no string for now). Note that
     * the implementation assumes that we do not exceed 65k pixel in horizontal or vertical resolution soon.
     * @param x - Horizontal coordinate from the upper left corner of the viewport origin.
     * @param y - Vertical coordinate from the upper left corner of the viewport origin.
     */
    hash(x, y) {
        return 0xffff * y + x;
    }
    /**
     * Implements the direct readback of uint8x3 encoded depth values from a given framebuffer (see depthFBO and
     * depthAttachment).
     * @param x - Horizontal coordinate from the upper left corner of the viewport origin.
     * @param y - Vertical coordinate from the upper left corner of the viewport origin.
     * @returns - An array with 4 uint8 entries, the first three of which encode the depth.
     */
    @initializable_1.Initializable.assert_initialized()
    directReadDepthAt(x, y) {
        (0, auxiliaries_1.assert)(this._depthFBO !== undefined && this._depthFBO.valid, `valid depth FBO expected for reading back depth`);
        const texture = this._depthFBO.texture(this._depthAttachment);
        const gl = this._context.gl;
        const size = texture.size;
        this._depthFBO.bind();
        const scale = this._referenceSize === undefined ? [1.0, 1.0] :
            [size[0] / this._referenceSize[0], size[1] / this._referenceSize[1]];
        if (this._context.isWebGL2 || this._context.supportsDrawBuffers) {
            gl.readBuffer(this._depthAttachment);
        }
        gl.readPixels(x * scale[0], size[1] - y * scale[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this._buffer);
        return this._buffer;
    }
    /**
     * Implements the indirect readback of uint8x3 encoded depth values from a given framebuffer (see depthFBO and
     * depthAttachment). This renders a single pixel (1x1 pixel viewport) with the depth fbo as texture and reads this
     * afterwards. This is a fallback required when direct pixel read from depth attachments is not supported.
     * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
     * @param y - Vertical coordinate for the upper left corner of the viewport origin.
     * @returns - An array with 4 uint8 entries, the first three of which encode the depth.
     */
    @initializable_1.Initializable.assert_initialized()
    renderThenReadDepthAt(x, y) {
        (0, auxiliaries_1.assert)(this._depthFBO !== undefined && this._depthFBO.valid, `valid depth FBO expected for reading back depth`);
        const texture = this._depthFBO.texture(this._depthAttachment);
        const gl = this._context.gl;
        const size = texture.size;
        const scale = this._referenceSize === undefined ? [1.0, 1.0] :
            [size[0] / this._referenceSize[0], size[1] / this._referenceSize[1]];
        /* Render a single fragment, thereby encoding the depth render texture data of the requested position. */
        gl.viewport(0, 0, 1, 1);
        this._program.bind();
        gl.uniform2f(this._uOffset, x * scale[0] / size[0], (size[1] - y * scale[1]) / size[1]);
        gl.uniform2f(this._uScale, 1.0 / size[0], 1.0 / size[1]);
        texture.bind(gl.TEXTURE0);
        this._framebuffer.bind();
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
        texture.unbind();
        /** Every stage is expected to bind its own program when drawing, thus, unbinding is not necessary. */
        // this._program.unbind();
        if ((this._context.isWebGL2 || this._context.supportsDrawBuffers) && gl.readBuffer) {
            gl.readBuffer(gl.COLOR_ATTACHMENT0);
        }
        gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this._buffer);
        this._framebuffer.unbind();
        return this._buffer;
    }
    /**
     * Specializes this pass's initialization. If required. ad screen-filling triangle geometry and a single program
     * are created. All attribute and dynamic uniform locations are cached.
     * @param ndcTriangle - If specified, assumed to be used as shared geometry. If none is specified, a ndc-filling
     * triangle will be created internally.
     * @param direct - If depth is already uint8x3 encoded into a rgb/rgba target no readback workaround is required.
     */
    @initializable_1.Initializable.initialize()
    initialize(ndcTriangle, direct) {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        if (direct) {
            this.readDepthAt = this.directReadDepthAt;
            return true;
        }
        /* Configure read back for depth data. */
        this.readDepthAt = this.renderThenReadDepthAt;
        const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'ndcvertices.vert (readback)');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        vert.initialize(require('./shaders/ndcvertices.vert'));
        const frag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'readbackdepth.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        frag.initialize(require('./shaders/readbackdepth.frag'));
        this._program = new program_1.Program(this._context, 'ReadbackDepthProgram');
        this._program.initialize([vert, frag], false);
        if (ndcTriangle === undefined) {
            this._ndcTriangle = new ndcfillingtriangle_1.NdcFillingTriangle(this._context);
        }
        else {
            this._ndcTriangle = ndcTriangle;
            this._ndcTriangleShared = true;
        }
        if (!this._ndcTriangle.initialized) {
            this._ndcTriangle.initialize();
        }
        this._program.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._program.link();
        this._uOffset = this._program.uniform('u_offset');
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        this._program.unbind();
        /* Configure read back framebuffer and color attachment. */
        this._texture = new texture2d_1.Texture2D(this._context, 'ReadbackRenderTexture');
        this._texture.initialize(1, 1, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
        this._framebuffer = new framebuffer_1.Framebuffer(this._context, 'ReadbackFBO');
        this._framebuffer.initialize([[gl2facade.COLOR_ATTACHMENT0, this._texture]]);
        return true;
    }
    /**
     * Specializes this stage's uninitialization. Program and geometry resources are released (if allocated). Cached
     * uniform and attribute locations are invalidated.
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        if (this._context.isWebGL1 && !this._context.supportsDepthTexture) {
            return;
        }
        if (!this._ndcTriangleShared && this._ndcTriangle.initialized) {
            this._ndcTriangle.uninitialize();
        }
        this._program.uninitialize();
        this._texture.uninitialize();
        this._framebuffer.uninitialize();
    }
    /**
     * Retrieve the depth of a fragment in normalized device coordinates. The implementation of this function is
     * assigned at initialization based on the available WebGL features. Please note that in order to get the far plane
     * depth at just below 1.0, the clear depth should be set to:
     *     float24x1_from_uint8x3([255,255, 255]) = 0.9999999403953552
     * This will result in a readback of [255, 255, 255] and is the deepest depth value representable using a uint8x3.
     * Using 1.0 should result in [256, 0, 0] and would be easy to detect, however, it is somehow clamped to [255, 0, 0]
     * which is highly misleading and actual not nearly the far plane's depth. Thus, if [255, 255, 255] is read back,
     * undefined will be returned by this query and thereby reduce the effective depth range by 1 over 255^3 - sorry.
     * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
     * @param y - Vertical coordinate for the upper left corner of the viewport origin.
     */
    @initializable_1.Initializable.assert_initialized()
    depthAt(x, y) {
        const hash = this.hash(x, y);
        if (this._cache && this._cachedDepths.has(hash)) {
            return this._cachedDepths.get(hash);
        }
        const buffer = this.readDepthAt(x, y);
        /* See notes above for more info on this weird convention. */
        const depth = buffer[0] === 255 && buffer[1] === 255 && buffer[2] === 255 ?
            undefined : (0, gl_matrix_extensions_1.decode_float24x1_from_uint8x3)(gl_matrix_1.vec3.fromValues(buffer[0], buffer[1], buffer[2]));
        if (this._cache) {
            this._cachedDepths.set(hash, depth);
        }
        return depth;
    }
    /**
     * Retrieving the world space coordinate of a fragment.
     * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
     * @param y - Vertical coordinate for the upper left corner of the viewport origin.
     * @param zInNDC - optional depth parameter (e.g., from previous query).
     * @param viewProjectionInverse - matrix used to unproject the coordinate from ndc to world space.
     * @returns - The unprojected world space coordinate at location x, y.
     */
    @initializable_1.Initializable.assert_initialized()
    coordsAt(x, y, zInNDC, viewProjectionInverse) {
        const size = this._depthFBO.texture(this._depthAttachment).size;
        const depth = zInNDC === undefined ? this.depthAt(x, y) : zInNDC;
        if (depth === undefined) {
            return undefined;
        }
        const scale = this._referenceSize === undefined ? [1.0, 1.0] :
            [size[0] / this._referenceSize[0], size[1] / this._referenceSize[1]];
        const p = gl_matrix_1.vec3.fromValues(x * scale[0] * 2.0 / size[0] - 1.0, 1.0 - y * scale[1] * 2.0 / size[1], depth * 2.0 - 1.0);
        return gl_matrix_1.vec3.transformMat4(gl_matrix_1.vec3.create(), p, viewProjectionInverse);
    }
    /**
     * Retrieve the id of an object at fragment position.
     * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
     * @param y - Vertical coordinate for the upper left corner of the viewport origin.
     * @returns - The id rendered at location x, y.
     */
    @initializable_1.Initializable.assert_initialized()
    idAt(x, y) {
        const hash = this.hash(x, y);
        if (this._cache && this._cachedIDs.has(hash)) {
            return this._cachedIDs.get(hash);
        }
        const gl = this._context.gl;
        const size = this._idFBO.texture(this._idAttachment).size;
        const scale = this._referenceSize === undefined ? [1.0, 1.0] :
            [size[0] / this._referenceSize[0], size[1] / this._referenceSize[1]];
        this._idFBO.bind();
        if (this._context.isWebGL2) {
            gl.readBuffer(this._idAttachment);
        }
        gl.readPixels(x * scale[0], size[1] - y * scale[1], 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this._buffer);
        const id = (0, gl_matrix_extensions_1.decode_uint32_from_rgba8)(gl_matrix_1.vec4.fromValues(this._buffer[0], this._buffer[1], this._buffer[2], this._buffer[3]));
        if (this._cache) {
            this._cachedIDs.set(hash, id);
        }
        return id;
    }
    /**
     * Invokes the frame implementation @see{@link onFrame}.
     */
    frame() {
        this.onFrame();
    }
    /**
     * Whether or not caching of requested depths and ids should be used to reduce performance impact.
     */
    set cache(value) {
        this._cache = value;
    }
    /**
     * Sets the framebuffer object that is to be used for depth readback.
     * @param framebuffer - Framebuffer that is to be used for depth readback.
     */
    set depthFBO(framebuffer) {
        this._depthFBO = framebuffer;
    }
    /**
     * Sets the framebuffer's {@link depthFBO} depth attachment that is to be used for depth readback.
     * @param attachment - Depth attachment that is to be used for depth readback.
     */
    set depthAttachment(attachment) {
        this._depthAttachment = attachment;
    }
    /**
     * Sets the framebuffer object that is to be used for id readback.
     * @param framebuffer - Framebuffer that is to be used for id readback.
     */
    set idFBO(framebuffer) {
        this._idFBO = framebuffer;
    }
    /**
     * Sets the framebuffer's {@link idFBO} id attachment that is to be used for id readback.
     * @param attachment - ID attachment that is to be used for id readback.
     */
    set idAttachment(attachment) {
        this._idAttachment = attachment;
    }
    /**
     * Sets the coordinate-reference size that is, if not undefined, used to scale incomming x and y coordinates.
     * @param size - Size of the output, e.g., the canvas, the buffer is rendered to.
     */
    set coordinateReferenceSize(size) {
        this._referenceSize = size;
    }
}
exports.ReadbackPass = ReadbackPass;
//# sourceMappingURL=readbackpass.js.map