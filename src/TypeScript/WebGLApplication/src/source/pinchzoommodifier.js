"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinchZoomModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const cameramodifier_1 = require("./cameramodifier");
/* spellchecker: enable */
class PinchZoomModifier extends cameramodifier_1.CameraModifier {
    static DEFAULT_SENSITIVITY = 2.0;
    _sensitivity = PinchZoomModifier.DEFAULT_SENSITIVITY;
    _initialDistance;
    _currentDistance;
    _translation = (0, gl_matrix_extensions_1.v3)();
    /**
     * Initiate a new panning at a specific event position.
     * @param point - Position of the current event to derive the magnitude for rotation from.
     */
    initiate(point1, point2) {
        Object.assign(this._reference, this._camera);
        const magnitudes = gl_matrix_1.vec2.subtract((0, gl_matrix_extensions_1.v2)(), point1, point2);
        this._initialDistance = gl_matrix_1.vec2.length(magnitudes);
    }
    /**
     * Update the panning transform w.r.t. a specific event position.
     * @param point - Position of the current event to derive the magnitude for translation from.
     */
    process(point1, point2) {
        /* Retrieve current event positions. */
        const magnitudes = gl_matrix_1.vec2.subtract((0, gl_matrix_extensions_1.v2)(), point1, point2);
        this._currentDistance = gl_matrix_1.vec2.length(magnitudes);
        const change = (this._currentDistance / this._initialDistance) - 1.0;
        const magnitude = change * PinchZoomModifier.DEFAULT_SENSITIVITY;
        const eyeToCenter = gl_matrix_1.vec3.sub((0, gl_matrix_extensions_1.v3)(), this._reference.center, this._reference.eye);
        gl_matrix_1.vec3.normalize(eyeToCenter, eyeToCenter);
        this._translation = gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), eyeToCenter, magnitude);
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
        const T = gl_matrix_1.mat4.fromTranslation((0, gl_matrix_extensions_1.m4)(), this._translation);
        const eye = gl_matrix_1.vec3.transformMat4((0, gl_matrix_extensions_1.v3)(), this._reference.eye, T);
        this._camera.eye = eye;
    }
}
exports.PinchZoomModifier = PinchZoomModifier;
//# sourceMappingURL=pinchzoommodifier.js.map