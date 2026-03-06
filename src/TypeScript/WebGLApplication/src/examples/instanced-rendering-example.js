"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstancedRenderingExample = exports.InstancedRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class InstancedRenderer extends webgl_operate_1.Renderer {
    _loader;
    _primitive;
    _navigation;
    _camera;
    _texture;
    _framebuffer;
    _program;
    _uViewProjection;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        this._loader = new webgl_operate_1.GLTFLoader(this._context);
        this._framebuffer = new webgl_operate_1.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._framebuffer.initialize();
        const vert = new webgl_operate_1.Shader(context, gl.VERTEX_SHADER, 'instanced.vert');
        vert.initialize(require('./data/instanced.vert'));
        const frag = new webgl_operate_1.Shader(context, gl.FRAGMENT_SHADER, 'instanced.frag');
        frag.initialize(require('./data/instanced.frag'));
        this._program = new webgl_operate_1.Program(context, 'InstancedProgram');
        this._program.initialize([vert, frag], true);
        this._program.link();
        this._program.bind();
        this._uViewProjection = this._program.uniform('u_viewProjection');
        /* Create and configure camera. */
        this._camera = new webgl_operate_1.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.125, 0.25, 0.4);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 0.0, 1.5);
        this._camera.near = 0.01;
        this._camera.far = 8.0;
        /* Create and configure navigation */
        this._navigation = new webgl_operate_1.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        this.loadAsset();
        // gl.disable(gl.CULL_FACE);
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        this._loader.uninitialize();
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
        if (this._altered.frameSize) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        }
        if (this._altered.canvasSize) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        }
        if (this._altered.clearColor) {
            // this._forwardPass.clearColor = this._clearColor;
        }
        this._navigation.update();
        return this._altered.any || this._camera.altered;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        const gl = this._context.gl;
        if (this._altered.canvasSize) {
            this._program.bind();
            gl.uniform2f(this._program.uniform('u_frameSize'), this._frameSize[0], this._frameSize[1]);
        }
        if (this._altered.clearColor) {
            gl.clearColor(this._clearColor[0], this._clearColor[1], this._clearColor[2], this._clearColor[3]);
            gl.uniform4f(this._program.uniform('u_clearColor'), this._clearColor[0], this._clearColor[1], this._clearColor[2], this._clearColor[3]);
        }
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        if (this.isLoading) {
            return;
        }
        const indexBufferInformation = this._primitive.indexBufferInformation;
        const positionBufferInformation = this._primitive.getVertexBufferInformationFromAttribute('POSITION');
        const texCoordBufferInformation = this._primitive.getVertexBufferInformationFromAttribute('TEXCOORD_0');
        const material = this._primitive.material;
        const texture = material.baseColorTexture;
        const gl = this._context.gl;
        gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
        this._framebuffer.bind();
        this._program.bind();
        texture.bind(gl.TEXTURE0);
        // Setup positions
        gl.enableVertexAttribArray(0);
        positionBufferInformation.buffer.attribEnable(0, positionBufferInformation.size, positionBufferInformation.type, positionBufferInformation.normalized, positionBufferInformation.stride, positionBufferInformation.offset, true, true);
        // Setup texture coordinates
        gl.enableVertexAttribArray(1);
        texCoordBufferInformation.buffer.attribEnable(1, texCoordBufferInformation.size, texCoordBufferInformation.type, texCoordBufferInformation.normalized, texCoordBufferInformation.stride, texCoordBufferInformation.offset, true, true);
        gl.uniformMatrix4fv(this._uViewProjection, false, this._camera.viewProjection);
        gl.enable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const instanceCount = 32 ** 3;
        if (indexBufferInformation === undefined) {
            gl.drawArrays(this._primitive.drawMode, 0, positionBufferInformation.numVertices, instanceCount);
        }
        else {
            indexBufferInformation.buffer.bind();
            gl.drawElementsInstanced(this._primitive.drawMode, indexBufferInformation.numIndices, indexBufferInformation.type, indexBufferInformation.offset, instanceCount);
        }
    }
    onSwap() {
    }
    /**
     * Load asset from URI specified by the HTML select
     */
    loadAsset() {
        const uri = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured.gltf';
        this._loader.uninitialize();
        this._loader.loadAsset(uri)
            .then(() => {
            this.finishLoading();
            this._primitive = this._loader.meshes[0].primitives[0];
            this.invalidate(true);
        });
    }
}
exports.InstancedRenderer = InstancedRenderer;
class InstancedRenderingExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_1.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_1.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new InstancedRenderer();
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
exports.InstancedRenderingExample = InstancedRenderingExample;
//# sourceMappingURL=instanced-rendering-example.js.map