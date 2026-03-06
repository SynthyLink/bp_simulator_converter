import { vec3 } from 'gl-matrix';
import { AccumulatePass, AntiAliasingKernel, BlitPass, Camera, Canvas, Context, EventProvider, ForwardSceneRenderPass, Framebuffer, GLTFLoader, Invalidate, Navigation, NdcFillingTriangle, Program, Renderbuffer, Renderer, ShadowPass, Texture2D, TextureCube } from 'webgl-operate';
import { PostProcessingPass } from './postprocessingpass';
import { Scene } from './scene';
import { Demo } from '../demo';
import { DepthOfFieldKernel } from './depthoffieldkernel';
import { SampleManager } from './samplemanager';
/**
 * @todo comment
 */
export declare class ProgressiveLightingRenderer extends Renderer {
    static URL: string;
    protected _loader: GLTFLoader;
    protected _navigation: Navigation;
    protected _forwardPass: ForwardSceneRenderPass;
    protected _accumulatePass: AccumulatePass;
    protected _blitPass: BlitPass;
    protected _postProcessingPass: PostProcessingPass;
    protected _shadowPass: ShadowPass;
    protected _camera: Camera;
    protected _depthOfFieldRange: number;
    protected _sampleManager: SampleManager;
    protected _currentScene: Scene;
    protected _datsunScene: Scene;
    protected _kitchenScene: Scene;
    protected _skylineScene: Scene;
    protected _cornellScene: Scene;
    protected _intermediateFBO: Framebuffer;
    protected _colorRenderTexture: Texture2D;
    protected _depthRenderbuffer: Renderbuffer;
    protected _preDepthFBO: Framebuffer;
    protected _normalDepthTexture: Texture2D;
    protected _preDepthRenderbuffer: Renderbuffer;
    protected _depthProgram: Program;
    protected _defaultFramebuffer: Framebuffer;
    protected _ndcTriangle: NdcFillingTriangle;
    protected _program: Program;
    protected _shadowProgram: Program;
    protected _emptyTexture: Texture2D;
    protected _diffuseEnvironment: TextureCube;
    protected _specularEnvironment: TextureCube;
    protected _brdfLUT: Texture2D;
    protected _uLightSampleIndex: WebGLUniformLocation;
    protected _uLightFactor: WebGLUniformLocation;
    protected _uNumDiffuseEnvironmentSamples: WebGLUniformLocation;
    protected _uDiffuseEnvironmentFactor: WebGLUniformLocation;
    protected _uNumSpecularEnvironmentSamples: WebGLUniformLocation;
    protected _uSpecularEnvironmentFactor: WebGLUniformLocation;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uView: WebGLUniformLocation;
    protected _uProjection: WebGLUniformLocation;
    protected _uModel: WebGLUniformLocation;
    protected _uNormalMatrix: WebGLUniformLocation;
    protected _uViewNormalMatrix: WebGLUniformLocation;
    protected _uCameraNearFar: WebGLUniformLocation;
    protected _ndcOffsetKernel: AntiAliasingKernel;
    protected _uNdcOffset: WebGLUniformLocation;
    protected _depthOfFieldKernel: DepthOfFieldKernel;
    protected _uCocPoint: WebGLUniformLocation;
    protected _uFrameNumber: WebGLUniformLocation;
    protected _uBaseColor: WebGLUniformLocation;
    protected _uBaseColorTexCoord: WebGLUniformLocation;
    protected _uMetallicRoughness: WebGLUniformLocation;
    protected _uMetallicRoughnessTexCoord: WebGLUniformLocation;
    protected _uNormal: WebGLUniformLocation;
    protected _uNormalTexCoord: WebGLUniformLocation;
    protected _uEmissive: WebGLUniformLocation;
    protected _uEmissiveTexCoord: WebGLUniformLocation;
    protected _uOcclusion: WebGLUniformLocation;
    protected _uOcclusionTexCoord: WebGLUniformLocation;
    protected _uEye: WebGLUniformLocation;
    protected _uGeometryFlags: WebGLUniformLocation;
    protected _uPbrFlags: WebGLUniformLocation;
    protected _uBaseColorFactor: WebGLUniformLocation;
    protected _uMetallicFactor: WebGLUniformLocation;
    protected _uRoughnessFactor: WebGLUniformLocation;
    protected _uEmissiveFactor: WebGLUniformLocation;
    protected _uNormalScale: WebGLUniformLocation;
    protected _uBlendMode: WebGLUniformLocation;
    protected _uBlendCutoff: WebGLUniformLocation;
    protected _uDiffuseEnvironment: WebGLUniformLocation;
    protected _uSpecularEnvironment: WebGLUniformLocation;
    protected _uBRDFLookupTable: WebGLUniformLocation;
    protected _uShadowMap: WebGLUniformLocation;
    protected _uLastFrame: WebGLUniformLocation;
    protected _uNormalDepth: WebGLUniformLocation;
    protected _uOcclusionRange: WebGLUniformLocation;
    protected _uExposure: WebGLUniformLocation;
    protected _uIBLStrength: WebGLUniformLocation;
    protected _uLightView: WebGLUniformLocation;
    protected _uLightProjection: WebGLUniformLocation;
    protected _uLightNearFar: WebGLUniformLocation;
    protected _uModelS: WebGLUniformLocation;
    protected _uViewS: WebGLUniformLocation;
    protected _uProjectionS: WebGLUniformLocation;
    protected _uLightNearFarS: WebGLUniformLocation;
    protected _uLightPositionS: WebGLUniformLocation;
    protected _uModelD: WebGLUniformLocation;
    protected _uProjectionD: WebGLUniformLocation;
    protected _uViewD: WebGLUniformLocation;
    protected _uCameraNearFarD: WebGLUniformLocation;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * Updates the navigaten and the AntiAliasingKernel.
     * @returns whether to redraw
     */
    protected onUpdate(): boolean;
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    protected onPrepare(): void;
    protected preDepthPass(): void;
    protected shadowPass(lightIndex: number, eye: vec3): void;
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    /**
     * Bind all uniforms that do not change within a multi-frame.
     * This avoids unnecessary calls in each individual frame.
     */
    protected bindMultiframeUniforms(): void;
    /**
     * Bind all uniforms that change each frame and perform shadow and depth prepass if necessary.
     */
    protected prepareFrame(frameNumber: number): void;
    /**
     * Load asset from URI specified by the HTML select
     */
    protected loadAsset(): void;
    protected setDebugMode(): void;
    protected updateLights(scene: Scene): void;
    protected updateCamera(): void;
    /**
     * Setup environment lighting
     */
    protected loadEnvironmentMap(): void;
}
export declare class ProgressiveLightingDemo extends Demo {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): ProgressiveLightingRenderer;
}
//# sourceMappingURL=progressive-lighting.d.ts.map