"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardEventType = exports.KeyboardEventProvider = void 0;
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
/* spellchecker: enable */
class KeyboardEventProvider {
    /**
     * HTML canvas element within the HTML5 document to register event listeners to.
     */
    _element;
    /**
     * Time frame for events to be buffered (windowTime in rxjs per ReplaySubject).
     */
    _timeframe;
    _keyDownListener;
    _keyDownSubject;
    _keyPressListener;
    _keyPressSubject;
    _keyUpListener;
    _keyUpSubject;
    /**
     * This mask saves for which types of events, event.preventDefault should be called. This is useful to disallow
     * some kinds of standard events.
     */
    _preventDefaultMask;
    constructor(element, timeframe) {
        (0, auxiliaries_1.assert)(element !== undefined, `expected valid canvas element on initialization, given ${element}`);
        this._element = element;
        this._timeframe = timeframe;
        // Add pointer lock stuff if needed. Not sure yet if theres any events we need to watch out for
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
            case KeyboardEventType.KeyDown:
                return this.keyDown$;
            case KeyboardEventType.KeyPress:
                return this.keyPress$;
            case KeyboardEventType.KeyUp:
                return this.keyUp$;
            default:
                return undefined;
        }
    }
    get keyDown$() {
        if (this._keyDownSubject === undefined) {
            this._keyDownSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._keyDownListener = (event) => {
                this.preventDefaultOnEvent(KeyboardEventType.KeyDown, event);
                this._keyDownSubject.next(event);
            };
            this._element.addEventListener('keydown', this._keyDownListener);
        }
        return this._keyDownSubject.asObservable();
    }
    get keyPress$() {
        if (this._keyPressSubject === undefined) {
            this._keyPressSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._keyPressListener = (event) => {
                this.preventDefaultOnEvent(KeyboardEventType.KeyPress, event);
                this._keyPressSubject.next(event);
            };
            this._element.addEventListener('keypress', this._keyPressListener);
        }
        return this._keyPressSubject.asObservable();
    }
    get keyUp$() {
        if (this._keyUpSubject === undefined) {
            this._keyUpSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._keyUpListener = (event) => {
                this.preventDefaultOnEvent(KeyboardEventType.KeyUp, event);
                this._keyUpSubject.next(event);
            };
            this._element.addEventListener('keyup', this._keyUpListener);
        }
        return this._keyUpSubject.asObservable();
    }
}
exports.KeyboardEventProvider = KeyboardEventProvider;
var KeyboardEventType;
(function (KeyboardEventType) {
    KeyboardEventType[KeyboardEventType["KeyDown"] = 1] = "KeyDown";
    KeyboardEventType[KeyboardEventType["KeyPress"] = 2] = "KeyPress";
    KeyboardEventType[KeyboardEventType["KeyUp"] = 4] = "KeyUp";
})(KeyboardEventType || (exports.KeyboardEventType = KeyboardEventType = {}));
//# sourceMappingURL=keyboardeventprovider.js.map