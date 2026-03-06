"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CameraModifier = void 0;
const gl_matrix_1 = require("gl-matrix");
const camera_1 = require("./camera");
/* spellchecker: enable */
class CameraModifier {
    /** @see {@link camera} */
    _camera = undefined;
    /**
     * Copy of a camera for ongoing camera modifications based on previous/initial camera settings.
     */
    _reference = new camera_1.Camera();
    /**
     * Reference to the initial point starting the camera modification.
     */
    _initialPoint;
    /**
     * Reference to the current point updating the camera modification.
     */
    _currentPoint;
    /**
     * The camera that is to be modified in response to various events.
     */
    set camera(camera) {
        if (this._camera === camera) {
            return;
        }
        this._camera = camera;
        if (camera === undefined) {
            return;
        }
        Object.assign(this._reference, camera);
        this.update();
    }
}
exports.CameraModifier = CameraModifier;
//# sourceMappingURL=cameramodifier.js.map