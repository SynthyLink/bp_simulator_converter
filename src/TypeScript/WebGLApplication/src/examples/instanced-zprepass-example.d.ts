import { Benchmark, BlitPass, Camera, Canvas, Context, CuboidGeometry, DefaultFramebuffer, EventProvider, Framebuffer, Invalidate, Navigation, Program, Renderer, Renderbuffer, Texture2D } from 'webgl-operate';
import { Example } from './example';
export declare class InstancedZPrepassRenderer extends Renderer {
    protected _benchmark: Benchmark;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _depthRenderTarget: Renderbuffer | Texture2D;
    protected _colorRenderTexture: Texture2D;
    protected _intermediateFBO: Framebuffer;
    protected _cuboid: CuboidGeometry;
    protected _texture: Texture2D;
    protected _framebuffer: Framebuffer;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uDrawMode: WebGLUniformLocation;
    protected _uNumInstances: WebGLUniformLocation;
    protected _defaultFBO: DefaultFramebuffer;
    protected _blit: BlitPass;
    protected _depthTargetIsTexture: boolean;
    protected _numCubes: number;
    protected _enableCullFace: boolean;
    protected _enableDepthTest: boolean;
    protected _enableDepthWrite: boolean;
    protected _enablePreZPass: boolean;
    protected _enableHeavyFrag: boolean;
    protected _enableColorClear: boolean;
    protected _enableDepthClear: boolean;
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
    benchmark(value?: number): void;
    set numCubes(value: number);
    set enableCullFace(value: boolean);
    set enableDepthTest(value: boolean);
    set enableDepthWrite(value: boolean);
    set enablePreZPass(value: boolean);
    set enableHeavyFrag(value: boolean);
    set enableColorClear(value: boolean);
    set enableDepthClear(value: boolean);
}
export declare class InstancedZPrepassExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): InstancedZPrepassRenderer;
}
//# sourceMappingURL=instanced-zprepass-example.d.ts.map