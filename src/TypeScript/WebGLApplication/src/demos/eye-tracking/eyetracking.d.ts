import { Camera, Canvas, Context, CuboidGeometry, DefaultFramebuffer, EventHandler, EventProvider, EyeGazeDataStreams, Invalidate, Navigation, Program, Renderer } from 'webgl-operate';
import { Demo } from '../demo';
export declare class EyeTrackingRenderer extends Renderer {
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _cuboid: CuboidGeometry;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _defaultFBO: DefaultFramebuffer;
    protected _eyeGazeDataStreams: EyeGazeDataStreams;
    protected _eventHandler: EventHandler;
    constructor(eyeGazeDataStreams: EyeGazeDataStreams);
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(): void;
    protected onSwap(): void;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
}
export declare class EyeTrackingDemo extends Demo {
    static readonly serverAddress = "ws://localhost:1234";
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): EyeTrackingRenderer;
}
//# sourceMappingURL=eyetracking.d.ts.map