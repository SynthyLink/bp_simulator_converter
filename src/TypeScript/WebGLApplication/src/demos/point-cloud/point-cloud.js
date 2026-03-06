"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointCloudDemo = exports.PointCloudRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const demo_1 = require("../demo");
// import { Benchmark } from './benchmark';
const csv_import_1 = require("./csv-import");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class PointCloudRenderer extends webgl_operate_2.Renderer {
    static DEFAULT_POINT_SIZE = 1.0 / 8.0;
    // protected _benchmark: Benchmark;
    _camera;
    _navigation;
    _model;
    _particleVBO;
    _instancesVBO;
    _uvLocation = 0;
    _positionLocation = 1;
    _data = new Array(0);
    _push = false;
    _drawIndex = -1;
    _drawRanges;
    // protected _triangles = 6;
    _program;
    _pointSize = PointCloudRenderer.DEFAULT_POINT_SIZE;
    _billboards = true;
    _alpha2Coverage = false;
    _alphaBlending = false;
    _phongShading = true;
    _renderingConfigAltered = true;
    _uModel;
    _uView;
    _uViewProjection;
    _uLight;
    _defaultFBO;
    /**
     * Initializes and sets up buffer, cube geometry, camera and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = context.gl;
        const gl2facade = context.gl2facade;
        context.enable(['ANGLE_instanced_arrays']);
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._defaultFBO.bind();
        const floatSize = context.byteSizeOfFormat(gl.R32F);
        const particle = new Float32Array([-1.0, -1.0, +1.0, -1.0, +1.0, +1.0, -1.0, +1.0]);
        // Generate triangle fan geometry of n triangles:
        // const hypotenuse = Math.sqrt(1 + Math.pow(Math.tan(Math.PI / this._triangles), 2.0));
        // const particle = new Float32Array(2 * (2 + this._triangles));
        // particle[0] = 0.0;
        // particle[1] = 0.0;
        // for (let i = 0; i <= this._triangles; ++i) {
        //     const alpha = i * (2.0 * Math.PI / this._triangles);
        //     particle[i * 2 + 2] = Math.cos(alpha) * hypotenuse;
        //     particle[i * 2 + 3] = Math.sin(alpha) * hypotenuse;
        // }
        this._particleVBO = new webgl_operate_2.Buffer(context, 'particleVBO');
        this._particleVBO.initialize(gl.ARRAY_BUFFER);
        this._particleVBO.attribEnable(this._uvLocation, 2, gl.FLOAT, false, 2 * floatSize, 0, true, false);
        gl2facade.vertexAttribDivisor(this._uvLocation, 0);
        this._particleVBO.data(particle, gl.STATIC_DRAW);
        this._instancesVBO = new webgl_operate_2.Buffer(context, 'instancesVBO');
        this._instancesVBO.initialize(gl.ARRAY_BUFFER);
        this._instancesVBO.attribEnable(this._positionLocation, 3, gl.FLOAT, false, 3 * floatSize, 0, true, false);
        gl2facade.vertexAttribDivisor(this._positionLocation, 1);
        // this._instancesVBO.data(this._data[i], gl.DYNAMIC_DRAW);
        const vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'particle.vert');
        vert.initialize(require('./particle.vert'));
        const frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'particle.frag');
        frag.initialize(require('./particle.frag'));
        this._program = new webgl_operate_2.Program(context, 'ParticleProgram');
        this._program.initialize([vert, frag], false);
        this._program.attribute('a_uv', this._uvLocation);
        this._program.attribute('a_position', this._positionLocation);
        this._program.link();
        this._program.bind();
        this._uModel = this._program.uniform('u_model');
        this._uView = this._program.uniform('u_view');
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uLight = this._program.uniform('u_light');
        this._camera = new webgl_operate_2.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 5.0);
        this._camera.near = 0.1;
        this._camera.far = 5.0 + Math.sqrt(32.0); // 1² + 1² -> range in that particles are generated ...
        gl.uniform2f(this._program.uniform('u_nearFar'), this._camera.near, this._camera.far);
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this._model = gl_matrix_1.mat4.fromRotationTranslationScale(gl_matrix_1.mat4.create(), gl_matrix_1.quat.create(), [0.0, 0.0, 0.0], [2.0, 2.0, 2.0]);
        const positions = new Float32Array(1 * 1e4);
        positions.forEach((value, index, array) => array[index] = Math.random() * 5.0 - 2.5);
        this.data = new Array(positions);
        // prepare draw binding
        this._defaultFBO.bind();
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.DEPTH_TEST);
        this._particleVBO.bind();
        this._instancesVBO.bind();
        this._program.bind();
        this._alphaBlending = true;
        this._alpha2Coverage = context.antialias;
        return true;
    }
    /**
     * Uninitializes buffers, geometry and program.
     */
    onUninitialize() {
        super.uninitialize();
        this._particleVBO.attribDisable(this._uvLocation);
        this._particleVBO.uninitialize();
        this._instancesVBO.attribDisable(this._positionLocation);
        this._instancesVBO.uninitialize();
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
     * @returns whether to redraw
     */
    onUpdate() {
        this._navigation.update();
        // return this._altered.any || this._camera.altered || this._renderingConfigAltered;
        return true;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        const gl = this._context.gl;
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
            this._camera.viewport = this._canvasSize;
            gl.uniform2f(this._program.uniform('u_size'), this._pointSize, this._frameSize[0]);
        }
        if (this._altered.clearColor) {
            this._defaultFBO.clearColor(this._clearColor);
        }
        this._altered.reset();
        this._camera.altered = false;
        // Create full float32 array containing all provided data set.
        if (this._push) {
            const range = this._drawRanges[this._data.length - 1];
            const buffer = new Float32Array(range[0] + range[1]);
            for (let i = 0; i < this._data.length; ++i) {
                buffer.set(this._data[i], this._drawRanges[i][0]);
            }
            this._instancesVBO.data(buffer, gl.STATIC_DRAW);
            this._push = false;
        }
        if (!this._renderingConfigAltered) {
            return;
        }
        gl.uniform2f(this._program.uniform('u_size'), this._pointSize, this._frameSize[0]);
        gl.uniform2i(this._program.uniform('u_mode'), !this._billboards, this._phongShading);
        // enable alpha to coverage and appropriate blending (if context was initialized with antialiasing enabled)
        if (this._alpha2Coverage) {
            gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
            gl.sampleCoverage(1.0, false);
        }
        else {
            gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
        }
        if (this._alphaBlending) {
            gl.enable(gl.BLEND);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        }
        else {
            gl.disable(gl.BLEND);
        }
        this._renderingConfigAltered = false;
    }
    onFrame() {
        const gl = this._context.gl;
        const gl2facade = this.context.gl2facade;
        this._defaultFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        gl.uniformMatrix4fv(this._uModel, false, this._model);
        gl.uniformMatrix4fv(this._uView, false, this._camera.view);
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        const light = gl_matrix_1.vec4.fromValues(-2.0, 2.0, 4.0, 0.0);
        gl_matrix_1.vec4.normalize(light, gl_matrix_1.vec4.transformMat4(light, light, this._camera.view));
        gl.uniform3f(this._uLight, light[0], light[1], light[2]);
        if (this._drawIndex < 0) {
            return;
        }
        const first = this._drawRanges[this._drawIndex][0];
        const instanceCount = this._drawRanges[this._drawIndex][1] / 3;
        this._instancesVBO.attribEnable(this._positionLocation, 3, gl.FLOAT, false, 3 * 4, first * 4, true, false);
        if (this._billboards) {
            gl2facade.drawArraysInstanced(gl.TRIANGLE_FAN, 0, 4, instanceCount);
        }
        else {
            gl2facade.drawArraysInstanced(gl.POINTS, 0, 1, instanceCount);
        }
    }
    onSwap() {
        // if (this._benchmark && this._benchmark.running) {
        //     this._benchmark.frame();
        //     this.invalidate(true);
        // }
        if (this._data.length > 1) {
            this.draw = (this._drawIndex + 1) % this._data.length;
            this.invalidate(true);
        }
    }
    set data(data) {
        this._data = data;
        this._drawRanges = new Array(data.length);
        let index = 0;
        for (let i = 0; i < data.length; ++i) {
            this._drawRanges[i] = [index, data[i].length];
            index += data[i].length;
        }
        this.draw = 0;
        this._push = true;
    }
    set draw(index) {
        if (this._drawIndex === index) {
            return;
        }
        this._drawIndex = index;
    }
    // benchmark(): void {
    //     if (!this._benchmark) {
    //         this._benchmark = new Benchmark();
    //     }
    //     const values = [0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 2e6, 4e6, 6e6, 8e6, 10e6, 12e6, 14e6, 16e6];
    //     const numPointsRendered = this._numPointsToRender;
    //     this._benchmark.initialize(values.length, 1000, 100,
    //         (frame: number, framesForWarmup: number, framesPerCycle: number, cycle: number): void => {
    //             // called per frame benchmarked ...
    //             const phi = Math.PI * 2.0 * 1.0 / (cycle < 0 ? framesForWarmup : framesPerCycle) * frame;
    //             this._camera.up = vec3.fromValues(0.0, 1.0, 0.0);
    //             this._camera.center = vec3.fromValues(0.0, 0.0, 0.0);
    //             this._camera.eye = vec3.fromValues(4.0 * Math.sin(phi), 0.0, 4.0 * Math.cos(phi));
    //             if (cycle < 0) { // warmup
    //                 this._numPointsToRender = 1e6;
    //             } else {
    //                 this._numPointsToRender = values[cycle];
    //             }
    //         },
    //         (cycles: number, framesForWarmup: number, framesPerCycle: number, results: Array<number>): void => {
    //             console.log(`BENCHMARK CONFIG`);
    //             console.log(`frameSize: ${this._frameSize}, pointSize: ${this._pointSize}`);
    //             console.log(`alpha2Coverage: ${this._alpha2Coverage}, alphaBlending ${this._alphaBlending},
    //                 billboards: ${this._billboards}, phongShading: ${this._phongShading}`);
    //             console.log(`#cycles:  ${cycles}, #framesForWarmup: ${framesForWarmup},
    //                 #framesPerCycle: ${framesPerCycle}`);
    //             console.log(`values: ${JSON.stringify(values)}`);
    //             console.log(`BENCHMARK RESULTS`);
    //             console.log(JSON.stringify(results));
    //             this._numPointsToRender = numPointsRendered;
    //         });
    //     this.invalidate(true);
    // }
    set model(model) {
        this._model = model;
        this.invalidate(true);
    }
    set pointSize(size) {
        if (this._pointSize === size) {
            return;
        }
        this._pointSize = Math.max(0.0, Math.min(128.0, size));
        this._renderingConfigAltered = true;
        this.invalidate();
    }
    get pointSize() {
        return this._pointSize;
    }
    set alpha2Coverage(value) {
        if (this._alpha2Coverage === value) {
            return;
        }
        this._alpha2Coverage = value;
        this._renderingConfigAltered = true;
        this.invalidate();
    }
    get alpha2Coverage() {
        return this._alpha2Coverage;
    }
    set alphaBlending(value) {
        if (this._alphaBlending === value) {
            return;
        }
        this._alphaBlending = value;
        this._renderingConfigAltered = true;
        this.invalidate();
    }
    get alphaBlending() {
        return this._alphaBlending;
    }
    set billboards(value) {
        if (this._billboards === value) {
            return;
        }
        this._billboards = value;
        this._renderingConfigAltered = true;
        this.invalidate();
    }
    get billboards() {
        return this._billboards;
    }
    set phongShading(value) {
        if (this._phongShading === value) {
            return;
        }
        this._phongShading = value;
        this._renderingConfigAltered = true;
        this.invalidate();
    }
    get phongShading() {
        return this._phongShading;
    }
}
exports.PointCloudRenderer = PointCloudRenderer;
class PointCloudDemo extends demo_1.Demo {
    _canvas;
    _renderer;
    onInitialize(element) {
        const aa = webgl_operate_1.auxiliaries.GETparameter('antialias');
        this._canvas = new webgl_operate_2.Canvas(element, {
            antialias: aa === undefined ? true : JSON.parse(aa),
        });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new PointCloudRenderer();
        this._canvas.renderer = this._renderer;
        const input = document.getElementById('input-file');
        // const label = document.getElementById('label-file')! as HTMLLabelElement;
        input.addEventListener('change', () => {
            const progress = document.getElementById('progress-file');
            (0, csv_import_1.importPointsFromCSV)(input.files, progress).then(result => this._renderer.data = result);
        });
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
exports.PointCloudDemo = PointCloudDemo;
//# sourceMappingURL=point-cloud.js.map