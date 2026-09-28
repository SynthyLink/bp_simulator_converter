"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_key_enum_1 = require("ts-key-enum");
const gl_matrix_1 = require("gl-matrix");
// This is a small helper class we created to manage the user input
// The input on webpages is received via event listeners only so this class add some listeners and collect the keyboard and mouse input to be accessed at any time
// This class is a work in progress so expect it to be enhanced in future labs
class Input {
    constructor(canvas) {
        this.firstMouseMove = true;
        this.pointerLocked = false;
        this.canvas = canvas;
        this.currentKeys = {};
        this.previousKeys = {};
        for (let key in ts_key_enum_1.Key) {
            this.currentKeys[key] = false;
            this.previousKeys[key] = false;
        }
        for (let ascii = 32; ascii < 127; ascii++) {
            const key = String.fromCharCode(ascii);
            this.currentKeys[key] = false;
            this.previousKeys[key] = false;
        }
        document.addEventListener("keydown", (ev) => {
            if (document.activeElement === canvas) {
                let key = ev.key;
                if (key.length == 1) {
                    const code = key.charCodeAt(0);
                    if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0))
                        key = key.toLowerCase();
                }
                this.currentKeys[key] = true;
                switch (ev.key) {
                    case ts_key_enum_1.Key.ArrowUp:
                    case ts_key_enum_1.Key.ArrowDown:
                    case ts_key_enum_1.Key.ArrowLeft:
                    case ts_key_enum_1.Key.ArrowRight:
                    case ' ':
                        ev.preventDefault();
                }
            }
        });
        document.addEventListener("keyup", (ev) => {
            let key = ev.key;
            if (key.length == 1) {
                const code = key.charCodeAt(0);
                if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0))
                    key = key.toLowerCase();
            }
            this.currentKeys[key] = false;
        });
        this.currentButtons = [false, false, false];
        this.previousButtons = [false, false, false];
        canvas.addEventListener("click", (ev) => {
            canvas.focus();
            ev.preventDefault();
            this.currentButtons[ev.button] = true;
        });
        canvas.addEventListener("mouseup", (ev) => {
            ev.preventDefault();
            this.currentButtons[ev.button] = false;
        });
        this.currentMousePosition = gl_matrix_1.vec2.fromValues(0, 0);
        this.perviousMousePosition = gl_matrix_1.vec2.fromValues(0, 0);
        canvas.addEventListener("mousemove", (ev) => {
            ev.preventDefault();
            if (this.pointerLocked) {
                this.currentMousePosition[0] += ev.movementX;
                this.currentMousePosition[1] += ev.movementY;
            }
            else {
                gl_matrix_1.vec2.set(this.currentMousePosition, ev.pageX - canvas.offsetLeft, ev.pageY - canvas.offsetTop);
            }
            if (this.firstMouseMove) {
                gl_matrix_1.vec2.copy(this.perviousMousePosition, this.currentMousePosition);
                this.firstMouseMove = false;
            }
        });
        this.previousWheelPosition = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this.currentWheelPosition = gl_matrix_1.vec3.fromValues(0, 0, 0);
        canvas.addEventListener("wheel", (ev) => {
            ev.preventDefault();
            this.currentWheelPosition[0] += ev.deltaX;
            this.currentWheelPosition[1] += ev.deltaY;
            this.currentWheelPosition[2] += ev.deltaZ;
        });
        canvas.addEventListener("drag", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("dragend", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("dragenter", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("dragexit", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("dragleave", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("dragover", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("dragstart", (ev) => { ev.preventDefault(); });
        canvas.addEventListener("drop", (ev) => { ev.preventDefault(); });
        document.addEventListener("pointerlockchange", () => { this.pointerLocked = (document.pointerLockElement == canvas); }, false);
    }
    update() {
        for (let key in ts_key_enum_1.Key) {
            this.previousKeys[key] = this.currentKeys[key];
        }
        for (let ascii = 32; ascii < 127; ascii++) {
            const key = String.fromCharCode(ascii);
            this.previousKeys[key] = this.currentKeys[key];
        }
        for (let button = 0; button < 3; button++) {
            this.previousButtons[button] = this.currentButtons[button];
        }
        gl_matrix_1.vec2.copy(this.perviousMousePosition, this.currentMousePosition);
        gl_matrix_1.vec3.copy(this.previousWheelPosition, this.currentWheelPosition);
    }
    isKeyDown(key) { return this.currentKeys[key]; }
    isKeyUp(key) { return !this.currentKeys[key]; }
    isKeyJustDown(key) { return this.currentKeys[key] && !this.previousKeys[key]; }
    isKeyJustUp(key) { return !this.currentKeys[key] && this.previousKeys[key]; }
    isButtonDown(button) { return this.currentButtons[button]; }
    isButtonUp(button) { return !this.currentButtons[button]; }
    isButtonJustDown(button) { return this.currentButtons[button] && !this.previousButtons[button]; }
    isButtonJustUp(button) { return !this.currentButtons[button] && this.previousButtons[button]; }
    get MousePosition() { return gl_matrix_1.vec2.copy(gl_matrix_1.vec2.create(), this.currentMousePosition); }
    get MouseDelta() { return gl_matrix_1.vec2.sub(gl_matrix_1.vec2.create(), this.currentMousePosition, this.perviousMousePosition); }
    get WheelPosition() { return gl_matrix_1.vec3.copy(gl_matrix_1.vec3.create(), this.currentWheelPosition); }
    get WheelDelta() { return gl_matrix_1.vec3.sub(gl_matrix_1.vec3.create(), this.currentWheelPosition, this.previousWheelPosition); }
    requestPointerLock() { this.canvas.requestPointerLock(); }
    exitPointerLock() { document.exitPointerLock(); }
    isPointerLocked() { return this.pointerLocked; }
}
exports.default = Input;
//# sourceMappingURL=input.js.map