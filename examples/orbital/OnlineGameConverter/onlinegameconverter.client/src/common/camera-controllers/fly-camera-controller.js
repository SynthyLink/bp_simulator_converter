"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
// This is a controller to simulate a flying Camera
// The controls are:
// Hold Left-Mouse-Button and Drag to rotate camera
// Hold Left-Mouse-Button + WASD to move and QE to go up or down
// Mouse Wheel to zoom in or out 
// Press T to toggle between Perspective and Orthographic
class FlyCameraController {
    constructor(camera, input) {
        this.yaw = 0;
        this.pitch = 0;
        this.yawSensitivity = 0.001;
        this.pitchSensitivity = 0.001;
        this.movementSensitivity = 0.001;
        this.fastMovementSensitivity = 0.01;
        this.camera = camera;
        camera.up = gl_matrix_1.vec3.fromValues(0, 1, 0);
        this.input = input;
        const direction = camera.direction;
        this.yaw = Math.atan2(direction[2], direction[0]);
        this.pitch = Math.atan2(direction[1], gl_matrix_1.vec2.len([direction[0], direction[1]]));
    }
    update(deltaTime) {
        if (this.input.isButtonJustDown(0)) {
            this.input.requestPointerLock();
        }
        else if (this.input.isButtonJustUp(0)) {
            this.input.exitPointerLock();
        }
        // if(this.input.isButtonDown(0)){
        //     const mouseDelta = this.input.MouseDelta;
        //     this.yaw += mouseDelta[0] * this.yawSensitivity;
        //     this.pitch += -mouseDelta[1] * this.pitchSensitivity;
        //     this.pitch = Math.min(Math.PI/2, Math.max(-Math.PI/2, this.pitch));
        //     this.camera.direction = vec3.fromValues(Math.cos(this.yaw)*Math.cos(this.pitch), Math.sin(this.pitch), Math.sin(this.yaw)*Math.cos(this.pitch))
        //     const movement = vec3.create();
        //     if(this.input.isKeyDown("w")) movement[2] += 1;
        //     if(this.input.isKeyDown("s")) movement[2] -= 1;
        //     if(this.input.isKeyDown("d")) movement[0] += 1;
        //     if(this.input.isKeyDown("a")) movement[0] -= 1;
        //     if(this.input.isKeyDown("q")) movement[1] += 1;
        //     if(this.input.isKeyDown("e")) movement[1] -= 1;
        //     vec3.normalize(movement, movement);
        //     let movementSensitivity = this.input.isKeyDown(Key.Shift)?this.fastMovementSensitivity:this.movementSensitivity;
        //     vec3.scaleAndAdd(this.camera.position, this.camera.position, this.camera.direction, movement[2]*movementSensitivity*deltaTime);
        //     vec3.scaleAndAdd(this.camera.position, this.camera.position, this.camera.right, movement[0]*movementSensitivity*deltaTime);
        //     vec3.scaleAndAdd(this.camera.position, this.camera.position, this.camera.up, movement[1]*movementSensitivity*deltaTime);
        // }
        if (this.input.isKeyJustDown("t")) {
            if (this.camera.type === 'orthographic')
                this.camera.type = 'perspective';
            else
                this.camera.type = 'orthographic';
        }
        if (this.camera.type === 'perspective') {
            this.camera.perspectiveFoVy -= this.input.WheelDelta[1] * 0.001;
            this.camera.perspectiveFoVy = Math.min(Math.PI, Math.max(Math.PI / 8, this.camera.perspectiveFoVy));
        }
        else if (this.camera.type === 'orthographic') {
            this.camera.orthographicHeight -= this.input.WheelDelta[1] * 0.01;
            this.camera.perspectiveFoVy = Math.max(0.001, this.camera.perspectiveFoVy);
        }
    }
}
exports.default = FlyCameraController;
//# sourceMappingURL=fly-camera-controller.js.map