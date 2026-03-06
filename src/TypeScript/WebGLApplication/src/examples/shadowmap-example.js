"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowMapExample = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
// tslint:disable:max-classes-per-file
class ShadowMapRenderer extends webgl_operate_2.Renderer {
    _cuboids;
    _plane;
    _defaultFBO;
    _navigation;
    _camera;
    _light;
    _program;
    _uViewProjection;
    _uModel;
    _uColored;
    _shadowProgram;
    _uModelS;
    _shadowPass;
    _debugPass;
    onInitialize(context, callback, eventProvider) {
        context.enable(['ANGLE_instanced_arrays', 'OES_standard_derivatives',
            'WEBGL_color_buffer_float', 'OES_texture_float', 'OES_texture_float_linear']);
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        const gl = context.gl;
        this._cuboids = new Array(4);
        for (let i = 0; i < this._cuboids.length; ++i) {
            this._cuboids[i] = new webgl_operate_2.CuboidGeometry(context, 'cube', true, [0.25, 0.5 + 0.5 * i, 2.0]);
            this._cuboids[i].initialize();
        }
        this._plane = new webgl_operate_2.PlaneGeometry(context, 'plane');
        this._plane.initialize();
        this._plane.scale = webgl_operate_1.vec2.fromValues(5.0, 5.0);
        if (this._camera === undefined) {
            this._camera = new webgl_operate_2.Camera();
            this._camera.center = webgl_operate_1.vec3.fromValues(0.0, 0.75, 0.0);
            this._camera.up = webgl_operate_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._camera.eye = webgl_operate_1.vec3.fromValues(1.8, 2.6, 3.4);
            this._camera.near = 2.0;
            this._camera.far = 11.0;
        }
        if (this._light === undefined) {
            this._light = new webgl_operate_2.Camera();
            this._light.center = webgl_operate_1.vec3.fromValues(0.0, 0.75, 0.0);
            this._light.up = webgl_operate_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._light.eye = webgl_operate_1.vec3.fromValues(-3.0, 5.0, 4.0);
            this._light.fovy = 30.0;
            this._light.near = 4.0;
            this._light.far = 20.0;
        }
        const vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'mesh-shadowed.vert');
        vert.initialize(require('./data/mesh-shadowed.vert'));
        const frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'mesh-shadowed.frag');
        frag.initialize(require('./data/mesh-shadowed.frag'));
        this._program = new webgl_operate_2.Program(context, 'MeshShadowedProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_vertex', this._cuboids[0].vertexLocation);
        this._program.attribute('a_texCoord', this._cuboids[0].uvCoordLocation);
        this._program.link();
        this._program.bind();
        gl.uniform2f(this._program.uniform('u_lightNearFar'), this._light.near, this._light.far);
        gl.uniformMatrix4fv(this._program.uniform('u_lightViewProjection'), false, this._light.viewProjection);
        gl.uniform3fv(this._program.uniform('u_lightPosition'), this._light.eye);
        gl.uniform1i(this._program.uniform('u_shadowMap'), 0);
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uModel = this._program.uniform('u_model');
        this._uColored = this._program.uniform('u_colored');
        const shadowVert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'shadow.vert');
        shadowVert.initialize(require('./data/shadow.vert'));
        const shadowFrag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'shadow.frag');
        shadowFrag.initialize(require('./data/shadow.frag'));
        this._shadowProgram = new webgl_operate_2.Program(context);
        this._shadowProgram.initialize([shadowVert, shadowFrag], false);
        this._shadowProgram.attribute('a_vertex', this._cuboids[0].vertexLocation);
        this._shadowProgram.link();
        this._shadowProgram.bind();
        gl.uniform2f(this._shadowProgram.uniform('u_lightNearFar'), this._light.near, this._light.far);
        gl.uniformMatrix4fv(this._shadowProgram.uniform('u_lightViewProjection'), false, this._light.viewProjection);
        gl.uniform3fv(this._shadowProgram.uniform('u_lightPosition'), this._light.eye);
        this._uModelS = this._shadowProgram.uniform('u_model');
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._shadowPass = new webgl_operate_2.ShadowPass(context);
        this._shadowPass.initialize(webgl_operate_2.ShadowPass.ShadowMappingType.HardLinear, [1024, 1024], [1024, 1024]);
        this._debugPass = new webgl_operate_2.DebugPass(context);
        this._debugPass.initialize();
        this._debugPass.framebuffer = this._shadowPass.shadowMapFBO;
        this._debugPass.readBuffer = gl.COLOR_ATTACHMENT0;
        this._debugPass.target = this._defaultFBO;
        this._debugPass.drawBuffer = gl.BACK;
        this.finishLoading();
        return true;
    }
    onUninitialize() {
        super.uninitialize();
        this._defaultFBO.uninitialize();
        for (const cuboid of this._cuboids) {
            cuboid.uninitialize();
        }
        this._plane.uninitialize();
        this._shadowPass.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        this._altered.alter('frameSize');
    }
    onUpdate() {
        this._navigation.update();
        return this._camera.altered;
    }
    onPrepare() {
        if (this._altered.frameSize) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._debugPass.dstBounds = webgl_operate_1.vec4.fromValues(this._canvasSize[0] * (1.0 - 0.187), this._canvasSize[1] * (1.0 - 0.187 * this._camera.aspect), this._canvasSize[0] * (1.0 - 0.008), this._canvasSize[1] * (1.0 - 0.008 * this._camera.aspect));
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        if (this._camera.altered) {
            this._debugPass.far = this._camera.far;
            this._debugPass.near = this._camera.near;
        }
        this._camera.altered = false;
        this._altered.reset();
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        this._shadowPass.frame(() => {
            gl.enable(gl.DEPTH_TEST);
            this._shadowProgram.bind();
            this.drawCuboids(this._uModelS);
            this._shadowProgram.unbind();
            gl.disable(gl.DEPTH_TEST);
        });
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        this._shadowPass.shadowMapTexture.bind(gl.TEXTURE0);
        gl.uniform1i(this._uColored, Number(true));
        this.drawCuboids(this._uModel);
        gl.uniform1i(this._uColored, Number(false));
        gl.uniformMatrix4fv(this._uModel, false, this._plane.transformation);
        this._plane.bind();
        this._plane.draw();
        this._program.unbind();
        this._shadowPass.shadowMapTexture.unbind();
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
    }
    onSwap() {
        this._debugPass.frame();
    }
    drawCuboids(model) {
        const gl = this._context.gl;
        const M = webgl_operate_1.mat4.create();
        for (let i = 0; i < this._cuboids.length; ++i) {
            const x = i * 0.5 - 0.75;
            const y = this._cuboids[i].extent[1] * 0.5;
            webgl_operate_1.mat4.fromTranslation(M, webgl_operate_1.vec3.fromValues(-x, y, 0.0));
            gl.uniformMatrix4fv(model, false, M);
            this._cuboids[i].bind();
            this._cuboids[i].draw();
        }
    }
    drawPlane(model) {
    }
}
class ShadowMapExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element);
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._canvas.clearColor.fromHex('ffffff');
        this._renderer = new ShadowMapRenderer();
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
exports.ShadowMapExample = ShadowMapExample;
//# sourceMappingURL=shadowmap-example.js.map