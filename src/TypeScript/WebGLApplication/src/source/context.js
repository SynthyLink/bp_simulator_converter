"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const auxiliaries_1 = require("./auxiliaries");
const formatbytesizes_1 = require("./formatbytesizes");
const allocationregister_1 = require("./allocationregister");
const contextmasquerade_1 = require("./contextmasquerade");
const extensions_1 = require("./extensions");
const extensionshash_1 = require("./extensionshash");
const gl2facade_1 = require("./gl2facade");
/* spellchecker: enable */
/**
 * A controller for either a WebGLRenderingContext or WebGL2RenderingContext. It requests a context, tracks context
 * attributes, extensions as well as multi frame specific rendering information and a (gpu)allocation registry.
 *
 * An instance of `Context` can be created only implicitly by requesting a context given a canvas element and its
 * dataset:
 * ```
 * const element: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasID);
 * this.context = Context.request(element); // element.dataset is used for attributes
 * ```
 * The context supports the following data-attributes:
 * ```
 * data-backend: 'auto' | 'webgl' | 'webgl2'
 * data-accumulation-format: 'auto' | 'float' | 'half' | 'byte'
 * ```
 *
 * At run-time, cached context features can be queried without a performance impact, e.g., frequent extension-based
 * branching:
 * ```
 * if(this.context.supportsVertexArrayObject) {
 *     this.context.vertexArrayObject.bindVertexArrayOES(...);
 *     ...
 * }
 * ```
 *
 * For convenience, protected extension names such as `EXT_frag_depth` are not prefixed by an underscore.
 */
class Context {
    /**
     * Context creation attribute defaults. The defaults are taken directly from the spec.
     */
    static DEFAULT_ATTRIBUTES = {
        alpha: true,
        antialias: false, /* Not defaulted to true, since it might interfere with manual blitting. */
        depth: true,
        failIfMajorPerformanceCaveat: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: false,
    };
    /** @see {@link backend} */
    _backend;
    /**
     * Created context. The actual type depends on the created context.
     * @see {@link gl}
     */
    _context;
    /** @see {@link mask} */
    _mask;
    /** @see {@link gl2facade} */
    _gl2;
    /**
     * Creates a masquerade object that can be used for debugging. This is intended to be called when requesting a
     * context, i.e., before actually requesting it. For creation of a masquerade object, the following masquerade
     * specifiers are evaluated in the following order:
     *  1. msqrd_h GET parameter,
     *  2. msqrd_p GET parameter,
     *  3. data-msqrd-h attribute of the canvas element, and, finally,
     *  4. data-msqrd-p attribute of the canvas element.
     * If no specifier can be found, no object is created and undefined is returned.
     * @param dataset - Dataset of the canvas element that might provide a data-msqrd-{h,p} attribute.
     * @returns - Masquerade object when a specifier was found. If none was found undefined is returned.
     */
    static createMasqueradeFromGETorDataAttribute(dataset) {
        const mask = contextmasquerade_1.ContextMasquerade.fromGET();
        if (mask) {
            return mask;
        }
        if (dataset.msqrdH) {
            return contextmasquerade_1.ContextMasquerade.fromHash(dataset.msqrdH);
        }
        if (dataset.msqrdP) {
            return contextmasquerade_1.ContextMasquerade.fromPreset(dataset.msqrdP);
        }
        return undefined;
    }
    // WEBGL 1 & 2 CONTEXT
    /**
     * Create a WebGL context. Note: this should only be called once in constructor, because the second and subsequent
     * calls to getContext of an element will return null.
     * @param element - Canvas element to request context from.
     * @param attributes - Overrides the internal default attributes @see{Context.DEFAULT_ATTRIBUTES}.
     * @returns - Context providing either a WebGLRenderingContext, WebGL2RenderingContext.
     */
    static request(element, attributes = Context.DEFAULT_ATTRIBUTES) {
        const dataset = element.dataset;
        const mask = Context.createMasqueradeFromGETorDataAttribute(dataset);
        /** Favor backend specification by masquerade over specification by data attribute. */
        let request = mask ? mask.backend :
            dataset.backend ? dataset.backend.toLowerCase() : 'auto';
        if (!(request in Context.BackendRequestType)) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `unknown backend '${dataset.backend}' changed to '${Context.BackendRequestType.auto}'`);
            request = 'auto';
        }
        switch (request) {
            case Context.BackendRequestType.webgl:
                break;
            case Context.BackendRequestType.experimental:
            case Context.BackendRequestType.webgl1:
            case Context.BackendRequestType.experimental1:
                request = Context.BackendRequestType.webgl;
                break;
            case Context.BackendRequestType.webgl2:
            case Context.BackendRequestType.experimental2:
                request = Context.BackendRequestType.webgl2;
                break;
            default:
                request = Context.BackendRequestType.auto;
        }
        let context;
        if (request !== Context.BackendRequestType.webgl) {
            context = this.requestWebGL2(element, attributes);
        }
        if (!context) {
            context = this.requestWebGL1(element, attributes);
            (0, auxiliaries_1.logIf)(context !== undefined && request === Context.BackendRequestType.webgl2, auxiliaries_1.LogLevel.Info, `backend changed to '${Context.BackendRequestType.webgl}', given '${request}'`);
        }
        (0, auxiliaries_1.assert)(!!context, `creating a context failed`);
        return new Context(context, mask);
    }
    /**
     * Helper that tries to create a WebGL 1 context (requests to 'webgl' and 'experimental-webgl' are made).
     * @param element - Canvas element to request context from.
     * @param attributes - Overrides the internal default attributes @see{Context.CONTEXT_ATTRIBUTES}.
     * @returns {WebGLRenderingContext} - WebGL context object or null.
     */
    static requestWebGL1(element, attributes = Context.DEFAULT_ATTRIBUTES) {
        let context = element.getContext(Context.BackendRequestType.webgl, attributes);
        if (context) {
            return context;
        }
        context = element.getContext(Context.BackendRequestType.experimental, attributes);
        return context === null ? undefined : context;
    }
    /**
     * Helper that tries to create a WebGL 2 context (requests to 'webgl2' and 'experimental-webgl2' are made).
     * @param element - Canvas element to request context from.
     * @param attributes - Overrides the internal default attributes @see{Context.CONTEXT_ATTRIBUTES}.
     * @returns {WebGL2RenderingContext} - WebGL2 context object or undefined.
     */
    static requestWebGL2(element, attributes = Context.DEFAULT_ATTRIBUTES) {
        let context = element.getContext(Context.BackendRequestType.webgl2, attributes);
        if (context) {
            return context;
        }
        context = element.getContext(Context.BackendRequestType.experimental2, attributes);
        return context === null ? undefined : context;
    }
    // CONTEXT ATTRIBUTES
    /**
     * Cached attributes of the context.
     */
    _attributes = undefined;
    queryAttributes() {
        const attributes = this._context.getContextAttributes();
        // Some browsers, e.g., Brave, might disable querying the attributes.
        if (attributes === null) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Error, `querying context attributes failed (probably blocked)`);
            return;
        }
        this._attributes = attributes;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If the value is true, the drawing buffer has an alpha channel for the purposes of performing OpenGL destination
     * alpha operations and compositing with the page. If the value is false, no alpha buffer is available.
     */
    get alpha() {
        return this._attributes ? this._attributes.alpha : false;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If the value is true and the implementation supports antialiasing the drawing buffer will perform antialiasing
     * using its choice of technique (multisample/supersample) and quality. If the value is false or the implementation
     * does not support antialiasing, no antialiasing is performed.
     */
    get antialias() {
        return this._attributes ? this._attributes.antialias : false;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If the value is true, the drawing buffer has a depth buffer of at least 16 bits. If the value is false, no depth
     * buffer is available.
     */
    get depth() {
        return this._attributes ? this._attributes.depth : false;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If the value is true, context creation will fail if the implementation determines that the performance of the
     * created WebGL context would be dramatically lower than that of a native application making equivalent OpenGL
     * calls...
     */
    get failIfMajorPerformanceCaveat() {
        return this._attributes ? this._attributes.failIfMajorPerformanceCaveat : false;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If the value is true the page compositor will assume the drawing buffer contains colors with premultiplied alpha.
     * If the value is false the page compositor will assume that colors in the drawing buffer are not premultiplied.
     * This flag is ignored if the alpha flag is false. See Premultiplied Alpha for more information on the effects of
     * the premultipliedAlpha flag.
     */
    get premultipliedAlpha() {
        return this._attributes ? this._attributes.premultipliedAlpha : false;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If false, once the drawing buffer is presented as described in theDrawing Buffer section, the contents of the
     * drawing buffer are cleared to their default values. All elements of the drawing buffer (color, depth and stencil)
     * are cleared. If the value is true the buffers will not be cleared and will preserve their values until cleared
     * or overwritten by the author.
     */
    get preserveDrawingBuffer() {
        return this._attributes ? this._attributes.preserveDrawingBuffer : false;
    }
    /**
     * @link https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2
     * If the value is true, the drawing buffer has a stencil buffer of at least 8 bits. If the value is false, no
     * stencil buffer is available.
     */
    get stencil() {
        return this._attributes ? this._attributes.stencil : false;
    }
    // EXTENSIONS
    /**
     * Cached extension supported by the context.
     */
    _extensions = new Array();
    /**
     * Checks if the given extension is supported. Please note that a 'supports' call asserts whether or not the
     * extension is related to the WebGL version. For example, the following code would lead to an Error:
     * ```
     * this.supports('ANGLE_instanced_arrays'); // asserts in WebGL2 since the extension is incorporated by default
     * ```
     * If the context is masked by a ContextMasquerade the support of an extension might be concealed.
     * @param extension - Extension identifier to query support for.
     * @returns - True if the extension is supported, false otherwise.
     */
    supports(extension) {
        if (this._mask && this._mask.extensionsConceal.indexOf(extension) > -1) {
            return false;
        }
        switch (this._backend) {
            case Context.BackendType.WebGL1:
                (0, auxiliaries_1.assert)(extensions_1.WEBGL1_EXTENSIONS.indexOf(extension) > -1, `extension ${extension} not available to WebGL1`);
                break;
            case Context.BackendType.WebGL2:
                (0, auxiliaries_1.assert)(extensions_1.WEBGL2_DEFAULT_EXTENSIONS.indexOf(extension) === -1, `extension ${extension} supported by default in WebGL2`);
                (0, auxiliaries_1.assert)(extensions_1.WEBGL2_EXTENSIONS.indexOf(extension) > -1, `extension ${extension} not available to WebGL2`);
                break;
            default:
                break;
        }
        return this._extensions.indexOf(extension) > -1;
    }
    /**
     * Enable provided extensions. Each extension is only enabled if it is supported. Alternatively the extension can
     * be queried for support and accessed (thereby enabled) directly. Thus, this function only acts as convenience
     * interface for something like a mandatory extension configuration etc. Also, some extensions only effect GLSL
     * capabilities and must be enabled explicitly without accessing the extension object.
     * @param extensions - Array of extensions identifier that are to be enabled.
     */
    enable(extensions) {
        for (const extension of extensions) {
            if (this.isWebGL1 && extensions_1.WEBGL1_EXTENSIONS.indexOf(extension) === -1) {
                continue;
            }
            if (this.isWebGL2 && extensions_1.WEBGL2_EXTENSIONS.indexOf(extension) === -1) {
                continue;
            }
            if (this.supports(extension) === false) {
                continue;
            }
            this.extension(undefined, extension);
        }
    }
    /**
     * Queries all extensions for the current context and stores the result (supported or not supported). This is
     * relevant to avoid continuous searches or regexp matching or substring queries in the complete extension string.
     * Instead, the support is queried once and can be explicitly request in the public interface using properties.
     *
     * This function should get called only once per Context instance.
     */
    queryExtensionSupport() {
        const extensions = this._context.getSupportedExtensions();
        // Some browsers, e.g., Brave, might disable querying the supported extensions.
        if (extensions === null) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Error, `querying supported extensions failed (probably blocked)`);
            return;
        }
        // Only handle masquerade here and not within each supports-query?
        for (const extension of extensions) {
            if (this._mask && this._mask.extensionsConceal.indexOf(extension) > -1) {
                continue;
            }
            this._extensions.push(extension);
        }
        if (this._backend === Context.BackendType.WebGL1) {
            this.ANGLE_instanced_arrays_supported = this.supports('ANGLE_instanced_arrays');
            this.EXT_blend_minmax_supported = this.supports('EXT_blend_minmax');
            this.EXT_color_buffer_half_float_supported = this.supports('EXT_color_buffer_half_float');
            this.EXT_disjoint_timer_query_supported = this.supports('EXT_disjoint_timer_query');
            this.EXT_frag_depth_supported = this.supports('EXT_frag_depth');
            this.EXT_sRGB_supported = this.supports('EXT_sRGB');
            this.EXT_shader_texture_lod_supported = this.supports('EXT_shader_texture_lod');
            this.OES_element_index_uint_supported = this.supports('OES_element_index_uint');
            this.OES_standard_derivatives_supported = this.supports('OES_standard_derivatives');
            this.OES_texture_float_supported = this.supports('OES_texture_float');
            this.OES_texture_half_float_supported = this.supports('OES_texture_half_float');
            this.OES_vertex_array_object_supported = this.supports('OES_vertex_array_object');
            this.WEBGL_color_buffer_float_supported = this.supports('WEBGL_color_buffer_float');
            this.WEBGL_depth_texture_supported = this.supports('WEBGL_depth_texture');
            this.WEBGL_draw_buffers_supported = this.supports('WEBGL_draw_buffers');
        }
        if (this._backend === Context.BackendType.WebGL2) {
            this.EXT_color_buffer_float_supported = this.supports('EXT_color_buffer_float');
            this.EXT_disjoint_timer_query_webgl2_supported = this.supports('EXT_disjoint_timer_query_webgl2');
        }
        this.EXT_texture_filter_anisotropic_supported = this.supports('EXT_texture_filter_anisotropic');
        this.OES_texture_float_linear_supported = this.supports('OES_texture_float_linear');
        this.OES_texture_half_float_linear_supported = this.supports('OES_texture_half_float_linear');
        this.WEBGL_compressed_texture_astc_supported = this.supports('WEBGL_compressed_texture_astc');
        this.WEBGL_compressed_texture_atc_supported = this.supports('WEBGL_compressed_texture_atc');
        this.WEBGL_compressed_texture_etc_supported = this.supports('WEBGL_compressed_texture_etc');
        this.WEBGL_compressed_texture_etc1_supported = this.supports('WEBGL_compressed_texture_etc1');
        this.WEBGL_compressed_texture_pvrtc_supported = this.supports('WEBGL_compressed_texture_pvrtc');
        this.WEBGL_compressed_texture_s3tc_supported = this.supports('WEBGL_compressed_texture_s3tc');
        this.WEBGL_compressed_texture_s3tc_srgb_supported = this.supports('WEBGL_compressed_texture_s3tc_srgb');
        this.WEBGL_debug_renderer_info_supported = this.supports('WEBGL_debug_renderer_info');
        this.WEBGL_debug_shaders_supported = this.supports('WEBGL_debug_shaders');
        this.WEBGL_lose_context_supported = this.supports('WEBGL_lose_context');
    }
    /**
     * Returns the cached extensions object for the given extension identifier. If no extensions is cached, it is
     * queried. Asserts if the extension is provided by default in the current backend, not supported in general, or
     * unknown to the specification.
     * Please not that the availability of an extension might be concealed by the context's mask.
     * @param out - Member the extension object is cached into.
     * @param extension - Extension identifier to query.
     * @returns - Extension object.
     */
    extension(out, extension) {
        if (out === undefined) {
            (0, auxiliaries_1.assert)(this.supports(extension), `extension ${extension} expected to be supported`);
            out = this._context.getExtension(extension);
        }
        return out;
    }
    /**
     * Context this is of type 'any' for now, since WebGL2RenderingContext not available but supported. This
     * constructor is protected to enforce context creation using `request`. It queries extension support and
     * configures context specifics for convenience, e.g., HALF_FLOAT format.
     */
    constructor(context, mask) {
        this._context = context;
        this._mask = mask;
        const contextString = context.toString();
        {
            // WebGL chrome debugger renames Context to CaptureContext
            const webgl1 = /WebGLRenderingContext/.test(contextString) ||
                /CaptureContext/.test(contextString);
            const webgl2 = /WebGL2RenderingContext/.test(contextString);
            this._backend = webgl1 ? Context.BackendType.WebGL1 : webgl2 ? Context.BackendType.WebGL2 : undefined;
        }
        (0, auxiliaries_1.assert)(this._backend !== undefined && this._backend.valueOf() !== Context.BackendType.Invalid.valueOf(), `context is neither webgl nor webgl2, given ${contextString}`);
        this.queryAttributes();
        this.queryExtensionSupport();
        // undefine all masked functions
        if (this._mask && this._mask.functionsUndefine) {
            for (const func in this._mask.functionsUndefine) {
                this._context[func] = undefined;
            }
        }
        // create an instance for a gl2 facade (unifies mandatory interfaces of the webgl and webgl2 api)
        this._gl2 = new gl2facade_1.GL2Facade(this);
    }
    /** @see {@link allocationRegister} */
    _allocationRegister = new allocationregister_1.AllocationRegister();
    /**
     * The context's GPU allocation register for use of tracking memory allocations.
     */
    get allocationRegister() {
        return this._allocationRegister;
    }
    /**
     * The created rendering backend (webgl context type), either 'webgl' or 'webgl2' based on which one was
     * created successfully. If no context could be created undefined is returned.
     * @returns - Backend that was created on construction.
     */
    get backend() {
        return this._backend;
    }
    /**
     * Provides a human-readable string of the backend.
     */
    get backendString() {
        switch (this._backend) {
            case Context.BackendType.WebGL1:
                return 'WebGL';
            case Context.BackendType.WebGL2:
                return 'WebGL2';
            default:
                return undefined;
        }
    }
    /**
     * Provides an array of all extensions supported by the used WebGL1/2 context.
     */
    get extensions() {
        return this._extensions;
    }
    /**
     * Masquerade object applied to a context instance.
     */
    get mask() {
        return this._mask;
    }
    /**
     * Access to either the WebGLRenderingContext or WebGL2RenderingContext.
     */
    get gl() {
        return this._context;
    }
    /**
     * WebGL2 facade for WebGL2 API like access to features mandatory to this engine.
     */
    get gl2facade() {
        return this._gl2;
    }
    /**
     * True if the context is a WebGL1 context, otherwise false.
     */
    get isWebGL1() {
        return this._backend === Context.BackendType.WebGL1;
    }
    /**
     * True if the context is a WebGL2 context, otherwise false.
     */
    get isWebGL2() {
        return this._backend === Context.BackendType.WebGL2;
    }
    // EXTENSION QUERIES
    // WebGL1, WebGL2-default
    ANGLE_instanced_arrays;
    ANGLE_instanced_arrays_supported;
    get supportsInstancedArrays() {
        return this.ANGLE_instanced_arrays_supported;
    }
    get instancedArrays() {
        return this.extension(this.ANGLE_instanced_arrays, 'ANGLE_instanced_arrays');
    }
    // WebGL1, WebGL2-default
    EXT_blend_minmax;
    EXT_blend_minmax_supported;
    get supportsBlendMinmax() {
        return this.EXT_blend_minmax_supported;
    }
    get blendMinmax() {
        return this.extension(this.EXT_blend_minmax, 'EXT_blend_minmax');
    }
    // WebGL1
    EXT_color_buffer_half_float;
    EXT_color_buffer_half_float_supported;
    get supportsColorBufferHalfFloat() {
        return this.EXT_color_buffer_half_float_supported;
    }
    get colorBufferHalfFloat() {
        return this.extension(this.EXT_color_buffer_half_float, 'EXT_color_buffer_half_float');
    }
    // WebGL1
    EXT_disjoint_timer_query;
    EXT_disjoint_timer_query_supported;
    get supportsDisjointTimerQuery() {
        return this.EXT_disjoint_timer_query_supported;
    }
    get disjointTimerQuery() {
        return this.extension(this.EXT_disjoint_timer_query, 'EXT_disjoint_timer_query');
    }
    // WebGL2
    EXT_disjoint_timer_query_webgl2;
    EXT_disjoint_timer_query_webgl2_supported;
    get supportsDisjointTimerQueryWebGL2() {
        return this.EXT_disjoint_timer_query_webgl2_supported;
    }
    get disjointTimerQueryWebGL2() {
        return this.extension(this.EXT_disjoint_timer_query_webgl2, 'EXT_disjoint_timer_query_webgl2');
    }
    // WebGL1, WebGL2-default
    EXT_frag_depth;
    EXT_frag_depth_supported;
    get supportsFragDepth() {
        return this.EXT_frag_depth_supported;
    }
    get fragDepth() {
        return this.extension(this.EXT_frag_depth, 'EXT_frag_depth');
    }
    // WebGL1, WebGL2-default
    EXT_sRGB;
    EXT_sRGB_supported;
    get supportsSRGB() {
        return this.EXT_sRGB_supported;
    }
    get sRGB() {
        return this.extension(this.EXT_sRGB, 'EXT_sRGB');
    }
    // WebGL1, WebGL2-default
    EXT_shader_texture_lod;
    EXT_shader_texture_lod_supported;
    get supportsShaderTextureLOD() {
        return this.EXT_shader_texture_lod_supported;
    }
    get shaderTextureLOD() {
        return this.extension(this.EXT_shader_texture_lod, 'EXT_shader_texture_lod');
    }
    // WebGL1, WebGL2
    EXT_texture_filter_anisotropic;
    EXT_texture_filter_anisotropic_supported;
    get supportsTextureFilterAnisotropic() {
        return this.EXT_texture_filter_anisotropic_supported;
    }
    get textureFilterAnisotropic() {
        return this.extension(this.EXT_texture_filter_anisotropic, 'EXT_texture_filter_anisotropic');
    }
    // WebGL1, WebGL2-default
    OES_element_index_uint;
    OES_element_index_uint_supported;
    get supportsElementIndexUint() {
        return this.OES_element_index_uint_supported;
    }
    get elementIndexUint() {
        return this.extension(this.OES_element_index_uint, 'OES_element_index_uint');
    }
    // WebGL1, WebGL2-default
    OES_standard_derivatives;
    OES_standard_derivatives_supported;
    get supportsStandardDerivatives() {
        return this.OES_standard_derivatives_supported;
    }
    get standardDerivatives() {
        return this.extension(this.OES_standard_derivatives, 'OES_standard_derivatives');
    }
    // WebGL1, WebGL2-default
    OES_texture_float;
    OES_texture_float_supported;
    get supportsTextureFloat() {
        return this.OES_texture_float_supported;
    }
    get textureFloat() {
        return this.extension(this.OES_texture_float, 'OES_texture_float');
    }
    // WebGL1, WebGL2
    OES_texture_float_linear;
    OES_texture_float_linear_supported;
    get supportsTextureFloatLinear() {
        return this.OES_texture_float_linear_supported;
    }
    get textureFloatLinear() {
        return this.extension(this.OES_texture_float_linear, 'OES_texture_float_linear');
    }
    // WebGL1, WebGL2-default
    OES_texture_half_float;
    OES_texture_half_float_supported;
    get supportsTextureHalfFloat() {
        return this.OES_texture_half_float_supported;
    }
    get textureHalfFloat() {
        return this.extension(this.OES_texture_half_float, 'OES_texture_half_float');
    }
    // WebGL1, WebGL2
    OES_texture_half_float_linear;
    OES_texture_half_float_linear_supported;
    get supportsTextureHalfFloatLinear() {
        return this.OES_texture_half_float_linear_supported;
    }
    get textureHalfFloatLinear() {
        return this.extension(this.OES_texture_half_float_linear, 'OES_texture_half_float_linear');
    }
    // WebGL1, WebGL2-default
    OES_vertex_array_object;
    OES_vertex_array_object_supported;
    get supportsVertexArrayObject() {
        return this.OES_vertex_array_object_supported;
    }
    get vertexArrayObject() {
        return this.extension(this.OES_vertex_array_object, 'OES_vertex_array_object');
    }
    // WebGL1
    WEBGL_color_buffer_float;
    WEBGL_color_buffer_float_supported;
    // WebGL2
    EXT_color_buffer_float;
    EXT_color_buffer_float_supported;
    get supportsColorBufferFloat() {
        switch (this._backend) {
            case Context.BackendType.WebGL1:
                return this.WEBGL_color_buffer_float_supported;
            case Context.BackendType.WebGL2:
                return this.EXT_color_buffer_float_supported;
            default:
                return undefined;
        }
    }
    get colorBufferFloat() {
        switch (this._backend) {
            case Context.BackendType.WebGL1:
                return this.extension(this.WEBGL_color_buffer_float, 'WEBGL_color_buffer_float');
            case Context.BackendType.WebGL2:
                return this.extension(this.EXT_color_buffer_float, 'EXT_color_buffer_float');
            default:
                return undefined;
        }
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_astc;
    WEBGL_compressed_texture_astc_supported;
    get supportsCompressedTextureASTC() {
        return this.WEBGL_compressed_texture_astc_supported;
    }
    get compressedTextureASTC() {
        return this.extension(this.WEBGL_compressed_texture_astc, 'WEBGL_compressed_texture_astc');
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_atc;
    WEBGL_compressed_texture_atc_supported;
    get supportsCompressedTextureATC() {
        return this.WEBGL_compressed_texture_atc_supported;
    }
    get compressedTextureATC() {
        return this.extension(this.WEBGL_compressed_texture_atc, 'WEBGL_compressed_texture_atc');
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_etc;
    WEBGL_compressed_texture_etc_supported;
    get supportsCompressedTextureETC() {
        return this.WEBGL_compressed_texture_etc_supported;
    }
    get compressedTextureETC() {
        return this.extension(this.WEBGL_compressed_texture_etc, 'WEBGL_compressed_texture_etc');
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_etc1;
    WEBGL_compressed_texture_etc1_supported;
    get supportsCompressedTextureETC1() {
        return this.WEBGL_compressed_texture_etc1_supported;
    }
    get compressedTextureETC1() {
        return this.extension(this.WEBGL_compressed_texture_etc1, 'WEBGL_compressed_texture_etc1');
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_pvrtc;
    WEBGL_compressed_texture_pvrtc_supported;
    get supportsCompressedTexturePVRTC() {
        return this.WEBGL_compressed_texture_pvrtc_supported;
    }
    get compressedTexturePVRTC() {
        return this.extension(this.WEBGL_compressed_texture_pvrtc, 'WEBGL_compressed_texture_pvrtc');
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_s3tc;
    WEBGL_compressed_texture_s3tc_supported;
    get supportsCompressedTextureS3TC() {
        return this.WEBGL_compressed_texture_s3tc_supported;
    }
    get compressedTextureS3TC() {
        return this.extension(this.WEBGL_compressed_texture_s3tc, 'WEBGL_compressed_texture_s3tc');
    }
    // WebGL1, WebGL2
    WEBGL_compressed_texture_s3tc_srgb;
    WEBGL_compressed_texture_s3tc_srgb_supported;
    get supportsCompressedTextureS3TCSRGB() {
        return this.WEBGL_compressed_texture_s3tc_srgb_supported;
    }
    get compressedTextureS3TCSRGB() {
        return this.extension(this.WEBGL_compressed_texture_s3tc_srgb, 'WEBGL_compressed_texture_s3tc_srgb');
    }
    // WebGL1, WebGL2
    WEBGL_debug_renderer_info;
    WEBGL_debug_renderer_info_supported;
    get supportsDebugRendererInfo() {
        return this.WEBGL_debug_renderer_info_supported;
    }
    get debugRendererInfo() {
        return this.extension(this.WEBGL_debug_renderer_info, 'WEBGL_debug_renderer_info');
    }
    // WebGL1, WebGL2
    WEBGL_debug_shaders;
    WEBGL_debug_shaders_supported;
    get supportsDebugShaders() {
        return this.WEBGL_debug_shaders_supported;
    }
    get debugShaders() {
        return this.extension(this.WEBGL_debug_shaders, 'WEBGL_debug_shaders');
    }
    // WebGL1, WebGL2-default
    WEBGL_depth_texture;
    WEBGL_depth_texture_supported;
    get supportsDepthTexture() {
        return this.WEBGL_depth_texture_supported;
    }
    get depthTexture() {
        return this.extension(this.WEBGL_depth_texture, 'WEBGL_depth_texture');
    }
    // WebGL1, WebGL2-default
    WEBGL_draw_buffers;
    WEBGL_draw_buffers_supported;
    get supportsDrawBuffers() {
        return this.WEBGL_draw_buffers_supported;
    }
    get drawBuffers() {
        return this.extension(this.WEBGL_draw_buffers, 'WEBGL_draw_buffers');
    }
    // WebGL1, WebGL2
    WEBGL_lose_context;
    WEBGL_lose_context_supported;
    get supportsLoseContext() {
        return this.WEBGL_lose_context_supported;
    }
    get loseContext() {
        return this.extension(this.WEBGL_lose_context, 'WEBGL_lose_context');
    }
    // FUNCTION QUERIES
    /**
     * True if WebGL2 blitFramebuffer is supported, false otherwise. This is experimental technology.
     */
    get supportsBlitFramebuffer() {
        return this._context.blitFramebuffer !== undefined;
    }
    /**
     * True if WebGL2 readBuffer is supported, false otherwise. This is experimental technology.
     */
    get supportsReadBuffer() {
        return this._context.readBuffer !== undefined;
    }
    /**
     * True if WebGL2 texImage3D draft is supported, false otherwise. This is experimental technology.
     */
    get supportsTexImage3D() {
        return this._context.texImage3D !== undefined;
    }
    // PARAMETER QUERIES
    param(pname) {
        (0, auxiliaries_1.assert)(!!this._context, `expected context to be valid`);
        return this._context.getParameter(pname);
    }
    /**
     * Provides the context's extension hash. The hash can be used for context masquerade.
     */
    hash() {
        return extensionshash_1.ExtensionsHash.encode(this._backend, this._extensions);
    }
    /**
     * Queries various parameters (depending on the type of context and support of extensions) and returns them as
     * formatted string.
     * @returns - Array of 2-tuple containing (1) the queried enum as string and (2) the resulting parameter value.
     */
    about() {
        const available = 'ok';
        const unavailable = 'na';
        if (this._backend === Context.BackendType.Invalid) {
            return new Array();
        }
        (0, auxiliaries_1.assert)(!!this._context, `expected context to be valid`);
        const context = this._context;
        const pNamesAndValues = new Array();
        pNamesAndValues.push(['BACKEND (GLOPERATE)', this.backend]);
        pNamesAndValues.push(['CONTEXT_HASH (GLOPERATE)', this.hash()]);
        pNamesAndValues.push(['RENDERER', this.param(context.RENDERER)]);
        pNamesAndValues.push(['VENDOR', this.param(context.VENDOR)]);
        pNamesAndValues.push(['VERSION', this.param(context.VERSION)]);
        pNamesAndValues.push(['SHADING_LANGUAGE_VERSION', this.param(context.SHADING_LANGUAGE_VERSION)]);
        /* Debug Render Info Extension - Unmasked Vendor and Renderer. */
        pNamesAndValues.push(['UNMASKED_VENDOR_WEBGL', !this.supportsDebugRendererInfo ? unavailable :
                this.param(this.debugRendererInfo.UNMASKED_VENDOR_WEBGL)]);
        pNamesAndValues.push(['UNMASKED_RENDERER_WEBGL', !this.supportsDebugRendererInfo ? unavailable :
                this.param(this.debugRendererInfo.UNMASKED_RENDERER_WEBGL)]);
        /* Actual Context Attributes. */
        pNamesAndValues.push(['ALPHA (ATTRIBUTE)', String(this.alpha)]);
        pNamesAndValues.push(['ANTIALIAS (ATTRIBUTE)', String(this.antialias)]);
        pNamesAndValues.push(['DEPTH (ATTRIBUTE)', String(this.depth)]);
        pNamesAndValues.push(['FAIL_IF_MAJOR_PERFORMANCE_CAVEAT (ATTRIBUTE)',
            String(this.failIfMajorPerformanceCaveat)]);
        pNamesAndValues.push(['PREMULTIPLIED_ALPHA (ATTRIBUTE)', String(this.premultipliedAlpha)]);
        pNamesAndValues.push(['PRESERVE_DRAWING_BUFFER (ATTRIBUTE)', String(this.preserveDrawingBuffer)]);
        pNamesAndValues.push(['STENCIL (ATTRIBUTE)', String(this.stencil)]);
        /* Window Info. */
        pNamesAndValues.push(['DEVICE_PIXEL_RATIO (WINDOW)', window.devicePixelRatio]);
        /* Navigator Info. */
        pNamesAndValues.push(['APP_CODE_NAME (NAVIGATOR)', window.navigator.appCodeName]);
        pNamesAndValues.push(['APP_NAME (NAVIGATOR)', window.navigator.appName]);
        pNamesAndValues.push(['APP_VERSION (NAVIGATOR)', window.navigator.appVersion]);
        pNamesAndValues.push(['PLATFORM (NAVIGATOR)', window.navigator.platform]);
        pNamesAndValues.push(['HARDWARE_CONCURRENCY (NAVIGATOR)', window.navigator.appCodeName]);
        pNamesAndValues.push(['VENDOR (NAVIGATOR)', window.navigator.vendor]);
        pNamesAndValues.push(['VENDOR_SUB (NAVIGATOR)', window.navigator.vendorSub]);
        /* Max and min queries - context limitations. */
        pNamesAndValues.push(['MAX_COMBINED_TEXTURE_IMAGE_UNITS',
            this.param(context.MAX_COMBINED_TEXTURE_IMAGE_UNITS)]);
        pNamesAndValues.push(['MAX_CUBE_MAP_TEXTURE_SIZE',
            this.param(context.MAX_CUBE_MAP_TEXTURE_SIZE)]);
        pNamesAndValues.push(['MAX_FRAGMENT_UNIFORM_VECTORS',
            this.param(context.MAX_FRAGMENT_UNIFORM_VECTORS)]);
        pNamesAndValues.push(['MAX_RENDERBUFFER_SIZE',
            this.param(context.MAX_RENDERBUFFER_SIZE)]);
        pNamesAndValues.push(['MAX_TEXTURE_IMAGE_UNITS',
            this.param(context.MAX_TEXTURE_IMAGE_UNITS)]);
        pNamesAndValues.push(['MAX_TEXTURE_SIZE',
            this.param(context.MAX_TEXTURE_SIZE)]);
        pNamesAndValues.push(['MAX_VARYING_VECTORS',
            this.param(context.MAX_VARYING_VECTORS)]);
        pNamesAndValues.push(['MAX_VERTEX_ATTRIBS',
            this.param(context.MAX_VERTEX_ATTRIBS)]);
        pNamesAndValues.push(['MAX_VERTEX_TEXTURE_IMAGE_UNITS',
            this.param(context.MAX_VERTEX_TEXTURE_IMAGE_UNITS)]);
        pNamesAndValues.push(['MAX_VERTEX_UNIFORM_VECTORS',
            this.param(context.MAX_VERTEX_UNIFORM_VECTORS)]);
        const MAX_VIEWPORT_DIMS = this.param(context.MAX_VIEWPORT_DIMS);
        pNamesAndValues.push(['MAX_VIEWPORT_DIMS (WIDTH)', MAX_VIEWPORT_DIMS ? MAX_VIEWPORT_DIMS[0] : null]);
        pNamesAndValues.push(['MAX_VIEWPORT_DIMS (HEIGHT)', MAX_VIEWPORT_DIMS ? MAX_VIEWPORT_DIMS[1] : null]);
        if (this.isWebGL2) {
            const context = this._context;
            pNamesAndValues.push(['MAX_3D_TEXTURE_SIZE',
                this.param(context.MAX_3D_TEXTURE_SIZE)]);
            pNamesAndValues.push(['MAX_ARRAY_TEXTURE_LAYERS',
                this.param(context.MAX_ARRAY_TEXTURE_LAYERS)]);
            pNamesAndValues.push(['MAX_CLIENT_WAIT_TIMEOUT_WEBGL',
                this.param(context.MAX_CLIENT_WAIT_TIMEOUT_WEBGL)]);
            pNamesAndValues.push(['MAX_COLOR_ATTACHMENTS',
                this.param(context.MAX_COLOR_ATTACHMENTS)]);
            pNamesAndValues.push(['MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS',
                this.param(context.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS)]);
            pNamesAndValues.push(['MAX_COMBINED_UNIFORM_BLOCKS',
                this.param(context.MAX_COMBINED_UNIFORM_BLOCKS)]);
            pNamesAndValues.push(['MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS',
                this.param(context.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS)]);
            pNamesAndValues.push(['MAX_DRAW_BUFFERS',
                this.param(context.MAX_DRAW_BUFFERS)]);
            pNamesAndValues.push(['MAX_ELEMENT_INDEX',
                this.param(context.MAX_ELEMENT_INDEX)]);
            pNamesAndValues.push(['MAX_ELEMENTS_INDICES',
                this.param(context.MAX_ELEMENTS_INDICES)]);
            pNamesAndValues.push(['MAX_ELEMENTS_VERTICES',
                this.param(context.MAX_ELEMENTS_VERTICES)]);
            pNamesAndValues.push(['MAX_FRAGMENT_INPUT_COMPONENTS',
                this.param(context.MAX_FRAGMENT_INPUT_COMPONENTS)]);
            pNamesAndValues.push(['MAX_FRAGMENT_UNIFORM_BLOCKS',
                this.param(context.MAX_FRAGMENT_UNIFORM_BLOCKS)]);
            pNamesAndValues.push(['MAX_FRAGMENT_UNIFORM_COMPONENTS',
                this.param(context.MAX_FRAGMENT_UNIFORM_COMPONENTS)]);
            pNamesAndValues.push(['MAX_PROGRAM_TEXEL_OFFSET',
                this.param(context.MAX_PROGRAM_TEXEL_OFFSET)]);
            pNamesAndValues.push(['MAX_SAMPLES',
                this.param(context.MAX_SAMPLES)]);
            pNamesAndValues.push(['MAX_SERVER_WAIT_TIMEOUT',
                this.param(context.MAX_SERVER_WAIT_TIMEOUT)]);
            pNamesAndValues.push(['MAX_TEXTURE_LOD_BIAS',
                this.param(context.MAX_TEXTURE_LOD_BIAS)]);
            pNamesAndValues.push(['MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS',
                this.param(context.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS)]);
            pNamesAndValues.push(['MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS',
                this.param(context.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS)]);
            pNamesAndValues.push(['MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS',
                this.param(context.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS)]);
            pNamesAndValues.push(['MAX_UNIFORM_BLOCK_SIZE',
                this.param(context.MAX_UNIFORM_BLOCK_SIZE)]);
            pNamesAndValues.push(['MAX_UNIFORM_BUFFER_BINDINGS',
                this.param(context.MAX_UNIFORM_BUFFER_BINDINGS)]);
            pNamesAndValues.push(['MAX_VARYING_COMPONENTS',
                this.param(context.MAX_VARYING_COMPONENTS)]);
            pNamesAndValues.push(['MAX_VERTEX_OUTPUT_COMPONENTS',
                this.param(context.MAX_VERTEX_OUTPUT_COMPONENTS)]);
            pNamesAndValues.push(['MAX_VERTEX_UNIFORM_BLOCKS',
                this.param(context.MAX_VERTEX_UNIFORM_BLOCKS)]);
            pNamesAndValues.push(['MAX_VERTEX_UNIFORM_COMPONENTS',
                this.param(context.MAX_VERTEX_UNIFORM_COMPONENTS)]);
            pNamesAndValues.push(['MIN_PROGRAM_TEXEL_OFFSET',
                this.param(context.MIN_PROGRAM_TEXEL_OFFSET)]);
        }
        if (this.isWebGL1) {
            for (const extension of extensions_1.WEBGL1_EXTENSIONS) {
                pNamesAndValues.push([extension, this.supports(extension) ? available : unavailable]);
            }
        }
        else if (this.isWebGL2) {
            for (const extension of extensions_1.WEBGL2_DEFAULT_EXTENSIONS) {
                pNamesAndValues.push([`${extension} (default)`, available]);
            }
            for (const extension of extensions_1.WEBGL2_EXTENSIONS) {
                pNamesAndValues.push([extension, this.supports(extension) ? available : unavailable]);
            }
        }
        return pNamesAndValues;
    }
    /**
     * Creates a well formated about string, e.g., for logging.
     */
    aboutString() {
        const about = this.about();
        let maxPNameLength = 0;
        for (const tuple of about) {
            maxPNameLength = Math.max(tuple[0].length, maxPNameLength);
        }
        let index = 0;
        let message = ``;
        const extensionSeparator = this.isWebGL2 ? 63 + extensions_1.WEBGL2_DEFAULT_EXTENSIONS.length : -1;
        for (const tuple of about) {
            /* Provide some semantic grouping: Core, Limits, Extensions, ... */
            switch (index) {
                case 2: // End of Backend and Context Hash
                case 6: // End of Core Context Info
                case 8: // End of unmasked vendor and renderer
                case 15: // End of context attributes
                case 16: // End of window attributes
                case 23: // End of navigator attributes
                case 35: // End of WebGL 1 specific Limits
                case 63: // End of WebGL 2 specific Limit, start of extensions
                case extensionSeparator: // End of default Extensions (in case of WebGL2) or -1
                    message += `\n`;
                    break;
                default:
                    break;
            }
            message += `  ${tuple[0]} ${'-'.repeat(maxPNameLength - tuple[0].length)}-- ${tuple[1]}\n`;
            ++index;
        }
        message += `\n`;
        return message;
    }
    /**
     * Logs a well formated list of all queried about params (names and associated values).
     * @param verbosity - Log verbosity that is to be used for logging.
     */
    logAbout(verbosity = auxiliaries_1.LogLevel.Info) {
        (0, auxiliaries_1.log)(verbosity, `context.about\n\n` + this.aboutString());
    }
    /**
     * Invokes `logAbout` @see{@link logAbout}) iff the given statement has resolved to true.
     * @param statement - Result of an expression expected to be true in order to invoke logPerformanceStop.
     * @param verbosity - Log verbosity that is to be used for logging.
     */
    logAboutIf(statement, verbosity = auxiliaries_1.LogLevel.Info) {
        (0, auxiliaries_1.logIf)(statement, verbosity, `context.about\n\n` + this.aboutString());
    }
    // CONTEXT-RELATED AUXILIARIES
    /**
     * Provides the size in bytes of certain WebGL format enumerator. Please note that some byte sizes might vary based
     * on context attributes or the bound render, thus, DEPTH_COMPONENT and DEPTH_STENCIL are not covered by this
     * function. @see {@link byteSizeOfFormat}
     */
    byteSizeOfFormat(format) {
        return (0, formatbytesizes_1.byteSizeOfFormat)(this, format);
    }
}
exports.Context = Context;
(function (Context) {
    /**
     * Supported OpenGL backend types.
     */
    let BackendType;
    (function (BackendType) {
        BackendType["Invalid"] = "invalid";
        BackendType["WebGL1"] = "webgl1";
        BackendType["WebGL2"] = "webgl2";
    })(BackendType = Context.BackendType || (Context.BackendType = {}));
    /**
     * The list of valid backend identifiers that can be requested and matched to backend types.
     * List adopted from https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/getContext.
     */
    let BackendRequestType;
    (function (BackendRequestType) {
        BackendRequestType["auto"] = "auto";
        BackendRequestType["webgl"] = "webgl";
        BackendRequestType["experimental"] = "experimental-webgl";
        BackendRequestType["webgl1"] = "webgl1";
        BackendRequestType["experimental1"] = "experimental-webgl1";
        BackendRequestType["webgl2"] = "webgl2";
        BackendRequestType["experimental2"] = "experimental-webgl2";
    })(BackendRequestType = Context.BackendRequestType || (Context.BackendRequestType = {}));
})(Context || (exports.Context = Context = {}));
//# sourceMappingURL=context.js.map