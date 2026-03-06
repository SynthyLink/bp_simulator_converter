"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstPersonModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const cameramodifier_1 = require("./cameramodifier");
/* spellchecker: enable */
/**
 * Math for camera modification based on the first person metaphor.
 */
class FirstPersonModifier extends cameramodifier_1.CameraModifier {
    static DEFAULT_SENSITIVITY = 0.0008;
    /**
     * Current rotation matrix.
     */
    _rotation = gl_matrix_1.mat4.create();
    /** @see {@link sensitivity} */
    _sensitivity = FirstPersonModifier.DEFAULT_SENSITIVITY;
    /**
     * Initiate a new camera modification at a specific event position.
     * @param point - Position of the current event to start the modification at.
     */
    initiate(point) {
        Object.assign(this._reference, this._camera);
        /* Retrieve initial event position. */
        this._initialPoint = point;
    }
    /**
     * Update the ... .r.t. a specific event position.
     * @param point - Position of the current event used to update the yaw and pitch.
     */
    process(point, movement) {
        /* Current event position is always the same as initial, when pointer lock is active. */
        this._currentPoint = point;
        const magnitudes = gl_matrix_1.vec2.create();
        if (movement === undefined) {
            gl_matrix_1.vec2.subtract(magnitudes, this._initialPoint, this._currentPoint);
        }
        else {
            gl_matrix_1.vec2.copy(magnitudes, movement);
        }
        gl_matrix_1.vec2.scale(magnitudes, magnitudes, window.devicePixelRatio * this._sensitivity);
        /* Difference between two subsequent events, thus, initial position is reset. */
        gl_matrix_1.vec2.copy(this._initialPoint, this._currentPoint);
        const centerToEye = gl_matrix_1.vec3.sub((0, gl_matrix_extensions_1.v3)(), this._reference.eye, this._reference.center);
        gl_matrix_1.vec3.normalize(centerToEye, centerToEye);
        const strafe = gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), centerToEye, this._reference.up);
        const yaw = gl_matrix_1.mat4.fromRotation((0, gl_matrix_extensions_1.m4)(), -magnitudes[0], this._reference.up);
        const pitch = gl_matrix_1.mat4.fromRotation((0, gl_matrix_extensions_1.m4)(), magnitudes[1], strafe);
        gl_matrix_1.mat4.mul(this._rotation, pitch, yaw);
        this.update();
    }
    /**
     * Actually applies the trackball rotation to the given camera.
     */
    update() {
        if (this._camera === undefined) {
            return;
        }
        const T = gl_matrix_1.mat4.fromTranslation((0, gl_matrix_extensions_1.m4)(), this._reference.eye);
        gl_matrix_1.mat4.multiply(T, T, this._rotation);
        gl_matrix_1.mat4.translate(T, T, gl_matrix_1.vec3.negate((0, gl_matrix_extensions_1.v3)(), this._reference.eye));
        // const up = vec3.transformMat4(v3(), [0.0, 1.0, 0.0], this._rotation);
        // const eye = vec3.transformMat4(v3(), this._reference.eye, T);
        const center = gl_matrix_1.vec3.transformMat4((0, gl_matrix_extensions_1.v3)(), this._reference.center, T);
        // this._camera.up = up;
        // this._camera.eye = eye;
        this._camera.center = center;
        Object.assign(this._reference, this._camera);
    }
    /**
     * Rotational sensitivity.
     */
    set sensitivity(sensitivity) {
        this._sensitivity = sensitivity;
    }
    get sensitivity() {
        return this._sensitivity;
    }
}
exports.FirstPersonModifier = FirstPersonModifier;
//# sourceMappingURL=firstpersonmodifier.js.map