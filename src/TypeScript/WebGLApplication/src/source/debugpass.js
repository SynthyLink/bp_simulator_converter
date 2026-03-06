"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugPass = void 0;
const auxiliaries_1 = require("./auxiliaries");
const ndcfillingtriangle_1 = require("./ndcfillingtriangle");
const program_1 = require("./program");
const shader_1 = require("./shader");
const blitpass_1 = require("./blitpass");
/* spellchecker: enable */
/**
 * This rendering pass specialized the blit pass by enforcing program-based blitting with a custom debug program.
 *
 * The debug pass can be used as follows:
 * ```
 * this.blit.framebuffer = this.intermediateFBO;
 * this.blit.frame(this.defaultFBO, null, null);
 * ```
 *
 * This pass also provides some basic debugging facilities, such as blitting the input as linearized depth (packed or
 * not packed) etc. An additional WebGL program will be initialized when a debug mode is specified for the first time.
 * The default program blit remains untouched in order to keep it as minimal as possible.
 */
class DebugPass extends blitpass_1.BlitPass {
    /** @see {@link debug} */
    _debug = DebugPass.Mode.Depth;
    /**
     * Uniform for passing the debug mode to the specialized blit program.
     */
    _uDebugMode;
    /**
     * Uniform used to pass near and far data to the specialized blit program for linearization.
     */
    _uLinearize;
    /**
     * If provided, depth will be linearized when depth data is blitted.
     */
    _near = 0.0;
    _far = 0.0;
    /**
     * Used to create (on-demand) the blit program for program based blitting. This function can be specialized, e.g.,
     * for creating custom blit passes such as the `DebugPass` {@link DebugPass}. This method assumes the program to be
     * undefined.
     */
    createProgram() {
        (0, auxiliaries_1.assert)(this._program === undefined, `expected blit program to be undefined before its creation`);
        const gl = this._context.gl;
        const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'blit.vert (debug)');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        vert.initialize(require('./shaders/blit.vert'));
        const frag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'blit_debug.frag (debug)');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        frag.initialize(require('./shaders/blit_debug.frag'));
        this._program = new program_1.Program(this._context, 'DebugProgram');
        this._program.initialize([vert, frag]);
        if (!this._ndcTriangle.initialized) {
            this._ndcTriangle.initialize();
        }
        this._program.attribute('a_vertex', this._ndcTriangle.vertexLocation);
        this._program.link();
        this._uSrcBounds = this._program.uniform('u_srcBounds');
        this._uDstBounds = this._program.uniform('u_dstBounds');
        this._uNearest = this._program.uniform('u_nearest');
        this._uDebugMode = this._program.uniform('u_mode');
        this._uLinearize = this._program.uniform('u_linearize');
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_source'), 0);
        gl.uniform1i(this._uDebugMode, this._debug);
        this._program.unbind();
        return this._program.valid;
    }
    /**
     */
    initialize(ndcTriangle) {
        const result = super.initialize(ndcTriangle);
        this.enforceProgramBlit = true;
        return result && this.createProgram();
    }
    /**
     * Specializes this pass's uninitialization. Program and geometry resources are released (if allocated). Cached
     * uniform and attribute locations are invalidated.
     */
    uninitialize() {
        super.uninitialize();
        this._uDebugMode = undefined;
        this._uLinearize = undefined;
    }
    /**
     * Specify a debug mode for blitting @see {@link Blitpass.Debug}. If the debug mode is set to anything except
     * `Debug.None` for the first time, a specialized debug program will be created, initialized, and used for blit.
     */
    set debug(mode) {
        this.assertInitialized();
        if (this._debug === mode) {
            return;
        }
        this._debug = mode;
        if (this._program === undefined || !this._program.valid) {
            return;
        }
        this._program.bind();
        this._context.gl.uniform1i(this._uDebugMode, this._debug);
        this._program.unbind();
    }
    /**
     * If linearized is enabled, depth buffer blitting will use this near value for linearization.
     */
    set near(near) {
        this._near = near ? near : 0.0;
        if (this._program === undefined || !this._program.valid) {
            return;
        }
        this._program.bind();
        this._context.gl.uniform2f(this._uLinearize, this._near, this._far);
        this._program.unbind();
    }
    /**
     * If linearized is enabled, depth buffer blitting will use this far value for linearization.
     */
    set far(far) {
        this._far = far ? far : 0.0;
        if (this._program === undefined || !this._program.valid) {
            return;
        }
        this._program.bind();
        this._context.gl.uniform2f(this._uLinearize, this._near, this._far);
        this._program.unbind();
    }
}
exports.DebugPass = DebugPass;
(function (DebugPass) {
    let Mode;
    (function (Mode) {
        Mode[Mode["None"] = 0] = "None";
        Mode[Mode["Depth"] = 1] = "Depth";
        Mode[Mode["DepthLinear"] = 2] = "DepthLinear";
        Mode[Mode["DepthPacked"] = 3] = "DepthPacked";
        Mode[Mode["DepthLinearPacked"] = 4] = "DepthLinearPacked";
    })(Mode = DebugPass.Mode || (DebugPass.Mode = {}));
})(DebugPass || (exports.DebugPass = DebugPass = {}));
//# sourceMappingURL=debugpass.js.map