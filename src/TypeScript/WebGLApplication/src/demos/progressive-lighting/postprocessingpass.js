"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostProcessingPass = void 0;
const webgl_operate_1 = require("webgl-operate");
/* spellchecker: enable */
class PostProcessingPass extends webgl_operate_1.Initializable {
    /**
     * Read-only access to the objects context, used to get context information and WebGL API access.
     */
    _context;
    _texture;
    _normalDepthTexture;
    _targetTexture;
    _frameBuffer;
    _ndcTriangle;
    _program;
    constructor(context) {
        super();
        this._context = context;
    }
    @webgl_operate_1.Initializable.initialize()
    initialize(ndcTriangle) {
        const gl = this._context.gl;
        this._frameBuffer = new webgl_operate_1.Framebuffer(this._context, 'PostProcessingFBO');
        this._targetTexture = new webgl_operate_1.Texture2D(this._context, 'PostProcessingTexture');
        this._ndcTriangle = ndcTriangle;
        const vert = new webgl_operate_1.Shader(this._context, gl.VERTEX_SHADER, 'ndcvertices.vert (postprocessing)');
        vert.initialize(require('../../source/shaders/ndcvertices.vert'));
        const frag = new webgl_operate_1.Shader(this._context, gl.FRAGMENT_SHADER, 'postprocessing.frag');
        frag.initialize(require('./data/postprocessing.frag'));
        this._program = new webgl_operate_1.Program(this._context, 'AccumulateProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._program.link();
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        gl.uniform1i(this._program.uniform('u_normalDepthTexture'), 1);
        this._program.unbind();
        this.exposure = 1.0;
        return true;
    }
    /**
     * Specializes this pass's uninitialization. Program and geometry resources are released (if allocated). Cached
     * uniform and attribute locations are invalidated.
     */
    @webgl_operate_1.Initializable.uninitialize()
    uninitialize() {
        this._program.uninitialize();
        this._frameBuffer.uninitialize();
    }
    @webgl_operate_1.Initializable.assert_initialized()
    update() {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        if (!this._texture || !this._texture.valid) {
            webgl_operate_1.auxiliaries.log(webgl_operate_1.auxiliaries.LogLevel.Warning, `valid texture for postprocessing update expected, given ${this._texture}`);
            return;
        }
        const textureSize = this._texture.size;
        if (!this._targetTexture.initialized) {
            const internalFormat = webgl_operate_1.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, webgl_operate_1.Wizard.Precision.byte);
            this._targetTexture.initialize(textureSize[0], textureSize[1], internalFormat[0], gl.RGBA, internalFormat[1]);
        }
        const sizeAltered = this._targetTexture.width !== this._texture.width ||
            this._targetTexture.height !== this._texture.height;
        if (sizeAltered) {
            this._targetTexture.resize(this._texture.width, this._texture.height);
        }
        if (!this._frameBuffer.initialized) {
            this._frameBuffer.initialize([[gl2facade.COLOR_ATTACHMENT0, this._targetTexture]]);
        }
        webgl_operate_1.auxiliaries.assert(this._frameBuffer.valid, `valid framebuffers expected for postprocessing`);
    }
    @webgl_operate_1.Initializable.assert_initialized()
    frame() {
        webgl_operate_1.auxiliaries.assert(this._frameBuffer.valid, `valid framebuffer objects for postprocessing expected.`);
        webgl_operate_1.auxiliaries.logIf(!this._texture || !this._texture.valid, webgl_operate_1.auxiliaries.LogLevel.Warning, `valid texture for postprocessing frame expected, given ${this._texture}`);
        webgl_operate_1.auxiliaries.logIf(!this._normalDepthTexture || !this._normalDepthTexture.valid, webgl_operate_1.auxiliaries.LogLevel.Warning, `valid normal/depth texture for postprocessing frame expected, given ${this._texture}`);
        const gl = this._context.gl;
        gl.viewport(0, 0, this._targetTexture.width, this._targetTexture.height);
        this._program.bind();
        this._texture.bind(gl.TEXTURE0);
        this._normalDepthTexture.bind(gl.TEXTURE1);
        this._frameBuffer.bind(gl.DRAW_FRAMEBUFFER);
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
        this._frameBuffer.unbind(gl.DRAW_FRAMEBUFFER);
    }
    clear() {
        const gl = this._context.gl;
        if (this._frameBuffer.initialized) {
            this._frameBuffer.clear(gl.COLOR_BUFFER_BIT);
        }
    }
    set texture(texture) {
        this._texture = texture;
    }
    set normalDepthTexture(texture) {
        this._normalDepthTexture = texture;
    }
    set exposure(exposure) {
        const gl = this._context.gl;
        this._program.bind();
        gl.uniform1f(this._program.uniform('u_exposure'), exposure);
        this._program.unbind();
    }
    get targetTexture() {
        return this._targetTexture;
    }
    get framebuffer() {
        return this._frameBuffer;
    }
}
exports.PostProcessingPass = PostProcessingPass;
//# sourceMappingURL=postprocessingpass.js.map