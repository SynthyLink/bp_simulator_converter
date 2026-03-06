import { tuples } from 'webgl-operate';
import { BlitPass, Camera, Canvas, Context, CuboidGeometry, DefaultFramebuffer, EventProvider, Framebuffer, Invalidate, Navigation, Program, Renderbuffer, Renderer, Texture2D, TileCameraGenerator } from 'webgl-operate';
import { Example } from './example';
export declare class TileCameraRenderer extends Renderer {
    static readonly TILE_SIZE: tuples.GLsizei2;
    static readonly TARGET_SIZE: tuples.GLsizei2;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _cuboid: CuboidGeometry;
    protected _texture: Texture2D;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _defaultFBO: DefaultFramebuffer;
    protected _intermediateFBOs: Framebuffer[];
    protected _colorRenderTextures: Texture2D[];
    protected _depthRenderbuffers: Renderbuffer[];
    protected _targetSize: tuples.GLsizei2;
    protected _blitPass: BlitPass;
    protected _generators: TileCameraGenerator[];
    protected _isLoaded: boolean;
    /**
     * Initializes and sets up buffer, cube geometry, camera and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    /**
     * Uninitializes buffers, geometry and program.
     */
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * @returns whether to redraw
     */
    protected onUpdate(): boolean;
    protected getViewportDividableByTwo(viewport: [number, number]): [number, number];
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    protected onPrepare(): void;
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    /**
     * Show a spinner that indicates that the example is still loading.
     */
    protected showSpinner(): void;
    /**
     * Hide the loading spinner.
     */
    protected hideSpinner(): void;
}
export declare class TileCameraExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): TileCameraRenderer;
}
//# sourceMappingURL=tilecamera-example.d.ts.map