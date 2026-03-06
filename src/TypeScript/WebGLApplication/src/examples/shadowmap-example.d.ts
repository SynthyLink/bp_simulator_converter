import { Camera, Canvas, Context, CuboidGeometry, DebugPass, DefaultFramebuffer, EventProvider, Invalidate, Navigation, PlaneGeometry, Program, Renderer, ShadowPass } from 'webgl-operate';
import { Example } from './example';
declare class ShadowMapRenderer extends Renderer {
    protected _cuboids: Array<CuboidGeometry>;
    protected _plane: PlaneGeometry;
    protected _defaultFBO: DefaultFramebuffer;
    protected _navigation: Navigation;
    protected _camera: Camera;
    protected _light: Camera;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uModel: WebGLUniformLocation;
    protected _uColored: WebGLUniformLocation;
    protected _shadowProgram: Program;
    protected _uModelS: WebGLUniformLocation;
    protected _shadowPass: ShadowPass;
    protected _debugPass: DebugPass;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    protected drawCuboids(model: WebGLUniformLocation): void;
    protected drawPlane(model: WebGLUniformLocation): void;
}
export declare class ShadowMapExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): ShadowMapRenderer;
}
export {};
//# sourceMappingURL=shadowmap-example.d.ts.map