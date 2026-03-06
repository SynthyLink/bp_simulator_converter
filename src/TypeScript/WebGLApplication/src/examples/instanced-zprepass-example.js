"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstancedZPrepassExample = exports.InstancedZPrepassRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class InstancedZPrepassRenderer extends webgl_operate_1.Renderer {
    _benchmark;
    _camera;
    _navigation;
    _depthRenderTarget;
    _colorRenderTexture;
    _intermediateFBO;
    _cuboid;
    _texture;
    _framebuffer;
    _program;
    _uViewProjection;
    _uDrawMode;
    _uNumInstances;
    _defaultFBO;
    _blit;
    _depthTargetIsTexture = false;
    // Example Options
    _numCubes = 7;
    _enableCullFace = true;
    _enableDepthTest = true;
    _enableDepthWrite = true;
    _enablePreZPass = true;
    _enableHeavyFrag = false;
    _enableColorClear = true;
    _enableDepthClear = true;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = context.gl;
        const gl2facade = context.gl2facade;
        this._defaultFBO = new webgl_operate_1.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        const internalFormatAndType = webgl_operate_1.Wizard.queryInternalTextureFormat(context, gl.RGBA, webgl_operate_1.Wizard.Precision.half);
        this._colorRenderTexture = new webgl_operate_1.Texture2D(context, 'ColorRenderTexture');
        this._colorRenderTexture.initialize(1, 1, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        this._colorRenderTexture.filter(gl.LINEAR, gl.LINEAR);
        this._depthTargetIsTexture = !context.isWebGL1 || context.supportsDepthTexture;
        if (this._depthTargetIsTexture) {
            this._depthRenderTarget = new webgl_operate_1.Texture2D(context, 'DepthRenderTexture');
            if (context.isWebGL1 && context.supportsDepthTexture)
                this._depthRenderTarget.initialize(1, 1, gl.DEPTH_COMPONENT, gl.DEPTH_STENCIL, gl.context.depthTexture.UNSIGNED_INT_24_8_WEBGL);
            else {
                // this._depthRenderTarget.initialize(1, 1, gl.DEPTH24_STENCIL8, gl.DEPTH_STENCIL, gl.UNSIGNED_INT_24_8);
                this._depthRenderTarget.initialize(1, 1, gl.DEPTH_COMPONENT24, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT);
            }
            this._depthRenderTarget.filter(gl.NEAREST, gl.NEAREST);
        }
        else {
            this._depthRenderTarget = new webgl_operate_1.Renderbuffer(context, 'DepthRenderbuffer');
            this._depthRenderTarget.initialize(1, 1, gl.DEPTH_COMPONENT16);
        }
        this._intermediateFBO = new webgl_operate_1.Framebuffer(context, 'IntermediateFBO');
        this._intermediateFBO.initialize([
            [gl2facade.COLOR_ATTACHMENT0, this._colorRenderTexture],
            [gl.DEPTH_ATTACHMENT, this._depthRenderTarget]
        ]);
        // [gl.DEPTH_STENCIL_ATTACHMENT, this._depthRenderTarget]]);
        this._framebuffer = new webgl_operate_1.DefaultFramebuffer(context, 'DefaultFBO');
        this._framebuffer.initialize();
        this._cuboid = new webgl_operate_1.CuboidGeometry(context, 'Cuboid', true, [2.0, 2.0, 2.0]);
        this._cuboid.initialize();
        const vert = new webgl_operate_1.Shader(context, gl.VERTEX_SHADER, 'instanced-zpre.vert');
        vert.initialize(require('./data/instanced-zpre.vert'));
        const frag = new webgl_operate_1.Shader(context, gl.FRAGMENT_SHADER, 'instanced-zpre.frag');
        frag.initialize(require('./data/instanced-zpre.frag'));
        this._program = new webgl_operate_1.Program(context, 'InstancedZPreProgram');
        this._program.initialize([vert, frag], true);
        this._program.link();
        this._program.bind();
        gl.uniform1f(this._program.uniform('u_seed'), Math.random());
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uNumInstances = this._program.uniform('u_numInstances');
        this._uDrawMode = this._program.uniform('u_drawMode');
        const identity = gl_matrix_1.mat4.identity(gl_matrix_1.mat4.create());
        gl.uniformMatrix4fv(this._program.uniform('u_model'), false, identity);
        gl.uniform1i(this._program.uniform('u_texture'), 0);
        gl.uniform1i(this._program.uniform('u_textured'), false);
        this._texture = new webgl_operate_1.Texture2D(context, 'Texture');
        this._texture.initialize(1, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
        this._texture.wrap(gl.REPEAT, gl.REPEAT);
        this._texture.filter(gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR);
        this._texture.maxAnisotropy(webgl_operate_1.Texture2D.MAX_ANISOTROPY);
        this._texture.fetch('/examples/data/blue-painted-planks-diff-1k-modified.webp').then(() => {
            const gl = context.gl;
            this._program.bind();
            gl.uniform1i(this._program.uniform('u_textured'), true);
            this.finishLoading();
            this.invalidate(true);
        });
        /* Create and configure camera. */
        this._camera = new webgl_operate_1.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.3, 0.2, 0.5);
        this._camera.near = 0.05;
        this._camera.far = 32.0;
        /* Create and configure navigation */
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._blit = new webgl_operate_1.BlitPass(this._context);
        this._blit.initialize();
        this._blit.framebuffer = this._intermediateFBO;
        this._blit.readBuffer = gl2facade.COLOR_ATTACHMENT0;
        this._blit.target = this._defaultFBO;
        this._blit.drawBuffer = gl.BACK;
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
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
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * Updates the navigaten and the AntiAliasingKernel.
     * @returns whether to redraw
     */
    onUpdate() {
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        const gl = this._context.gl;
        if (this._altered.frameSize) {
            this._intermediateFBO.resize(this._frameSize[0], this._frameSize[1]);
            this._camera.viewport = this._canvasSize;
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            // this._program.bind();
            // gl.uniform2f(this._program.uniform('u_frameSize'), this._canvasSize[0], this._canvasSize[1]);
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
            this._intermediateFBO.clearColor(this._clearColor);
            this._program.bind();
            gl.uniform4f(this._program.uniform('u_clearColor'), this._clearColor[0], this._clearColor[1], this._clearColor[2], this._clearColor[3]);
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        this._intermediateFBO.bind();
        this._intermediateFBO.clear((this._enableColorClear ? gl.COLOR_BUFFER_BIT : gl.NONE) |
            (this._enableDepthClear ? gl.DEPTH_BUFFER_BIT : gl.NONE), false, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        this._texture.bind(gl.TEXTURE0);
        this._program.bind();
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        // gl.uniform2fv(this._uNdcOffset, ndcOffset);
        const instanceCount = this._numCubes ** 3;
        gl.uniform1i(this._uNumInstances, this._numCubes);
        gl.uniform1i(this._uDrawMode, 0);
        this._cuboid.bind();
        if (this._enablePreZPass) {
            gl.enable(gl.CULL_FACE);
            gl.cullFace(gl.BACK);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LESS);
            gl.depthMask(true);
            gl.colorMask(false, false, false, false);
            gl.uniform1i(this._uDrawMode, 0);
            gl.drawElementsInstanced(gl.TRIANGLE_STRIP, this._cuboid.count, gl.UNSIGNED_BYTE, 0, instanceCount);
            gl.depthFunc(gl.EQUAL);
            gl.depthMask(false);
            gl.colorMask(true, true, true, true);
            gl.uniform1i(this._uDrawMode, this._enableHeavyFrag ? 4 : 3);
            gl.drawElementsInstanced(gl.TRIANGLE_STRIP, this._cuboid.count, gl.UNSIGNED_BYTE, 0, instanceCount);
            gl.depthFunc(gl.LESS);
            gl.depthMask(true);
        }
        else {
            if (this._enableCullFace) {
                gl.enable(gl.CULL_FACE);
                gl.cullFace(gl.BACK);
            }
            else {
                gl.disable(gl.CULL_FACE);
            }
            gl.depthMask(this._enableDepthWrite);
            if (this._enableDepthTest) {
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LESS);
            }
            else {
                gl.disable(gl.DEPTH_TEST);
            }
            gl.uniform1i(this._uDrawMode, this._enableHeavyFrag ? 2 : 1);
            gl.drawElementsInstanced(gl.TRIANGLE_STRIP, this._cuboid.count, gl.UNSIGNED_BYTE, 0, instanceCount);
        }
        gl.disable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        this._cuboid.unbind();
        this._program.unbind();
        this._texture.unbind(gl.TEXTURE0);
    }
    onSwap() {
        if (this._benchmark && this._benchmark.running) {
            this._benchmark.frame();
            this.invalidate(true);
        }
        // const gl = this._context.gl;
        // this._blit.readBuffer = gl.DEPTH_ATTACHMENT;
        this._blit.frame();
    }
    benchmark(value) {
        if (!this._benchmark) {
            this._benchmark = new webgl_operate_1.Benchmark();
        }
        this._benchmark.initialize(value ? 1 : 8, 100, 100, (frame, framesForWarmup, framesPerCycle, cycle) => {
            // called per frame benchmarked ...
            this._numCubes = value ? value : (cycle < 0 ? 15 : 1 + (cycle * 4));
            const phi = Math.PI * 2.0 * 1.0 / (cycle < 0 ? framesForWarmup : framesPerCycle) * frame;
            this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
            this._camera.eye = gl_matrix_1.vec3.fromValues(0.5 * Math.sin(phi), Math.sin(phi) * 0.1, 0.5 * Math.cos(phi));
        }, (cycles, framesForWarmup, framesPerCycle, results) => {
            console.log(`BENCHMARK CONFIG`);
            console.log(`frame: ${this._frameSize}, #cubes: ${this._numCubes ** 3}, cull: ${this._enableCullFace}, depth: ${this._enableDepthTest}, heavy: ${this._enableHeavyFrag}, prez: ${this._enablePreZPass}`);
        });
        this.invalidate(true);
    }
    set numCubes(value) {
        this._numCubes = value;
        this.invalidate(true);
    }
    ;
    set enableCullFace(value) {
        this._enableCullFace = value;
        this.invalidate(true);
    }
    ;
    set enableDepthTest(value) {
        this._enableDepthTest = value;
        this.invalidate(true);
    }
    ;
    set enableDepthWrite(value) {
        this._enableDepthWrite = value;
        this.invalidate(true);
    }
    ;
    set enablePreZPass(value) {
        this._enablePreZPass = value;
        this.invalidate(true);
    }
    ;
    set enableHeavyFrag(value) {
        this._enableHeavyFrag = value;
        this.invalidate(true);
    }
    ;
    set enableColorClear(value) {
        this._enableColorClear = value;
        this.invalidate(true);
    }
    ;
    set enableDepthClear(value) {
        this._enableDepthClear = value;
        this.invalidate(true);
    }
    ;
}
exports.InstancedZPrepassRenderer = InstancedZPrepassRenderer;
class InstancedZPrepassExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new InstancedZPrepassRenderer();
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
exports.InstancedZPrepassExample = InstancedZPrepassExample;
//# sourceMappingURL=instanced-zprepass-example.js.map