import { vec3 } from 'webgl-operate';
import { AccumulatePass, AntiAliasingKernel, BlitPass, Camera, Canvas, Context, DefaultFramebuffer, EventProvider, Framebuffer, Invalidate, Navigation, NdcFillingTriangle, Program, Renderbuffer, Renderer, Texture2D } from 'webgl-operate';
import { Demo } from '../demo';
export declare class CornellBoxRenderer extends Renderer {
    protected _extensions: boolean;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _ndcTriangle: NdcFillingTriangle;
    protected _program: Program;
    protected _uTransform: WebGLUniformLocation;
    protected _uFrame: WebGLUniformLocation;
    protected _uRand: WebGLUniformLocation;
    protected _uEye: WebGLUniformLocation;
    protected _uViewport: WebGLUniformLocation;
    protected _ndcOffsetKernel: AntiAliasingKernel;
    protected _uNdcOffset: WebGLUniformLocation;
    protected _hsphereImage: Texture2D;
    protected _lightsImage: Texture2D;
    protected _accumulate: AccumulatePass;
    protected _blit: BlitPass;
    protected _defaultFBO: DefaultFramebuffer;
    protected _colorRenderTexture: Texture2D;
    protected _depthRenderbuffer: Renderbuffer;
    protected _intermediateFBO: Framebuffer;
    protected _verticesImage: Texture2D;
    protected _indicesImage: Texture2D;
    protected _colorsImage: Texture2D;
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    shuffle(deck: Array<vec3>): Array<vec3>;
    pointsInLight(llf: vec3, urb: vec3, minN: number): Array<vec3>;
    pointsOnSphere(numPoints: number): Array<vec3>;
    fract(x: number): number;
    encode_float24x1_to_uint8x3(out: vec3, x: number): vec3;
    encodeFloatArray(floats: Float32Array): Uint8Array;
    encodeFloatArrayAndScale(floats: Float32Array): Uint8Array;
}
export declare class CornellBoxDemo extends Demo {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): CornellBoxRenderer;
}
//# sourceMappingURL=cornellbox.d.ts.map