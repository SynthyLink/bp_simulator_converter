import { vec2 } from 'webgl-operate';
import { Camera, Canvas, Context, DefaultFramebuffer, FontFace, Invalidate, LabelRenderPass, NdcFillingRectangle, Position2DLabel, Program, Renderer, Texture2D } from 'webgl-operate';
import { Example } from './example';
declare class ColorScaleRenderer extends Renderer {
    protected _extensions: boolean;
    protected _positions: vec2[];
    protected _presets: Array<[string, string, number, boolean]>;
    protected _labelPass: LabelRenderPass;
    protected _labels: Position2DLabel[];
    protected _textures: Texture2D[];
    protected _ndcrect: NdcFillingRectangle;
    protected _program: Program;
    protected _uExtent: WebGLUniformLocation;
    protected _uOffset: WebGLUniformLocation;
    protected _camera: Camera;
    protected _defaultFBO: DefaultFramebuffer;
    protected _fontFace: FontFace | undefined;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    protected onInitialize(context: Context, callback: Invalidate): boolean;
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
     * @returns whether to redraw
     */
    protected onUpdate(): boolean;
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    protected onPrepare(): void;
    /**
     * After (1) update and (2) preparation are invoked, a frame is invoked. Renders both 2D and 3D labels.
     * @param frameNumber - for intermediate frames in accumulation rendering
     */
    protected onFrame(frameNumber: number): void;
    protected updateLabels(): void;
}
export declare class ColorScaleExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): ColorScaleRenderer;
}
export {};
//# sourceMappingURL=colorscale-example.d.ts.map