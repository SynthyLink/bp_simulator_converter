"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
const auxiliaries_1 = require("./auxiliaries");
const bindable_1 = require("./bindable");
const initializable_1 = require("./initializable");
const object_1 = require("./object");
const shader_1 = require("./shader");
/* spellchecker: enable */
/**
 * WebGL Program wrapper encapsulating program creation, shader attachment, linking, binding, as well as attribute and
 * uniform location retrieval. A program is intended to be used as follows:
 *
 * ```
 * const vert = new Shader(this._context, gl.VERTEX_SHADER, 'ndcvertices.vert (blit)');
 * vert.initialize(require('./shaders/ndcvertices.vert'));
 * const frag = new Shader(this._context, gl.FRAGMENT_SHADER, 'blit.frag');
 * frag.initialize(require('./shaders/blit.frag'));
 *
 * this._program = new Program(this._context, 'BlitProgram');
 * this._program.initialize([vert, frag]);
 *
 * this.aVertex = this._program.attribute('a_vertex');
 * const uTexture = this._program.uniform('u_texture');
 *
 * this._program.bind();
 * gl.uniform1i(uTexture, 0);
 * // ... draw
 * this._program.unbind();
 * ```
 */
class Program extends object_1.AbstractObject {
    /**
     * Default program, e.g., used for unbind.
     */
    static DEFAULT_PROGRAM = undefined;
    /** @see {@link shaders} */
    _shaders = new Array();
    /** @see {@link linked} */
    _linked = false;
    /**
     * Creates a WebGLProgram object and attaches, and references all shaders to it. The program is then linked. All
     * shaders have to be initialized in order to be attached and at least on vertex and one fragment shader has to be
     * present. Note that the shaders are not detached by default. If neither the shader objects nor recompilation is
     * required all shaders should be detached manually after initialization/creation.
     * @param shaders - Vertex and fragment shaders that are to be attached to the program.
     * @param link - Whether or not to immediately link the program iff provided shader(s) are attached successfully.
     * @returns - Either a new program or undefined if linking failed or one of the shaders is invalid/not compiled.
     */
    create(shaders = new Array(), link = true) {
        const gl = this._context.gl;
        let numVertShaders = 0;
        let numFragShaders = 0;
        for (const shader of shaders) {
            switch (shader.type) {
                case gl.VERTEX_SHADER:
                    ++numVertShaders;
                    break;
                case gl.FRAGMENT_SHADER:
                    ++numFragShaders;
                    break;
                default:
                    (0, auxiliaries_1.assert)(false, `Unknown shader type detected.`);
                    break;
            }
        }
        (0, auxiliaries_1.logIf)(numVertShaders < 1, auxiliaries_1.LogLevel.Error, `at least one vertex shader is expected`);
        (0, auxiliaries_1.logIf)(numFragShaders < 1, auxiliaries_1.LogLevel.Error, `at least one fragment shader is expected`);
        if (numVertShaders < 1 || numFragShaders < 1) {
            return undefined;
        }
        this._object = gl.createProgram();
        this._valid = gl.isProgram(this._object);
        (0, auxiliaries_1.assert)(this._object instanceof WebGLProgram, `expected WebGLProgram object to be created`);
        if (shaders.length > 0) {
            this.attach(shaders, link);
        }
        return this._object;
    }
    /**
     * Delete the program object on the GPU. This should have the reverse effect of `create`.
     */
    delete() {
        (0, auxiliaries_1.assert)(this._object !== undefined, `expected WebGLProgram object`);
        this._context.gl.deleteProgram(this._object);
        this._object = undefined;
        this._valid = false;
    }
    /**
     * Attaches and references all given shaders. Attach is expected to be called once within creation of a Program.
     * Shaders that are not initialized will be skipped/not attached.
     * @param shaders - All shaders to be attached to the program for linking.
     * @param link - Whether or not to link the program again after attaching the shader(s).
     * @returns - True if attaching all shaders and linking succeeded, false otherwise.
     */
    attach(shaders, link = false) {
        (0, auxiliaries_1.assert)(this._object !== undefined, `expected a WebGLProgram object`);
        const gl = this._context.gl;
        for (const shader of (shaders instanceof Array ? shaders : [shaders])) {
            if (this._shaders.indexOf(shader) > -1) {
                continue;
            }
            this._shaders.push(shader);
            if (!shader.initialized) {
                (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Error, `shader '${shader.identifier}' not initialized.`);
                continue;
            }
            gl.attachShader(this._object, shader.object);
            shader.ref();
        }
        if (link) {
            this.link();
        }
        return true;
    }
    /**
     * Detaches one or multiple shaders from the program. Note that relinking is not invoked automatically.
     * @param shaders - Shaders that are to be deleted.
     */
    detach(shaders) {
        (0, auxiliaries_1.assert)(this._object !== undefined, `expected WebGLProgram object`);
        const gl = this._context.gl;
        for (const shader of (shaders instanceof Array ? shaders : [shaders])) {
            const index = this._shaders.indexOf(shader);
            if (index > -1) {
                this._shaders.splice(index);
            }
            (0, auxiliaries_1.assert)(shader.initialized, `expected shader '${shader.identifier}' to be initialized`);
            gl.detachShader(this._object, shader.object);
            shader.unref();
        }
    }
    /**
     * Links the program with all its already attached shaders. If linking fails, a developer log with additional
     * information is provided.
     * @returns - True if linking the program succeeded, false otherwise.
     */
    link() {
        (0, auxiliaries_1.assert)(this._object !== undefined, `expected WebGLProgram object`);
        const gl = this._context.gl;
        gl.linkProgram(this._object);
        if (!gl.getProgramParameter(this._object, gl.LINK_STATUS)) {
            const infoLog = gl.getProgramInfoLog(this._object);
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Error, `linking of program '${this._identifier}' failed: '${infoLog}'`);
            this._linked = false;
        }
        else {
            this._linked = true;
        }
        return this._linked;
    }
    /**
     * Activates this program for use.
     */
    @initializable_1.Initializable.assert_initialized()
    bind() {
        this._context.gl.useProgram(this._object);
    }
    /**
     * Deactivates this/any program for use.
     */
    @initializable_1.Initializable.assert_initialized()
    unbind() {
        this._context.gl.useProgram(Program.DEFAULT_PROGRAM);
    }
    /**
     * Requests the location of a uniform of the program.
     * @param uniform - Uniform identifier to request location of.
     */
    @initializable_1.Initializable.assert_initialized()
    uniform(uniform) {
        return this._context.gl.getUniformLocation(this._object, uniform);
    }
    /**
     * Requests the location of an attribute of the program.
     * @param attribute - Attribute identifier to request location of.
     * @param location - Attribute location (if WebGL2 location is used)
     * @returns - Location of the attribute (or location parameter if provided).
     */
    @initializable_1.Initializable.assert_initialized()
    attribute(attribute, location) {
        if (location !== undefined) {
            (0, auxiliaries_1.logIf)(this._linked, auxiliaries_1.LogLevel.Debug, `name-to-generic attribute index mapping does go into effect on next linking, ` +
                `given ${attribute} -> ${location} (${this.identifier})`);
            this._context.gl.bindAttribLocation(this._object, location, attribute);
            return location;
        }
        else {
            return this._context.gl.getAttribLocation(this._object, attribute);
        }
    }
    /**
     * Provides access (leaky abstraction) to all shaders attached to this program.
     */
    get shaders() {
        return this._shaders;
    }
    /**
     * Read access the the program's link status. True if last linking was successful.
     */
    get linked() {
        return this._linked;
    }
}
exports.Program = Program;
//# sourceMappingURL=program.js.map