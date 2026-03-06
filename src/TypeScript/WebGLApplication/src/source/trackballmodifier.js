"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackballModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const cameramodifier_1 = require("./cameramodifier");
/* spellchecker: enable */
/**
 * Math for camera rotation based on the trackball metaphor. The rotation computed by an initial (@see startRotate) and
 * subsequent (@see updateRotate) event points and can be applied to a camera via an explicit update (@see update).
 */
class TrackballModifier extends cameramodifier_1.CameraModifier {
    static DEFAULT_SENSITIVITY = 0.002;
    /**
     * Current rotation matrix.
     */
    _rotation = gl_matrix_1.mat4.create();
    /** @see {@link sensitivity} */
    _sensitivity = TrackballModifier.DEFAULT_SENSITIVITY;
    /**
     * Initiate a new trackball rotation at a specific event position.
     * @param point - Position of the current event to start the trackball rotation at.
     */
    initiate(point) {
        /* Retrieve initial event position. */
        this._initialPoint = point;
    }
    /**
     * Update the trackball rotation w.r.t. a specific event position.
     * @param point - Position of the current event to continue/update the trackball rotation at.
     */
    process(point) {
        /* Retrieve current event positions. */
        this._currentPoint = point;
        const magnitudes = gl_matrix_1.vec2.subtract((0, gl_matrix_extensions_1.v2)(), this._initialPoint, this._currentPoint);
        gl_matrix_1.vec2.scale(magnitudes, magnitudes, window.devicePixelRatio * this._sensitivity);
        /* Rotation uses difference between two events, thus, initial position is reset. */
        gl_matrix_1.vec2.copy(this._initialPoint, this._currentPoint);
        /* Create rotation with respect to arbitrary camera center and up vector. */
        const centerToEye = gl_matrix_1.vec3.sub((0, gl_matrix_extensions_1.v3)(), this._reference.eye, this._reference.center);
        gl_matrix_1.vec3.normalize(centerToEye, centerToEye);
        const up = gl_matrix_1.vec3.normalize((0, gl_matrix_extensions_1.v3)(), this._reference.up);
        /* Create vertical rotation axis. */
        const ortho = gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), centerToEye, up);
        gl_matrix_1.vec3.scale(up, up, magnitudes[1]);
        gl_matrix_1.vec3.scale(ortho, ortho, magnitudes[0]);
        /* Create overall rotation axis for quaternion based rotation. */
        const axis = gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.add((0, gl_matrix_extensions_1.v3)(), up, ortho), centerToEye);
        gl_matrix_1.vec3.normalize(axis, axis);
        /* Create quaternion and modify rotation transformation. */
        const q = gl_matrix_1.quat.setAxisAngle(gl_matrix_1.quat.create(), axis, gl_matrix_1.vec2.len(magnitudes));
        gl_matrix_1.mat4.multiply(this._rotation, this._rotation, gl_matrix_1.mat4.fromQuat((0, gl_matrix_extensions_1.m4)(), q));
        this.update();
    }
    /**
     * Actually applies the trackball rotation to the given camera.
     */
    update() {
        if (this._camera === undefined) {
            return;
        }
        /* Adjust for arbitrary camera center and rotate using quaternion based rotation. */
        const T = gl_matrix_1.mat4.fromTranslation((0, gl_matrix_extensions_1.m4)(), this._reference.center);
        gl_matrix_1.mat4.multiply(T, T, this._rotation);
        gl_matrix_1.mat4.translate(T, T, gl_matrix_1.vec3.negate((0, gl_matrix_extensions_1.v3)(), this._reference.center));
        const up = gl_matrix_1.vec3.transformMat4((0, gl_matrix_extensions_1.v3)(), [0.0, 1.0, 0.0], this._rotation);
        const eye = gl_matrix_1.vec3.transformMat4((0, gl_matrix_extensions_1.v3)(), this._reference.eye, T);
        this._camera.up = up;
        this._camera.eye = eye;
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
exports.TrackballModifier = TrackballModifier;
//# sourceMappingURL=trackballmodifier.js.map