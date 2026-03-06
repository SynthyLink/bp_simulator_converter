"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccumulatePass = void 0;
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
const changelookup_1 = require("./changelookup");
const context_1 = require("./context");
const framebuffer_1 = require("./framebuffer");
const initializable_1 = require("./initializable");
const ndcfillingtriangle_1 = require("./ndcfillingtriangle");
const program_1 = require("./program");
const shader_1 = require("./shader");
const texture2d_1 = require("./texture2d");
const wizard_1 = require("./wizard");
/* spellchecker: enable */
/**
 * This pass accumulates the color attachment 0 of a framebuffer, e.g., the result of an intermediate frame, into an
 * accumulation buffer. For accumulation the frame number is used to derive the accumulation weight. For rendering to
 * texture, a textured ndc-filling triangle is used.
 *
 * The accumulation pass can be used as follows:
 * ```
 * this.accumulate.initialize();
 * this.accumulate.texture = this.intermediateFBO.texture(gl2facade.COLOR_ATTACHMENT0);
 * this.accumulate.update();
 * this.accumulate.frame(frameNumber);
 * ```
 */
class AccumulatePass extends initializable_1.Initializable {
    /**
     * Read-only access to the objects context, used to get context information and WebGL API access.
     */
    _context;
    /**
     * Alterable auxiliary object for tracking changes on this object's input and lazy updates.
     */
    _altered = Object.assign(new changelookup_1.ChangeLookup(), {
        any: false, texture: false, precision: false, passThrough: false,
    });
    /** @see {@link texture} */
    _texture;
    /** @see {@link precision} */
    _precision = wizard_1.Wizard.Precision.half;
    /** @see {@link passThrough} */
    _passThrough;
    /**
     * Two rgba-framebuffers used for accumulation (buffer ping-ponging is used for alternating the buffers for read
     * and write access due to a limitation in WebGL).
     */
    _accumulationFBOs;
    _accumulationTextures;
    /**
     * Stores the index of the last buffer written to.
     */
    _write = 0;
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
    _uWeight;
    constructor(context) {
        super();
        this._context = context;
    }
    /**
     * Specializes this pass's initialization. This pass requires an ndc-filling triangle, a single accumulation
     * program, and two accumulation framebuffers for ping pong (simultaneous read and write is currently not allowed
     * by webgl). All attribute and dynamic uniform locations are cached.
     * @param ndcTriangle - If specified, assumed to be used as shared geometry. If none is specified, a ndc-filling
     * triangle will be created internally.
     */
    @initializable_1.Initializable.initialize()
    initialize(ndcTriangle) {
        const gl = this._context.gl;
        this._accumulationFBOs = [
            new framebuffer_1.Framebuffer(this._context, 'AccumPingFBO'),
            new framebuffer_1.Framebuffer(this._context, 'AccumPongFBO')
        ];
        this._accumulationTextures = [
            new texture2d_1.Texture2D(this._context, 'AccumPingTexture'),
            new texture2d_1.Texture2D(this._context, 'AccumPongTexture')
        ];
        if (ndcTriangle === undefined) {
            this._ndcTriangle = new ndcfillingtriangle_1.NdcFillingTriangle(this._context, 'NdcFillingTriangle-Accumulate');
        }
        else {
            this._ndcTriangle = ndcTriangle;
            this._ndcTriangleShared = true;
        }
        /* Configure program-based accumulate. */
        const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'ndcvertices.vert (accumulate)');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        vert.initialize(require('./shaders/ndcvertices.vert'));
        const frag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'accumulate.frag');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        frag.initialize(require('./shaders/accumulate.frag'));
        this._program = new program_1.Program(this._context, 'AccumulateProgram');
        this._program.initialize([vert, frag], false);
        if (!this._ndcTriangle.initialized) {
            this._ndcTriangle.initialize();
        }
        this._program.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._program.link();
        this._uWeight = this._program.uniform('u_weight');
        this._program.bind();
        gl.uniform1f(this._uWeight, 0.0);
        gl.uniform1i(this._program.uniform('u_accumulationTexture'), 0);
        gl.uniform1i(this._program.uniform('u_currentFrameTexture'), 1);
        this._program.unbind();
        return true;
    }
    /**
     * Specializes this pass's uninitialization. Program and geometry resources are released (if allocated). Cached
     * uniform and attribute locations are invalidated.
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        if (!this._ndcTriangleShared && this._ndcTriangle.initialized) {
            this._ndcTriangle.uninitialize();
        }
        this._program.uninitialize();
        this._accumulationFBOs[0].uninitialize();
        this._accumulationFBOs[1].uninitialize();
        this._accumulationTextures[0].uninitialize();
        this._accumulationTextures[1].uninitialize();
        this._write = 0;
    }
    /**
     * Initialize accumulation textures and FBOs (if not initialized yet). Then verifies if the texture's size has
     * changed, and if so, resizes the accumulation buffers.
     */
    @initializable_1.Initializable.assert_initialized()
    update() {
        if (!this._texture || !this._texture.valid) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `valid texture for accumulation update expected, given ${this._texture}`);
            return;
        }
        if (this._passThrough) {
            return;
        }
        const sizeAltered = this._altered.texture || this._accumulationTextures[0].width !== this._texture.width ||
            this._accumulationTextures[0].height !== this._texture.height;
        if (!this._altered.any && !sizeAltered) {
            (0, auxiliaries_1.assert)(this._accumulationFBOs[0].valid && this._accumulationFBOs[1].valid, `valid accumulation framebuffers expected`);
            return;
        }
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        /* Create and initialize accumulation texture and FBOs. */
        const textureSize = this._texture.size;
        if (!this._accumulationTextures[0].initialized) {
            const internalFormat = wizard_1.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, this._precision);
            this._accumulationTextures[0].initialize(textureSize[0], textureSize[1], internalFormat[0], gl.RGBA, internalFormat[1]);
            this._accumulationTextures[1].initialize(textureSize[0], textureSize[1], internalFormat[0], gl.RGBA, internalFormat[1]);
        }
        else {
            if (this._altered.texture || sizeAltered) {
                this._accumulationTextures[0].resize(this._texture.width, this._texture.height);
                this._accumulationTextures[1].resize(this._texture.width, this._texture.height);
            }
            if (this._altered.precision) {
                const internalFormat = wizard_1.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, this._precision);
                this._accumulationTextures[0].reformat(internalFormat[0], gl.RGBA, internalFormat[1]);
                this._accumulationTextures[1].reformat(internalFormat[0], gl.RGBA, internalFormat[1]);
            }
        }
        if (!this._accumulationFBOs[0].initialized) {
            this._accumulationFBOs[0].initialize([[gl2facade.COLOR_ATTACHMENT0, this._accumulationTextures[0]]]);
            this._accumulationFBOs[1].initialize([[gl2facade.COLOR_ATTACHMENT0, this._accumulationTextures[1]]]);
        }
        (0, auxiliaries_1.assert)(this._accumulationFBOs[0].valid && this._accumulationFBOs[1].valid, `valid accumulation framebuffers expected`);
        this._altered.reset();
    }
    /**
     * An accumulation frame binds the two accumulation textures (ping-pong framebuffer), one for read, the other for
     * write/accumulating into. A screen-aligned triangle is used to fill the viewport and mix the input texture with
     * the weight of 1 / (frameNumber + 1) with the previous accumulation result. If no texture is specified, pass
     * through is used.
     * @param frameNumber - Frame number used to select the current read and write framebuffer as well as frame weight.
     * @param viewport - If specified, the viewport for accumulation will be set to the given width and height. If not,
     * the currently set viewport is used.
     */
    @initializable_1.Initializable.assert_initialized()
    frame(frameNumber, viewport) {
        (0, auxiliaries_1.assert)(this._accumulationFBOs[0].valid && this._accumulationFBOs[1].valid, `valid framebuffer objects for accumulation expected (initialize or update was probably not called)`);
        if (this._passThrough || this._texture === undefined) {
            return;
        }
        (0, auxiliaries_1.logIf)(!this._texture || !this._texture.valid, auxiliaries_1.LogLevel.Warning, `valid texture for accumulation frame expected, given ${this._texture}`);
        const gl = this._context.gl;
        if (viewport !== undefined) {
            gl.viewport(0, 0, viewport[0], viewport[1]);
        }
        const readIndex = frameNumber % 2;
        const writeIndex = this._write = 1 - readIndex;
        const accumTexture = this._accumulationTextures[readIndex];
        const frameTexture = this._texture;
        accumTexture.bind(gl.TEXTURE0);
        frameTexture.bind(gl.TEXTURE1);
        this._program.bind();
        gl.uniform1f(this._uWeight, 1.0 / (frameNumber + 1));
        this._accumulationFBOs[writeIndex].bind(gl.DRAW_FRAMEBUFFER); // bind draw only does not work for IE and EDGE
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
        this._accumulationFBOs[writeIndex].unbind(gl.DRAW_FRAMEBUFFER);
        /** Every pass is expected to bind its own program when drawing, thus, unbinding is not necessary. */
        // this.program.unbind();
        accumTexture.unbind(gl.TEXTURE0);
        frameTexture.unbind(gl.TEXTURE1);
    }
    /**
     * Sets the texture that is to be accumulated. The ping and pong render textures will be resized on next frame
     * automatically if the texture size changed.
     * @param texture - Framebuffer that is to be accumulated.
     */
    set texture(texture) {
        this.assertInitialized();
        if (this._texture !== texture) {
            this._texture = texture;
            this._altered.alter('texture');
        }
    }
    /**
     * Allows to specify the accumulation precision.
     */
    set precision(precision) {
        this.assertInitialized();
        if (this._precision !== precision) {
            this._precision = precision;
            this._altered.alter('precision');
        }
    }
    /**
     * Allows to skip accumulation. If pass through is enabled, nothing will be rendered on frame at all and the
     * ping pong render textures will be reduced to a minimum size of [1, 1] until pass through is disabled.
     */
    set passThrough(passThrough) {
        this.assertInitialized();
        if (this._passThrough === passThrough) {
            return;
        }
        if (this._passThrough && this._accumulationTextures[0].initialized) {
            this._accumulationTextures[0].uninitialize();
            this._accumulationTextures[1].uninitialize();
        }
        if (this._passThrough && this._accumulationFBOs[0].initialized) {
            this._accumulationFBOs[0].uninitialize();
            this._accumulationFBOs[1].uninitialize();
        }
        this._passThrough = passThrough;
        this._altered.alter('passThrough');
    }
    /**
     * Returns the framebuffer last accumulated into. Note: the accumulation buffer is represented by two framebuffers
     * swapped for read and write every frame. The accumulation result is in the first color attachment.
     * @returns - The rgba framebuffer last accumulated into.
     */
    get framebuffer() {
        return this._passThrough ? undefined : this._accumulationFBOs[this._write];
    }
}
exports.AccumulatePass = AccumulatePass;
//# sourceMappingURL=accumulatepass.js.map