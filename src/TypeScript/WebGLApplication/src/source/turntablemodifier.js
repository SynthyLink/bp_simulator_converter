"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurntableModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const cameramodifier_1 = require("./cameramodifier");
/* spellchecker: enable */
/**
 * Math for camera rotation based on the turntable metaphor. The rotation computed by an initial (@see startRotate) and
 * subsequent (@see updateRotate) event points and can be applied to a camera via an explicit update (@see update).
 * In contrast to the trackball, this metaphor is usually less confusing for non-professionals.
 */
class TurntableModifier extends cameramodifier_1.CameraModifier {
    static DEFAULT_SENSITIVITY = 0.002;
    /**
     * Current rotation matrix.
     */
    _rotation = (0, gl_matrix_extensions_1.m4)();
    _maxAzimuth = +Math.PI * 0.5 - 1e-4;
    _minAzimuth = -Math.PI * 0.5 + 1e-4;
    _xAxisScreenSpace = (0, gl_matrix_extensions_1.v3)();
    _azimuth;
    /** @see {@link sensitivity} */
    _sensitivity = TurntableModifier.DEFAULT_SENSITIVITY;
    /**
     * Initiate a new turntable rotation at a specific event position.
     * @param point - Position of the current event to derive the magnitude for rotation from.
     */
    initiate(point) {
        Object.assign(this._reference, this._camera);
        /* Retrieve initial event position. */
        this._initialPoint = point;
        const centerToEye = gl_matrix_1.vec3.sub((0, gl_matrix_extensions_1.v3)(), this._reference.eye, this._reference.center);
        gl_matrix_1.vec3.normalize(centerToEye, centerToEye);
        this._xAxisScreenSpace = gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), [0.0, 1.0, 0.0], centerToEye);
        this._azimuth = Math.acos(gl_matrix_1.vec3.dot(centerToEye, [0.0, 1.0, 0.0]));
        this._azimuth = Math.PI * 0.5 - this._azimuth;
    }
    /**
     * Update the turntable rotation w.r.t. a specific event position.
     * @param point - Position of the current event to derive the magnitude for rotation from.
     */
    process(point) {
        /* Retrieve current event positions. */
        this._currentPoint = point;
        const magnitudes = gl_matrix_1.vec2.subtract((0, gl_matrix_extensions_1.v2)(), this._initialPoint, this._currentPoint);
        gl_matrix_1.vec2.scale(magnitudes, magnitudes, window.devicePixelRatio * this._sensitivity);
        if (Number.isFinite(this._minAzimuth)) {
            magnitudes[1] = Math.min(this._azimuth - this._minAzimuth, magnitudes[1]);
        }
        if (Number.isFinite(this._maxAzimuth)) {
            magnitudes[1] = Math.max(this._azimuth - this._maxAzimuth, magnitudes[1]);
        }
        gl_matrix_1.mat4.rotateY(this._rotation, (0, gl_matrix_extensions_1.m4)(), magnitudes[0]);
        gl_matrix_1.mat4.rotate(this._rotation, this._rotation, magnitudes[1], this._xAxisScreenSpace);
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
exports.TurntableModifier = TurntableModifier;
//# sourceMappingURL=turntablemodifier.js.map