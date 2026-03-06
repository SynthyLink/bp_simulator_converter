"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchEventProvider = void 0;
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
/* spellchecker: enable */
class TouchEventProvider {
    /**
     * HTML canvas element within the HTML5 document to register event listeners to.
     */
    _element;
    /**
     * Time frame for events to be buffered (windowTime in rxjs per ReplaySubject).
     */
    _timeframe;
    _startListener;
    _startSubject;
    _endListener;
    _endSubject;
    _moveListener;
    _moveSubject;
    _cancelListener;
    _cancelSubject;
    /**
     * This mask saves for which types of events, event.preventDefault should be called.
     * This is useful to disallow some kinds of standard events like scrolling or clicking on links.
     */
    _preventDefaultMask;
    constructor(element, timeframe) {
        (0, auxiliaries_1.assert)(element !== undefined, `expected valid canvas element on initialization, given ${element}`);
        this._element = element;
        this._timeframe = timeframe;
    }
    /**
     * Checks whether or not to prevent the default handling of the given event. This depends on the internal
     * `preventDefaultMask` which can be modified using `preventDefault` function @see{@link prevenDefault}.
     * @param type - Internal event type of the incoming event.
     * @param event - Actual event to prevent default handling on (if masked).
     */
    preventDefaultOnEvent(type, event) {
        if ((0, auxiliaries_1.bitInBitfield)(this._preventDefaultMask, type)) {
            event.preventDefault();
        }
    }
    /**
     * Prevent default event handling on specific event type (using prevenDefault on the event).
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
     * Allow default event handling on specific event type (not calling preventDefault on the event).
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
        // eslint-disable-next-line default-case
        switch (type) {
            case TouchEventProvider.Type.Start:
                return this.start$;
            case TouchEventProvider.Type.End:
                return this.end$;
            case TouchEventProvider.Type.Move:
                return this.move$;
            case TouchEventProvider.Type.Cancel:
                return this.cancel$;
        }
        (0, auxiliaries_1.assert)(false, 'Encountered unknown touch event.');
        return new rxjs_1.Observable();
    }
    get start$() {
        if (this._startSubject === undefined) {
            this._startSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._startListener = (event) => {
                this.preventDefaultOnEvent(TouchEventProvider.Type.Start, event);
                this._startSubject.next(event);
            };
            this._element.addEventListener('touchstart', this._startListener);
        }
        return this._startSubject.asObservable();
    }
    get end$() {
        if (this._endSubject === undefined) {
            this._endSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._endListener = (event) => {
                this.preventDefaultOnEvent(TouchEventProvider.Type.End, event);
                this._endSubject.next(event);
            };
            this._element.addEventListener('touchend', this._endListener);
        }
        return this._endSubject.asObservable();
    }
    get move$() {
        if (this._moveSubject === undefined) {
            this._moveSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._moveListener = (event) => {
                this.preventDefaultOnEvent(TouchEventProvider.Type.Move, event);
                this._moveSubject.next(event);
            };
            this._element.addEventListener('touchmove', this._moveListener);
        }
        return this._moveSubject.asObservable();
    }
    get cancel$() {
        if (this._cancelSubject === undefined) {
            this._cancelSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._cancelListener = (event) => {
                this.preventDefaultOnEvent(TouchEventProvider.Type.Cancel, event);
                this._cancelSubject.next(event);
            };
            this._element.addEventListener('touchcancel', this._cancelListener);
        }
        return this._cancelSubject.asObservable();
    }
}
exports.TouchEventProvider = TouchEventProvider;
(function (TouchEventProvider) {
    let Type;
    (function (Type) {
        Type[Type["Start"] = 1] = "Start";
        Type[Type["End"] = 2] = "End";
        Type[Type["Move"] = 4] = "Move";
        Type[Type["Cancel"] = 8] = "Cancel";
    })(Type = TouchEventProvider.Type || (TouchEventProvider.Type = {}));
})(TouchEventProvider || (exports.TouchEventProvider = TouchEventProvider = {}));
//# sourceMappingURL=toucheventprovider.js.map