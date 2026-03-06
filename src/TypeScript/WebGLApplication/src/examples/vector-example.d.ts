import { Camera, Canvas, Context, DefaultFramebuffer, EventProvider, FontFace, Invalidate, LabelRenderPass, Navigation, Label, Renderer, Program } from 'webgl-operate';
import { Example } from './example';
declare class VectorRenderer extends Renderer {
    protected _defaultFBO: DefaultFramebuffer;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _fontFace: FontFace;
    protected _points: Float32Array;
    protected _lines: Float32Array;
    protected _labels: Array<Label>;
    protected _pointsBuffer: WebGLBuffer;
    protected _pointsProgram: Program;
    protected _linesBuffer: WebGLBuffer;
    protected _linesProgram: Program;
    protected _labelPass: LabelRenderPass;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(frameNumber: number): void;
    protected setupLabels(): void;
}
export declare class VectorExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): VectorRenderer;
}
export {};
//# sourceMappingURL=vector-example.d.ts.map