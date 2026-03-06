import { Camera, Canvas, Context, DefaultFramebuffer, EventProvider, ForwardSceneRenderPass, Framebuffer, GLTFLoader, Invalidate, Navigation, NdcFillingTriangle, Program, Renderer, Renderbuffer, Texture2D } from 'webgl-operate';
import { Example } from './example';
export declare class AmbientOcclusionRenderer extends Renderer {
    protected _loader: GLTFLoader;
    protected _ndcGeometry: NdcFillingTriangle;
    protected _navigation: Navigation;
    protected _camera: Camera;
    protected _forwardPass: ForwardSceneRenderPass;
    protected _sceneColor: Texture2D;
    protected _sceneNormal: Texture2D;
    protected _sceneLinearDepth: Texture2D;
    protected _sceneDepth: Renderbuffer;
    protected _sceneProgram: Program;
    protected _uViewProjectionLocation: WebGLUniformLocation;
    protected _uModelLocation: WebGLUniformLocation;
    protected _uNormalLocation: WebGLUniformLocation;
    protected _uSceneFrameSizeLocation: WebGLUniformLocation;
    protected _uEyeLocation: WebGLUniformLocation;
    protected _sceneFbo: Framebuffer;
    protected _aoNoisyMap: Texture2D;
    protected _aoProgram: Program;
    protected _uAOFrameSizeLocation: WebGLUniformLocation;
    protected _uNormalTextureLocation: WebGLUniformLocation;
    protected _uDepthTextureLocation: WebGLUniformLocation;
    protected _uViewProjectionLocation2: WebGLUniformLocation;
    protected _uViewProjectionInverseLocation: WebGLUniformLocation;
    protected _aoFbo: Framebuffer;
    protected _aoMap: Texture2D;
    protected _blurProgram: Program;
    protected _uKernelSizeLocation: WebGLUniformLocation;
    protected _uSourceLocation: WebGLUniformLocation;
    protected _uBlurFrameSizeLocation: WebGLUniformLocation;
    protected _blurredAOFbo: Framebuffer;
    protected _compositionProgram: Program;
    protected _uColorLocation: WebGLUniformLocation;
    protected _uDepthLocation: WebGLUniformLocation;
    protected _uAOMapLocation: WebGLUniformLocation;
    protected _uCompositionFrameSizeLocation: WebGLUniformLocation;
    protected _outputFbo: DefaultFramebuffer;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param eventProvider - required for mouse interaction
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
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    /**
     * Load asset from URI specified by the HTML select
     */
    protected loadAsset(): void;
}
export declare class AmbientOcclusionExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): AmbientOcclusionRenderer;
}
//# sourceMappingURL=ambient-occlusion-example.d.ts.map