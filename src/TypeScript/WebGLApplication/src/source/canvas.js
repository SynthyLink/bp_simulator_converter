"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const rxjs_1 = require("rxjs");
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
const color_1 = require("./color");
const context_1 = require("./context");
const controller_1 = require("./controller");
const eyegazedatastream_1 = require("./eyegazedatastream");
const eyegazeeventprovider_1 = require("./eyegazeeventprovider");
const mouseeventprovider_1 = require("./mouseeventprovider");
const pointereventprovider_1 = require("./pointereventprovider");
const renderer_1 = require("./renderer");
const resizable_1 = require("./resizable");
const toucheventprovider_1 = require("./toucheventprovider");
const keyboardeventprovider_1 = require("./keyboardeventprovider");
const wizard_1 = require("./wizard");
/* spellchecker: enable */
/**
 * A canvas is associated to a single canvas element (DOM) and integrates or delegates event handling as well as
 * control over the rendering loop and the attached renderer respectively. Furthermore, the canvas can bind a single
 * renderer (non owning) and sets up communication between controller, renderer, and navigation. The controller invokes
 * the renderer's update, frame, and swap methods. The navigation manipulates the renderer's camera. The renderer can
 * invalidate itself which causes a controller update.
 *
 * Note: Since only the multi-frame number is used by the renderer and the controller, the canvas provides getter,
 * setter, and change callback setter. Debug-frame and frame number are managed exclusively by the controller.
 *
 * Note: the canvas should hold any properties that are required to be passed onto a newly bound renderer (in the case
 * multiple renderer are used with a canvas). The clear color is one example of such a property.
 */
class Canvas extends resizable_1.Resizable {
    /**
     * Default color that is used if none is set via data attributes.
     */
    static DEFAULT_CLEAR_COLOR = new color_1.Color([0.203, 0.227, 0.250, 1.0]);
    /**
     * Default frame precision, e.g., accumulation format when multi-frame rendering is used.
     */
    static DEFAULT_FRAME_PRECISION = wizard_1.Wizard.Precision.auto;
    /**
     * Default multi-frame number used if none is set via data attributes.
     */
    static DEFAULT_MULTI_FRAME_NUMBER = 0;
    /** @see {@link context} */
    _context;
    /** @see {@link controller} */
    _controller;
    /** @see {@link renderer} */
    _renderer;
    /** @see {@link clearColor} */
    _clearColor;
    /**
     * @see {@link framePrecision}
     * This property can be observed, e.g., `aCanvas.framePrecisionObservable.subscribe()`.
     */
    _framePrecision;
    _framePrecisionSubject = new rxjs_1.ReplaySubject(1);
    /**
     * @see {@link size}
     * This property can be observed, e.g., `aCanvas.sizeObservable.subscribe()`.
     * Zero-initialization prevents drawing on an invalid canvas size, i.e., a canvas size [1, 1] is technically valid
     * for rendering, which might lead to rendering on an [1, 1] canvas before the first 'real' size is set (e.g., via
     * resize event), resulting in visually unpleasant initial frames in some (slow) applications.
     */
    _size = [0, 0];
    _sizeSubject = new rxjs_1.ReplaySubject(1);
    /**
     * @see {@link frameScale}
     * This property can be observed, `aCanvas.frameScaleObservable.subscribe()`.
     */
    _frameScale;
    _frameScaleSubject = new rxjs_1.ReplaySubject(1);
    /**
     * @see {@link frameSize}
     * This property can be observed, `aCanvas.frameSizeObservable.subscribe()`.
     */
    _frameSize;
    _frameSizeSubject = new rxjs_1.ReplaySubject(1);
    /**
     * Flag used to determine whether frame size or frame scale is the dominant configuration.
     */
    _favorSizeOverScale;
    /** @see {@link element} */
    _element;
    /** @see {@link mouseEventProvider} */
    _mouseEventProvider;
    /** @see {@link touchEventProvider} */
    _touchEventProvider;
    /** @see {@link pointerEventProvider} */
    _pointerEventProvider;
    /** @see {@link eyeGazeEventProvider} */
    _eyeGazeEventProvider;
    /** @see {@link keyboardEventProvider} */
    _keyboardEventProvider;
    _lostContextExtension;
    /**
     * Create and initialize a multi-frame controller, setup a default multi-frame number and get the canvas's webgl
     * context as well as the canvas resolution. The context and resolution will be passed on to the set renderer and
     * its stages/passes appropriately. The canvas does not provide lazy initialization and is strictly bound to a
     * single canvas element (DOM) that cannot be changed.
     *
     * Note: the multi-frame number can be set using a data attribute in the canvas element called
     * 'data-multi-frame-number'.
     *
     * The canvas supports the following data attributes:
     * - data-multi-frame-number {number} - integer greater than 0
     * - data-clear-color {Color} - rgba color for clearing
     * - data-frame-scale {GLclampf2} - width and height frame scale in [0.0,1.0]
     * - data-frame-size {GLizei2} - width and height frame size in pixel
     * - data-frame-precision {RenderPrecision} - precision for, e.g., frame accumulation
     * , either 'float', 'half', 'byte', or 'auto'.
     *
     * Note: data-frame-size takes precedence if both frame-scale and frame-size data attributes are provided.
     * @param element - Canvas element or element id {string} to be used for querying the canvas element.
     * @param attributes - Overrides the internal default attributes @see{Context.DEFAULT_ATTRIBUTES}.
     */
    constructor(element, attributes) {
        super(); // setup resize event handling
        this._element = element instanceof HTMLCanvasElement ? element :
            document.getElementById(element);
        this._element.addEventListener('webglcontextcreationerror', (e) => {
            console.log(e.statusMessage || 'Unknown error');
        }, false);
        /* Register element for style mutation changes to invoke resize events. */
        this.observe(this._element);
        this._mouseEventProvider = new mouseeventprovider_1.MouseEventProvider(this._element, 200);
        this._touchEventProvider = new toucheventprovider_1.TouchEventProvider(this._element, 200);
        this._pointerEventProvider = new pointereventprovider_1.PointerEventProvider(this._element, 200);
        this._keyboardEventProvider = new keyboardeventprovider_1.KeyboardEventProvider(this._element, 200);
        /**
         * Disable default handling of touch events by the browser.
         * Touch events are handled using PointerEventProvider.
         */
        this._element.style.touchAction = 'none';
        const dataset = this._element.dataset;
        /* Requesting a context asserts when no context could be created. */
        this._context = context_1.Context.request(this._element, attributes);
        this.configureController(dataset);
        this.configureSizeAndScale(dataset);
        this.configureContextLostAndRestore();
        this.configureContextLostAndRestoreEmulation();
        /* Retrieve clear color from data attributes or set default. */
        let dataClearColor;
        if (dataset.clearColor) {
            dataClearColor = (0, gl_matrix_extensions_1.parseVec4)(dataset.clearColor);
            (0, auxiliaries_1.logIf)(dataClearColor === undefined, auxiliaries_1.LogLevel.Warning, `data-clear-color could not be parsed, given '${dataset.clearColor}'`);
        }
        this._clearColor = dataClearColor ?
            new color_1.Color((0, tuples_1.tuple4)(dataClearColor)) : Canvas.DEFAULT_CLEAR_COLOR;
        /* Retrieve frame precision (e.g., accumulation format) from data attributes or set default */
        let dataFramePrecision = dataset.accumulationFormat ?
            dataset.accumulationFormat : Canvas.DEFAULT_FRAME_PRECISION;
        if (!(dataFramePrecision in wizard_1.Wizard.Precision)) {
            dataFramePrecision = Canvas.DEFAULT_FRAME_PRECISION;
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `unknown frame precision '${dataset.accumulationFormat}' changed to '${dataFramePrecision}'`);
        }
        this._framePrecision = dataFramePrecision;
        this.framePrecisionNext();
    }
    /**
     * Creates and initializes a new controller that is used for this canvas. If provided via data attributes
     * multi-frame number and debug-frame number are set.
     * @param dataset - The attributes data-multi-frame-number and data-debug-frame-number are supported.
     */
    configureController(dataset) {
        /* Create and setup a multi-frame controller. */
        this._controller = new controller_1.Controller();
        this._controller.block(); // Remain in block mode until renderer is bound and configured.
        /* Retrieve multi-frame number from data attributes or set default. */
        let dataMFNum;
        if (dataset.multiFrameNumber) {
            dataMFNum = parseInt(dataset.multiFrameNumber, 10);
            (0, auxiliaries_1.logIf)(isNaN(dataMFNum), auxiliaries_1.LogLevel.Warning, `data-multi-frame-number could not be parsed, given '${dataset.multiFrameNumber}'`);
        }
        /* Retrieve debug-frame number from data attributes or set default. */
        let dataDFNum;
        if (dataset.debugFrameNumber) {
            dataDFNum = parseInt(dataset.debugFrameNumber, 10);
            (0, auxiliaries_1.logIf)(isNaN(dataDFNum), auxiliaries_1.LogLevel.Warning, `data-debug-frame-number could not be parsed, given '${dataset.debugFrameNumber}'`);
        }
        this._controller.multiFrameNumber = dataMFNum ? dataMFNum : Canvas.DEFAULT_MULTI_FRAME_NUMBER;
        this._controller.debugFrameNumber = dataDFNum ? dataDFNum : 0;
        const mfNumChanged = dataMFNum ? dataMFNum !== this._controller.multiFrameNumber : false;
        (0, auxiliaries_1.logIf)(mfNumChanged, auxiliaries_1.LogLevel.Warning, `data-multi-frame-number changed to `
            + `${this._controller.multiFrameNumber}, given '${dataset.multiFrameNumber}'`);
        const dfNumChanged = dataDFNum ? dataDFNum !== this._controller.debugFrameNumber : false;
        (0, auxiliaries_1.logIf)(dfNumChanged, auxiliaries_1.LogLevel.Warning, `data-debug-frame-number changed to `
            + `${this._controller.debugFrameNumber}, given '${dataset.debugFrameNumber}'`);
    }
    /**
     * Initializes the frame size and scale. By default, the scale is 1.0 for width and height and the size reflects
     * the native canvas size.
     * @param dataset - The attributes data-frame-size and data-frame-scale are supported.
     */
    configureSizeAndScale(dataset) {
        /* Setup frame scale with respect to the canvas size. */
        let dataFrameScale;
        if (dataset.frameScale) {
            dataFrameScale = (0, gl_matrix_extensions_1.parseVec2)(dataset.frameScale);
            (0, auxiliaries_1.logIf)(dataset.frameScale !== undefined && dataFrameScale === undefined, auxiliaries_1.LogLevel.Warning, `data-frame-scale could not be parsed, given '${dataset.frameScale}'`);
        }
        this._frameScale = dataFrameScale ? (0, tuples_1.tuple2)(dataFrameScale) : [1.0, 1.0];
        /* Setup frame size. */
        let dataFrameSize;
        if (dataset.frameSize) {
            dataFrameSize = (0, gl_matrix_extensions_1.parseVec2)(dataset.frameSize);
            (0, auxiliaries_1.logIf)(dataset.frameSize !== undefined && dataFrameSize === undefined, auxiliaries_1.LogLevel.Warning, `data-frame-size could not be parsed, given '${dataset.frameSize}'`);
        }
        this._favorSizeOverScale = dataFrameSize !== undefined;
        this._frameSize = dataFrameSize ? (0, tuples_1.tuple2)(dataFrameSize) : [this._size[0], this._size[1]];
        this.onResize(); // invokes frameScaleNext and frameSizeNext
    }
    /**
     * Register 'webglcontextlost' and 'webglcontextrestored' to handle lost and restoration
     * of WebGL contexts.
     */
    configureContextLostAndRestore() {
        this._element.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            this.onContextLost();
        }, false);
        this._element.addEventListener('webglcontextrestored', () => {
            this.onContextRestore();
        }, false);
    }
    /**
     * Obtain the WEBGL_lose_context extension, store it with this canvas instance and use it
     * for emulation of the context lost and restore feature.
     */
    configureContextLostAndRestoreEmulation() {
        this._lostContextExtension = this._context.gl.getExtension('WEBGL_lose_context');
    }
    /**
     * Handle a WebGL context lost event.
     * This is for both natural and emulated lost contexts.
     */
    onContextLost() {
        (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, 'WebGL Context lost. Discarding renderer...');
        this._controller.cancel();
        this._controller.block();
        if (this._renderer) {
            this._renderer.discard();
        }
    }
    /**
     * Handle a WebGL context restore event.
     * This is for both natural and emulated restored contexts.
     */
    onContextRestore() {
        (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, 'WebGL Context restored. Reinitializing renderer...');
        const renderer = this._renderer;
        this.unbind();
        this.bind(renderer);
        this._controller.unblock();
        /*
        *  Dirtiest force of redraw that is required for Firefox.
        *  More subtle redraw strategies seems to not be working for my Firefox 75.0
        *  This results in blank flashes for one frame, but on other browsers this is
        *  the behavior without redraw any way so we can perform this code on any system.
        *
        *  TODO: need to check for mobile, though.
        */
        const formerVisibility = this._element.style.visibility;
        this._element.style.visibility = 'hidden';
        // tslint:disable-next-line:no-unused-expression
        this._element.offsetHeight;
        this._element.style.visibility = formerVisibility;
        /* */
    }
    /**
     * Convenience function that triggers the canvas size retrieval. The native width and height of the canvas dom
     * element is cached (in pixel).
     */
    retrieveSize() {
        const size = resizable_1.Resizable.elementSize(this._element);
        if (size === undefined) {
            this._size = [0, 0];
            return;
        }
        this._size = [size[0], size[1]];
        this.sizeNext();
    }
    /**
     * Resize is invoked by the resizable mixin. It retrieves the canvas size and promotes it to the renderer.
     */
    onResize() {
        this.retrieveSize();
        /* If the canvas does not have a size, block rendering. This can happen if the canvas is, e.g., hidden and
        DOM layouting leads to width of zero. */
        if (this._size[0] === 0 || this._size[1] === 0) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Debug, `canvas width or height is invalid, resize discarded and controller blocked`);
            this._controller.block();
            return;
        }
        /**
         * Set canvas rendering size to pixel size of the canvas. This assures a 1 to 1 mapping of native pixels to
         * fragments and thus should prevent upscaling.
         */
        this._element.width = this._size[0];
        this._element.height = this._size[1];
        if (this._renderer) {
            this._controller.block();
        }
        if (this._favorSizeOverScale) {
            this.frameSize = this._frameSize;
        }
        else {
            this.frameScale = this._frameScale;
        }
        if (this._renderer) {
            this._controller.unblock();
            /* Swapping here fixes flickering while resizing the canvas for safari. */
            this._renderer.swap();
        }
    }
    /**
     * Utility for communicating this._framePrecision changes to its associated subject.
     */
    framePrecisionNext() {
        this._framePrecisionSubject.next(this._framePrecision);
    }
    /**
     * Utility for communicating this._size changes to its associated subject.
     */
    sizeNext() {
        this._sizeSubject.next(this._size);
    }
    /**
     * Utility for communicating this._frameScale changes to its associated subject.
     */
    frameScaleNext() {
        this._frameScaleSubject.next(this._frameScale);
    }
    /**
     * Utility for communicating this._frameSize changes to its associated subject.
     */
    frameSizeNext() {
        this._frameSizeSubject.next(this._frameSize);
    }
    /**
     * The renderer (if not undefined) will be connected to the controller and navigation. The controller will
     * immediately trigger a multi-frame, thereby causing the renderer to render frames.
     *
     * Note that no renderer should be bound to multiple canvases
     * simultaneously. The reference is non owning.
     *
     * @param renderer - Either undefined or an uninitialized renderer.
     */
    bind(renderer) {
        if (this._renderer === renderer) {
            return;
        }
        this.unbind(); // block controller
        if (renderer === undefined) {
            return;
        }
        (0, auxiliaries_1.assert)(this._controller.blocked, `expected controller to be blocked`);
        this._renderer = renderer;
        /**
         * Note: a renderer that is to be bound to a canvas is expected to be not initialized. For it, initializable
         * throws on re-initialization. Similarly to the frame callback for the controller, the controller's update
         * method is assigned to the pipelines invalidation event.
         */
        this._renderer.initialize(this.context, (force) => this._controller.update(force), {
            pointerEventProvider: this._pointerEventProvider,
            mouseEventProvider: this._mouseEventProvider,
            eyeGazeEventProvider: this._eyeGazeEventProvider,
            keyboardEventProvider: this._keyboardEventProvider,
        });
        this._renderer.frameSize = this._frameSize;
        this._renderer.clearColor = this._clearColor.rgba;
        this._renderer.framePrecision = this._framePrecision;
        this._renderer.debugTexture = -1;
        /**
         * Note: again, no asserts required since controller and renderer already take care of that.
         * Assign the renderer's update, frame, and swap method to the controller's frame and swap event callback.
         * The assignments trigger immediate update and subsequently updates on invalidation.
         */
        this._controller.controllable = this._renderer;
        this._controller.unblock();
    }
    /**
     * Unbinds the current renderer from the canvas as well as the controller and navigation, and uninitializes the
     * renderer.
     */
    unbind() {
        if (this._renderer === undefined) {
            return;
        }
        this._controller.block();
        /**
         * Since canvas is not the owner of the renderer it should not dispose it. However, the canvas manages the
         * initialization of bound pipelines.
         */
        this._controller.controllable = undefined;
        this._renderer = undefined;
    }
    /**
     * Uninitializes and deletes the controller as well as all other properties.
     */
    dispose() {
        super.dispose();
        if (this._renderer) {
            this._renderer.uninitialize();
            this.unbind();
        }
    }
    /**
     * Allows for explicit trigger of onResize, e.g., in case resize event-handling is managed explicitly ...
     */
    resize() {
        this.onResize();
    }
    /**
     * Single controller that is managing the rendering control flow of a bound renderer.
     * @returns - The controller used by the canvas.
     */
    get controller() {
        return this._controller;
    }
    /**
     * The currently bound renderer. If no renderer is bound, undefined is returned. If a renderer is bound, it should
     * always be initialized (renderer initialization handled by the canvas).
     * @returns - The currently bound renderer.
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * Binds a renderer to the canvas. A previously bound renderer will be unbound (see bind and unbind).
     * @param renderer - A renderer object or undefined.
     */
    set renderer(renderer) {
        this.bind(renderer);
    }
    /**
     * Targeted scale for rendering with respect to the canvas size. This property can be observed, e.g.,
     * `canvas.frameScaleObservable.subscribe()`.
     * @returns - The frame scale in [0.0, 1.0].
     */
    get frameScale() {
        return this._frameScale;
    }
    /**
     * Set the targeted scale for rendering with respect to the canvas size. The scale will be clamped to [0.0,1.0]. A
     * scale of 0.0 results in 1px frame resolution for the respective component.
     * The frame scale allows to detach the rendering resolution from the native canvas resolution, e.g., in order to
     * decrease rendering cost. The frame resolution can also be specified explicitly by width and height. Non-finite
     * values will be ignored.
     * @param frameScale - Scale of rendering.
     * @returns - The frame scale in [0.0,1.0].
     */
    set frameScale(frameScale) {
        if (!isFinite(frameScale[0]) || !isFinite(frameScale[1])) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `expected finite frame size, non-finite values ignored, given [${frameScale}]`);
            return;
        }
        /* Always apply frame scale, e.g., when canvas is resized scale remains same, but frame size will change. */
        (0, auxiliaries_1.logIf)(frameScale[0] < 0.0 || frameScale[0] > 8.0, auxiliaries_1.LogLevel.Info, `frame width scale clamped to [0.0,2.0], given ${frameScale[0]}`);
        (0, auxiliaries_1.logIf)(frameScale[1] < 0.0 || frameScale[1] > 8.0, auxiliaries_1.LogLevel.Info, `frame height scale clamped to [0.0,2.0], given ${frameScale[0]}`);
        const scale = gl_matrix_1.vec2.create();
        (0, gl_matrix_extensions_1.clamp2)(scale, frameScale, [0.0, 0.0], [8.0, 8.0]);
        const size = gl_matrix_1.vec2.create();
        gl_matrix_1.vec2.mul(size, this._size, scale);
        gl_matrix_1.vec2.max(size, [1, 1], size);
        gl_matrix_1.vec2.round(size, size);
        /* Adjust scale based on rounded (integer) frame size. */
        gl_matrix_1.vec2.div(scale, size, this._size);
        (0, auxiliaries_1.logIf)(!gl_matrix_1.vec2.exactEquals(scale, frameScale), 2, `frame scale was adjusted to ${scale.toString()}, given ${frameScale.toString()}`);
        this._frameScale = (0, tuples_1.tuple2)(scale);
        this._frameSize = (0, tuples_1.tuple2)(size);
        this._favorSizeOverScale = false;
        this.frameScaleNext();
        this.frameSizeNext();
        if (this._renderer) {
            this._renderer.frameSize = this._frameSize;
        }
    }
    /**
     * Observable that can be used to subscribe to frame scale changes.
     */
    get frameScale$() {
        return this._frameScaleSubject.asObservable();
    }
    /**
     * Targeted resolution (width and height) for rendering in pixel. This property can be observed, e.g.,
     * `canvas.frameSizeObservable.subscribe()`.
     * @returns - The frame size in pixel (must not be physical/native pixels).
     */
    get frameSize() {
        return this._frameSize;
    }
    /**
     * Set the targeted size for rendering in pixels. The size will be clamped to [1, canvas-size]. The frame size
     * allows to detach the rendering resolution from the native canvas resolution, e.g., in order to decrease
     * rendering cost. Non-finite values will be ignored.
     * The render resolution can also be specified implicitly by width and height in scale (@see frameScale).
     * @param frameSize - Size for rendering in pixel (must not be physical/native pixels).
     * @returns - The frame size in [1, canvas-size].
     */
    set frameSize(frameSize) {
        if (!isFinite(frameSize[0]) || !isFinite(frameSize[1])) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `expected finite frame size, non-finite values ignored, given [${frameSize}]`);
            return;
        }
        (0, auxiliaries_1.logIf)(frameSize[0] < 1 || frameSize[0] > 8 * this._size[0], auxiliaries_1.LogLevel.Info, `frame width scale clamped to [1,${this._size[0]}], given ${frameSize[0]}`);
        (0, auxiliaries_1.logIf)(frameSize[1] < 1 || frameSize[1] > 8 * this._size[1], auxiliaries_1.LogLevel.Info, `frame height scale clamped to [1, ${this._size[1]}], given ${frameSize[1]}`);
        const size = gl_matrix_1.vec2.create();
        (0, gl_matrix_extensions_1.clamp2)(size, frameSize, [1.0, 1.0], [8 * this._size[0], 8 * this._size[1]]);
        gl_matrix_1.vec2.round(size, size);
        (0, auxiliaries_1.logIf)(!gl_matrix_1.vec2.exactEquals(size, frameSize), auxiliaries_1.LogLevel.Warning, `frame size was adjusted to ${size.toString()}, given ${frameSize.toString()}`);
        const scale = gl_matrix_1.vec2.create();
        gl_matrix_1.vec2.div(scale, size, this._size);
        this._frameScale = (0, tuples_1.tuple2)(scale);
        this._frameSize = (0, tuples_1.tuple2)(size);
        /* Switch back to default mode (scale based) when frame size matches canvas size. */
        this._favorSizeOverScale = !gl_matrix_1.vec2.exactEquals(this._frameSize, this._size);
        this.frameScaleNext();
        this.frameSizeNext();
        if (this._renderer) {
            this._renderer.frameSize = this._frameSize;
        }
    }
    /**
     * Observable that can be used to subscribe to frame size changes.
     */
    get frameSize$() {
        return this._frameSizeSubject.asObservable();
    }
    /**
     * Getter for the canvas's clear color. The clear color is provided to the renderer (on bind). Since this is a
     * canvas specific setting it is stored here, not in a renderer or controller.
     * @returns - Color object passed to any renderer bound to this canvas.
     */
    get clearColor() {
        return this._clearColor;
    }
    /**
     * Sets the clear color that is then passed to the currently bound renderer as well as to any pipelines bound in
     * the future. The provided color will be clamped to [0.0;1.0] for every component.
     * @param clearColor - Color object that will be referenced.
     */
    set clearColor(clearColor) {
        this._clearColor = clearColor;
        if (this._renderer) {
            this._renderer.clearColor = this._clearColor.rgba;
        }
    }
    /**
     * Getter for the targeted frame precision. This property can be observed, e.g.,
     * `canvas.framePrecisionObservable.subscribe()`.
     * @returns - Accumulation format as string passed to any renderer bound.
     */
    get framePrecision() {
        return this._framePrecision;
    }
    /**
     * Sets the targeted frame precision that is then passed to the currently bound renderer as well as to any renderers
     * bound in the future. This might be used for frame accumulation in multi-frame based rendering.
     * @param precision - Frame precision, 'float', 'half', 'byte' or 'auto' are supported.
     */
    set framePrecision(precision) {
        this._framePrecision = precision;
        if (this._renderer) {
            this._renderer.framePrecision = this._framePrecision;
            this._framePrecision = this._renderer.framePrecision; // might change due to missing support
        }
        this.framePrecisionNext();
    }
    /**
     * Observable that can be used to subscribe to frame precision changes.
     */
    get framePrecision$() {
        return this._framePrecisionSubject.asObservable();
    }
    /**
     * Provides access to the WebGL context (leaky abstraction).
     */
    get context() {
        return this._context;
    }
    /**
     * Getter for the created rendering backend (webgl context type).
     * @returns - Backend that was created on construction, either 'webgl' or 'webgl2' based on which one was created
     * successfully. If no context could be created undefined is returned.
     */
    get backend() {
        return this._context.backendString;
    }
    /**
     * Size of the canvas measured in physical/native screen pixels. This is the 'managed' canvas width and height. The
     * unmanaged canvas width and height are available via context.gl.canvas.width and context.gl.canvas.height (which
     * should always be the same).
     * This property can be observed, e.g., `allocationRegister.bytesObservable.subscribe()`.
     * @returns - The canvas width and height in physical/native screen pixels as 2-tuple.
     */
    get size() {
        return this._size;
    }
    /**
     * Observable that can be used to subscribe to canvas size changes.
     */
    get size$() {
        return this._sizeSubject.asObservable();
    }
    /**
     * Width of the canvas measured in physical/native screen pixels. This is the 'managed' canvas width. The
     * unmanaged canvas width is available via context.gl.canvas_width (which should always be the same).
     * @returns - The canvas width in physical/native screen pixels.
     */
    get width() {
        return this._size[0];
    }
    /**
     * Height of the canvas measured in physical/native screen pixels. This is the 'managed' canvas height. The
     * unmanaged canvas height is available via context.gl.canvas_height (which should always be the same).
     * @returns - The canvas height in physical/native screen pixels.
     */
    get height() {
        return this._size[1];
    }
    /**
     * Canvas element within the HTML5 document.
     */
    get element() {
        return this._element;
    }
    /**
     * Canvas mouse event provider referring to the canvas element.
     */
    get mouseEventProvider() {
        return this._mouseEventProvider;
    }
    /**
     * Canvas touch event provider referring to the canvas element.
     */
    get touchEventProvider() {
        return this._touchEventProvider;
    }
    get keyboardEventProvider() {
        return this._keyboardEventProvider;
    }
    /**
     * Emulate a WebGL context loss.
     * This functionality requires to have configureContextLostAndRestoreEmulation() called before.
     * This function is usually called within the constructor of this canvas.
     */
    testLoseContext() {
        if (this._lostContextExtension === undefined) {
            return;
        }
        this._lostContextExtension.loseContext();
    }
    /**
     * Emulate a WebGL context restore.
     * This functionality requires to have configureContextLostAndRestoreEmulation() called before.
     * This function is usually called within the constructor of this canvas.
     */
    testRestoreContext() {
        if (this._lostContextExtension === undefined) {
            return;
        }
        this._lostContextExtension.restoreContext();
    }
    /**
     * Eye gaze event provider referring to the canvas element.
     */
    get eyeGazeEventProvider() {
        return this._eyeGazeEventProvider;
    }
    /**
     * Activates the eye gaze event provider referring to the canvas element.
     */
    activateEyeGazeEventProvider(eyeGazeDataStreams, serverAddress) {
        this._eyeGazeEventProvider = new eyegazeeventprovider_1.EyeGazeEventProvider(eyeGazeDataStreams, serverAddress);
    }
}
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.js.map