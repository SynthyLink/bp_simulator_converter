"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = exports.LoadingStatus = void 0;
const rxjs_1 = require("rxjs");
const gl_matrix_1 = require("gl-matrix");
const auxiliaries_1 = require("./auxiliaries");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const changelookup_1 = require("./changelookup");
const context_1 = require("./context");
const controller_1 = require("./controller");
const eventhandler_1 = require("./eventhandler");
const initializable_1 = require("./initializable");
const tuples_1 = require("./tuples");
const wizard_1 = require("./wizard");
var LoadingStatus;
(function (LoadingStatus) {
    LoadingStatus[LoadingStatus["Started"] = 0] = "Started";
    LoadingStatus[LoadingStatus["Finished"] = 1] = "Finished";
})(LoadingStatus || (exports.LoadingStatus = LoadingStatus = {}));
/**
 * Base class for hardware-accelerated processing and/or image-synthesis. It provides information such as the current
 * canvas, the canvas's size (native resolution), and the multi-frame number (for progressive rendering). A renderer's
 * properties are expected to be managed by its owning object or the canvas and should not be set directly/manually.
 * Alterations to these properties can be tracked with the `_altered` property. This allows an inheritor to implement
 * partial asset reallocation and, e.g., speed up dynamic multi-frame reconfiguration. The alterable object can be
 * extended using `Object.assign(this._alterable, ... some structure of booleans)`.
 *
 * This base class further provides the invalidate method that invokes an invalidation callback also provided by the
 * owning/controlling canvas.
 *
 * Since Initializable is extended, the initialization workflow applies to all specialized renderers (requires super
 * calls in constructor as well as in initialize and uninitialize).
 *
 * Note that a renderer is currently intended to always render to the canvas it is bound to. Hence, there is no
 * interface for setting a frame target.
 */
class Renderer extends initializable_1.Initializable {
    /**
     * The renderer's invalidation callback. This should usually be setup by the canvas and refer to a function in the
     * canvas's controller, e.g., it should trigger an update within the controller.
     */
    _invalidate;
    /** @see {@link context} */
    _context;
    /**
     * Alterable auxiliary object for tracking changes on renderer input and lazy updates.
     */
    _altered = Object.assign(new changelookup_1.ChangeLookup(), {
        any: false, multiFrameNumber: false, frameSize: false, canvasSize: false, framePrecision: false,
        clearColor: false, debugTexture: false,
    });
    /**
     * This multi-frame number is for lazy reconfiguration and set on update. The inheritor can react to changes using
     * this.altered.multiFrameNumber.
     */
    _multiFrameNumber;
    /**
     * Targeted resolution for image synthesis. This might differ from the canvas resolution and should be used in
     * frame calls of inheritors.
     */
    _frameSize = [0, 0];
    /**
     * Actual, native resolution for the canvas currently in charge of controlling the renderer. This might differ from
     * the targeted frame resolution but is required, e.g., for specific non-proportional ratios between frame size and
     * canvas size.
     */
    _canvasSize = [0, 0];
    /**
     * Targeted frame precision, e.g., used for frame accumulation. Note that any renderer is currently
     * expected to take advantage of progressive rendering (e.g., multi-frame sampling) and accumulation as well as a
     * blit pass (since main intend is multi-frame based rendering).
     */
    _framePrecision = wizard_1.Wizard.Precision.half;
    /**
     * The clear color, provided by the canvas the renderer is bound to. This is used in frame calls of inheritors.
     */
    _clearColor = [0.0, 0.0, 0.0, 1.0];
    /**
     * List of textures for debugging purposes such as normals, ids, depth, masks, etc. that can be populated by the
     * inheritor. The index of a texture identifier can then be for specifying a debug output of a render texture.
     */
    _debugTextures = new Array();
    /**
     * @see {@link debugTexture}
     * This property can be observed, e.g., `aRenderer.debugTextureObservable.subscribe()`.
     */
    _debugTexture;
    _debugTextureSubject = new rxjs_1.ReplaySubject(1);
    /**
     * @see {@link isLoading}
     */
    _isLoading;
    /**
     * This property can be observed via `aRenderer.loadingState$.observe()`. It is triggered when `finishLoading` or
     * `startLoading` is called on this renderer.
     */
    _loadingStatusSubscription;
    /** @callback Invalidate
     * A callback intended to be invoked whenever the specialized renderer itself or one of its objects is invalid. This
     * callback should be passed during initialization to all objects that might handle invalidation internally as well.
     * As a result, rendering of a new frame will be triggered and enforced.
     */
    @initializable_1.Initializable.assert_initialized()
    invalidate(force = false) {
        this._invalidate(force);
    }
    /**
     * Utility for communicating this._debugTexture changes to its associated subject.
     */
    debugTextureNext() {
        this._debugTextureSubject.next(this._debugTexture);
    }
    /**
     * Context that can be used for processing and rendering as well as passed to rendering stages.
     */
    get context() {
        this.assertInitialized();
        return this._context;
    }
    get canvasSize() {
        this.assertInitialized();
        return this._canvasSize;
    }
    /**
     * Whether or not any of the (relevant/monitored) rendering properties has been altered. This concept should be used
     * by other classes (e.g., camera, rendering stages) for detecting modifications relevant for rendering output.
     */
    get altered() {
        return this._altered.any;
    }
    /**
     * Actual swap call specified by inheritor. After (1) update, (2) preparation, and (3) frame are invoked, a swap
     * might be invoked. In case of experimental batch rendering when using multi-frame a swap might be withhold for
     * multiple frames. Any implementation is expected to ensure that contents of a frame to be on the OpenGL
     * back buffer. The swap of front buffer and back buffer is scheduled after the invocation of this function by
     * the browser.
     */
    onSwap() { }
    /**
     * This method needs to be called by a renderer, when a loading process is started in order to notify listeners via
     * the observable loadingState$.
     */
    startLoading() {
        this._isLoading = true;
        this._loadingStatusSubscription.next(LoadingStatus.Started);
    }
    /**
     * This method needs to be called when a loading process is finished in order to notify listeners via
     * the observable loadingState$.
     */
    finishLoading() {
        this._isLoading = false;
        this._loadingStatusSubscription.next(LoadingStatus.Finished);
    }
    /**
     * When extending (specializing) this class, initialize should initialize all required stages and allocate assets
     * that are shared between multiple stages. Note that `super.initialize()` should always be called first when
     * 'overriding' this function.
     *
     * Note: the context handle is stored in a property, but should be passed to the stages by specializing
     * renderer instead. The renderer itself should not allocate rendering resources directly, thus, it should not
     * require a webgl context.
     *
     * @param context - Wrapped gl context for function resolution (passed to all stages).
     * @param callback - Functions that is invoked when the renderer (or any stage) is invalidated.
     * @param eventProvider - Provider for mouse events referring to the canvas element.
     */
    @initializable_1.Initializable.initialize()
    initialize(context, callback, eventProvider) {
        (0, auxiliaries_1.assert)(context !== undefined, `valid webgl context required`);
        this._context = context;
        (0, auxiliaries_1.assert)(callback !== undefined, `valid multi-frame update callback required`);
        this._invalidate = callback;
        this._isLoading = true;
        this._loadingStatusSubscription = new rxjs_1.ReplaySubject();
        return this.onInitialize(context, callback, eventProvider);
    }
    /**
     * Should release all assets and uninitialize all stages. `super.uninitialize()` should always be called first when
     * overriding this function.
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this.onUninitialize();
    }
    /**
     * Should discard all assets and uninitialize all stages. `super.discarded()` should always be called first when
     * overriding this function.
     */
    @initializable_1.Initializable.discard()
    discard() {
        this.onDiscarded();
    }
    /**
     *
     */
    @initializable_1.Initializable.assert_initialized()
    update(multiFrameNumber) {
        if (this._canvasSize[0] !== this._context.gl.canvas.width ||
            this._canvasSize[1] !== this._context.gl.canvas.height) {
            this._canvasSize[0] = this._context.gl.canvas.width;
            this._canvasSize[1] = this._context.gl.canvas.height;
            this._altered.alter('canvasSize');
        }
        if (this._multiFrameNumber !== multiFrameNumber) {
            this._multiFrameNumber = multiFrameNumber;
            this._altered.alter('multiFrameNumber');
        }
        return this.onUpdate() || this._altered.any;
    }
    /**
     * Prepares the rendering of the next frame (or subsequent frames when multi-frame rendering).
     * This is part of the controllable interface. The renderer should reconfigure as lazy as possible.
     * @param multiFrameNumber - The multi-frame number as requested by controller.
     */
    @initializable_1.Initializable.assert_initialized()
    prepare() {
        this.onPrepare();
    }
    /**
     * Controllable interface intended to trigger rendering of a full pass of the renderer that results in either an
     * intermediate frame for accumulation to a full multi-frame or full frame for itself. The inheritor should invoke
     * frames of relevant rendering and processing stages.
     * @param frameNumber - The current frame number forwarded to onFrame.
     */
    @initializable_1.Initializable.assert_initialized()
    frame(frameNumber) {
        this.onFrame(frameNumber);
    }
    /**
     * Interface intended to trigger swap (by controller).
     */
    @initializable_1.Initializable.assert_initialized()
    swap() {
        this.onSwap();
    }
    /**
     * Transforms local viewport coordinates into local intermediate frame coordinates.
     * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
     * @param y - Vertical coordinate for the upper left corner of the viewport origin.
     */
    frameCoords(x, y) {
        const position = gl_matrix_1.vec2.divide((0, gl_matrix_extensions_1.v2)(), this._frameSize, this.canvasSize);
        gl_matrix_1.vec2.floor(position, gl_matrix_1.vec2.multiply(position, [x + 0.5, y + 0.5], position));
        gl_matrix_1.vec2.add(position, position, [0.5, 0.5]);
        return (0, tuples_1.tuple2)(position);
    }
    // /**
    //  * @interface CoordsAccess
    //  * Look up a fragments coordinates by unprojecting the depth using the renderer's camera.
    //  * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
    //  * @param y - Vertical coordinate for the upper left corner of the viewport origin.
    //  * @param zInNDC - optional depth parameter (e.g., from previous query).
    //  * @returns - 3D coordinate reprojected from NDC/depth to world space.
    //  */
    // abstract coordsAt(x: GLint, y: GLint, zInNDC?: number, viewProjectionInverse?: mat4): vec3 | undefined;
    // /**
    //  * @interface IDAccess
    //  * Look up an object id at a specific fragment.
    //  * @param x - Horizontal coordinate for the upper left corner of the viewport origin.
    //  * @param y - Vertical coordinate for the upper left corner of the viewport origin.
    //  * @returns - ID encoded of an object rendered/visible at given position.
    //  */
    // abstract idAt(x: GLint, y: GLint): GLsizei | undefined;
    /**
     * Changes the frame size for rendering. This setter should only be used by the canvas this renderer is bound to.
     * Changing the frame size invalidates the renderer.
     *
     * Note: the frame size is detached from the canvas size. When blitting the frame into the canvas, the frame is
     * rescaled to fill or fit the canvas size.
     *
     * @param size - Resolution of the framebuffer.
     */
    set frameSize(size) {
        this.assertInitialized();
        if (gl_matrix_1.vec2.equals(this._frameSize, size)) {
            return;
        }
        Object.assign(this._frameSize, size);
        this._altered.alter('frameSize');
        this.invalidate();
    }
    /**
     * Set the frame precision.
     * @param format - The accumulation format. Expected values are one of 'byte', 'half', 'float', or 'auto'
     */
    set framePrecision(precision) {
        this.assertInitialized();
        if (this._framePrecision === precision) {
            return;
        }
        this._framePrecision = precision;
        this._altered.alter('framePrecision');
        this.invalidate();
    }
    /**
     * Sets the color used for clearing the background. This setter should only be used by the canvas this renderer is
     * bound to. Changing the frame size invalidates the renderer.
     * @param color - Red, green, blue, and alpha color components.
     */
    set clearColor(color) {
        this.assertInitialized();
        if (gl_matrix_1.vec4.equals(this._clearColor, color)) {
            return;
        }
        Object.assign(this._clearColor, color);
        this._altered.alter('clearColor');
        this.invalidate();
    }
    /**
     * Read only access to the renderers registered render textures that can be blit to the back buffer for debugging.
     * @returns - Array of render texture identifiers.
     */
    get debugTextures() {
        this.assertInitialized();
        return this._debugTextures;
    }
    /**
     * The render texture index for debug output. This is -1 when debug output is disabled. This should be used in
     * the renderers swap implementation.
     */
    get debugTexture() {
        this.assertInitialized();
        return this._debugTexture;
    }
    /**
     * Enables to specify the index of a render texture to be blit to the back buffer for debugging. This invalidates
     * but should result in a blit only if nothing else changed. When the requested debug texture was blit (and
     * debugTexture was actually altered) `this.debugTextureNext()` should be called to inform observers.
     * @param index - Render texture index based on debuggableTextures array. This should be in [-1, length of array].
     */
    set debugTexture(index) {
        this.assertInitialized();
        if (this._debugTexture === index) {
            return;
        }
        (0, auxiliaries_1.logIf)(index >= this._debugTextures.length, auxiliaries_1.LogLevel.Error, `invalid texture index, ` +
            `debug texture disabled (index set to -1) | ${index} not in [-1,+${this._debugTextures.length - 1}]`);
        this._debugTexture = index < this._debugTextures.length ?
            (0, gl_matrix_extensions_1.clamp)(index, -1, this._debugTextures.length - 1) : -1;
        this._altered.alter('debugTexture');
        this.invalidate();
    }
    /**
     * Observable that can be used to subscribe to debug texture changes.
     */
    get debugTexture$() {
        return this._debugTextureSubject.asObservable();
    }
    /**
     * This property indicated whether a loading process is currently in progress.
     * It can be changed by calling `startLoading` or `finishLoading` on this renderer.
     */
    get isLoading() {
        return this._isLoading;
    }
    /**
     * Observable to subscribe to the current loading state of this renderer.
     * Use `aRenderer.loadingStatus$.subscribe()` to register a new subscriber.
     */
    get loadingStatus$() {
        return this._loadingStatusSubscription.asObservable();
    }
}
exports.Renderer = Renderer;
//# sourceMappingURL=renderer.js.map