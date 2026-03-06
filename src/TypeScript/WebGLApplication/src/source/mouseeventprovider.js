"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseEventProvider = void 0;
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
const msagent_1 = require("./msagent");
const pointerlock_1 = require("./pointerlock");
/* spellchecker: enable */
class MouseEventProvider {
    /**
     * HTML canvas element within the HTML5 document to register event listeners to.
     */
    _element;
    /**
     * Time frame for events to be buffered (windowTime in rxjs per ReplaySubject).
     */
    _timeframe;
    _clickListener;
    _clickSubject;
    _enterListener;
    _enterSubject;
    _leaveListener;
    _leaveSubject;
    _downListener;
    _downSubject;
    _upListener;
    _upSubject;
    _moveListener;
    _moveSubject;
    _wheelListener;
    _wheelSubject;
    _dragListener;
    _dragSubject;
    /** @see {@link pointerLock} */
    _pointerLockRequestPending = false;
    /**
     * This mask saves for which types of events, event.preventDefault should be called. This is useful to disallow
     * some kinds of standard events like scrolling or clicking on links.
     */
    _preventDefaultMask;
    constructor(element, timeframe) {
        (0, auxiliaries_1.assert)(element !== undefined, `expected valid canvas element on initialization, given ${element}`);
        this._element = element;
        this._timeframe = timeframe;
        this._element.addEventListener('click', () => this.processPointerLockRequests());
        /* Prevent unintentional drag content detection by Microsoft Edge/IE11, e.g., when processing mouse move events
        during mouse down and up. */
        if (msagent_1.IS_EDGE || msagent_1.IS_IE11) {
            this._element.addEventListener('dragstart', (event) => event.preventDefault());
        }
    }
    /**
     * The pointer lock API requires a little workaround in order to avoid something like '... not called from inside a
     * short running user-generated event handler'. A click event listener is registered and whenever a pointer lock is
     * requested, e.g., from an event handler (which in turn exposes this interface to, e.g., a navigation), the next
     * click will result in a probably more successful pointer lock.
     */
    processPointerLockRequests() {
        if (!this._pointerLockRequestPending) {
            return;
        }
        pointerlock_1.PointerLock.request(this._element);
    }
    /**
     * Checks whether or not to prevent the default handling of the given event. This depends on the internal
     * `preventDefaultMask` which can be modified using `preventDefault` function @see{@link preventDefault}.
     * @param type - Internal event type of the incoming event.
     * @param event - Actual event to prevent default handling on (if masked).
     */
    preventDefaultOnEvent(type, event) {
        if ((0, auxiliaries_1.bitInBitfield)(this._preventDefaultMask, type)) {
            event.preventDefault();
        }
    }
    /**
     * Prevent default event handling on specific event types (using preventDefault on the event).
     * @param types - Event types to prevent default handling on.
     */
    preventDefault(...types) {
        for (const type of types) {
            if (!(0, auxiliaries_1.bitInBitfield)(this._preventDefaultMask, type)) {
                this._preventDefaultMask |= type;
            }
        }
    }
    /**
     * Allow default event handling on specific event types (not calling preventDefault on the event).
     * @param types - Event types to allow default handling on.
     */
    allowDefault(...types) {
        for (const type of types) {
            if ((0, auxiliaries_1.bitInBitfield)(this._preventDefaultMask, type)) {
                this._preventDefaultMask &= ~type;
            }
        }
    }
    observable(type) {
        switch (type) {
            case MouseEventProvider.Type.Click:
                return this.click$;
            case MouseEventProvider.Type.Enter:
                return this.enter$;
            case MouseEventProvider.Type.Leave:
                return this.leave$;
            case MouseEventProvider.Type.Down:
                return this.down$;
            case MouseEventProvider.Type.Up:
                return this.up$;
            case MouseEventProvider.Type.Move:
                return this.move$;
            case MouseEventProvider.Type.Wheel:
                return this.wheel$;
            case MouseEventProvider.Type.Drag:
                return this.drag$;
            default:
                return undefined;
        }
    }
    /**
     * Enable/disable pointer lock on click. If true, the next click on this event provider's canvas will invoke a
     * pointer lock request on the canvas element.
     */
    set pointerLock(lock) {
        this._pointerLockRequestPending = lock;
        if (lock === false) {
            this._pointerLockRequestPending = false;
            pointerlock_1.PointerLock.exit();
        }
    }
    get pointerLock() {
        return pointerlock_1.PointerLock.active(this._element);
    }
    get click$() {
        if (this._clickSubject === undefined) {
            this._clickSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._clickListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Click, event);
                this._clickSubject.next(event);
            };
            this._element.addEventListener('click', this._clickListener);
        }
        return this._clickSubject.asObservable();
    }
    get enter$() {
        if (this._enterSubject === undefined) {
            this._enterSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._enterListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Enter, event);
                this._enterSubject.next(event);
            };
            this._element.addEventListener('mouseenter', this._enterListener);
        }
        return this._enterSubject.asObservable();
    }
    get leave$() {
        if (this._leaveSubject === undefined) {
            this._leaveSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._leaveListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Leave, event);
                this._leaveSubject.next(event);
            };
            this._element.addEventListener('mouseleave', this._leaveListener);
        }
        return this._leaveSubject.asObservable();
    }
    get down$() {
        if (this._downSubject === undefined) {
            this._downSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._downListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Down, event);
                this._downSubject.next(event);
            };
            this._element.addEventListener('mousedown', this._downListener);
        }
        return this._downSubject.asObservable();
    }
    get up$() {
        if (this._upSubject === undefined) {
            this._upSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._upListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Up, event);
                this._upSubject.next(event);
            };
            this._element.addEventListener('mouseup', this._upListener);
        }
        return this._upSubject.asObservable();
    }
    get move$() {
        if (this._moveSubject === undefined) {
            this._moveSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._moveListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Move, event);
                this._moveSubject.next(event);
            };
            this._element.addEventListener('mousemove', this._moveListener);
        }
        return this._moveSubject.asObservable();
    }
    get wheel$() {
        if (this._wheelSubject === undefined) {
            this._wheelSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._wheelListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Wheel, event);
                this._wheelSubject.next(event);
            };
            this._element.addEventListener('wheel', this._wheelListener);
        }
        return this._wheelSubject.asObservable();
    }
    get drag$() {
        if (this._dragSubject === undefined) {
            this._dragSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._dragListener = (event) => {
                this.preventDefaultOnEvent(MouseEventProvider.Type.Drag, event);
                this._dragSubject.next(event);
            };
            this._element.addEventListener('drag', this._dragListener);
        }
        return this._dragSubject.asObservable();
    }
}
exports.MouseEventProvider = MouseEventProvider;
(function (MouseEventProvider) {
    let Type;
    (function (Type) {
        Type[Type["Click"] = 1] = "Click";
        Type[Type["Wheel"] = 2] = "Wheel";
        Type[Type["Enter"] = 4] = "Enter";
        Type[Type["Leave"] = 8] = "Leave";
        Type[Type["Move"] = 16] = "Move";
        Type[Type["Down"] = 32] = "Down";
        Type[Type["Up"] = 64] = "Up";
        Type[Type["Drag"] = 128] = "Drag";
    })(Type = MouseEventProvider.Type || (MouseEventProvider.Type = {}));
})(MouseEventProvider || (exports.MouseEventProvider = MouseEventProvider = {}));
//# sourceMappingURL=mouseeventprovider.js.map