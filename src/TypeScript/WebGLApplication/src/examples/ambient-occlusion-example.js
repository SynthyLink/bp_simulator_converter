"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbientOcclusionExample = exports.AmbientOcclusionRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const example_1 = require("./example");
/* spellchecker: enable */
// tslint:disable:max-classes-per-file
class AmbientOcclusionRenderer extends webgl_operate_2.Renderer {
    _loader;
    /* Shared Across Passes */
    _ndcGeometry;
    /* Scene Pass */
    _navigation;
    _camera;
    _forwardPass;
    _sceneColor;
    _sceneNormal;
    _sceneLinearDepth;
    _sceneDepth;
    _sceneProgram;
    _uViewProjectionLocation;
    _uModelLocation;
    _uNormalLocation;
    _uSceneFrameSizeLocation;
    _uEyeLocation;
    /* // Scene Pass */
    _sceneFbo;
    /* Ambient Occlusion Pass */
    _aoNoisyMap;
    _aoProgram;
    _uAOFrameSizeLocation;
    _uNormalTextureLocation;
    _uDepthTextureLocation;
    _uViewProjectionLocation2;
    _uViewProjectionInverseLocation;
    /* // Ambient Occlusion Pass */
    _aoFbo;
    /* Blur Pass */
    _aoMap;
    _blurProgram;
    _uKernelSizeLocation;
    _uSourceLocation;
    _uBlurFrameSizeLocation;
    /* // Blur Pass */
    _blurredAOFbo;
    /* Composition Pass */
    _compositionProgram;
    _uColorLocation;
    _uDepthLocation;
    _uAOMapLocation;
    _uCompositionFrameSizeLocation;
    /* // Composition Pass */
    _outputFbo;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        this._context.enable(['OES_standard_derivatives', 'WEBGL_color_buffer_float',
            'OES_texture_float', 'OES_texture_float_linear']);
        this._loader = new webgl_operate_2.GLTFLoader(this._context);
        /* Initialize Shared Geometry for Postprocessing Passes */
        this._ndcGeometry = new webgl_operate_2.NdcFillingTriangle(this._context);
        this._ndcGeometry.initialize();
        /* Create and configure camera. */
        this._camera = new webgl_operate_2.Camera();
        this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
        this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
        this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 1.0, 2.0);
        this._camera.near = 0.05;
        this._camera.far = 12.0;
        /* Create and configure navigation */
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /* Initialize FBOs */
        this._sceneColor = new webgl_operate_2.Texture2D(this._context);
        this._sceneColor.initialize(1, 1, gl.RGB8, gl.RGB, gl.UNSIGNED_BYTE);
        this._sceneColor.filter(gl.LINEAR, gl.LINEAR);
        this._sceneNormal = new webgl_operate_2.Texture2D(this._context);
        this._sceneNormal.initialize(1, 1, gl.RGBA32F, gl.RGBA, gl.FLOAT);
        this._sceneNormal.filter(gl.LINEAR, gl.LINEAR);
        this._sceneLinearDepth = new webgl_operate_2.Texture2D(this._context);
        this._sceneLinearDepth.initialize(1, 1, gl.R32F, gl.RED, gl.FLOAT);
        this._sceneLinearDepth.filter(gl.LINEAR, gl.LINEAR);
        this._sceneDepth = new webgl_operate_2.Renderbuffer(this._context, 'Scene_Depth');
        this._sceneDepth.initialize(1, 1, gl.DEPTH_COMPONENT16);
        this._sceneFbo = new webgl_operate_2.Framebuffer(this._context, 'Scene_FBO');
        this._sceneFbo.initialize([
            [gl.COLOR_ATTACHMENT0, this._sceneColor],
            [gl.COLOR_ATTACHMENT0 + 1, this._sceneNormal],
            [gl.COLOR_ATTACHMENT0 + 2, this._sceneLinearDepth],
            [gl.DEPTH_ATTACHMENT, this._sceneDepth]
        ]);
        this._sceneFbo.clearColor(this._clearColor, gl.COLOR_ATTACHMENT0);
        this._sceneFbo.clearColor([0.5, 0.5, 0.5, 0.0], gl.COLOR_ATTACHMENT0 + 1);
        this._sceneFbo.clearColor([1.0, 1.0, 1.0, 0.0], gl.COLOR_ATTACHMENT0 + 2);
        this._aoNoisyMap = new webgl_operate_2.Texture2D(this._context);
        this._aoNoisyMap.initialize(1, 1, gl.RGBA32F, gl.RGBA, gl.FLOAT);
        this._aoNoisyMap.filter(gl.LINEAR, gl.LINEAR);
        this._aoFbo = new webgl_operate_2.Framebuffer(this._context, 'AO_FBO');
        this._aoFbo.initialize([
            [gl.COLOR_ATTACHMENT0, this._aoNoisyMap]
        ]);
        this._aoMap = new webgl_operate_2.Texture2D(this._context);
        this._aoMap.initialize(1, 1, gl.RGBA32F, gl.RGBA, gl.FLOAT);
        this._aoMap.filter(gl.LINEAR, gl.LINEAR);
        this._blurredAOFbo = new webgl_operate_2.Framebuffer(this._context, 'BlurredAO_FBO');
        this._blurredAOFbo.initialize([
            [gl.COLOR_ATTACHMENT0, this._aoMap]
        ]);
        this._outputFbo = new webgl_operate_2.DefaultFramebuffer(this._context, 'Default_FBO');
        this._outputFbo.initialize();
        /* Initialize Programs */
        /* Scene Pass */
        const scene_vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'geometry.vert');
        scene_vert.initialize(require('./data/ssao/geometry.vert'));
        const scene_frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'geometry.frag');
        scene_frag.initialize(require('./data/ssao/geometry.frag'));
        this._sceneProgram = new webgl_operate_2.Program(context, 'SceneProgram');
        this._sceneProgram.initialize([scene_vert, scene_frag], true);
        this._sceneProgram.link();
        this._sceneProgram.bind();
        this._uViewProjectionLocation = this._sceneProgram.uniform('u_viewProjection');
        this._uModelLocation = this._sceneProgram.uniform('u_model');
        this._uEyeLocation = this._sceneProgram.uniform('u_eye');
        this._uNormalLocation = this._sceneProgram.uniform('u_normal');
        this._uSceneFrameSizeLocation = this._sceneProgram.uniform('u_frameSize');
        /* Shared Programs */
        const ndc_triangle_vert = new webgl_operate_2.Shader(context, gl.VERTEX_SHADER, 'ndctriangle.vert');
        ndc_triangle_vert.initialize(require('../source/shaders/ndcvertices.vert'));
        /* AO Pass */
        const ao_frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'ssao.frag');
        ao_frag.initialize(require('./data/ssao/ssao.frag'));
        this._aoProgram = new webgl_operate_2.Program(context, 'AOProgram');
        this._aoProgram.initialize([ndc_triangle_vert, ao_frag], true);
        this._aoProgram.link();
        this._aoProgram.bind();
        this._uDepthTextureLocation = this._aoProgram.uniform('u_depth');
        this._uNormalTextureLocation = this._aoProgram.uniform('u_normal');
        this._uAOFrameSizeLocation = this._aoProgram.uniform('u_frameSize');
        this._uViewProjectionLocation2 = this._aoProgram.uniform('u_viewProjection');
        this._uViewProjectionInverseLocation = this._aoProgram.uniform('u_viewProjectionInverse');
        /* Blur Pass */
        const blur_frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'blur.frag');
        blur_frag.initialize(require('./data/ssao/blur.frag'));
        this._blurProgram = new webgl_operate_2.Program(context, 'BlurProgram');
        this._blurProgram.initialize([ndc_triangle_vert, blur_frag], true);
        this._blurProgram.link();
        this._blurProgram.bind();
        this._uKernelSizeLocation = this._blurProgram.uniform('u_kernelSize');
        this._uSourceLocation = this._blurProgram.uniform('u_source');
        this._uBlurFrameSizeLocation = this._blurProgram.uniform('u_frameSize');
        /* Composition Pass */
        const composition_frag = new webgl_operate_2.Shader(context, gl.FRAGMENT_SHADER, 'composition.frag');
        composition_frag.initialize(require('./data/ssao/composition.frag'));
        this._compositionProgram = new webgl_operate_2.Program(context, 'CompositionProgram');
        this._compositionProgram.initialize([ndc_triangle_vert, composition_frag], true);
        this._compositionProgram.link();
        this._compositionProgram.bind();
        this._uColorLocation = this._compositionProgram.uniform('u_color');
        this._uDepthLocation = this._compositionProgram.uniform('u_depth');
        this._uAOMapLocation = this._compositionProgram.uniform('u_aoMap');
        this._uCompositionFrameSizeLocation = this._compositionProgram.uniform('u_frameSize');
        /* Create and Configure Scene Forward Pass. */
        this._forwardPass = new webgl_operate_2.ForwardSceneRenderPass(context);
        this._forwardPass.initialize();
        this._forwardPass.camera = this._camera;
        this._forwardPass.target = this._sceneFbo;
        this._forwardPass.program = this._sceneProgram;
        this._forwardPass.updateModelTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uModelLocation, false, matrix);
        };
        this._forwardPass.updateViewProjectionTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uViewProjectionLocation, false, matrix);
        };
        this._forwardPass.bindUniforms = () => {
            gl.uniform3fv(this._uEyeLocation, this._camera.eye);
            gl.uniform1i(this._uNormalLocation, 2);
            gl.uniform2f(this._uSceneFrameSizeLocation, this._frameSize[0], this._frameSize[1]);
        };
        this._forwardPass.bindGeometry = (geometry) => {
        };
        this._forwardPass.bindMaterial = (material) => {
            const pbrMaterial = material;
            webgl_operate_1.auxiliaries.assert(pbrMaterial !== undefined, `Material ${material.name} is not a PBR material.`);
            pbrMaterial.normalTexture.bind(gl.TEXTURE2);
        };
        this.loadAsset();
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        // ToDo: make sure that all meshes and programs inside of the scene get cleaned
        // this._mesh.uninitialize();
        // this._meshProgram.uninitialize();
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
        const gl = this._context.gl;
        if (this._altered.frameSize) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
            this._camera.aspect = this._frameSize[0] / this._frameSize[1];
        }
        if (this._altered.clearColor) {
            this._sceneFbo.clearColor(this._clearColor, gl.COLOR_ATTACHMENT0);
            this._forwardPass.clearColor = this._clearColor;
        }
        this._navigation.update();
        this._forwardPass.update();
        if (this._camera.altered) {
            this._aoProgram.bind();
            gl.uniformMatrix4fv(this._uViewProjectionLocation2, false, this._camera.viewProjection);
            gl.uniformMatrix4fv(this._uViewProjectionInverseLocation, false, this._camera.viewProjectionInverse);
        }
        return this._altered.any || this._camera.altered;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        const gl = this._context.gl;
        /* Resize FBOs */
        if (this._altered.frameSize) {
            this._sceneFbo.resize(this._frameSize[0], this._frameSize[1]);
            this._aoFbo.resize(this._frameSize[0], this._frameSize[1]);
            this._blurredAOFbo.resize(this._frameSize[0], this._frameSize[1]);
        }
        /* Prepare Scene Render Pass */
        this._forwardPass.prepare();
        /* Prepare AO Map Pass */
        this._aoProgram.bind();
        gl.uniform2f(this._uAOFrameSizeLocation, this._frameSize[0], this._frameSize[1]);
        gl.uniform1i(this._uNormalTextureLocation, 0);
        gl.uniform1i(this._uDepthTextureLocation, 1);
        /* Prepare Blur Pass */
        this._blurProgram.bind();
        gl.uniform1i(this._uKernelSizeLocation, 5);
        gl.uniform1i(this._uSourceLocation, 0);
        gl.uniform2f(this._uBlurFrameSizeLocation, this._frameSize[0], this._frameSize[1]);
        /* Prepare Composition Pass */
        this._compositionProgram.bind();
        gl.uniform1i(this._uColorLocation, 0);
        gl.uniform1i(this._uDepthLocation, 1);
        gl.uniform1i(this._uAOMapLocation, 2);
        gl.uniform2f(this._uCompositionFrameSizeLocation, this._frameSize[0], this._frameSize[1]);
        /* Remainder */
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        const gl = this._context.gl;
        if (this.isLoading) {
            return;
        }
        /* Scene Pass */
        this._sceneFbo.bind();
        gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT0 + 1, gl.COLOR_ATTACHMENT0 + 2]);
        this._sceneFbo.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        gl.clearBufferfv(gl.COLOR, 1, [0.5, 0.5, 0.5, 1.0]);
        gl.clearBufferfv(gl.COLOR, 2, [1.0, 1.0, 1.0, 1.0]);
        this._sceneProgram.bind();
        this._forwardPass.frame();
        /* Ambient Occlusion Pass */
        this._aoFbo.bind();
        gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
        this._aoFbo.clear(gl.COLOR_BUFFER_BIT, false, false);
        this._sceneNormal.bind(gl.TEXTURE0);
        this._sceneLinearDepth.bind(gl.TEXTURE1);
        this._aoProgram.bind();
        this._ndcGeometry.bind();
        this._ndcGeometry.draw();
        this._ndcGeometry.unbind();
        /* Blur Pass */
        this._blurredAOFbo.bind();
        gl.drawBuffers([gl.COLOR_ATTACHMENT0]);
        this._blurredAOFbo.clear(gl.COLOR_BUFFER_BIT, false, false);
        this._aoNoisyMap.bind(gl.TEXTURE0);
        this._blurProgram.bind();
        this._ndcGeometry.bind();
        this._ndcGeometry.draw();
        this._ndcGeometry.unbind();
    }
    onSwap() {
        const gl = this._context.gl;
        if (this.isLoading) {
            return;
        }
        /* Composition Pass */
        this._outputFbo.bind();
        gl.drawBuffers([gl.BACK]);
        this._outputFbo.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, false, false);
        this._sceneColor.bind(gl.TEXTURE0);
        this._sceneLinearDepth.bind(gl.TEXTURE1);
        this._aoMap.bind(gl.TEXTURE2);
        this._compositionProgram.bind();
        this._ndcGeometry.bind();
        this._ndcGeometry.draw();
        this._ndcGeometry.unbind();
    }
    /**
     * Load asset from URI specified by the HTML select
     */
    loadAsset() {
        const uri = '/examples/data/matrix-chair.glb';
        this._forwardPass.scene = undefined;
        this._loader.uninitialize();
        this._loader.loadAsset(uri)
            .then(() => {
            this._forwardPass.scene = this._loader.defaultScene;
            this.finishLoading();
            this.invalidate(true);
        });
    }
}
exports.AmbientOcclusionRenderer = AmbientOcclusionRenderer;
class AmbientOcclusionExample extends example_1.Example {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: false });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new AmbientOcclusionRenderer();
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
exports.AmbientOcclusionExample = AmbientOcclusionExample;
//# sourceMappingURL=ambient-occlusion-example.js.map