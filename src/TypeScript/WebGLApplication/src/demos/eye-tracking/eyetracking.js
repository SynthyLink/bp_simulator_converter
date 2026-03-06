"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyeTrackingDemo = exports.EyeTrackingRenderer = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const demo_1 = require("../demo");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class EyeTrackingRenderer extends webgl_operate_2.Renderer {
    _camera;
    _navigation;
    _cuboid;
    _program;
    _uViewProjection;
    _defaultFBO;
    _eyeGazeDataStreams;
    _eventHandler;
    constructor(eyeGazeDataStreams) {
        super();
        this._eyeGazeDataStreams = eyeGazeDataStreams;
    }
    onUpdate() {
        // Update camera navigation (process events)
        this._navigation.update();
        this._eventHandler.update();
        return this._altered.any || this._camera.altered;
    }
    onPrepare() {
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._camera.viewport = this._canvasSize;
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame() {
        const gl = this._context.gl;
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, gl.GL_FALSE, this._camera.viewProjection);
        this._cuboid.bind();
        this._cuboid.draw();
        this._cuboid.unbind();
        this._program.unbind();
        gl.cullFace(gl.BACK);
        gl.disable(gl.CULL_FACE);
    }
    onSwap() { }
    onInitialize(context, callback, eventProvider) {
        /* Create event handler that listens to eye gaze events. */
        this._eventHandler = new webgl_operate_2.EventHandler(callback, eventProvider);
        /* Listen to eye gaze events. */
        this._eventHandler.pushEyeGazeDataHandler((latests, previous) => console.log(latests, previous));
        this._eventHandler.pushEyeGazeServerMessageHandler((latests, previous) => console.log(latests, previous));
        this._eventHandler.pushEyeGazeConnectionStatusHandler((latests, previous) => console.log(latests, previous));
        this._eventHandler.pushEyeGazeBinaryMessageParsingErrorHandler((latests, previous) => console.log(latests, previous));
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        const gl = context.gl;
        this._cuboid = new webgl_operate_2.CuboidGeometry(context, 'Cuboid', true, [2.0, 2.0, 2.0]);
        this._cuboid.initialize();
        const vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'mesh.vert');
        vert.initialize(require('./mesh.vert'));
        const frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'mesh.frag');
        frag.initialize(require('./mesh.frag'));
        this._program = new webgl_operate_2.Program(context, 'CubeProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._cuboid.vertexLocation);
        this._program.attribute('a_texCoord', this._cuboid.uvCoordLocation);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        const identity = webgl_operate_1.mat4.identity(webgl_operate_1.mat4.create());
        gl.uniformMatrix4fv(this._program.uniform('u_model'), gl.FALSE, identity);
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        gl.uniform1i(this._program.uniform('u_textured'), false);
        this._camera = new webgl_operate_2.Camera();
        this._camera.center = webgl_operate_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = webgl_operate_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = webgl_operate_1.vec3.fromValues(0.0, 0.0, 5.0);
        this._camera.near = 1.0;
        this._camera.far = 8.0;
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        return true;
    }
    onUninitialize() {
        super.uninitialize();
        this._cuboid.uninitialize();
        this._program.uninitialize();
        this._defaultFBO.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        this._altered.alter('frameSize');
        this._altered.alter('multiFrameNumber');
    }
}
exports.EyeTrackingRenderer = EyeTrackingRenderer;
class EyeTrackingDemo extends demo_1.Demo {
    static serverAddress = 'ws://localhost:1234';
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element);
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.float;
        this._canvas.clearColor.fromHex('d6d8db');
        this._canvas.frameScale = [1.0, 1.0];
        this._canvas.element.addEventListener('click', () => { this._canvas.controller.update(); });
        const eyeGazeDataStreams = new webgl_operate_2.EyeGazeDataStreams();
        eyeGazeDataStreams.gazePosition = true;
        eyeGazeDataStreams.gazeOrigin = true;
        eyeGazeDataStreams.eyePositionNormalized = true;
        eyeGazeDataStreams.headPositionAndRotation = true;
        eyeGazeDataStreams.userPresence = true;
        this._canvas.activateEyeGazeEventProvider(eyeGazeDataStreams, EyeTrackingDemo.serverAddress);
        this._renderer = new EyeTrackingRenderer(eyeGazeDataStreams);
        this._canvas.renderer = this._renderer;
        return true;
    }
    onUninitialize() {
        this._canvas.dispose();
        this._renderer.uninitialize();
    }
    get canvas() {
        return this._canvas;
    }
    get renderer() {
        return this._renderer;
    }
}
exports.EyeTrackingDemo = EyeTrackingDemo;
//# sourceMappingURL=eyetracking.js.map