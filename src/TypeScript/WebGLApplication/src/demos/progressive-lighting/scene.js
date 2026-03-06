"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const webgl_operate_1 = require("webgl-operate");
const arealight_1 = require("./arealight");
class Scene {
    _uri;
    _camera;
    _sphereLights;
    _diskLights;
    constructor(uri, camera, nearPlane, farPlane) {
        this._uri = uri;
        this._camera = camera;
        this._camera.near = nearPlane;
        this._camera.far = farPlane;
        this._sphereLights = new Array();
        this._diskLights = new Array();
    }
    addSphereLight(light) {
        this._sphereLights.push(light);
    }
    addDiskLight(light) {
        this._diskLights.push(light);
    }
    get uri() {
        return this._uri;
    }
    get camera() {
        return this._camera;
    }
    get sphereLights() {
        return this._sphereLights;
    }
    get diskLights() {
        return this._diskLights;
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map