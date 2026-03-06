"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
const gl_matrix_1 = require("gl-matrix");
const camera_1 = require("./camera");
const eventhandler_1 = require("./eventhandler");
const pointerlock_1 = require("./pointerlock");
const renderer_1 = require("./renderer");
const auxiliaries_1 = require("./auxiliaries");
const firstpersonmodifier_1 = require("./firstpersonmodifier");
const panmodifier_1 = require("./panmodifier");
const pinchzoommodifier_1 = require("./pinchzoommodifier");
const trackballmodifier_1 = require("./trackballmodifier");
const turntablemodifier_1 = require("./turntablemodifier");
const eventhandler_2 = require("./eventhandler");
const wheelzoommodifier_1 = require("./wheelzoommodifier");
/* spellchecker: enable */
/**
 * This navigation is merely a design template/recipe for more refined, specialized navigation and provides some basic,
 * commonly used camera modifier such as turntable, first-person, as well as trackball. This implementation is also
 * unfinished and will be continued as soon as possible (e.g., first-person navigation is not usable for now).
 * @todo - Refine and comment this class to be usable at least as common/most-basic navigation auxiliary.
 */
class Navigation {
    /**
     * The navigation's invalidation callback. This should usually be setup by the owning renderer and invoke the
     * same callback the renderer has been given by the canvas. This invalidation is required, when continuous
     * rendering is not present, events might cause need for new rendering requests.
     */
    _invalidate;
    /** @see {@link camera} */
    _camera;
    /**
     * Currently active metaphor.
     */
    _rotationMetaphor;
    /**
     * Identifies the active camera modifier.
     */
    _mode;
    /**
     * Specifies, whether or not rotation mode should be invoked on any move event, regardless of buttons.
     */
    _alwaysRotateOnMove = false;
    /**
     * First person camera modifier.
     */
    _firstPerson;
    /**
     * Trackball camera modifier.
     */
    _trackball;
    /**
     * Turntable camera modifier.
     */
    _turntable;
    /**
     * Pan camera modifier.
     */
    _pan;
    /**
     * Pinch camera modifier.
     */
    _pinch;
    /**
     * Wheel zoom modifier.
     */
    _wheelZoom;
    /**
     * Even handler used to forward/map events to specific camera modifiers.
     */
    _eventHandler;
    /**
     * This keeps track of all events that are currently interacting with the canvas.
     * It maps from pointer id to the currecnt position.
     */
    _activeEvents;
    /**
     * Keep track of the latest interaction in order to allow a cooldown before the next
     * interaction is allowed.
     */
    _lastInteractionTime;
    constructor(invalidate, eventProvider) {
        this._invalidate = invalidate;
        /* Create event handler that listens to mouse events. */
        this._eventHandler = new eventhandler_1.EventHandler(invalidate, eventProvider);
        /* Listen to pointer events. */
        this._eventHandler.pushPointerDownHandler((latests, previous) => this.onPointerDown(latests, previous));
        this._eventHandler.pushPointerUpHandler((latests, previous) => this.onPointerUp(latests, previous));
        this._eventHandler.pushPointerEnterHandler((latests, previous) => this.onPointerEnter(latests, previous));
        this._eventHandler.pushPointerLeaveHandler((latests, previous) => this.onPointerLeave(latests, previous));
        this._eventHandler.pushPointerMoveHandler((latests, previous) => this.onPointerMove(latests, previous));
        this._eventHandler.pushPointerCancelHandler((latests, previous) => this.onPointerCancel(latests, previous));
        this._eventHandler.pushMouseWheelHandler((latests, previous) => this.onWheel(latests, previous));
        /* Explicitly use the setter here to create the appropriate modifier. */
        this.rotationMetaphor = Navigation.RotationMetaphor.Turntable;
        this._pan = new panmodifier_1.PanModifier();
        this._pinch = new pinchzoommodifier_1.PinchZoomModifier();
        this._wheelZoom = new wheelzoommodifier_1.WheelZoomModifier();
        this._activeEvents = new Map();
    }
    /**
     * Resolves the event to camera modifier mapping by returning the responsible camera modifier.
     * @param event - Event to retrieve navigation mode for.
     */
    mode() {
        const events = Array.from(this._activeEvents.values());
        const primaryEvent = this.getPrimaryEvent(events);
        if (primaryEvent === undefined) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, 'No primary pointer event detected in Navigation::mode.');
            return;
        }
        const isMouseEvent = primaryEvent.pointerType === 'mouse';
        const isTouchEvent = primaryEvent.pointerType === 'touch' || primaryEvent.pointerType === 'pen';
        const isPrimaryButtonDown = primaryEvent.buttons & 1;
        const isShiftKeyDown = primaryEvent.shiftKey;
        // const touchEvent = event as TouchEvent;
        // let isTouchEvent = false;
        // if (touchEvent !== undefined) {
        //     isTouchEvent = touchEvent.touches !== undefined && touchEvent.touches.length > 0;
        // }
        const isPointerLockedRotate = pointerlock_1.PointerLock.active() && this._alwaysRotateOnMove;
        const numPointers = this._activeEvents.size;
        const isMouseRotate = isMouseEvent && isPrimaryButtonDown && numPointers === 1;
        const isTouchRotate = isTouchEvent && numPointers === 1;
        const isMousePan = isMouseEvent && isPrimaryButtonDown && isShiftKeyDown && numPointers === 1;
        const isMultiTouch = isTouchEvent && numPointers === 2;
        if (isPointerLockedRotate) {
            return Navigation.Modes.Rotate;
        }
        if (isMousePan) {
            return Navigation.Modes.Pan;
        }
        else if (isMultiTouch) {
            return Navigation.Modes.MultiTouch;
        }
        else if (isMouseRotate || isTouchRotate) {
            return Navigation.Modes.Rotate;
        }
        return undefined;
    }
    resolveMultiTouch() {
        if (this._activeEvents.size < 2) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, 'MultiTouch resolution was canceled because less than two touches were detected.');
            return undefined;
        }
        const events = Array.from(this._activeEvents.values());
        const direction1 = gl_matrix_1.vec2.fromValues(events[0].movementX, events[0].movementY);
        const direction2 = gl_matrix_1.vec2.fromValues(events[1].movementX, events[1].movementY);
        if (gl_matrix_1.vec2.length(direction1) === 0 || gl_matrix_1.vec2.length(direction2) === 0) {
            return Navigation.Modes.Zoom;
        }
        gl_matrix_1.vec2.normalize(direction1, direction1);
        gl_matrix_1.vec2.normalize(direction2, direction2);
        const cosAngle = gl_matrix_1.vec2.dot(direction1, direction2);
        const panThreshold = 0.2;
        if (cosAngle > panThreshold) {
            return Navigation.Modes.Pan;
        }
        return Navigation.Modes.Zoom;
    }
    rotate(start) {
        if (this._activeEvents.size !== 1) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Info, 'Rotate event was canceled because less or more than two pointers were detected.');
            return;
        }
        const events = Array.from(this._activeEvents.values());
        const point = this._eventHandler.offsets(events[0])[0];
        switch (this._rotationMetaphor) {
            case Navigation.RotationMetaphor.FirstPerson:
                const firstPerson = this._firstPerson;
                let movement;
                if (pointerlock_1.PointerLock.active() && event instanceof MouseEvent) {
                    movement = gl_matrix_1.vec2.fromValues(event.movementX, event.movementY);
                }
                start ? firstPerson.initiate(point) : firstPerson.process(point, movement);
                break;
            case Navigation.RotationMetaphor.Trackball:
                const trackball = this._trackball;
                start ? trackball.initiate(point) : trackball.process(point);
                break;
            case Navigation.RotationMetaphor.Turntable:
                const turntable = this._turntable;
                start ? turntable.initiate(point) : turntable.process(point);
                break;
            default:
                break;
        }
    }
    pan(start) {
        const events = Array.from(this._activeEvents.values());
        const event = this.getPrimaryEvent(events);
        if (event === undefined) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, 'Pan event was canceled because no primary event was detected.');
            return;
        }
        const point = this._eventHandler.offsets(event)[0];
        const pan = this._pan;
        start ? pan.initiate(point) : pan.process(point);
    }
    pinch(start) {
        if (this._activeEvents.size !== 2) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Info, 'Pinch event was canceled because less or more than two pointers were detected.');
            return;
        }
        const events = Array.from(this._activeEvents.values());
        const point1 = this._eventHandler.offsets(events[0])[0];
        const point2 = this._eventHandler.offsets(events[1])[0];
        const pinch = this._pinch;
        start ? pinch.initiate(point1, point2) : pinch.process(point1, point2);
    }
    getPrimaryEvent(events) {
        for (const event of events) {
            if (event.isPrimary) {
                return event;
            }
        }
        return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerDown(latests, previous) {
        for (const event of latests) {
            this._activeEvents.set(event.pointerId, event);
        }
        this._mode = this.mode();
        switch (this._mode) {
            case Navigation.Modes.Rotate:
                this.rotate(true);
                break;
            case Navigation.Modes.Pan:
                this.pan(true);
                break;
            case Navigation.Modes.Zoom:
                this.pinch(true);
                break;
            default:
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerUp(latests, previous) {
        for (const pointer of latests) {
            this._activeEvents.delete(pointer.pointerId);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    onPointerEnter(latests, previous) { }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerLeave(latests, previous) {
        for (const pointer of latests) {
            this._activeEvents.delete(pointer.pointerId);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerCancel(latests, previous) {
        for (const pointer of latests) {
            this._activeEvents.delete(pointer.pointerId);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPointerMove(latests, previous) {
        for (const event of latests) {
            this._activeEvents.set(event.pointerId, event);
        }
        if (this._mode === undefined) {
            return;
        }
        const events = Array.from(this._activeEvents.values());
        const primaryEvent = this.getPrimaryEvent(events);
        /**
         * Update the mode for every movement when using a mouse. This is necessary since mouse events do not trigger
         * 'pointerup' events, so we need to figure out when the primary button is released manually
         */
        if (primaryEvent && primaryEvent.pointerType === 'mouse') {
            this._mode = this.mode();
        }
        /**
         * Handle the case where this is the first movement of a multi-touch gesture. We need to find out which
         * kind of gesture is executed.
         */
        let modeUpdated = false;
        if (this._mode === Navigation.Modes.MultiTouch) {
            this._mode = this.resolveMultiTouch();
            modeUpdated = true;
        }
        switch (this._mode) {
            case Navigation.Modes.Rotate:
                this.rotate(modeUpdated);
                break;
            case Navigation.Modes.Pan:
                this.pan(modeUpdated);
                break;
            case Navigation.Modes.Zoom:
                this.pinch(modeUpdated);
                break;
            default:
                break;
        }
        this._lastInteractionTime = performance.now();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onWheel(latests, previous) {
        const event = latests[0];
        this._wheelZoom.process(event.deltaY);
    }
    /**
     * Update should invoke navigation specific event processing. When using, e.g., an event handler, the event handlers
     * update method should be called in order to have navigation specific event processing invoked.
     */
    update() {
        this._eventHandler.update();
    }
    /**
     * The camera that is to be modified in response to various events.
     */
    set camera(camera) {
        this._camera = camera;
        if (this._firstPerson) {
            this._firstPerson.camera = camera;
        }
        if (this._trackball) {
            this._trackball.camera = camera;
        }
        if (this._turntable) {
            this._turntable.camera = camera;
        }
        if (this._pan) {
            this._pan.camera = camera;
        }
        if (this._pinch) {
            this._pinch.camera = camera;
        }
        if (this._wheelZoom) {
            this._wheelZoom.camera = camera;
        }
    }
    /**
     * Configure this navigation's metaphor.
     */
    set rotationMetaphor(metaphor) {
        if (this._rotationMetaphor === metaphor) {
            return;
        }
        this._firstPerson = undefined;
        this._trackball = undefined;
        this._turntable = undefined;
        this._eventHandler.exitPointerLock(); /* Might be requested (and active) from FirstPerson or Flight. */
        this._alwaysRotateOnMove = false;
        this._rotationMetaphor = metaphor;
        switch (this._rotationMetaphor) {
            case Navigation.RotationMetaphor.FirstPerson:
                this._eventHandler.requestPointerLock();
                this._alwaysRotateOnMove = true;
                this._firstPerson = new firstpersonmodifier_1.FirstPersonModifier();
                this._firstPerson.camera = this._camera;
                break;
            case Navigation.RotationMetaphor.Trackball:
                this._trackball = new trackballmodifier_1.TrackballModifier();
                this._trackball.camera = this._camera;
                break;
            case Navigation.RotationMetaphor.Turntable:
                this._turntable = new turntablemodifier_1.TurntableModifier();
                this._turntable.camera = this._camera;
                break;
            default:
                break;
        }
        this._invalidate(true);
    }
    get rotationMetaphor() {
        return this._rotationMetaphor;
    }
}
exports.Navigation = Navigation;
(function (Navigation) {
    /**
     * Navigation modes used for identification of the current navigation intend, which is derived based on the event
     * types or gestures, regardless of the active navigation metaphor and its constraints.
     */
    let Modes;
    (function (Modes) {
        Modes[Modes["Move"] = 0] = "Move";
        Modes[Modes["Pan"] = 1] = "Pan";
        /**
         * MultiTouch is used when interaction with two fingers was initiated but it is not clear yet what
         * interaction the user intends
         */
        Modes[Modes["MultiTouch"] = 2] = "MultiTouch";
        Modes[Modes["Rotate"] = 3] = "Rotate";
        Modes[Modes["Zoom"] = 4] = "Zoom";
        Modes[Modes["ZoomStep"] = 5] = "ZoomStep";
    })(Modes = Navigation.Modes || (Navigation.Modes = {}));
    /**
     * Navigation metaphors supported by the default navigation implementation.
     */
    let RotationMetaphor;
    (function (RotationMetaphor) {
        RotationMetaphor["FirstPerson"] = "firstperson";
        RotationMetaphor["Flight"] = "flight";
        RotationMetaphor["Trackball"] = "trackball";
        RotationMetaphor["Turntable"] = "turntable";
    })(RotationMetaphor = Navigation.RotationMetaphor || (Navigation.RotationMetaphor = {}));
})(Navigation || (exports.Navigation = Navigation = {}));
//# sourceMappingURL=navigation.js.map