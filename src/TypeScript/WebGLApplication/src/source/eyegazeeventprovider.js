"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyeGazeEventProvider = void 0;
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
const eyegazedatastream_1 = require("./eyegazedatastream");
const eyegazeevent_1 = require("./eyegazeevent");
// tslint:disable:max-classes-per-file
class EyeGazeEventProvider {
    /**
     * Time frame for events to be buffered (windowTime in rxjs per ReplaySubject).
     */
    _timeframe;
    /**
     * This mask saves for which types of events, event.preventDefault should be called. This is useful to disallow
     * some kinds of standard events like successful connected and handshake success.
     */
    _preventDefaultMask;
    _eyeGazeDataListener;
    _eyeGazeDataSubject;
    _newServerMessageListener;
    _newServerMessageSubject;
    _connectionStatusListener;
    _connectionStatusSubject;
    _binaryMessageParsingErrorListener;
    _binaryMessageParsingErrorSubject;
    _eyeGazeDataStream;
    constructor(eyeGazeDataStreams, serverAddress) {
        (0, auxiliaries_1.assert)(eyeGazeDataStreams !== undefined, `expected a valid eye gaze data streams object on initialization, given ${eyeGazeDataStreams}.`);
        this._eyeGazeDataStream = new eyegazedatastream_1.EyeGazeDataStream();
        this._eyeGazeDataStream.eyeGazeDataStreams = eyeGazeDataStreams;
        this._eyeGazeDataStream.connect(serverAddress);
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
    observable(type) {
        switch (type) {
            case EyeGazeEventProvider.Type.EyeGazeData:
                return this.EyeGazeData$;
            case EyeGazeEventProvider.Type.NewServerMessage:
                return this.NewServerMessage$;
            case EyeGazeEventProvider.Type.ConnectionStatus:
                return this.ConnectionStatus$;
            case EyeGazeEventProvider.Type.BinaryMessageParsingError:
                return this.BinaryMessageParsingError$;
            default:
                return undefined;
        }
    }
    get EyeGazeData$() {
        if (this._eyeGazeDataSubject === undefined) {
            this._eyeGazeDataSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._eyeGazeDataListener = (event) => {
                this.preventDefaultOnEvent(EyeGazeEventProvider.Type.EyeGazeData, event);
                this._eyeGazeDataSubject.next(event);
            };
            this._eyeGazeDataStream.addEventListener(eyegazedatastream_1.EyeGazeDataStream.EYE_GAZE_DATA, this._eyeGazeDataListener);
        }
        return this._eyeGazeDataSubject.asObservable();
    }
    get NewServerMessage$() {
        if (this._newServerMessageSubject === undefined) {
            this._newServerMessageSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._newServerMessageListener = (event) => {
                this.preventDefaultOnEvent(EyeGazeEventProvider.Type.NewServerMessage, event);
                this._newServerMessageSubject.next(event);
            };
            this._eyeGazeDataStream.addEventListener(eyegazedatastream_1.EyeGazeDataStream.NEW_SERVER_MESSAGE, this._newServerMessageListener);
        }
        return this._newServerMessageSubject.asObservable();
    }
    get ConnectionStatus$() {
        if (this._connectionStatusSubject === undefined) {
            this._connectionStatusSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._connectionStatusListener = (event) => {
                this.preventDefaultOnEvent(EyeGazeEventProvider.Type.ConnectionStatus, event);
                this._connectionStatusSubject.next(event);
            };
            this._eyeGazeDataStream.addEventListener(eyegazedatastream_1.EyeGazeDataStream.CONNECTION_STATUS, this._connectionStatusListener);
        }
        return this._connectionStatusSubject.asObservable();
    }
    get BinaryMessageParsingError$() {
        if (this._binaryMessageParsingErrorSubject === undefined) {
            this._binaryMessageParsingErrorSubject = new rxjs_1.ReplaySubject(undefined, this._timeframe);
            this._binaryMessageParsingErrorListener = (event) => {
                this.preventDefaultOnEvent(EyeGazeEventProvider.Type.BinaryMessageParsingError, event);
                this._binaryMessageParsingErrorSubject.next(event);
            };
            this._eyeGazeDataStream.addEventListener(eyegazedatastream_1.EyeGazeDataStream.BINARY_MESSAGE_PARSING_ERROR, this._binaryMessageParsingErrorListener);
        }
        return this._eyeGazeDataSubject.asObservable();
    }
}
exports.EyeGazeEventProvider = EyeGazeEventProvider;
(function (EyeGazeEventProvider) {
    let Type;
    (function (Type) {
        Type[Type["EyeGazeData"] = 1] = "EyeGazeData";
        Type[Type["NewServerMessage"] = 2] = "NewServerMessage";
        Type[Type["ConnectionStatus"] = 4] = "ConnectionStatus";
        Type[Type["BinaryMessageParsingError"] = 8] = "BinaryMessageParsingError";
    })(Type = EyeGazeEventProvider.Type || (EyeGazeEventProvider.Type = {}));
})(EyeGazeEventProvider || (exports.EyeGazeEventProvider = EyeGazeEventProvider = {}));
//# sourceMappingURL=eyegazeeventprovider.js.map