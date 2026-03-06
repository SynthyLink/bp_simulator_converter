"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WheelZoomModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const cameramodifier_1 = require("./cameramodifier");
/* spellchecker: enable */
class WheelZoomModifier extends cameramodifier_1.CameraModifier {
    static DEFAULT_SENSITIVITY = 0.002;
    _sensitivity = WheelZoomModifier.DEFAULT_SENSITIVITY;
    _translation = (0, gl_matrix_extensions_1.v3)();
    /**
     * Update the panning transform w.r.t. a specific event position.
     * @param point - Position of the current event to derive the magnitude for translation from.
     */
    process(delta) {
        Object.assign(this._reference, this._camera);
        const magnitude = delta * this._sensitivity;
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
exports.WheelZoomModifier = WheelZoomModifier;
//# sourceMappingURL=wheelzoommodifier.js.map