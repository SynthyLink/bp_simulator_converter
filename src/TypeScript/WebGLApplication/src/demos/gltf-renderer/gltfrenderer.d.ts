import { Camera, Canvas, Context, EventProvider, ForwardSceneRenderPass, Framebuffer, GLTFLoader, Invalidate, Navigation, Program, Renderer, Texture2D, TextureCube } from 'webgl-operate';
import { Demo } from '../demo';
/**
 * @todo comment
 */
export declare class GltfRenderer extends Renderer {
    protected _loader: GLTFLoader;
    protected _navigation: Navigation;
    protected _forwardPass: ForwardSceneRenderPass;
    protected _camera: Camera;
    protected _texture: Texture2D;
    protected _framebuffer: Framebuffer;
    protected _program: Program;
    protected _emptyTexture: Texture2D;
    protected _specularEnvironment: TextureCube;
    protected _brdfLUT: Texture2D;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uModel: WebGLUniformLocation;
    protected _uNormalMatrix: WebGLUniformLocation;
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
    protected _uSpecularEnvironment: WebGLUniformLocation;
    protected _uBRDFLookupTable: WebGLUniformLocation;
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
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    protected bindUniforms(): void;
    /**
     * Load asset from URI specified by the HTML select
     */
    protected loadAsset(): void;
    /**
     * Setup environment lighting
     */
    protected loadEnvironmentMap(): void;
}
export declare class GltfDemo extends Demo {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): GltfRenderer;
}
//# sourceMappingURL=gltfrenderer.d.ts.map