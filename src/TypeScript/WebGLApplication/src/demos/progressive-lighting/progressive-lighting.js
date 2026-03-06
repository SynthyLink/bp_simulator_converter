"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressiveLightingDemo = exports.ProgressiveLightingRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const postprocessingpass_1 = require("./postprocessingpass");
const scene_1 = require("./scene");
const demo_1 = require("../demo");
const arealight_1 = require("./arealight");
const depthoffieldkernel_1 = require("./depthoffieldkernel");
const samplemanager_1 = require("./samplemanager");
// tslint:disable:max-classes-per-file
/**
 * @todo comment
 */
class ProgressiveLightingRenderer extends webgl_operate_2.Renderer {
    static URL = 'https://p-otto.waduhek.de';
    _loader;
    _navigation;
    _forwardPass;
    _accumulatePass;
    _blitPass;
    _postProcessingPass;
    _shadowPass;
    _camera;
    _depthOfFieldRange;
    _sampleManager;
    _currentScene;
    _datsunScene;
    _kitchenScene;
    _skylineScene;
    _cornellScene;
    _intermediateFBO;
    _colorRenderTexture;
    _depthRenderbuffer;
    _preDepthFBO;
    _normalDepthTexture;
    _preDepthRenderbuffer;
    _depthProgram;
    _defaultFramebuffer;
    _ndcTriangle;
    _program;
    _shadowProgram;
    _emptyTexture;
    _diffuseEnvironment;
    _specularEnvironment;
    _brdfLUT;
    _uLightSampleIndex;
    _uLightFactor;
    _uNumDiffuseEnvironmentSamples;
    _uDiffuseEnvironmentFactor;
    _uNumSpecularEnvironmentSamples;
    _uSpecularEnvironmentFactor;
    _uViewProjection;
    _uView;
    _uProjection;
    _uModel;
    _uNormalMatrix;
    _uViewNormalMatrix;
    _uCameraNearFar;
    _ndcOffsetKernel;
    _uNdcOffset;
    _depthOfFieldKernel;
    _uCocPoint;
    _uFrameNumber;
    _uBaseColor;
    _uBaseColorTexCoord;
    _uMetallicRoughness;
    _uMetallicRoughnessTexCoord;
    _uNormal;
    _uNormalTexCoord;
    _uEmissive;
    _uEmissiveTexCoord;
    _uOcclusion;
    _uOcclusionTexCoord;
    _uEye;
    _uGeometryFlags;
    _uPbrFlags;
    _uBaseColorFactor;
    _uMetallicFactor;
    _uRoughnessFactor;
    _uEmissiveFactor;
    _uNormalScale;
    _uBlendMode;
    _uBlendCutoff;
    _uDiffuseEnvironment;
    _uSpecularEnvironment;
    _uBRDFLookupTable;
    _uShadowMap;
    _uLastFrame;
    _uNormalDepth;
    _uOcclusionRange;
    _uExposure;
    _uIBLStrength;
    _uLightView;
    _uLightProjection;
    _uLightNearFar;
    _uModelS;
    _uViewS;
    _uProjectionS;
    _uLightNearFarS;
    _uLightPositionS;
    _uModelD;
    _uProjectionD;
    _uViewD;
    _uCameraNearFarD;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        context.enable(['OES_standard_derivatives', 'WEBGL_color_buffer_float',
            'OES_texture_float', 'OES_texture_float_linear']);
        this._loader = new webgl_operate_2.GLTFLoader(this._context);
        this._cornellScene = new scene_1.Scene(`${ProgressiveLightingRenderer.URL}/models/cornell.glb`, new webgl_operate_2.Camera(gl_matrix_1.vec3.fromValues(-0.255, 3.09, -8.0), gl_matrix_1.vec3.fromValues(0.135, 1.192, -0.46)), 0.2, 20);
        this._cornellScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(0.13, 2.32, -0.23), 0.15, gl_matrix_1.vec3.fromValues(303, 303, 303), gl_matrix_1.vec3.fromValues(0, -1, 0), 90.0));
        this._skylineScene = new scene_1.Scene(`${ProgressiveLightingRenderer.URL}/models/skyline.glb`, new webgl_operate_2.Camera(gl_matrix_1.vec3.fromValues(-4.0645, 2.816, 6.2326), gl_matrix_1.vec3.fromValues(0.342, -0.42328, 0.1032)), 
        // new Camera(vec3.fromValues(1.7162, 0.6412, 4.2596), vec3.fromValues(-0.7943, -0.17933, -0.7432)),
        0.2, 20);
        this._skylineScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(1.827, 2.5, -1.11), 0.25, gl_matrix_1.vec3.fromValues(501, 501, 501), gl_matrix_1.vec3.fromValues(-0.5554236173629761, -0.7600213289260864, 0.33744949102401733), 110.0));
        this._skylineScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(-2.03, 2.5, -1.205), 0.25, gl_matrix_1.vec3.fromValues(501, 501, 501), gl_matrix_1.vec3.fromValues(0.5903826355934143, -0.7270721793174744, 0.3504488170146942), 110.0));
        this._skylineScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(1.418, 2.5, 2.17), 0.25, gl_matrix_1.vec3.fromValues(501, 501, 501), gl_matrix_1.vec3.fromValues(-0.39374271035194397, -0.6941867470741272, -0.6025540828704834), 110.0));
        this._skylineScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(-1.642, 2.5, 1.9708), 0.25, gl_matrix_1.vec3.fromValues(501, 501, 501), gl_matrix_1.vec3.fromValues(0.45841217041015625, -0.6979479193687439, -0.5502063035964966), 110.0));
        this._datsunScene = new scene_1.Scene(`${ProgressiveLightingRenderer.URL}/models/datsun.glb`, new webgl_operate_2.Camera(gl_matrix_1.vec3.fromValues(-1.9631, 1.89, 6.548), gl_matrix_1.vec3.fromValues(0.292, -0.327, -0.13)), 0.2, 30);
        this._datsunScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(-3.04, 3.0, -1.4), 0.15, gl_matrix_1.vec3.fromValues(901, 901, 901), gl_matrix_1.vec3.fromValues(0.67636, -0.66746, 0.31148), 110.0));
        this._datsunScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(2.62, 3.0, -1.4), 0.15, gl_matrix_1.vec3.fromValues(901, 901, 901), gl_matrix_1.vec3.fromValues(-0.62057, -0.71058, 0.33160), 110.0));
        this._datsunScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(-2.12, 3.0, 2.1), 0.15, gl_matrix_1.vec3.fromValues(901, 901, 901), gl_matrix_1.vec3.fromValues(0.50102, -0.70899, -0.49629), 110.0));
        this._datsunScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(2.14, 3.0, 2.1), 0.15, gl_matrix_1.vec3.fromValues(901, 901, 901), gl_matrix_1.vec3.fromValues(-0.50454, -0.70731, -0.49511), 110.0));
        this._kitchenScene = new scene_1.Scene(`${ProgressiveLightingRenderer.URL}/models/kitchen.glb`, new webgl_operate_2.Camera(gl_matrix_1.vec3.fromValues(-0.65597, 2.2284, 6.2853), gl_matrix_1.vec3.fromValues(0.24971, 1.1144, -0.7265)), 
        // new Camera(vec3.fromValues(-3.479, 1.604, -0.5713), vec3.fromValues(0.0, 1.0673, -0.8168)),
        0.1, 10);
        this._kitchenScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(-0.54, 1.6, -1.17), 0.025, gl_matrix_1.vec3.fromValues(5001, 5001, 5001), gl_matrix_1.vec3.fromValues(0, -1, 0), 160.0));
        this._kitchenScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(0.88, 1.6, -1.17), 0.025, gl_matrix_1.vec3.fromValues(5001, 5001, 5001), gl_matrix_1.vec3.fromValues(0, -1, 0), 160.0));
        this._kitchenScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(1.62, 1.6, -1.17), 0.025, gl_matrix_1.vec3.fromValues(5001, 5001, 5001), gl_matrix_1.vec3.fromValues(0, -1, 0), 160.0));
        this._kitchenScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(0.16, 1.6, -1.17), 0.025, gl_matrix_1.vec3.fromValues(5001, 5001, 5001), gl_matrix_1.vec3.fromValues(0, -1, 0), 160.0));
        this._kitchenScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(1.92, 1.6, -0.86), 0.025, gl_matrix_1.vec3.fromValues(5001, 5001, 5001), gl_matrix_1.vec3.fromValues(0, -1, 0), 160.0));
        this._kitchenScene.addDiskLight(new arealight_1.DiskLight(gl_matrix_1.vec3.fromValues(1.92, 1.6, -0.22), 0.025, gl_matrix_1.vec3.fromValues(5001, 5001, 5001), gl_matrix_1.vec3.fromValues(0, -1, 0), 160.0));
        this._emptyTexture = new webgl_operate_2.Texture2D(this._context, 'EmptyTexture');
        this._emptyTexture.initialize(1, 1, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
        this._defaultFramebuffer = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._defaultFramebuffer.initialize();
        this._ndcTriangle = new webgl_operate_2.NdcFillingTriangle(this._context);
        this._ndcTriangle.initialize();
        /* Initialize program, we do not use the default gltf shader here */
        const vert = new webgl_operate_2.Shader(this._context, gl.VERTEX_SHADER, 'mesh.vert');
        vert.initialize(require('./data/mesh.vert'));
        const frag = new webgl_operate_2.Shader(this._context, gl.FRAGMENT_SHADER, 'progressive_lighting.frag');
        frag.initialize(require('./data/progressive_lighting.frag'));
        this._program = new webgl_operate_2.Program(this._context, 'ProgressiveLightingProgram');
        this._program.initialize([vert, frag]);
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uView = this._program.uniform('u_view');
        this._uProjection = this._program.uniform('u_projection');
        this._uModel = this._program.uniform('u_model');
        this._uNormalMatrix = this._program.uniform('u_normalMatrix');
        this._uViewNormalMatrix = this._program.uniform('u_viewNormalMatrix');
        this._uCameraNearFar = this._program.uniform('u_cameraNearFar');
        this._uBaseColor = this._program.uniform('u_baseColor');
        this._uBaseColorTexCoord = this._program.uniform('u_baseColorTexCoord');
        this._uMetallicRoughness = this._program.uniform('u_metallicRoughness');
        this._uMetallicRoughnessTexCoord = this._program.uniform('u_metallicRoughnessTexCoord');
        this._uNormal = this._program.uniform('u_normal');
        this._uNormalTexCoord = this._program.uniform('u_normalTexCoord');
        this._uEmissive = this._program.uniform('u_emissive');
        this._uEmissiveTexCoord = this._program.uniform('u_emissiveTexCoord');
        this._uOcclusion = this._program.uniform('u_occlusion');
        this._uOcclusionTexCoord = this._program.uniform('u_occlusionTexCoord');
        this._uNdcOffset = this._program.uniform('u_ndcOffset');
        this._uFrameNumber = this._program.uniform('u_frameNumber');
        this._uCocPoint = this._program.uniform('u_cocPoint');
        this._uEye = this._program.uniform('u_eye');
        this._uGeometryFlags = this._program.uniform('u_geometryFlags');
        this._uPbrFlags = this._program.uniform('u_pbrFlags');
        this._uBaseColorFactor = this._program.uniform('u_baseColorFactor');
        this._uMetallicFactor = this._program.uniform('u_metallicFactor');
        this._uRoughnessFactor = this._program.uniform('u_roughnessFactor');
        this._uEmissiveFactor = this._program.uniform('u_emissiveFactor');
        this._uNormalScale = this._program.uniform('u_normalScale');
        this._uBlendMode = this._program.uniform('u_blendMode');
        this._uBlendCutoff = this._program.uniform('u_blendCutoff');
        this._uLightSampleIndex = this._program.uniform('u_lightSampleIndex');
        this._uLightFactor = this._program.uniform('u_lightFactor');
        this._uNumDiffuseEnvironmentSamples = this._program.uniform('u_numDiffuseEnvironmentSamples');
        this._uDiffuseEnvironmentFactor = this._program.uniform('u_diffuseEnvironmentFactor');
        this._uNumSpecularEnvironmentSamples = this._program.uniform('u_numSpecularEnvironmentSamples');
        this._uSpecularEnvironmentFactor = this._program.uniform('u_specularEnvironmentFactor');
        this._uDiffuseEnvironment = this._program.uniform('u_diffuseEnvironment');
        this._uSpecularEnvironment = this._program.uniform('u_specularEnvironment');
        this._uBRDFLookupTable = this._program.uniform('u_brdfLUT');
        this._uLastFrame = this._program.uniform('u_lastFrame');
        this._uShadowMap = this._program.uniform('u_shadowMap');
        this._uNormalDepth = this._program.uniform('u_normalDepth');
        this._uLightView = this._program.uniform('u_lightView');
        this._uLightProjection = this._program.uniform('u_lightProjection');
        this._uLightNearFar = this._program.uniform('u_lightNearFar');
        this._uOcclusionRange = this._program.uniform('u_occlusionRange');
        this._uIBLStrength = this._program.uniform('u_iblStrength');
        /* Initialize shadow program */
        const shadowVert = new webgl_operate_2.Shader(this._context, gl.VERTEX_SHADER, 'mesh.vert');
        shadowVert.initialize(require('./data/mesh.vert'));
        const shadowFrag = new webgl_operate_2.Shader(this._context, gl.FRAGMENT_SHADER, 'shadow.frag');
        shadowFrag.initialize(require('./data/shadow.frag'));
        this._shadowProgram = new webgl_operate_2.Program(this._context, 'ShadowProgram');
        this._shadowProgram.initialize([shadowVert, shadowFrag]);
        this._uModelS = this._shadowProgram.uniform('u_model');
        this._uViewS = this._shadowProgram.uniform('u_view');
        this._uProjectionS = this._shadowProgram.uniform('u_projection');
        this._uLightNearFarS = this._shadowProgram.uniform('u_lightNearFar');
        this._uLightPositionS = this._shadowProgram.uniform('u_lightPosition');
        /* Initialize pre depth program */
        const depthVert = new webgl_operate_2.Shader(this._context, gl.VERTEX_SHADER, 'mesh.vert');
        depthVert.initialize(require('./data/mesh.vert'));
        const depthFrag = new webgl_operate_2.Shader(this._context, gl.FRAGMENT_SHADER, 'normal_depth.frag');
        depthFrag.initialize(require('./data/normal_depth.frag'));
        this._depthProgram = new webgl_operate_2.Program(this._context, 'NormalDepthProgram');
        this._depthProgram.initialize([depthVert, depthFrag]);
        this._uViewD = this._depthProgram.uniform('u_view');
        this._uProjectionD = this._depthProgram.uniform('u_projection');
        this._uCameraNearFarD = this._depthProgram.uniform('u_cameraNearFar');
        this._uModelD = this._depthProgram.uniform('u_model');
        /* Camera will be setup by the scenes */
        this._camera = new webgl_operate_2.Camera();
        /* Create and configure navigation */
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /**
         * Setup intermediate FBO and textures
         */
        this._colorRenderTexture = new webgl_operate_2.Texture2D(this._context, 'ColorRenderTexture');
        this._depthRenderbuffer = new webgl_operate_2.Renderbuffer(this._context, 'DepthRenderbuffer');
        this._intermediateFBO = new webgl_operate_2.Framebuffer(this._context, 'IntermediateFBO');
        /**
         * Setup pre depth FBO
         */
        this._preDepthFBO = new webgl_operate_2.Framebuffer(this._context, 'PreDepthFBO');
        this._normalDepthTexture = new webgl_operate_2.Texture2D(this._context, 'NormalDepthTexture');
        this._preDepthRenderbuffer = new webgl_operate_2.Renderbuffer(this._context, 'PreDepthRenderbuffer');
        /* Create and configure forward pass. */
        this._forwardPass = new webgl_operate_2.ForwardSceneRenderPass(context);
        this._forwardPass.initialize();
        this._forwardPass.camera = this._camera;
        this._forwardPass.target = this._intermediateFBO;
        this._forwardPass.program = this._program;
        this._forwardPass.updateViewProjectionTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uViewProjection, gl.FALSE, matrix);
        };
        this._accumulatePass = new webgl_operate_2.AccumulatePass(context);
        this._accumulatePass.initialize(this._ndcTriangle);
        this._accumulatePass.precision = webgl_operate_2.Wizard.Precision.float;
        this._accumulatePass.texture = this._colorRenderTexture;
        this._postProcessingPass = new postprocessingpass_1.PostProcessingPass(context);
        this._postProcessingPass.initialize(this._ndcTriangle);
        this._shadowPass = new webgl_operate_2.ShadowPass(context);
        this._shadowPass.initialize(webgl_operate_2.ShadowPass.ShadowMappingType.HardLinear, [2048, 2048]);
        this._blitPass = new webgl_operate_2.BlitPass(this._context);
        this._blitPass.initialize(this._ndcTriangle);
        this._blitPass.framebuffer = this._postProcessingPass.framebuffer;
        this._blitPass.readBuffer = gl2facade.COLOR_ATTACHMENT0;
        this._blitPass.target = this._defaultFramebuffer;
        this._blitPass.drawBuffer = gl.BACK;
        /**
         * Start loading environment.
         */
        this.loadEnvironmentMap();
        /**
         * Setup debugging widgets.
         */
        const assetSelect = window.document.getElementById('asset-select');
        assetSelect.onchange = (_) => {
            this.loadAsset();
        };
        const environmentSelect = window.document.getElementById('environment-select');
        environmentSelect.onchange = (_) => {
            this.loadEnvironmentMap();
            this._invalidate(true);
        };
        const debugSelect = window.document.getElementById('debug-select');
        debugSelect.onchange = (_) => {
            this.setDebugMode();
            this._invalidate(true);
        };
        const exposureRange = window.document.getElementById('exposure-range');
        exposureRange.onchange = (_) => {
            this._postProcessingPass.exposure = parseFloat(exposureRange.value) / 10.0;
            this._invalidate(true);
        };
        const iblRange = window.document.getElementById('ibl-range');
        iblRange.onchange = (_) => {
            this._program.bind();
            gl.uniform1f(this._uIBLStrength, parseFloat(iblRange.value) / 20.0);
            this._program.unbind();
            this._invalidate(true);
        };
        iblRange.onchange(new Event(''));
        const occlusionRange = window.document.getElementById('occlusion-range');
        occlusionRange.onchange = (_) => {
            this._program.bind();
            gl.uniform1f(this._uOcclusionRange, parseFloat(occlusionRange.value) / 300.0);
            this._program.unbind();
            this._invalidate(true);
        };
        occlusionRange.onchange(new Event(''));
        const dofRange = window.document.getElementById('dof-range');
        dofRange.onchange = (_) => {
            this._depthOfFieldRange = parseFloat(dofRange.value) / 1000.0;
            this._invalidate(true);
        };
        dofRange.onchange(new Event(''));
        return true;
    }
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    onUninitialize() {
        super.uninitialize();
        // TODO: make sure that all meshes and programs inside of the scene get cleaned
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
        if (this._altered.frameSize || this._camera.altered) {
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        }
        if (this._altered.canvasSize || this._camera.altered) {
            this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        }
        this._navigation.update();
        this._forwardPass.update();
        return this._altered.any || this._camera.altered;
    }
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    onPrepare() {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        if (this._forwardPass.scene === undefined) {
            this.loadAsset();
        }
        const lightSampleCount = Math.round(this._multiFrameNumber / this._currentScene.diskLights.length / 4.0);
        const environmentSampleCount = Math.round(this._multiFrameNumber);
        this._sampleManager = new samplemanager_1.SampleManager(this._currentScene, this._multiFrameNumber, lightSampleCount, environmentSampleCount);
        if (!this._intermediateFBO.initialized) {
            this._colorRenderTexture.initialize(this._frameSize[0], this._frameSize[1], this._context.isWebGL2 ? gl.RGBA32F : gl.RGBA, gl.RGBA, gl.FLOAT);
            this._depthRenderbuffer.initialize(this._frameSize[0], this._frameSize[1], gl.DEPTH_COMPONENT16);
            this._intermediateFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._colorRenderTexture],
                [gl.DEPTH_ATTACHMENT, this._depthRenderbuffer]]);
        }
        if (!this._preDepthFBO.initialized) {
            this._normalDepthTexture.initialize(this._frameSize[0], this._frameSize[1], this._context.isWebGL2 ? gl.RGBA32F : gl.RGBA, this._context.isWebGL2 ? gl.RGBA : gl.RGBA, gl.FLOAT);
            this._preDepthRenderbuffer.initialize(this._frameSize[0], this._frameSize[1], gl.DEPTH_COMPONENT16);
            this._preDepthFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._normalDepthTexture],
                [gl.DEPTH_ATTACHMENT, this._preDepthRenderbuffer]]);
        }
        if (this._altered.multiFrameNumber) {
            this._ndcOffsetKernel = new webgl_operate_2.AntiAliasingKernel(this._multiFrameNumber);
            this._depthOfFieldKernel = new depthoffieldkernel_1.DepthOfFieldKernel(this._multiFrameNumber);
        }
        if (this._altered.frameSize) {
            this._intermediateFBO.resize(this._frameSize[0], this._frameSize[1]);
            this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        }
        if (this._altered.clearColor) {
            this._intermediateFBO.clearColor(this._clearColor);
            this._forwardPass.clearColor = this._clearColor;
        }
        this._forwardPass.prepare();
        this._accumulatePass.update();
        this._postProcessingPass.texture = this._accumulatePass.framebuffer.texture(gl2facade.COLOR_ATTACHMENT0);
        this._postProcessingPass.normalDepthTexture = this._normalDepthTexture;
        this._postProcessingPass.update();
        this.bindMultiframeUniforms();
        this._altered.reset();
        this._camera.altered = false;
    }
    preDepthPass() {
        const gl = this._context.gl;
        this._preDepthFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        gl.viewport(0, 0, this._preDepthFBO.width, this._preDepthFBO.height);
        this._depthProgram.bind();
        this._forwardPass.program = this._depthProgram;
        this._forwardPass.target = this._preDepthFBO;
        this._forwardPass.bindMaterial = (_) => { };
        this._forwardPass.bindGeometry = (_) => { };
        this._forwardPass.updateModelTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uModelD, gl.FALSE, matrix);
        };
        this._forwardPass.drawCalls(false);
    }
    shadowPass(lightIndex, eye) {
        const gl = this._context.gl;
        const light = this._currentScene.diskLights[lightIndex];
        const center = gl_matrix_1.vec3.add(gl_matrix_1.vec3.create(), eye, light.direction);
        const lightCamera = new webgl_operate_2.Camera();
        lightCamera.eye = eye;
        lightCamera.center = center;
        lightCamera.up = gl_matrix_1.vec3.fromValues(1.0, 0.0, 0.0);
        lightCamera.near = 0.1;
        lightCamera.far = 30.0;
        lightCamera.fovy = light.fovy;
        const lightNearFar = gl_matrix_1.vec2.fromValues(lightCamera.near, lightCamera.far);
        this._shadowPass.frame(() => {
            this._shadowProgram.bind();
            gl.uniformMatrix4fv(this._uProjectionS, gl.FALSE, lightCamera.projection);
            gl.uniformMatrix4fv(this._uViewS, gl.FALSE, lightCamera.view);
            gl.uniform2fv(this._uLightNearFarS, lightNearFar);
            gl.uniform3fv(this._uLightPositionS, eye);
            this._forwardPass.bindMaterial = (_) => { };
            this._forwardPass.bindGeometry = (_) => { };
            this._forwardPass.updateModelTransform = (matrix) => {
                gl.uniformMatrix4fv(this._uModelS, gl.FALSE, matrix);
            };
            this._forwardPass.drawCalls(false);
            this._shadowProgram.unbind();
        });
        // Update mesh programs values for shadow map application
        this._program.bind();
        gl.uniformMatrix4fv(this._uLightView, gl.FALSE, lightCamera.view);
        gl.uniformMatrix4fv(this._uLightProjection, gl.FALSE, lightCamera.projection);
        gl.uniform2fv(this._uLightNearFar, lightNearFar);
        this._program.unbind();
    }
    onFrame(frameNumber) {
        if (this.isLoading) {
            return;
        }
        webgl_operate_1.auxiliaries.assert(this._forwardPass.scene !== undefined, `Scene undefined in onFrame.`);
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        this.prepareFrame(frameNumber);
        this._forwardPass.program = this._program;
        this._forwardPass.target = this._intermediateFBO;
        this._forwardPass.bindMaterial = (material) => {
            const pbrMaterial = material;
            webgl_operate_1.auxiliaries.assert(pbrMaterial !== undefined, `Material ${material.name} is not a PBR material.`);
            /**
             * Base color texture
             */
            if (pbrMaterial.baseColorTexture !== undefined) {
                pbrMaterial.baseColorTexture.bind(gl.TEXTURE0);
                gl.uniform1i(this._uBaseColorTexCoord, pbrMaterial.baseColorTexCoord);
            }
            else {
                this._emptyTexture.bind(gl.TEXTURE0);
            }
            /**
             * Metallic Roughness texture
             */
            if (pbrMaterial.metallicRoughnessTexture !== undefined) {
                pbrMaterial.metallicRoughnessTexture.bind(gl.TEXTURE1);
                gl.uniform1i(this._uMetallicRoughnessTexCoord, pbrMaterial.metallicRoughnessTexCoord);
            }
            else {
                this._emptyTexture.bind(gl.TEXTURE1);
            }
            /**
             * Normal texture
             */
            if (pbrMaterial.normalTexture !== undefined) {
                pbrMaterial.normalTexture.bind(gl.TEXTURE2);
                gl.uniform1i(this._uNormalTexCoord, pbrMaterial.normalTexCoord);
            }
            else {
                this._emptyTexture.bind(gl.TEXTURE2);
            }
            /**
             * Occlusion texture
             */
            if (pbrMaterial.occlusionTexture !== undefined) {
                pbrMaterial.occlusionTexture.bind(gl.TEXTURE3);
                gl.uniform1i(this._uOcclusionTexCoord, pbrMaterial.occlusionTexCoord);
            }
            else {
                this._emptyTexture.bind(gl.TEXTURE3);
            }
            /**
             * Emission texture
             */
            if (pbrMaterial.emissiveTexture !== undefined) {
                pbrMaterial.emissiveTexture.bind(gl.TEXTURE4);
                gl.uniform1i(this._uEmissiveTexCoord, pbrMaterial.emissiveTexCoord);
            }
            else {
                this._emptyTexture.bind(gl.TEXTURE4);
            }
            /**
             * Material properties
             */
            gl.uniform4fv(this._uBaseColorFactor, pbrMaterial.baseColorFactor);
            gl.uniform3fv(this._uEmissiveFactor, pbrMaterial.emissiveFactor);
            gl.uniform1f(this._uMetallicFactor, pbrMaterial.metallicFactor);
            gl.uniform1f(this._uRoughnessFactor, pbrMaterial.roughnessFactor);
            gl.uniform1f(this._uNormalScale, pbrMaterial.normalScale);
            gl.uniform1i(this._uPbrFlags, pbrMaterial.flags);
            if (pbrMaterial.alphaMode === webgl_operate_2.GLTFAlphaMode.OPAQUE) {
                gl.disable(gl.BLEND);
                gl.uniform1i(this._uBlendMode, 0);
            }
            else if (pbrMaterial.alphaMode === webgl_operate_2.GLTFAlphaMode.MASK) {
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.uniform1i(this._uBlendMode, 1);
                gl.uniform1f(this._uBlendCutoff, pbrMaterial.alphaCutoff);
            }
            else if (pbrMaterial.alphaMode === webgl_operate_2.GLTFAlphaMode.BLEND) {
                gl.enable(gl.BLEND);
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.uniform1i(this._uBlendMode, 2);
            }
            else {
                webgl_operate_1.auxiliaries.log(webgl_operate_1.auxiliaries.LogLevel.Warning, 'Unknown blend mode encountered.');
            }
        };
        this._forwardPass.bindGeometry = (geometry) => {
            const primitive = geometry;
            gl.uniform1i(this._uGeometryFlags, primitive.flags);
        };
        this._forwardPass.updateModelTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uModel, gl.FALSE, matrix);
            const normalMatrix = gl_matrix_1.mat3.create();
            gl_matrix_1.mat3.normalFromMat4(normalMatrix, matrix);
            gl.uniformMatrix3fv(this._uNormalMatrix, gl.FALSE, normalMatrix);
        };
        this._forwardPass.frame();
        this._accumulatePass.frame(frameNumber);
        this._postProcessingPass.texture = this._accumulatePass.framebuffer.texture(gl2facade.COLOR_ATTACHMENT0);
        this._postProcessingPass.frame();
    }
    onSwap() {
        this._blitPass.frame();
    }
    /**
     * Bind all uniforms that do not change within a multi-frame.
     * This avoids unnecessary calls in each individual frame.
     */
    bindMultiframeUniforms() {
        const gl = this._context.gl;
        /**
         * Prepare main program uniforms
         */
        this._program.bind();
        gl.uniformMatrix4fv(this._uView, gl.FALSE, this._camera.view);
        gl.uniformMatrix4fv(this._uProjection, gl.FALSE, this._camera.projection);
        gl.uniform2fv(this._uCameraNearFar, gl_matrix_1.vec2.fromValues(this._camera.near, this._camera.far));
        const viewNormalMatrix = gl_matrix_1.mat3.create();
        gl_matrix_1.mat3.normalFromMat4(viewNormalMatrix, this._camera.view);
        gl.uniformMatrix3fv(this._uViewNormalMatrix, gl.FALSE, viewNormalMatrix);
        gl.uniform3fv(this._uEye, this._camera.eye);
        gl.uniform1i(this._uBaseColor, 0);
        gl.uniform1i(this._uMetallicRoughness, 1);
        gl.uniform1i(this._uNormal, 2);
        gl.uniform1i(this._uOcclusion, 3);
        gl.uniform1i(this._uEmissive, 4);
        gl.uniform1i(this._uDiffuseEnvironment, 10);
        gl.uniform1i(this._uSpecularEnvironment, 5);
        gl.uniform1i(this._uBRDFLookupTable, 6);
        gl.uniform1i(this._uShadowMap, 7);
        gl.uniform1i(this._uNormalDepth, 8);
        gl.uniform1i(this._uLastFrame, 9);
        this._specularEnvironment.bind(gl.TEXTURE5);
        this._diffuseEnvironment.bind(gl.TEXTURE10);
        this._brdfLUT.bind(gl.TEXTURE6);
        this._shadowPass.shadowMapTexture.bind(gl.TEXTURE7);
        this._normalDepthTexture.bind(gl.TEXTURE8);
        /**
         * Prepare depth program uniforms
         */
        this._depthProgram.bind();
        gl.uniform2fv(this._uCameraNearFarD, gl_matrix_1.vec2.fromValues(this._camera.near, this._camera.far));
        gl.uniformMatrix4fv(this._uViewD, gl.FALSE, this._camera.view);
        gl.uniformMatrix4fv(this._uProjectionD, gl.FALSE, this._camera.projection);
        this._depthProgram.unbind();
    }
    /**
     * Bind all uniforms that change each frame and perform shadow and depth prepass if necessary.
     */
    prepareFrame(frameNumber) {
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        const samples = this._sampleManager.getNextFrameSamples();
        let numDiffuseEnvironmentSamples = 0;
        let diffuseEnvironmentFactor = 1.0;
        let numSpecularEnvironmentSamples = 0;
        let specularEnvironmentFactor = 1.0;
        let currentLightIndex = -1;
        let lightEye = gl_matrix_1.vec3.create();
        let lightFactor = 1.0;
        for (const sample of samples) {
            if (sample instanceof samplemanager_1.DiffuseEnvironmentSample) {
                numDiffuseEnvironmentSamples++;
                diffuseEnvironmentFactor = sample.factor;
            }
            if (sample instanceof samplemanager_1.SpecularEnvironmentSample) {
                numSpecularEnvironmentSamples++;
                specularEnvironmentFactor = sample.factor;
            }
            if (sample instanceof samplemanager_1.LightSample) {
                currentLightIndex = sample.lightIndex;
                lightEye = sample.eye;
                lightFactor = sample.factor;
            }
        }
        if (frameNumber === 1) {
            this.preDepthPass();
        }
        if (currentLightIndex >= 0) {
            this.shadowPass(currentLightIndex, lightEye);
        }
        this._program.bind();
        gl.uniform1i(this._uFrameNumber, frameNumber);
        const ndcOffset = this._ndcOffsetKernel.get(frameNumber);
        ndcOffset[0] = 2.0 * ndcOffset[0] / this._frameSize[0];
        ndcOffset[1] = 2.0 * ndcOffset[1] / this._frameSize[1];
        gl.uniform2fv(this._uNdcOffset, ndcOffset);
        const cocPoint = this._depthOfFieldKernel.get(frameNumber);
        cocPoint[0] *= this._depthOfFieldRange;
        cocPoint[1] *= this._depthOfFieldRange;
        gl.uniform2fv(this._uCocPoint, cocPoint);
        /**
         * Update samples that should be handled in this frame.
         */
        gl.uniform1i(this._uLightSampleIndex, currentLightIndex);
        gl.uniform1f(this._uLightFactor, lightFactor);
        gl.uniform1i(this._uNumDiffuseEnvironmentSamples, numDiffuseEnvironmentSamples);
        gl.uniform1f(this._uDiffuseEnvironmentFactor, diffuseEnvironmentFactor);
        gl.uniform1i(this._uNumSpecularEnvironmentSamples, numSpecularEnvironmentSamples);
        gl.uniform1f(this._uSpecularEnvironmentFactor, specularEnvironmentFactor);
        const lastFrame = this._accumulatePass.framebuffer.texture(gl2facade.COLOR_ATTACHMENT0);
        lastFrame.bind(gl.TEXTURE9);
    }
    /**
     * Load asset from URI specified by the HTML select
     */
    loadAsset() {
        const assetSelect = window.document.getElementById('asset-select');
        let scene;
        if (assetSelect.value === 'Datsun') {
            scene = this._datsunScene;
        }
        else if (assetSelect.value === 'Kitchen') {
            scene = this._kitchenScene;
        }
        else if (assetSelect.value === 'Cornell') {
            scene = this._cornellScene;
        }
        else if (assetSelect.value === 'Skyline') {
            scene = this._skylineScene;
        }
        webgl_operate_1.auxiliaries.assert(scene !== undefined, `Unknown scene ${assetSelect.value}.`);
        if (scene === undefined) {
            webgl_operate_1.auxiliaries.log(webgl_operate_1.auxiliaries.LogLevel.Error, `Scene ${assetSelect.value} could not be loaded.`);
            return;
        }
        // Show loading spinner and clear background
        this.startLoading();
        this._postProcessingPass.clear();
        this._currentScene = scene;
        this._camera = scene.camera;
        this.updateCamera();
        this.updateLights(scene);
        this._loader.uninitialize();
        this._loader.loadAsset(scene.uri)
            .then(() => {
            this._forwardPass.scene = this._loader.defaultScene;
            this._invalidate(true);
            this.finishLoading();
        });
    }
    setDebugMode() {
        const gl = this._context.gl;
        const debugSelect = window.document.getElementById('debug-select');
        let debugMode = 0;
        if (debugSelect.value === 'Final') {
            debugMode = 0;
        }
        else if (debugSelect.value === 'Flat') {
            debugMode = 1;
        }
        else if (debugSelect.value === 'IBL') {
            debugMode = 2;
        }
        else if (debugSelect.value === 'Light sources') {
            debugMode = 3;
        }
        else if (debugSelect.value === 'Illuminance') {
            debugMode = 4;
        }
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_debugMode'), debugMode);
        this._program.unbind();
    }
    updateLights(scene) {
        const gl = this._context.gl;
        this._program.bind();
        gl.uniform1i(this._program.uniform('u_numDiskLights'), scene.diskLights.length);
        let i = 0;
        for (const diskLight of scene.diskLights) {
            gl.uniform3fv(this._program.uniform(`u_diskLights[${i}].center`), diskLight.center);
            gl.uniform1f(this._program.uniform(`u_diskLights[${i}].radius`), diskLight.radius);
            gl.uniform3fv(this._program.uniform(`u_diskLights[${i}].luminance`), diskLight.luminance);
            gl.uniform3fv(this._program.uniform(`u_diskLights[${i}].direction`), diskLight.direction);
            i++;
        }
        this._program.unbind();
    }
    updateCamera() {
        // focal length of 50mm
        this._camera.viewport = [this._frameSize[0], this._frameSize[1]];
        this._camera.aspect = this._canvasSize[0] / this._canvasSize[1];
        // Convert from horizontal to vertical FOV
        const horizontalFOV = 39.6 * webgl_operate_1.auxiliaries.DEG2RAD;
        const verticalFOV = 2.0 * Math.atan(Math.tan(horizontalFOV / 2.0) * (1.0 / this._camera.aspect));
        this._camera.fovy = verticalFOV * webgl_operate_1.auxiliaries.RAD2DEG;
        this._forwardPass.camera = this._camera;
        this._navigation.camera = this._camera;
        this._camera.altered = true;
    }
    /**
     * Setup environment lighting
     */
    loadEnvironmentMap() {
        const environmentSelect = window.document.getElementById('environment-select');
        const environmentName = environmentSelect.value;
        const gl = this._context.gl;
        this._brdfLUT = new webgl_operate_2.Texture2D(this._context, 'BRDFLookUpTable');
        this._brdfLUT.initialize(1, 1, gl.RG16F, gl.RG, gl.FLOAT);
        this._brdfLUT.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        this._brdfLUT.filter(gl.LINEAR, gl.LINEAR);
        this._brdfLUT.fetch('/examples/data/imagebasedlighting/brdfLUT.png');
        const internalFormatAndType = webgl_operate_2.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, webgl_operate_2.Wizard.Precision.byte);
        this._diffuseEnvironment = new webgl_operate_2.TextureCube(this._context, 'DiffuseEnvironment');
        this._diffuseEnvironment.initialize(64, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        this._diffuseEnvironment.fetch({
            positiveX: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-px-diffuse.png`,
            negativeX: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-nx-diffuse.png`,
            positiveY: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-py-diffuse.png`,
            negativeY: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-ny-diffuse.png`,
            positiveZ: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-pz-diffuse.png`,
            negativeZ: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-nz-diffuse.png`,
        }, true);
        this._specularEnvironment = new webgl_operate_2.TextureCube(this._context, 'SpecularEnvironment');
        this._specularEnvironment.initialize(512, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        const MIPMAP_LEVELS = 9;
        this._specularEnvironment.filter(gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR);
        this._specularEnvironment.levels(0, MIPMAP_LEVELS - 1);
        for (let mipLevel = 0; mipLevel < MIPMAP_LEVELS; ++mipLevel) {
            this._specularEnvironment.fetch({
                positiveX: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-px-${mipLevel}.png`,
                negativeX: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-nx-${mipLevel}.png`,
                positiveY: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-py-${mipLevel}.png`,
                negativeY: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-ny-${mipLevel}.png`,
                positiveZ: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-pz-${mipLevel}.png`,
                negativeZ: `${ProgressiveLightingRenderer.URL}/${environmentName}/preprocessed-map-nz-${mipLevel}.png`,
            }, true, mipLevel);
        }
    }
}
exports.ProgressiveLightingRenderer = ProgressiveLightingRenderer;
class ProgressiveLightingDemo extends demo_1.Demo {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element);
        this._canvas.controller.multiFrameNumber = 128;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.float;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new ProgressiveLightingRenderer();
        this._canvas.renderer = this._renderer;
        const frameScale = window.document.getElementById('frame-scale');
        frameScale.onchange = (_) => {
            const scale = parseFloat(frameScale.value) / 100.0;
            this._canvas.frameScale = [scale, scale];
        };
        const multiFrameCount = window.document.getElementById('multiframe-count');
        multiFrameCount.onchange = (_) => {
            this._canvas.controller.multiFrameNumber = parseInt(multiFrameCount.value, 10);
        };
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
exports.ProgressiveLightingDemo = ProgressiveLightingDemo;
//# sourceMappingURL=progressive-lighting.js.map