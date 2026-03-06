"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyeGazeDataStreams = exports.EyeGazeDataStream = exports.EyeGazeEventTarget = void 0;
const eyegazeevent_1 = require("./eyegazeevent");
// tslint:disable:max-classes-per-file
class EyeGazeEventTarget extends EventTarget {
}
exports.EyeGazeEventTarget = EyeGazeEventTarget;
class EyeGazeDataStream {
    static EYE_GAZE_DATA = 'eyegazedata';
    static NEW_SERVER_MESSAGE = 'newservermessage';
    static CONNECTION_STATUS = 'connectionstatus';
    static BINARY_MESSAGE_PARSING_ERROR = 'binarymessageparsingerror';
    static SUCCESSFULLY_CONNECTED_TO_SERVER = 'successfully connected to server';
    static DISCONNECTED_TO_SERVER = 'disconnected to server';
    static CONNECTION_ERROR = 'connection error with server';
    _webSocket;
    _eyeGazeDataStreams = new EyeGazeDataStreams();
    _eyeGazeEventTarget = new EventTarget();
    generateStreamConfigByte() {
        const configByte = Uint8Array.from([0]);
        if (this._eyeGazeDataStreams.gazePosition) {
            configByte[0] = configByte[0] | 0b00000001;
        }
        if (this._eyeGazeDataStreams.gazeOrigin) {
            configByte[0] = configByte[0] | 0b00000010;
        }
        if (this._eyeGazeDataStreams.eyePositionNormalized) {
            configByte[0] = configByte[0] | 0b00000100;
        }
        if (this._eyeGazeDataStreams.headPositionAndRotation) {
            configByte[0] = configByte[0] | 0b00001000;
        }
        if (this._eyeGazeDataStreams.userPresence) {
            configByte[0] = configByte[0] | 0b00010000;
        }
        return configByte;
    }
    performHandshake() {
        this._eyeGazeDataStreams.recalculateNumberOfFloats();
        const configByte = this.generateStreamConfigByte();
        this._webSocket.send(configByte);
    }
    parseEyeTrackingData(data) {
        if (data.length < this._eyeGazeDataStreams.expectedNumberOfFloats) {
            return new CustomEvent(EyeGazeDataStream.BINARY_MESSAGE_PARSING_ERROR);
        }
        let currentIndexPosition = 0;
        const eyeGazeData = new eyegazeevent_1.EyeGazeData();
        if (this._eyeGazeDataStreams.gazePosition) {
            eyeGazeData.gazePositionXY[0] = data[currentIndexPosition++];
            eyeGazeData.gazePositionXY[1] = data[currentIndexPosition++];
        }
        if (this._eyeGazeDataStreams.gazeOrigin) {
            eyeGazeData.gazeOriginRightXYZ[0] = data[currentIndexPosition++];
            eyeGazeData.gazeOriginRightXYZ[1] = data[currentIndexPosition++];
            eyeGazeData.gazeOriginRightXYZ[2] = data[currentIndexPosition++];
            eyeGazeData.gazeOriginLeftXYZ[0] = data[currentIndexPosition++];
            eyeGazeData.gazeOriginLeftXYZ[1] = data[currentIndexPosition++];
            eyeGazeData.gazeOriginLeftXYZ[2] = data[currentIndexPosition++];
        }
        if (this._eyeGazeDataStreams.eyePositionNormalized) {
            eyeGazeData.eyePositionRightNormalizedXYZ[0] = data[currentIndexPosition++];
            eyeGazeData.eyePositionRightNormalizedXYZ[1] = data[currentIndexPosition++];
            eyeGazeData.eyePositionRightNormalizedXYZ[2] = data[currentIndexPosition++];
            eyeGazeData.eyePositionLeftNormalizedXYZ[0] = data[currentIndexPosition++];
            eyeGazeData.eyePositionLeftNormalizedXYZ[1] = data[currentIndexPosition++];
            eyeGazeData.eyePositionLeftNormalizedXYZ[2] = data[currentIndexPosition++];
        }
        if (this._eyeGazeDataStreams.headPositionAndRotation) {
            eyeGazeData.headPositionXYZ[0] = data[currentIndexPosition++];
            eyeGazeData.headPositionXYZ[1] = data[currentIndexPosition++];
            eyeGazeData.headPositionXYZ[2] = data[currentIndexPosition++];
            eyeGazeData.headRotationXYZ[0] = data[currentIndexPosition++];
            eyeGazeData.headRotationXYZ[1] = data[currentIndexPosition++];
            eyeGazeData.headRotationXYZ[2] = data[currentIndexPosition++];
        }
        if (this._eyeGazeDataStreams.userPresence) {
            eyeGazeData.userPresence = data[currentIndexPosition] === 0.0 ? false : true;
        }
        return new CustomEvent(EyeGazeDataStream.EYE_GAZE_DATA, { detail: { eyeGazeData } });
    }
    onOpen(event) {
        this.dispatchEvent(new CustomEvent(EyeGazeDataStream.CONNECTION_STATUS, {
            detail: { message: EyeGazeDataStream.SUCCESSFULLY_CONNECTED_TO_SERVER, event },
        }));
        this.performHandshake();
    }
    onClose(event) {
        this.dispatchEvent(new CustomEvent(EyeGazeDataStream.CONNECTION_STATUS, {
            detail: { message: EyeGazeDataStream.DISCONNECTED_TO_SERVER, event },
        }));
    }
    onError(event) {
        this.dispatchEvent(new CustomEvent(EyeGazeDataStream.CONNECTION_STATUS, {
            detail: { message: EyeGazeDataStream.CONNECTION_ERROR, event },
        }));
    }
    async onMessage(event) {
        // handle stream data
        if (typeof event.data !== 'string') {
            const arrayBuffer = await event.data.arrayBuffer();
            const floatData = new Float32Array(arrayBuffer);
            this.dispatchEvent(this.parseEyeTrackingData(floatData));
            // handle status message data
        }
        else {
            this.dispatchEvent(new CustomEvent(EyeGazeDataStream.NEW_SERVER_MESSAGE, {
                detail: { message: event.data },
            }));
        }
    }
    connect(serverAddress) {
        this._webSocket = new WebSocket(serverAddress);
        // Arrow functions needed in order to not loose this-context.
        this._webSocket.onopen = (event) => {
            this.onOpen(event);
        };
        this._webSocket.onclose = (event) => {
            this.onClose(event);
        };
        this._webSocket.onerror = (event) => {
            this.onError(event);
        };
        this._webSocket.onmessage = (event) => {
            this.onMessage(event);
        };
    }
    // Mediation
    addEventListener(type, listener, options) {
        this._eyeGazeEventTarget.addEventListener(type, listener ? listener : null, options);
    }
    dispatchEvent(event) {
        return this._eyeGazeEventTarget.dispatchEvent(event);
    }
    removeEventListener(type, callback, options) {
        this._eyeGazeEventTarget.removeEventListener(type, callback ? callback : null, options);
    }
    get connectionState() {
        return this._webSocket.readyState;
    }
    get eyeGazeDataStreams() {
        return this._eyeGazeDataStreams;
    }
    set eyeGazeDataStreams(eyeGazeDataStreams) {
        if (this._eyeGazeDataStreams !== eyeGazeDataStreams) {
            this._eyeGazeDataStreams = eyeGazeDataStreams;
        }
    }
}
exports.EyeGazeDataStream = EyeGazeDataStream;
class EyeGazeDataStreams {
    gazePosition = false;
    gazeOrigin = false;
    eyePositionNormalized = false;
    headPositionAndRotation = false;
    userPresence = false;
    // The sum of floats from all activated data streams
    expectedNumberOfFloats = 0;
    // Is automatically recalculated if the handshake is invoked
    recalculateNumberOfFloats() {
        let newNumberOfFloats = 0;
        if (this.gazePosition) {
            newNumberOfFloats += 2;
        }
        if (this.gazeOrigin) {
            newNumberOfFloats += 6;
        }
        if (this.eyePositionNormalized) {
            newNumberOfFloats += 6;
        }
        if (this.headPositionAndRotation) {
            newNumberOfFloats += 6;
        }
        if (this.userPresence) {
            newNumberOfFloats += 1;
        }
        this.expectedNumberOfFloats = newNumberOfFloats;
    }
}
exports.EyeGazeDataStreams = EyeGazeDataStreams;
//# sourceMappingURL=eyegazedatastream.js.map