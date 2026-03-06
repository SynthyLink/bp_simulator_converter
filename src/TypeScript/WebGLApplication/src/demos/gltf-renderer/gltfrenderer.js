"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GltfDemo = exports.GltfRenderer = void 0;
const gl_matrix_1 = require("gl-matrix");
const webgl_operate_1 = require("webgl-operate");
const webgl_operate_2 = require("webgl-operate");
const demo_1 = require("../demo");
// tslint:disable:max-classes-per-file
/**
 * @todo comment
 */
class GltfRenderer extends webgl_operate_2.Renderer {
    _loader;
    _navigation;
    _forwardPass;
    _camera;
    _texture;
    _framebuffer;
    _program;
    _emptyTexture;
    _specularEnvironment;
    _brdfLUT;
    _uViewProjection;
    _uModel;
    _uNormalMatrix;
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
    _uSpecularEnvironment;
    _uBRDFLookupTable;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    onInitialize(context, callback, eventProvider) {
        const gl = this._context.gl;
        this._loader = new webgl_operate_2.GLTFLoader(this._context);
        this._emptyTexture = new webgl_operate_2.Texture2D(this._context, 'EmptyTexture');
        this._emptyTexture.initialize(1, 1, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
        this._framebuffer = new webgl_operate_2.DefaultFramebuffer(this._context, 'DefaultFBO');
        this._framebuffer.initialize();
        this._program = this._loader.pbrProgram;
        this._uViewProjection = this._program.uniform('u_viewProjection');
        this._uModel = this._program.uniform('u_model');
        this._uNormalMatrix = this._program.uniform('u_normalMatrix');
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
        this._uSpecularEnvironment = this._program.uniform('u_specularEnvironment');
        this._uBRDFLookupTable = this._program.uniform('u_brdfLUT');
        /* Create and configure camera. */
        if (this._camera === undefined) {
            this._camera = new webgl_operate_2.Camera();
            this._camera.center = gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0);
            this._camera.up = gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0);
            this._camera.eye = gl_matrix_1.vec3.fromValues(0.0, 3.0, 1.0);
            this._camera.near = 0.1;
            this._camera.far = 32.0;
        }
        /* Create and configure navigation */
        this._navigation = new webgl_operate_2.Navigation(callback, eventProvider);
        this._navigation.camera = this._camera;
        /* Create and configure forward pass. */
        this._forwardPass = new webgl_operate_2.ForwardSceneRenderPass(context);
        this._forwardPass.initialize();
        this._forwardPass.camera = this._camera;
        this._forwardPass.target = this._framebuffer;
        this._forwardPass.program = this._program;
        this._forwardPass.updateModelTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uModel, false, matrix);
            const normalMatrix = gl_matrix_1.mat3.create();
            gl_matrix_1.mat3.normalFromMat4(normalMatrix, matrix);
            gl.uniformMatrix3fv(this._uNormalMatrix, false, normalMatrix);
        };
        this._forwardPass.updateViewProjectionTransform = (matrix) => {
            gl.uniformMatrix4fv(this._uViewProjection, false, matrix);
        };
        this._forwardPass.bindGeometry = (geometry) => {
            const primitive = geometry;
            gl.uniform1i(this._uGeometryFlags, primitive.flags);
        };
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
             * Factors
             */
            gl.uniform4fv(this._uBaseColorFactor, pbrMaterial.baseColorFactor);
            gl.uniform3fv(this._uEmissiveFactor, pbrMaterial.emissiveFactor);
            gl.uniform1f(this._uMetallicFactor, pbrMaterial.metallicFactor);
            gl.uniform1f(this._uRoughnessFactor, pbrMaterial.roughnessFactor);
            gl.uniform1f(this._uNormalScale, pbrMaterial.normalScale);
            gl.uniform1i(this._uPbrFlags, pbrMaterial.flags);
            /**
             * Handle alpha modes
             */
            if (pbrMaterial.alphaMode === webgl_operate_2.GLTFAlphaMode.OPAQUE) {
                gl.disable(gl.BLEND);
                gl.uniform1i(this._uBlendMode, 0);
            }
            else if (pbrMaterial.alphaMode === webgl_operate_2.GLTFAlphaMode.MASK) {
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.uniform1i(this._uBlendMode, 1);
                gl.uniform1f(this._uBlendCutoff, pbrMaterial.alphaCutoff);
            }
            else if (pbrMaterial.alphaMode === webgl_operate_2.GLTFAlphaMode.BLEND) {
                gl.enable(gl.BLEND);
                // We premultiply in the shader
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
                gl.uniform1i(this._uBlendMode, 2);
            }
            else {
                webgl_operate_1.auxiliaries.log(webgl_operate_1.auxiliaries.LogLevel.Warning, 'Unknown blend mode encountered.');
            }
        };
        this.loadAsset();
        this.loadEnvironmentMap();
        const assetSelect = window.document.getElementById('asset-select');
        assetSelect.onchange = (_) => {
            this.loadAsset();
        };
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
        this._altered.alter('frameSize');
        this._altered.alter('canvasSize');
        this._altered.alter('clearColor');
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
            this._forwardPass.clearColor = this._clearColor;
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
        this._forwardPass.prepare();
        this._altered.reset();
        this._camera.altered = false;
    }
    onFrame(frameNumber) {
        if (this.isLoading) {
            return;
        }
        this.bindUniforms();
        const gl = this._context.gl;
        // TODO: proper handling of transparent materials in the loader
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this._forwardPass.frame();
    }
    onSwap() {
    }
    bindUniforms() {
        const gl = this._context.gl;
        this._program.bind();
        gl.uniform3fv(this._uEye, this._camera.eye);
        gl.uniform1i(this._uBaseColor, 0);
        gl.uniform1i(this._uMetallicRoughness, 1);
        gl.uniform1i(this._uNormal, 2);
        gl.uniform1i(this._uOcclusion, 3);
        gl.uniform1i(this._uEmissive, 4);
        gl.uniform1i(this._uSpecularEnvironment, 5);
        gl.uniform1i(this._uBRDFLookupTable, 6);
        this._specularEnvironment.bind(gl.TEXTURE5);
        this._brdfLUT.bind(gl.TEXTURE6);
        this._program.unbind();
    }
    /**
     * Load asset from URI specified by the HTML select
     */
    loadAsset() {
        const assetSelect = window.document.getElementById('asset-select');
        this.startLoading();
        const uri = assetSelect.value;
        this._forwardPass.scene = undefined;
        this._loader.uninitialize();
        this._loader.loadAsset(uri)
            .then(() => {
            this._forwardPass.scene = this._loader.defaultScene;
            this.finishLoading();
            this._invalidate(true);
        });
    }
    /**
     * Setup environment lighting
     */
    loadEnvironmentMap() {
        const gl = this._context.gl;
        this._brdfLUT = new webgl_operate_2.Texture2D(this._context, 'BRDFLookUpTable');
        this._brdfLUT.initialize(1, 1, gl.RG16F, gl.RG, gl.FLOAT);
        this._brdfLUT.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        this._brdfLUT.filter(gl.LINEAR, gl.LINEAR);
        this._brdfLUT.fetch('/examples/data/imagebasedlighting/brdfLUT.png');
        const internalFormatAndType = webgl_operate_2.Wizard.queryInternalTextureFormat(this._context, gl.RGBA, webgl_operate_2.Wizard.Precision.byte);
        this._specularEnvironment = new webgl_operate_2.TextureCube(this._context, 'Cubemap');
        this._specularEnvironment.initialize(512, internalFormatAndType[0], gl.RGBA, internalFormatAndType[1]);
        const MIPMAP_LEVELS = 9;
        this._specularEnvironment.filter(gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR);
        this._specularEnvironment.levels(0, MIPMAP_LEVELS - 1);
        for (let mipLevel = 0; mipLevel < MIPMAP_LEVELS; ++mipLevel) {
            this._specularEnvironment.fetch({
                positiveX: `/examples/data/imagebasedlighting/preprocessed-map-px-${mipLevel}.png`,
                negativeX: `/examples/data/imagebasedlighting/preprocessed-map-nx-${mipLevel}.png`,
                positiveY: `/examples/data/imagebasedlighting/preprocessed-map-py-${mipLevel}.png`,
                negativeY: `/examples/data/imagebasedlighting/preprocessed-map-ny-${mipLevel}.png`,
                positiveZ: `/examples/data/imagebasedlighting/preprocessed-map-pz-${mipLevel}.png`,
                negativeZ: `/examples/data/imagebasedlighting/preprocessed-map-nz-${mipLevel}.png`,
            }, false, mipLevel);
        }
    }
}
exports.GltfRenderer = GltfRenderer;
class GltfDemo extends demo_1.Demo {
    _canvas;
    _renderer;
    onInitialize(element) {
        this._canvas = new webgl_operate_2.Canvas(element, { antialias: true });
        this._canvas.controller.multiFrameNumber = 1;
        this._canvas.framePrecision = webgl_operate_2.Wizard.Precision.byte;
        this._canvas.frameScale = [1.0, 1.0];
        this._renderer = new GltfRenderer();
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
exports.GltfDemo = GltfDemo;
//# sourceMappingURL=gltfrenderer.js.map