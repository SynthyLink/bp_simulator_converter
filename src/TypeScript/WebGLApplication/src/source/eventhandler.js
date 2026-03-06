"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const gl_matrix_1 = require("gl-matrix");
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
const eyegazeevent_1 = require("./eyegazeevent");
const eyegazeeventprovider_1 = require("./eyegazeeventprovider");
const mouseeventprovider_1 = require("./mouseeventprovider");
const pointereventprovider_1 = require("./pointereventprovider");
const renderer_1 = require("./renderer");
const toucheventprovider_1 = require("./toucheventprovider");
const keyboardeventprovider_1 = require("./keyboardeventprovider");
/**
 * ... Provider and event handler are explicitly separated in order to reduce the number of observables (reuse of event
 * provider for multiple handler).
 */
class EventHandler {
    /**
     * The event handler's invalidation callback. This should usually be setup by the owning renderer and invoke the
     * same callback the renderer has been given by the canvas. This invalidation is required, when continuous
     * rendering is not present, events might cause need for new rendering requests.
     */
    _invalidate;
    _subscriptions = new Array();
    /**
     * Assigned key event provider. This is usually created and owned by the canvas.
     */
    // protected _keyEventProvider: KeyEventProvider | undefined;
    /**
     * Assigned mouse event provider. This is usually created and owned by the canvas.
     */
    _mouseEventProvider;
    /**
     * Assigned touch event provider. This is usually created and owned by the canvas.
     */
    _touchEventProvider;
    /**
     * Assigned pointer event provider. This is usually created and owned by the canvas.
     */
    _pointerEventProvider;
    /**
     * Assigned eye gaze event provider. This is usually created and owned by the eye gaze data stream.
     */
    _eyeGazeEventProvider;
    /**
     * Assigned keyboard event provider. This is usually created and owned by the canvas.
     */
    _keyboardEventProvider;
    _latestMouseEventsByType = new Map();
    _previousMouseEventsByType = new Map();
    _mouseEventHandlerByType = new Map();
    _latestTouchEventsByType = new Map();
    _previousTouchEventsByType = new Map();
    _touchEventHandlerByType = new Map();
    _latestPointerEventsByType = new Map();
    _previousPointerEventsByType = new Map();
    _pointerEventHandlerByType = new Map();
    _latestEyeGazeEventsByType = new Map();
    _previousEyeGazeEventsByType = new Map();
    _eyeGazeEventHandlerByType = new Map();
    _latestKeyboardEventsByType = new Map();
    _previousKeyboardEventsByType = new Map();
    _keyboardEventHandlerByType = new Map();
    constructor(invalidate, eventProvider) {
        this._invalidate = invalidate;
        this._mouseEventProvider = eventProvider.mouseEventProvider;
        this._mouseEventProvider.preventDefault(mouseeventprovider_1.MouseEventProvider.Type.Wheel);
        this._pointerEventProvider = eventProvider.pointerEventProvider;
        this._eyeGazeEventProvider = eventProvider.eyeGazeEventProvider;
        this._keyboardEventProvider = eventProvider.keyboardEventProvider;
    }
    /** @callback Invalidate
     * A callback intended to be invoked whenever the specialized event handler itself is invalid. By default only
     * optional updates (renderer decides whether or not to continue redraw) are triggered.
     */
    invalidate(force = false) {
        if (this._invalidate) {
            this._invalidate(force);
        }
    }
    /**
     * Utility for registering an additional mouse event handler for updates on mouse events of the given type. The
     * handler is to be called on update if at least a single mouse event of the given type has occurred since last
     * update.
     * @param type - Mouse event type the handler is to be associated with.
     * @param handler - Handler to be called on update.
     */
    pushMouseEventHandler(type, handler) {
        if (this._mouseEventHandlerByType.has(type)) {
            this._mouseEventHandlerByType.get(type).push(handler);
            return;
        }
        this._mouseEventHandlerByType.set(type, new Array());
        this._previousMouseEventsByType.set(type, new Array());
        const latest = new Array();
        this._latestMouseEventsByType.set(type, latest);
        (0, auxiliaries_1.assert)(this._mouseEventProvider !== undefined, `expected valid mouse event provider`);
        const observable = this._mouseEventProvider.observable(type);
        switch (type) {
            case mouseeventprovider_1.MouseEventProvider.Type.Wheel:
                this._subscriptions.push(observable.subscribe((event) => { latest.push(event); this.invalidate(); }));
                break;
            default:
                this._subscriptions.push(observable.subscribe((event) => { latest.push(event); this.invalidate(); }));
                break;
        }
        this._mouseEventHandlerByType.get(type).push(handler);
    }
    invokeMouseEventHandler(type) {
        const handlers = this._mouseEventHandlerByType.get(type);
        if (handlers === undefined || handlers.length === 0) {
            return;
        }
        const latest = this._latestMouseEventsByType.get(type);
        if (latest.length === 0) {
            return;
        }
        const previous = this._previousMouseEventsByType.get(type);
        handlers.forEach((handler) => handler(latest, previous));
        Object.assign(previous, latest);
        latest.length = 0;
    }
    /**
     * Utility for registering an additional touch event handler for updates on touch events of the given type. The
     * handler is to be called on update iff at least a single touch event of the given type has occurred since last
     * update.
     * @param type - Touch event type the handler is to be associated with.
     * @param handler - Handler to be called on update.
     */
    pushTouchEventHandler(type, handler) {
        if (this._touchEventHandlerByType.has(type)) {
            this._touchEventHandlerByType.get(type).push(handler);
            return;
        }
        this._touchEventHandlerByType.set(type, new Array());
        this._previousTouchEventsByType.set(type, new Array());
        const latest = new Array();
        this._latestTouchEventsByType.set(type, latest);
        (0, auxiliaries_1.assert)(this._touchEventProvider !== undefined, `expected valid touch event provider`);
        const observable = this._touchEventProvider.observable(type);
        this._subscriptions.push(observable.subscribe((event) => { latest.push(event); this.invalidate(); }));
        this._touchEventHandlerByType.get(type).push(handler);
    }
    invokeTouchEventHandler(type) {
        const handlers = this._touchEventHandlerByType.get(type);
        if (handlers === undefined || handlers.length === 0) {
            return;
        }
        const latest = this._latestTouchEventsByType.get(type);
        if (latest.length === 0) {
            return;
        }
        const previous = this._previousTouchEventsByType.get(type);
        handlers.forEach((handler) => handler(latest, previous));
        Object.assign(previous, latest);
        latest.length = 0;
    }
    /**
     * Utility for registering an additional pointer event handler for updates on pointer events of the given type. The
     * handler is to be called on update iff at least a single touch event of the given type has occurred since last
     * update.
     * @param type - Pointer event type the handler is to be associated with.
     * @param handler - Handler to be called on update.
     */
    pushPointerEventHandler(type, handler) {
        if (this._pointerEventHandlerByType.has(type)) {
            this._pointerEventHandlerByType.get(type).push(handler);
            return;
        }
        this._pointerEventHandlerByType.set(type, new Array());
        this._previousPointerEventsByType.set(type, new Array());
        const latest = new Array();
        this._latestPointerEventsByType.set(type, latest);
        (0, auxiliaries_1.assert)(this._pointerEventProvider !== undefined, `expected valid pointer event provider`);
        const observable = this._pointerEventProvider.observable(type);
        this._subscriptions.push(observable.subscribe((event) => { latest.push(event); this.invalidate(); }));
        this._pointerEventHandlerByType.get(type).push(handler);
    }
    invokePointerEventHandler(type) {
        const handlers = this._pointerEventHandlerByType.get(type);
        if (handlers === undefined || handlers.length === 0) {
            return;
        }
        const latest = this._latestPointerEventsByType.get(type);
        if (latest.length === 0) {
            return;
        }
        const previous = this._previousPointerEventsByType.get(type);
        handlers.forEach((handler) => handler(latest, previous));
        Object.assign(previous, latest);
        latest.length = 0;
    }
    /**
     * Utility for registering an additional touch event handler for updates on touch events of the given type. The
     * handler is to be called on update iff at least a single touch event of the given type has occurred since last
     * update.
     * @param type - Touch event type the handler is to be associated with.
     * @param handler - Handler to be called on update.
     */
    pushEyeGazeEventHandler(type, handler) {
        if (this._eyeGazeEventHandlerByType.has(type)) {
            this._eyeGazeEventHandlerByType.get(type).push(handler);
            return;
        }
        this._eyeGazeEventHandlerByType.set(type, new Array());
        this._previousEyeGazeEventsByType.set(type, new Array());
        const latest = new Array();
        this._latestEyeGazeEventsByType.set(type, latest);
        (0, auxiliaries_1.assert)(this._eyeGazeEventProvider !== undefined, `expected valid eye gaze event provider`);
        const observable = this._eyeGazeEventProvider.observable(type);
        this._subscriptions.push(observable.subscribe((event) => { latest.push(event); this.invalidate(); }));
        this._eyeGazeEventHandlerByType.get(type).push(handler);
    }
    invokeEyeGazeEventHandler(type) {
        const handlers = this._eyeGazeEventHandlerByType.get(type);
        if (handlers === undefined || handlers.length === 0) {
            return;
        }
        const latest = this._latestEyeGazeEventsByType.get(type);
        if (latest.length === 0) {
            return;
        }
        const previous = this._previousEyeGazeEventsByType.get(type);
        handlers.forEach((handler) => handler(latest, previous));
        Object.assign(previous, latest);
        latest.length = 0;
    }
    /**
     * Utility for registering an additional keyboard event handler for updates on keyboard events of the given type. The
     * handler is to be called on update if at least a single keyboard event of the given type has occurred since last
     * update.
     * @param type - Keyboard event type the handler is to be associated with.
     * @param handler - Handler to be called on update.
     */
    pushKeyboardEventHandler(type, handler) {
        if (this._keyboardEventHandlerByType.has(type)) {
            this._keyboardEventHandlerByType.get(type).push(handler);
            return;
        }
        this._keyboardEventHandlerByType.set(type, new Array());
        this._previousKeyboardEventsByType.set(type, new Array());
        const latest = new Array();
        this._latestKeyboardEventsByType.set(type, latest);
        (0, auxiliaries_1.assert)(this._keyboardEventProvider !== undefined, `expected valid keyboard event provider`);
        const observable = this._keyboardEventProvider.observable(type);
        this._subscriptions.push(observable.subscribe((event) => { latest.push(event); this.invalidate(); }));
        this._keyboardEventHandlerByType.get(type).push(handler);
    }
    invokeKeyboardEventHandler(type) {
        const handlers = this._keyboardEventHandlerByType.get(type);
        if (handlers === undefined || handlers.length === 0) {
            return;
        }
        const latest = this._latestKeyboardEventsByType.get(type);
        if (latest.length === 0) {
            return;
        }
        const previous = this._previousKeyboardEventsByType.get(type);
        handlers.forEach((handler) => handler(latest, previous));
        Object.assign(previous, latest);
        latest.length = 0;
    }
    /**
     * Disposes all registered handlers of all event types.
     */
    dispose() {
        this._latestMouseEventsByType.forEach((value) => value.length = 0);
        this._previousMouseEventsByType.forEach((value) => value.length = 0);
        this._latestTouchEventsByType.forEach((value) => value.length = 0);
        this._previousTouchEventsByType.forEach((value) => value.length = 0);
        this._latestPointerEventsByType.forEach((value) => value.length = 0);
        this._previousPointerEventsByType.forEach((value) => value.length = 0);
        this._previousEyeGazeEventsByType.forEach((value) => value.length = 0);
        this._latestEyeGazeEventsByType.forEach((value) => value.length = 0);
        this._latestKeyboardEventsByType.forEach((value) => value.length = 0);
        this._previousKeyboardEventsByType.forEach((value) => value.length = 0);
        for (const subscription of this._subscriptions) {
            subscription.unsubscribe();
        }
    }
    /**
     * Triggers (by means of a helper function) invocation of all registered handler of all event types.
     */
    update() {
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Click);
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Enter);
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Leave);
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Down);
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Up);
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Move);
        this.invokeMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Wheel);
        this.invokeTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.Start);
        this.invokeTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.End);
        this.invokeTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.Move);
        this.invokeTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.Cancel);
        this.invokePointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Move);
        this.invokePointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Down);
        this.invokePointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Enter);
        this.invokePointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Up);
        this.invokePointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Leave);
        this.invokePointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Cancel);
        this.invokeEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.EyeGazeData);
        this.invokeEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.NewServerMessage);
        this.invokeEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.ConnectionStatus);
        this.invokeEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.BinaryMessageParsingError);
        this.invokeKeyboardEventHandler(keyboardeventprovider_1.KeyboardEventType.KeyDown);
        this.invokeKeyboardEventHandler(keyboardeventprovider_1.KeyboardEventType.KeyPress);
        this.invokeKeyboardEventHandler(keyboardeventprovider_1.KeyboardEventType.KeyUp);
    }
    /**
     * Normalize mouse and touch event coordinates for various browsers.
     * @param event - Mouse, wheel, or touch event.
     * @param normalize - Whether or not to compute normalized coordinates (offsets).
     * @returns - Array of normalized x and y offsets (in case of multiple touches).
     */
    offsets(event, normalize = true) {
        const offsets = new Array();
        /*
         * Workaround for Chrome based on solution of Benjamin Wasty: EventHandler.offsets() uses
         * event.target.getBoundingClientRect() which often triggers a reflow/layout that might take ~20ms and slow
         * down, e.g., navigation a lot. Firefox on the other hand doesn't properly support offsetX/offsetY (set to 0).
         */
        let chromeWorkaround = false;
        if (event instanceof MouseEvent) {
            const e = event;
            chromeWorkaround = (e.offsetX !== 0 && e.offsetY !== 0);
            offsets.push(chromeWorkaround ?
                gl_matrix_1.vec2.fromValues(e.offsetX, e.offsetY) :
                gl_matrix_1.vec2.fromValues(e.clientX, e.clientY));
        }
        else if (event instanceof WheelEvent) {
            const e = event;
            chromeWorkaround = (e.offsetX !== 0 && e.offsetY !== 0);
            offsets.push(chromeWorkaround ?
                gl_matrix_1.vec2.fromValues(e.offsetX, e.offsetY) :
                gl_matrix_1.vec2.fromValues(e.clientX, e.clientY));
        }
        else if (event instanceof TouchEvent) {
            const e = event;
            for (let index = 0; index < e.touches.length; ++index) {
                const touch = e.touches.item(index);
                offsets.push(gl_matrix_1.vec2.fromValues(touch.clientX, touch.clientY));
            }
        }
        if (chromeWorkaround) {
            if (normalize) {
                for (const offset of offsets) {
                    gl_matrix_1.vec2.scale(offset, offset, window.devicePixelRatio);
                }
            }
            return offsets;
        }
        const target = event.target || event.currentTarget || event.srcElement;
        const rect = target.getBoundingClientRect();
        for (const offset of offsets) {
            offset[0] = Math.floor(offset[0] - rect.left);
            offset[1] = Math.floor(offset[1] - rect.top);
            if (normalize) {
                gl_matrix_1.vec2.scale(offset, offset, window.devicePixelRatio);
            }
        }
        return offsets;
    }
    /**
     * Register a click event handler that is to be called on update iff at least a single click event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushClickHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Click, handler);
    }
    /**
     * Register an mouse enter event handler that is to be called on update iff at least a single mouse enter event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushMouseEnterHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Enter, handler);
    }
    /**
     * Register an mouse leave event handler that is to be called on update iff at least a single mouse leave event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushMouseLeaveHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Leave, handler);
    }
    /**
     * Register an mouse down event handler that is to be called on update iff at least a single mouse down event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushMouseDownHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Down, handler);
    }
    /**
     * Register an mouse up event handler that is to be called on update iff at least a single mouse up event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushMouseUpHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Up, handler);
    }
    /**
     * Register an mouse move event handler that is to be called on update iff at least a single mouse move event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushMouseMoveHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Move, handler);
    }
    /**
     * Register an mouse wheel event handler that is to be called on update iff at least a single mouse wheel event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushMouseWheelHandler(handler) {
        this.pushMouseEventHandler(mouseeventprovider_1.MouseEventProvider.Type.Wheel, handler);
    }
    /**
     * Register a touch start event handler that is to be called on update iff at least a single touch start event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushTouchStartHandler(handler) {
        this.pushTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.Start, handler);
    }
    /**
     * Register a touch end event handler that is to be called on update iff at least a single touch end event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushTouchEndHandler(handler) {
        this.pushTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.End, handler);
    }
    /**
     * Register a touch move event handler that is to be called on update iff at least a single touch move event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushTouchMoveHandler(handler) {
        this.pushTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.Move, handler);
    }
    /**
     * Register a touch cancel event handler that is to be called on update iff at least a single touch cancel event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushTouchCancelHandler(handler) {
        this.pushTouchEventHandler(toucheventprovider_1.TouchEventProvider.Type.Cancel, handler);
    }
    /**
     * Register a pointer up event handler that is to be called on update iff at least a single touch cancel event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushPointerUpHandler(handler) {
        this.pushPointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Up, handler);
    }
    /**
     * Register a pointer down event handler that is to be called on update iff at least a single touch cancel event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushPointerDownHandler(handler) {
        this.pushPointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Down, handler);
    }
    /**
     * Register a pointer enter event handler that is to be called on update iff at least a single touch cancel event
     * has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushPointerEnterHandler(handler) {
        this.pushPointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Enter, handler);
    }
    /**
     * Register a pointer leave event handler that is to be called on update iff at least a single touch cancel event
     * has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushPointerLeaveHandler(handler) {
        this.pushPointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Leave, handler);
    }
    /**
     * Register a pointer move event handler that is to be called on update iff at least a single touch cancel event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushPointerMoveHandler(handler) {
        this.pushPointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Move, handler);
    }
    /**
     * Register a pointer cancel event handler that is to be called on update iff at least a single touch cancel event
     * has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushPointerCancelHandler(handler) {
        this.pushPointerEventHandler(pointereventprovider_1.PointerEventProvider.Type.Cancel, handler);
    }
    /**
     * Register a eye gaze data event handler that is to be called on update if at least
     * a single eye gaze data event has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushEyeGazeDataHandler(handler) {
        this.pushEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.EyeGazeData, handler);
    }
    /**
     * Register a eye gaze server message event handler that is to be called on update if at least
     * a single eye gaze server message event has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushEyeGazeServerMessageHandler(handler) {
        this.pushEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.NewServerMessage, handler);
    }
    /**
     * Register a eye gaze connection status event handler that is to be called on update if at least
     * a single eye gaze connection status event has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushEyeGazeConnectionStatusHandler(handler) {
        this.pushEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.ConnectionStatus, handler);
    }
    /**
     * Register a eye gaze binary message parsing error event handler that is to be called on update if at least
     * a single eye gaze binary message parsing error event has occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushEyeGazeBinaryMessageParsingErrorHandler(handler) {
        this.pushEyeGazeEventHandler(eyegazeeventprovider_1.EyeGazeEventProvider.Type.BinaryMessageParsingError, handler);
    }
    /**
         * Register a key down event handler that is to be called on update if at least a single key down event has
         * occurred since last update.
         * @param handler - Handler to be called on update.
         */
    pushKeyDownHandler(handler) {
        this.pushKeyboardEventHandler(keyboardeventprovider_1.KeyboardEventType.KeyDown, handler);
    }
    /**
     * Register a key press event handler that is to be called on update if at least a single key press event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushKeyPressHandler(handler) {
        this.pushKeyboardEventHandler(keyboardeventprovider_1.KeyboardEventType.KeyPress, handler);
    }
    /**
     * Register a key up event handler that is to be called on update if at least a single key up event has
     * occurred since last update.
     * @param handler - Handler to be called on update.
     */
    pushKeyUpHandler(handler) {
        this.pushKeyboardEventHandler(keyboardeventprovider_1.KeyboardEventType.KeyUp, handler);
    }
    /**
     * Forward pointer lock request to the mouse event provider (if one exists).
     */
    requestPointerLock() {
        if (this._mouseEventProvider) {
            this._mouseEventProvider.pointerLock = true;
        }
    }
    /**
     * Forward pointer lock release request to the mouse event provider (if one exists).
     */
    exitPointerLock() {
        if (this._mouseEventProvider) {
            this._mouseEventProvider.pointerLock = false;
        }
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=eventhandler.js.map