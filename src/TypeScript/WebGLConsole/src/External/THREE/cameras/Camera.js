"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const constants_1 = require("../constants");
const Matrix4_1 = require("../math/Matrix4");
const Object3D_1 = require("../core/Object3D");
const Vector3_1 = require("../math/Vector3");
const Quaternion_1 = require("../math/Quaternion");
const _position = /*@__PURE__*/ new Vector3_1.Vector3();
const _quaternion = /*@__PURE__*/ new Quaternion_1.Quaternion();
const _scale = /*@__PURE__*/ new Vector3_1.Vector3();
/**
 * Abstract base class for cameras. This class should always be inherited
 * when you build a new camera.
 *
 * @abstract
 * @augments Object3D
 */
class Camera extends Object3D_1.Object3D {
    /**
     * Constructs a new camera.
     */
    constructor() {
        super();
        /**
         * This flag can be used for type testing.
         *
         * @type {boolean}
         * @readonly
         * @default true
         */
        this.isCamera = true;
        this.type = 'Camera';
        /**
         * The inverse of the camera's world matrix.
         *
         * @type {Matrix4}
         */
        this.matrixWorldInverse = new Matrix4_1.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        /**
         * The camera's projection matrix.
         *
         * @type {Matrix4}
         */
        this.projectionMatrix = new Matrix4_1.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        /**
         * The inverse of the camera's projection matrix.
         *
         * @type {Matrix4}
         */
        this.projectionMatrixInverse = new Matrix4_1.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        /**
         * The coordinate system in which the camera is used.
         *
         * @type {(WebGLCoordinateSystem|WebGPUCoordinateSystem)}
         */
        this.coordinateSystem = constants_1.WebGLCoordinateSystem;
        this._reversedDepth = false;
    }
    /**
     * The flag that indicates whether the camera uses a reversed depth buffer.
     *
     * @type {boolean}
     * @default false
     */
    get reversedDepth() {
        return this._reversedDepth;
    }
    copy(source, recursive) {
        super.copy(source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);
        this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
        this.coordinateSystem = source.coordinateSystem;
        return this;
    }
    /**
     * Returns a vector representing the ("look") direction of the 3D object in world space.
     *
     * This method is overwritten since cameras have a different forward vector compared to other
     * 3D objects. A camera looks down its local, negative z-axis by default.
     *
     * @param {Vector3} target - The target vector the result is stored to.
     * @return {Vector3} The 3D object's direction in world space.
     */
    getWorldDirection(target) {
        return super.getWorldDirection(target).negate();
    }
    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);
        // exclude scale from view matrix to be glTF conform
        this.matrixWorld.decompose(_position, _quaternion, _scale);
        if (_scale.x === 1 && _scale.y === 1 && _scale.z === 1) {
            this.matrixWorldInverse.copy(this.matrixWorld).invert();
        }
        else {
            this.matrixWorldInverse.compose(_position, _quaternion, _scale.set(1, 1, 1)).invert();
        }
    }
    updateWorldMatrix(updateParents, updateChildren) {
        super.updateWorldMatrix(updateParents, updateChildren);
        // exclude scale from view matrix to be glTF conform
        this.matrixWorld.decompose(_position, _quaternion, _scale);
        if (_scale.x === 1 && _scale.y === 1 && _scale.z === 1) {
            this.matrixWorldInverse.copy(this.matrixWorld).invert();
        }
        else {
            this.matrixWorldInverse.compose(_position, _quaternion, _scale.set(1, 1, 1)).invert();
        }
    }
    clone() {
        return new this.constructor().copy(this);
    }
}
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map