import { mat4 } from 'gl-matrix';
import { Buffer, Camera, Canvas, Context, DefaultFramebuffer, EventProvider, Invalidate, Navigation, Program, Renderer } from 'webgl-operate';
import { Demo } from '../demo';
export declare class PointCloudRenderer extends Renderer {
    protected static readonly DEFAULT_POINT_SIZE: number;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _model: mat4;
    protected _particleVBO: Buffer;
    protected _instancesVBO: Buffer;
    protected readonly _uvLocation: GLuint;
    protected readonly _positionLocation: GLuint;
    protected _data: Array<Float32Array>;
    protected _push: boolean;
    protected _drawIndex: number;
    protected _drawRanges: Array<[GLuint, GLuint]>;
    protected _program: Program;
    protected _pointSize: GLfloat;
    protected _billboards: boolean;
    protected _alpha2Coverage: boolean;
    protected _alphaBlending: boolean;
    protected _phongShading: boolean;
    protected _renderingConfigAltered: boolean;
    protected _uModel: WebGLUniformLocation;
    protected _uView: WebGLUniformLocation;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uLight: WebGLUniformLocation;
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
    set data(data: Array<Float32Array>);
    set draw(index: number);
    set model(model: mat4);
    set pointSize(size: GLfloat);
    get pointSize(): GLfloat;
    set alpha2Coverage(value: boolean);
    get alpha2Coverage(): boolean;
    set alphaBlending(value: boolean);
    get alphaBlending(): boolean;
    set billboards(value: boolean);
    get billboards(): boolean;
    set phongShading(value: boolean);
    get phongShading(): boolean;
}
export declare class PointCloudDemo extends Demo {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): PointCloudRenderer;
}
//# sourceMappingURL=point-cloud.d.ts.map