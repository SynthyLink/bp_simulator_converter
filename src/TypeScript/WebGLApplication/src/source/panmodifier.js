"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const cameramodifier_1 = require("./cameramodifier");
/* spellchecker: enable */
class PanModifier extends cameramodifier_1.CameraModifier {
    static DEFAULT_SENSITIVITY = 0.002;
    _sensitivity = PanModifier.DEFAULT_SENSITIVITY;
    _translation = (0, gl_matrix_extensions_1.v3)();
    /**
     * Initiate a new panning at a specific event position.
     * @param point - Position of the current event to derive the magnitude for rotation from.
     */
    initiate(point) {
        Object.assign(this._reference, this._camera);
        /* Retrieve initial event position. */
        this._initialPoint = point;
    }
    /**
     * Update the panning transform w.r.t. a specific event position.
     * @param point - Position of the current event to derive the magnitude for translation from.
     */
    process(point) {
        /* Retrieve current event positions. */
        this._currentPoint = point;
        const magnitudes = gl_matrix_1.vec2.subtract((0, gl_matrix_extensions_1.v2)(), this._initialPoint, this._currentPoint);
        gl_matrix_1.vec2.scale(magnitudes, magnitudes, window.devicePixelRatio * this._sensitivity);
        const centerToEye = gl_matrix_1.vec3.sub((0, gl_matrix_extensions_1.v3)(), this._reference.eye, this._reference.center);
        gl_matrix_1.vec3.normalize(centerToEye, centerToEye);
        const up = this._reference.up;
        gl_matrix_1.vec3.normalize(up, up);
        const right = gl_matrix_1.vec3.cross((0, gl_matrix_extensions_1.v3)(), up, centerToEye);
        const rightTranslation = gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), right, magnitudes[0]);
        const upTranslation = gl_matrix_1.vec3.scale((0, gl_matrix_extensions_1.v3)(), up, magnitudes[1]);
        gl_matrix_1.vec3.negate(upTranslation, upTranslation);
        this._translation = gl_matrix_1.vec3.add((0, gl_matrix_extensions_1.v3)(), upTranslation, rightTranslation);
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
        const center = gl_matrix_1.vec3.transformMat4((0, gl_matrix_extensions_1.v3)(), this._reference.center, T);
        this._camera.eye = eye;
        this._camera.center = center;
    }
}
exports.PanModifier = PanModifier;
//# sourceMappingURL=panmodifier.js.map