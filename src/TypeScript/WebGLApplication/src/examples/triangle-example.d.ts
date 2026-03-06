import { Camera, Canvas, Context, DefaultFramebuffer, EventProvider, Invalidate, Navigation, Program, Renderer, Texture2D } from 'webgl-operate';
import { Example } from './example';
export declare class TriangleRenderer extends Renderer {
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _triangle: Float32Array<ArrayBuffer>;
    protected _vertexLocation: GLuint;
    protected _uvCoordLocation: GLuint;
    protected _buffer: WebGLBuffer;
    protected _texture: Texture2D;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _defaultFBO: DefaultFramebuffer;
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
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    protected onPrepare(): void;
    protected onFrame(): void;
    protected onSwap(): void;
}
export declare class TriangleExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): TriangleRenderer;
}
//# sourceMappingURL=triangle-example.d.ts.map