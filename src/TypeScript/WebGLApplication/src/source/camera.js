"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
/* spellchecker: enable */
/**
 * Virtual 3D camera specified by eye, center, up, fovy, near, far, and a viewport size. It provides access to cached
 * view, projection, and view projection matrices. Cached by means of whenever one of the attributes change, all
 * matrices are invalidated and recalculated only once and only when requested. Please note that eye denotes the
 * position in a virtual 3D scene and center denotes the position which is being looked at.
 */
class Camera {
    static DEFAULT_EYE = gl_matrix_1.vec3.fromValues(0.0, 0.0, 1.0);
    static DEFAULT_CENTER = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
    static DEFAULT_UP = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
    static DEFAULT_FOVY = 45.0;
    static DEFAULT_NEAR = 2.0;
    static DEFAULT_FAR = 8.0;
    /** @see {@link eye} */
    _eye;
    /** @see {@link center} */
    _center;
    /** @see {@link up} */
    _up;
    /** @see {@link fovy} */
    _fovy = Camera.DEFAULT_FOVY;
    /** @see {@link near} */
    _near = Camera.DEFAULT_NEAR;
    /** @see {@link far} */
    _far = Camera.DEFAULT_FAR;
    /** @see {@link viewport} */
    _viewport = [1, 1];
    /** @see {@link aspect} */
    _aspect = 1.0;
    /** @see {@link view} */
    _view;
    /** @see {@link viewInverse} */
    _viewInverse;
    /** @see {@link projection} */
    _projection;
    /** @see {@link projectionInverse} */
    _projectionInverse;
    /** @see {@link viewProjection} */
    _viewProjection;
    /** @see {@link viewProjectionInverse} */
    _viewProjectionInverse;
    /** @see {@link postViewProjection} */
    _postViewProjection;
    /** @see {@link altered} */
    _altered = false;
    /**
     * Computes a vertical field of view angle based on the display height and distance to eye. Since both parameters
     * are highly dependent of the device, this function can only be used to derive a rough estimate for a reasonable
     * field of view. Note that both parameters should be passed using the same unit, e.g., inch or centimeters.
     * @param elementDisplayHeight - Height of an element on the display.
     * @param eyeToDisplayDistance - Distance from the users eye to that element.
     * @returns - Vertical field of view angle in radian.
     */
    static calculateFovY(elementDisplayHeight, eyeToDisplayDistance) {
        return Math.atan(elementDisplayHeight * 0.5 / eyeToDisplayDistance) * 2.0;
    }
    /**
     * Constructor setting up the camera's eye, center and up vectors.
     * @param eye - The viewpoint of the virtual camera
     * @param center - The look-at point in the scene
     * @param up - The up-vector of the virtual camera
     */
    constructor(eye, center, up) {
        this._eye = eye ? gl_matrix_1.vec3.clone(eye) : gl_matrix_1.vec3.clone(Camera.DEFAULT_EYE);
        this._center = center ? gl_matrix_1.vec3.clone(center) : gl_matrix_1.vec3.clone(Camera.DEFAULT_CENTER);
        this._up = up ? gl_matrix_1.vec3.clone(up) : gl_matrix_1.vec3.clone(Camera.DEFAULT_UP);
    }
    /**
     * Invalidates derived matrices, i.e., view, projection, and view-projection. The view should be invalidated on
     * eye, center, and up changes. The projection should be invalidated on fovy, viewport, near, and far changes.
     * The view projection invalidates whenever either one or both view and projection are to be invalidated.
     */
    invalidate(invalidateView, invalidateProjection, invalidateOnlyViewProjection = false) {
        if (invalidateView) {
            this._view = undefined;
            this._viewInverse = undefined;
        }
        if (invalidateProjection) {
            this._projection = undefined;
            this._projectionInverse = undefined;
        }
        if (invalidateView || invalidateProjection || invalidateOnlyViewProjection) {
            this._viewProjection = undefined;
            this._viewProjectionInverse = undefined;
        }
        this._altered = true;
    }
    /**
     * Position of the virtual camera in a virtual 3D scene, the point of view.
     */
    get eye() {
        return this._eye;
    }
    /**
     * Sets the eye. Invalidates the view.
     */
    set eye(eye) {
        if (gl_matrix_1.vec3.equals(this._eye, eye)) {
            return;
        }
        this._eye = gl_matrix_1.vec3.clone(eye);
        this.invalidate(true, false);
    }
    /**
     * Look-at point into a virtual 3D scene.
     */
    get center() {
        return this._center;
    }
    /**
     * Sets the center. Invalidates the view.
     */
    set center(center) {
        if (gl_matrix_1.vec3.equals(this._center, center)) {
            return;
        }
        this._center = gl_matrix_1.vec3.clone(center);
        this.invalidate(true, false);
    }
    /**
     * Up-vector of the virtual camera.
     */
    get up() {
        return this._up;
    }
    /**
     * Sets the up vector. Invalidates the view.
     */
    set up(up) {
        if (gl_matrix_1.vec3.equals(this._up, up)) {
            return;
        }
        this._up = gl_matrix_1.vec3.clone(up);
        this.invalidate(true, false);
    }
    /**
     * Vertical field of view in degree.
     */
    get fovy() {
        return this._fovy;
    }
    /**
     * Sets the vertical field-of-view in degrees. Invalidates the projection.
     */
    set fovy(fovy) {
        if (this._fovy === fovy) {
            return;
        }
        this._fovy = fovy;
        this.invalidate(false, true);
    }
    /**
     * Sets the horizontal field-of-view in degrees. Invalidates the projection.
     * Note that internally, this will be translated to the corresponding the vertical field.
     */
    set fovx(fovx) {
        const horizontalAngle = fovx * auxiliaries_1.DEG2RAD;
        const verticalAngle = 2.0 * Math.atan(Math.tan(horizontalAngle / 2.0) * (1.0 / this.aspect));
        const fovy = verticalAngle * auxiliaries_1.RAD2DEG;
        if (this._fovy === fovy) {
            return;
        }
        this._fovy = fovy;
        this.invalidate(false, true);
    }
    /**
     * With this function the view of a physical camera can be emulated. The width and focal length of
     * a lens are used to generate the correct field of view.
     * Blender camera presets can be imported by using the camera setting 'HorizontalFit' and using the
     * width and focal length values in this function.
     * See: https://www.scantips.com/lights/fieldofviewmath.html
     * @param sensorWidth - Width of the sensor in mm
     * @param focalLength - Focal length of the lens in mm
     */
    fovFromLens(sensorWidth, focalLength) {
        const horizontalAngle = 2.0 * Math.atan(sensorWidth / (2.0 * focalLength));
        this.fovx = horizontalAngle * auxiliaries_1.RAD2DEG;
    }
    /**
     * Distance of near-plane in view coordinates.
     */
    get near() {
        return this._near;
    }
    /**
     * Sets the distance to the near clipping plane. Invalidates the projection.
     */
    set near(near) {
        if (this._near === near) {
            return;
        }
        if (near >= this._far) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `near expected to be smaller than far (${this._far}), given ${near}`);
        }
        this._near = near;
        this.invalidate(false, true);
    }
    /**
     * Distance of far-plane in view coordinates.
     */
    get far() {
        return this._far;
    }
    /**
     * Sets the distance to the far clipping plane. Invalidates the projection.
     */
    set far(far) {
        if (this._far === far) {
            return;
        }
        if (this._near >= far) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `far expected to be greater than near (${this._near}), given ${far}`);
        }
        this._far = far;
        this.invalidate(false, true);
    }
    /**
     * Sets the viewport size. Invalidates the projection.
     */
    set viewport(size) {
        if (this._viewport[0] === size[0] && this._viewport[1] === size[1]) {
            return;
        }
        this._viewport = (0, tuples_1.duplicate2)(size);
        this.invalidate(false, true);
    }
    /**
     * The size of the target viewport used to determine the aspect ratio for subsequent perspective matrix projection
     * computation.
     */
    get viewport() {
        return this._viewport;
    }
    /**
     * Access to the viewport width.
     */
    get width() {
        return this._viewport[0];
    }
    /**
     * Access to the viewport height.
     */
    get height() {
        return this._viewport[1];
    }
    /**
     * Sets the aspect ratio (width over height). However, this is not derived from viewport to allow for
     * differentiation between viewport size and scale.
     */
    set aspect(aspect) {
        if (this._aspect === aspect) {
            return;
        }
        this._aspect = aspect;
    }
    /**
     * Computes the ratio of width over height (set explicitly for differentiation between viewport size and scale).
     */
    get aspect() {
        return this._aspect;
    }
    /**
     * Either returns the cached view matrix or derives the current one after invalidation and caches it.
     */
    get view() {
        if (this._view) { // return cached value
            return this._view;
        }
        this._view = gl_matrix_1.mat4.lookAt((0, gl_matrix_extensions_1.m4)(), this._eye, this._center, this._up);
        return this._view;
    }
    /**
     * Either returns the inverse cached view matrix or derives the current one after invalidation and caches it.
     */
    get viewInverse() {
        if (this._viewInverse !== undefined) { // return cached value
            return this._viewInverse;
        }
        this._viewInverse = gl_matrix_1.mat4.invert((0, gl_matrix_extensions_1.m4)(), this.view);
        return this._viewInverse;
    }
    /**
     * Either returns the cached projection matrix or derives the current one after invalidation and caches it.
     */
    get projection() {
        if (this._projection) { // return cached value
            return this._projection;
        }
        this._projection = gl_matrix_1.mat4.perspective((0, gl_matrix_extensions_1.m4)(), this.fovy * auxiliaries_1.DEG2RAD, this.aspect, this.near, this.far);
        return this._projection;
    }
    /**
     * Either returns the cached inverse projection matrix or derives the current one after invalidation and caches it.
     */
    get projectionInverse() {
        if (this._projectionInverse !== undefined) { // return cached value
            return this._projectionInverse;
        }
        this._projectionInverse = gl_matrix_1.mat4.invert((0, gl_matrix_extensions_1.m4)(), this.projection);
        return this._projectionInverse;
    }
    /**
     * Returns the view projection matrix based on view and projection. This is also cached (since matrix
     * multiplication is involved).
     */
    get viewProjection() {
        if (this._viewProjection) { // return cached value
            return this._viewProjection;
        }
        this._viewProjection = gl_matrix_1.mat4.multiply((0, gl_matrix_extensions_1.m4)(), this.projection, this.view);
        this._viewProjection = gl_matrix_1.mat4.multiply((0, gl_matrix_extensions_1.m4)(), this.postViewProjection, this._viewProjection);
        return this._viewProjection;
    }
    /**
     * Returns the inverse view projection matrix based on view and projection. This is also cached (since matrix
     * multiplication is involved).
     */
    get viewProjectionInverse() {
        if (this._viewProjectionInverse !== undefined) { // return cached value
            return this._viewProjectionInverse;
        }
        this._viewProjectionInverse = gl_matrix_1.mat4.invert((0, gl_matrix_extensions_1.m4)(), this.viewProjection);
        return this._viewProjectionInverse;
    }
    /**
     * Returns the matrix which contains the operations that are applied to the viewProjection matrix.
     * For now this is only used by the TiledRenderer to adjust the NDC-coordinates to the tile.
     */
    get postViewProjection() {
        if (this._postViewProjection) {
            return this._postViewProjection;
        }
        else {
            return gl_matrix_1.mat4.identity((0, gl_matrix_extensions_1.m4)());
        }
    }
    /**
     * Sets the matrix which contains the operations that are applied to the viewProjection matrix.
     * For now this is only used by the TiledRenderer to adjust the NDC-coordinates to the tile.
     */
    set postViewProjection(matrix) {
        this._postViewProjection = matrix;
        this.invalidate(false, false, true);
    }
    /**
     * Whether or not any other public property has changed. Please note that the alteration status is detached from
     * caching state of lazily computed properties.
     */
    get altered() {
        return this._altered;
    }
    /**
     * Intended for resetting alteration status.
     */
    set altered(status) {
        this._altered = status;
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map