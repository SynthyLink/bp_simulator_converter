"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubescapeDemo = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const demo_1 = require("../demo");
const cubegeometry_1 = require("./cubegeometry");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
const _gEye = webgl_operate_1.vec3.fromValues(1.5, -0.2, 1.5); //vec3.fromValues(1.0, -0.5, -1.0);
const _gCenter = webgl_operate_1.vec3.fromValues(0.0, -1.0, 0.0);
const _gUp = webgl_operate_1.vec3.fromValues(0.0, 1.0, 0.0);
class CubescapeRenderer extends webgl_operate_2.Renderer {
    _defaultFBO;
    _camera;
    _navigation;
    _geometry;
    _program;
    _uViewProjection;
    _aVertex;
    _numCubes = 128;
    _patches;
    _terrain;
    onUpdate() {
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    onPrepare() {
        if (this._altered.canvasSize) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._geometry.count = this._numCubes;
        this._altered.reset();
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        // bind FBO
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.DEPTH_BUFFER_BIT, true, true);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        gl.uniform1i(this._program.uniform('u_numcubes'), this._geometry.count);
        gl.uniform1f(this._program.uniform('u_time'), window.performance.now() * 0.0002);
        this._terrain.bind(gl.TEXTURE0);
        this._patches.bind(gl.TEXTURE1);
        gl.uniform1i(this._program.uniform('u_terrain'), 0);
        gl.uniform1i(this._program.uniform('u_patches'), 1);
        this._geometry.bind();
        this._geometry.draw();
        this._geometry.unbind();
        this._program.unbind();
        gl.cullFace(gl.BACK);
        gl.disable(gl.CULL_FACE);
    }
    onSwap() {
        this.invalidate();
    }
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        context.enable(['ANGLE_instanced_arrays']);
        const internalFormatAndType = webgl_operate_2.Wizard.queryInternalTextureFormat(this._context, gl.RGB, webgl_operate_2.Wizard.Precision.byte);
        this._terrain = new webgl_operate_2.Texture2D(this._context);
        this._terrain.initialize(64, 64, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        this._terrain.wrap(gl.REPEAT, gl.REPEAT);
        this._terrain.filter(gl.LINEAR, gl.LINEAR);
        this._terrain.fetch('/demos/data/cubescape-terrain.png');
        this._patches = new webgl_operate_2.Texture2D(this._context);
        this._patches.initialize(64, 16, internalFormatAndType[0], gl.RGB, internalFormatAndType[1]);
        this._patches.wrap(gl.REPEAT, gl.REPEAT);
        this._patches.filter(gl.NEAREST, gl.NEAREST);
        this._patches.fetch('/demos/data/cubescape-patches.png');
        // init cube geometry
        this._geometry = new cubegeometry_1.CubeGeometry(this._context, 'cubes'); // TODO not 16 every time
        this._geometry.initialize();
        // init program
        const vert = new webgl_operate_2.Shader(this._context, gl.VERTEX_SHADER, 'cube.vert');
        vert.initialize(require('./cube.vert'));
        const frag = new webgl_operate_2.Shader(this._context, gl.FRAGMENT_SHADER, 'cube.frag');
        frag.initialize(require('./cube.frag'));
        this._program = new webgl_operate_2.Program(this._context);
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._geometry.vertexLocation);
        this._program.attribute('a_instances', this._geometry.instanceLocation);
        this._program.link();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        // init camera
        if (this._camera === undefined) {
            this._camera = new webgl_operate_2.Camera();
            this._camera.eye = _gEye;
            this._camera.center = _gCenter;
            this._camera.up = _gUp;
            this._camera.near = 0.1;
            this._camera.far = 4.0;
        }
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        return true;
    }
    onUninitialize() {
        this._geometry.uninitialize();
        this._patches.uninitialize();
        this._terrain.uninitialize();
        this._defaultFBO.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
    }
}
class CubescapeDemo extends demo_1.Demo {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: true });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new CubescapeRenderer();
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
exports.CubescapeDemo = CubescapeDemo;
//# sourceMappingURL=cubescape.js.map