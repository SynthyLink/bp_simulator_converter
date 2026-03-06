"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerEventProvider = void 0;
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
const msagent_1 = require("./msagent");
const pointerlock_1 = require("./pointerlock");
/* spellchecker: enable */
class PointerEventProvider {
    /**
     * HTML canvas element within the HTML5 document to register event listeners to.
     */
    _element;
    /**
     * Time frame for events to be buffered (windowTime in rxjs per ReplaySubject).
     */
    _timeframe;
    _enterListener;
    _enterSubject;
    _leaveListener;
    _leaveSubject;
    _cancelListener;
    _cancelSubject;
    _downListener;
    _downSubject;
    _upListener;
    _upSubject;
    _moveListener;
    _moveSubject;
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
            case PointerEventProvider.Type.Enter:
                return this.enter$;
            case PointerEventProvider.Type.Leave:
                return this.leave$;
            case PointerEventProvider.Type.Down:
                return this.down$;
            case PointerEventProvider.Type.Up:
                return this.up$;
            case PointerEventProvider.Type.Move:
                return this.move$;
            case PointerEventProvider.Type.Cancel:
                return this.cancel$;
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
    get enter$() {
        if (this._enterSubject === undefined) {
            this._enterSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._enterListener = (event) => {
                this.preventDefaultOnEvent(PointerEventProvider.Type.Enter, event);
                this._enterSubject.next(event);
            };
            this._element.addEventListener('pointerenter', this._enterListener);
        }
        return this._enterSubject.asObservable();
    }
    get leave$() {
        if (this._leaveSubject === undefined) {
            this._leaveSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._leaveListener = (event) => {
                this.preventDefaultOnEvent(PointerEventProvider.Type.Leave, event);
                this._leaveSubject.next(event);
            };
            this._element.addEventListener('pointerleave', this._leaveListener);
        }
        return this._leaveSubject.asObservable();
    }
    get down$() {
        if (this._downSubject === undefined) {
            this._downSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._downListener = (event) => {
                this.preventDefaultOnEvent(PointerEventProvider.Type.Down, event);
                this._downSubject.next(event);
            };
            this._element.addEventListener('pointerdown', this._downListener);
        }
        return this._downSubject.asObservable();
    }
    get up$() {
        if (this._upSubject === undefined) {
            this._upSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._upListener = (event) => {
                this.preventDefaultOnEvent(PointerEventProvider.Type.Up, event);
                this._upSubject.next(event);
            };
            this._element.addEventListener('pointerup', this._upListener);
        }
        return this._upSubject.asObservable();
    }
    get move$() {
        if (this._moveSubject === undefined) {
            this._moveSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._moveListener = (event) => {
                this.preventDefaultOnEvent(PointerEventProvider.Type.Move, event);
                this._moveSubject.next(event);
            };
            this._element.addEventListener('pointermove', this._moveListener);
        }
        return this._moveSubject.asObservable();
    }
    get cancel$() {
        if (this._cancelSubject === undefined) {
            this._cancelSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._cancelListener = (event) => {
                this.preventDefaultOnEvent(PointerEventProvider.Type.Cancel, event);
                this._cancelSubject.next(event);
            };
            this._element.addEventListener('pointercancel', this._cancelListener);
        }
        return this._cancelSubject.asObservable();
    }
}
exports.PointerEventProvider = PointerEventProvider;
(function (PointerEventProvider) {
    let Type;
    (function (Type) {
        Type[Type["Enter"] = 1] = "Enter";
        Type[Type["Leave"] = 2] = "Leave";
        Type[Type["Move"] = 4] = "Move";
        Type[Type["Down"] = 8] = "Down";
        Type[Type["Up"] = 16] = "Up";
        Type[Type["Cancel"] = 32] = "Cancel";
    })(Type = PointerEventProvider.Type || (PointerEventProvider.Type = {}));
})(PointerEventProvider || (exports.PointerEventProvider = PointerEventProvider = {}));
//# sourceMappingURL=pointereventprovider.js.map