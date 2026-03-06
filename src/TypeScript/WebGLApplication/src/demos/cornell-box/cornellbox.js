"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CornellBoxDemo = exports.CornellBoxRenderer = void 0;
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const demo_1 = require("../demo");
const cornellboxdata_1 = require("./cornellboxdata");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
// camera constants
const _gEye = webgl_operate_1.vec3.fromValues(+0.000000, +0.005102, -3.861230);
const _gCenter = webgl_operate_1.vec3.fromValues(+0.000000, +0.000000, +0.000000);
const _gUp = webgl_operate_1.vec3.fromValues(+0.000000, +1.000000, +0.000000);
// corners of axis aligned light cuboid
const light0 = webgl_operate_1.vec3.fromValues(-0.233813, +1 - 2e-2, -0.188126);
const light1 = webgl_operate_1.vec3.fromValues(+0.233813, +1 - 2e-1, +0.187411);
class CornellBoxRenderer extends webgl_operate_2.Renderer {
    _extensions = false;
    // stuff
    _camera;
    _navigation;
    _ndcTriangle;
    // program and uniforms
    _program;
    _uTransform;
    _uFrame;
    _uRand;
    _uEye;
    _uViewport;
    _ndcOffsetKernel;
    _uNdcOffset;
    // Textures
    _hsphereImage;
    _lightsImage;
    // blit and accumulate
    _accumulate;
    _blit;
    _defaultFBO;
    _colorRenderTexture;
    _depthRenderbuffer;
    _intermediateFBO;
    // for webgl1
    _verticesImage;
    _indicesImage;
    _colorsImage;
    onUpdate() {
        // Update camera navigation (process events)
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    onPrepare() {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        if (!this._intermediateFBO.initialized) {
            this._colorRenderTexture.initialize(this._frameSize[0], this._frameSize[1], this._context.isWebGL2 ? gl.RGBA8 : gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
            this._depthRenderbuffer.initialize(this._frameSize[0], this._frameSize[1], gl.DEPTH_COMPONENT16);
            this._intermediateFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._colorRenderTexture],
                [gl.DEPTH_ATTACHMENT, this._depthRenderbuffer]]);
        }
        // resize
        if (this._altered.frameSize) {
            this._intermediateFBO.resize(this._frameSize[0], this._frameSize[1]);
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        }
        if (this._altered.clearColor) {
            this._intermediateFBO.clearColor(this._clearColor);
        }
        if (this._altered.multiFrameNumber) {
            this._ndcOffsetKernel = new webgl_operate_2.AntiAliasingKernel(this._multiFrameNumber);
        }
        this._accumulate.update();
        if (this._camera.altered) {
            this._program.bind();
            gl.uniformMatrix4fv(this._uTransform, false, this._camera.viewProjectionInverse);
            gl.uniform3fv(this._uEye, this._camera.eye);
            gl.uniform4f(this._uViewport, this._camera.viewport[0], this._camera.viewport[1], 1.0 / this._camera.viewport[0], 1.0 / this._camera.viewport[1]);
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        this._intermediateFBO.bind();
        this._intermediateFBO.clear(gl.COLOR_BUFFER_BIT, false, false);
        const ndcOffset = this._ndcOffsetKernel.get(frameNumber);
        ndcOffset[0] = 2.0 * ndcOffset[0] / this._frameSize[0];
        ndcOffset[1] = 2.0 * ndcOffset[1] / this._frameSize[1];
        // set uniforms
        this._program.bind();
        gl.uniform1i(this._uFrame, frameNumber);
        gl.uniform1i(this._uRand, Math.floor(Math.random() * 1e6));
        gl.uniform2fv(this._uNdcOffset, ndcOffset);
        this._hsphereImage.bind(gl.TEXTURE0);
        this._lightsImage.bind(gl.TEXTURE1);
        // webgl1
        if (this._context.isWebGL1) {
            this._verticesImage.bind(gl.TEXTURE2);
            this._indicesImage.bind(gl.TEXTURE3);
            this._colorsImage.bind(gl.TEXTURE4);
        }
        // render geometry
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
        this._intermediateFBO.unbind();
        this._accumulate.frame(frameNumber);
    }
    onSwap() {
        if (this._accumulate.framebuffer) {
            this._blit.framebuffer = this._accumulate.framebuffer;
        }
        else {
            this._blit.framebuffer = this._intermediateFBO;
        }
        this._blit.frame();
    }
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        /* Enable required extensions. */
        if (this._extensions === false && this._context.isWebGL1) {
            webgl_operate_1.auxiliaries.assert(this._context.supportsStandardDerivatives, `expected OES_standard_derivatives support`);
            this._context.standardDerivatives;
            this._extensions = true;
        }
        if (this._camera === undefined) {
            this._camera = new webgl_operate_2.Camera();
            this._camera.eye = _gEye;
            this._camera.center = _gCenter;
            this._camera.up = _gUp;
            this._camera.near = 0.1;
            this._camera.far = 4.0;
        }
        // Initialize navigation
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        // program
        const vert = new webgl_operate_2.Shader(this._context, gl.VERTEX_SHADER, 'cornell.vert');
        vert.initialize(require('./cornell.vert'));
        const frag = new webgl_operate_2.Shader(this._context, gl.FRAGMENT_SHADER, 'cornell.frag');
        frag.initialize(require(this._context.isWebGL1 ?
            (this._context.supportsTextureFloat ? './cornell1.frag' : './cornell0.frag') :
            './cornell2.frag'));
        this._program = new webgl_operate_2.Program(this._context);
        this._program.initialize([vert, frag], false);
        // attributes
        this._ndcTriangle = new webgl_operate_2.NdcFillingTriangle(this._context);
        const aVertex = this._program.attribute('a_vertex', 0);
        this._program.link();
        // uniforms
        this._uTransform = this._program.uniform('u_transform');
        this._uFrame = this._program.uniform('u_frame');
        this._uRand = this._program.uniform('u_rand');
        this._uEye = this._program.uniform('u_eye');
        this._uViewport = this._program.uniform('u_viewport');
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_hsphere'), 0);
        gl.uniform1i(this._program.uniform('u_lights'), 1);
        this._program.unbind();
        this._ndcTriangle.initialize(aVertex);
        // CREATE HEMISPHERE PATH SAMPLES and LIGHT AREA SAMPLES
        this._hsphereImage = new webgl_operate_2.Texture2D(this._context, 'hsphereImage');
        this._lightsImage = new webgl_operate_2.Texture2D(this._context, 'lightsImage');
        const points = this.pointsOnSphere(32 * 32);
        const samplerSize = Math.floor(Math.sqrt(points.length)); // shader expects 32
        const spherePoints = new Float32Array(samplerSize * samplerSize * 3);
        for (let i = 0; i < samplerSize * samplerSize; ++i) {
            spherePoints[3 * i + 0] = points[i][0];
            spherePoints[3 * i + 1] = points[i][1];
            spherePoints[3 * i + 2] = points[i][2];
        }
        // CREATE LIGHT AREA SAMPLES
        const lights = this.pointsInLight(light0, light1, 32 * 32);
        const lights2 = new Float32Array(lights.length * 3);
        let i2 = 0;
        for (const light of lights) {
            lights2[i2++] = light[0];
            lights2[i2++] = light[1];
            lights2[i2++] = light[2];
        }
        // special case for webgl1 and no float support
        if (this._context.isWebGL1 && !this._context.supportsTextureFloat) {
            this._hsphereImage.initialize(32 * 3, 32, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
            this._hsphereImage.data(this.encodeFloatArrayAndScale(spherePoints));
            this._lightsImage.initialize(32 * 3, 32, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
            this._lightsImage.data(this.encodeFloatArrayAndScale(lights2));
        }
        else {
            const format = webgl_operate_2.Wizard.queryInternalTextureFormat(this._context, gl.RGB, webgl_operate_2.Wizard.Precision.float);
            this._hsphereImage.initialize(samplerSize, samplerSize, format[0], gl.RGB, format[1]);
            this._hsphereImage.data(spherePoints);
            this._lightsImage.initialize(32, 32, format[0], gl.RGB, format[1]);
            this._lightsImage.data(lights2);
        }
        this._hsphereImage.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        this._hsphereImage.filter(gl.NEAREST, gl.NEAREST);
        this._lightsImage.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        this._lightsImage.filter(gl.NEAREST, gl.NEAREST);
        // scene textures for webgl1
        if (this._context.isWebGL1) {
            this._program.bind();
            gl.uniform1i(this._program.uniform('u_vertices'), 2);
            gl.uniform1i(this._program.uniform('u_indices'), 3);
            gl.uniform1i(this._program.uniform('u_colors'), 4);
            this._program.unbind();
            this._verticesImage = new webgl_operate_2.Texture2D(this._context, 'verticesImage');
            this._indicesImage = new webgl_operate_2.Texture2D(this._context, 'indicesImage');
            this._colorsImage = new webgl_operate_2.Texture2D(this._context, 'colorsImage');
            this._indicesImage.initialize(cornellboxdata_1.indices.length / 4, 1, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
            this._indicesImage.data(cornellboxdata_1.indices);
            if (context.supportsTextureFloat) {
                this._verticesImage.initialize(cornellboxdata_1.vertices.length / 3, 1, gl.RGB, gl.RGB, gl.FLOAT);
                this._verticesImage.data(cornellboxdata_1.vertices);
                this._colorsImage.initialize(cornellboxdata_1.colors.length / 3, 1, gl.RGB, gl.RGB, gl.FLOAT);
                this._colorsImage.data(cornellboxdata_1.colors);
            }
            else {
                // no floats => encode float in 3 bytes
                this._verticesImage.initialize(cornellboxdata_1.vertices.length / 3 * 3, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
                this._verticesImage.data(this.encodeFloatArrayAndScale(cornellboxdata_1.vertices));
                this._colorsImage.initialize(cornellboxdata_1.colors.length / 3 * 3, 1, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE);
                this._colorsImage.data(this.encodeFloatArray(cornellboxdata_1.colors));
            }
            this._verticesImage.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
            this._verticesImage.filter(gl.NEAREST, gl.NEAREST);
            this._indicesImage.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
            this._indicesImage.filter(gl.NEAREST, gl.NEAREST);
            this._colorsImage.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
            this._colorsImage.filter(gl.NEAREST, gl.NEAREST);
        }
        this._uNdcOffset = this._program.uniform('u_ndcOffset');
        this._defaultFBO = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFBO.initialize();
        this._colorRenderTexture = new webgl_operate_2.Texture2D(this._context, 'ColorRenderTexture');
        this._depthRenderbuffer = new webgl_operate_2.Renderbuffer(this._context, 'DepthRenderbuffer');
        this._intermediateFBO = new webgl_operate_2.Framebuffer(this._context, 'IntermediateFBO');
        this._accumulate = new webgl_operate_2.AccumulatePass(this._context);
        this._accumulate.initialize(this._ndcTriangle);
        this._accumulate.precision = this._framePrecision;
        this._accumulate.texture = this._colorRenderTexture;
        this._blit = new webgl_operate_2.BlitPass(this._context);
        this._blit.initialize(this._ndcTriangle);
        this._blit.readBuffer = gl2facade.COLOR_ATTACHMENT0;
        this._blit.drawBuffer = gl.BACK;
        this._blit.target = this._defaultFBO;
        return true;
    }
    onUninitialize() {
        this._program.uninitialize();
        this._ndcTriangle.uninitialize();
        this._hsphereImage.uninitialize();
        this._lightsImage.uninitialize();
        if (this._context.isWebGL1) {
            this._verticesImage.uninitialize();
            this._indicesImage.uninitialize();
            this._colorsImage.uninitialize();
        }
        this._intermediateFBO.uninitialize();
        this._defaultFBO.uninitialize();
        this._colorRenderTexture.uninitialize();
        this._depthRenderbuffer.uninitialize();
        this._blit.uninitialize();
    }
    onDiscarded() {
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
        this._altered.alter('frameSize');
        this._altered.alter('multiFrameNumber');
    }
    // https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    shuffle(deck) {
        const randomizedDeck = Array();
        const array = deck.slice();
        while (array.length !== 0) {
            const rIndex = Math.floor(array.length * Math.random());
            randomizedDeck.push(array[rIndex]);
            array.splice(rIndex, 1);
        }
        return randomizedDeck;
    }
    pointsInLight(llf, urb, minN) {
        const lights = Array();
        const min = webgl_operate_1.vec3.min(webgl_operate_1.vec3.create(), llf, urb);
        const max = webgl_operate_1.vec3.max(webgl_operate_1.vec3.create(), llf, urb);
        const size = webgl_operate_1.vec3.subtract(webgl_operate_1.vec3.create(), max, min);
        const r = Math.ceil(Math.sqrt(1.0 * minN));
        const step = webgl_operate_1.vec3.scale(webgl_operate_1.vec3.create(), size, (1.0 - 1e-4) / (r - 1.0)); // the "<=" and floating precision
        for (let x = min[0]; x <= max[0]; x += step[0]) {
            for (let z = min[2]; z <= max[2]; z += step[2]) {
                lights.push(webgl_operate_1.vec3.fromValues(x, webgl_operate_1.auxiliaries.rand(min[1], max[1]), z));
            }
        }
        return this.shuffle(lights);
    }
    pointsOnSphere(numPoints) {
        /* Random directions in tangent space. */
        const donkey = new Array(numPoints);
        for (let i = 0; i < donkey.length; ++i) {
            const bound = 1.0 - 1e-4;
            const x = webgl_operate_1.auxiliaries.rand(-bound, bound);
            const z = webgl_operate_1.auxiliaries.rand(-bound, bound);
            const y = Math.sqrt(Math.max(1.0 - x * x - z * z, 1e-4));
            donkey[i] = webgl_operate_1.vec3.normalize(webgl_operate_1.vec3.create(), webgl_operate_1.vec3.fromValues(x, y, z));
        }
        return donkey;
    }
    fract(x) {
        return x > 0 ? x - Math.floor(x) : x - Math.ceil(x);
    }
    encode_float24x1_to_uint8x3(out, x) {
        out[0] = Math.floor(x * 255.0);
        out[1] = Math.floor(this.fract(x * 255.0) * 255.0);
        out[2] = Math.floor(this.fract(x * 65536.0) * 255.0);
        return out;
    }
    encodeFloatArray(floats) {
        const byteEncodedArray = new Uint8Array(floats.length * 3);
        for (let i = 0; i < floats.length; i++) {
            const encodedVec3 = this.encode_float24x1_to_uint8x3(webgl_operate_1.vec3.create(), floats[i]);
            byteEncodedArray[3 * i + 0] = encodedVec3[0];
            byteEncodedArray[3 * i + 1] = encodedVec3[1];
            byteEncodedArray[3 * i + 2] = encodedVec3[2];
        }
        return byteEncodedArray;
    }
    // scale from [-1..+1] to [0..1] and encode
    encodeFloatArrayAndScale(floats) {
        const byteEncodedArray = new Uint8Array(floats.length * 3);
        for (let i = 0; i < floats.length; i++) {
            const encodedVec3 = this.encode_float24x1_to_uint8x3(webgl_operate_1.vec3.create(), floats[i] * 0.5 + 0.5);
            byteEncodedArray[3 * i + 0] = encodedVec3[0];
            byteEncodedArray[3 * i + 1] = encodedVec3[1];
            byteEncodedArray[3 * i + 2] = encodedVec3[2];
        }
        return byteEncodedArray;
    }
}
exports.CornellBoxRenderer = CornellBoxRenderer;
class CornellBoxDemo extends demo_1.Demo {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element);
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.float;
        this._canvas.frameScale = [0.3333, 0.3333];
        this._canvas.clearColor.fromHex('d6d8db');
        this._canvas.controller.multiFrameNumber = 1024;
        this._canvas.element.addEventListener('click', () => { this._canvas.controller.update(); });
        this._renderer = new CornellBoxRenderer();
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
exports.CornellBoxDemo = CornellBoxDemo;
//# sourceMappingURL=cornellbox.js.map