import { Camera, Canvas, Context, DefaultFramebuffer, EventProvider, FontFace, Invalidate, LabelRenderPass, Navigation, Position3DLabel, Renderer } from 'webgl-operate';
import { Example } from './example';
declare class Label3DRenderer extends Renderer {
    protected _extensions: boolean;
    protected _labelPass: LabelRenderPass;
    protected _labelWrap: Position3DLabel;
    protected _labelCentered: Position3DLabel;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _defaultFBO: DefaultFramebuffer;
    protected _fontFace: FontFace | undefined;
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
    /**
     * Sets up an example scene with 2D and 3D labels and sets the corresponding data on LabelGeometries. The
     * FontFace is set on each label by the LabelRenderPass.
     */
    protected setupScene(): void;
    protected updateLabels(): void;
}
export declare class Label3DExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): Label3DRenderer;
}
export {};
//# sourceMappingURL=label3d-example.d.ts.map