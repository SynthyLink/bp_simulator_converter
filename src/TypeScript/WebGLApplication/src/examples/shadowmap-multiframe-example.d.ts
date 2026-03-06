import { vec3 } from 'webgl-operate';
import { AccumulatePass, AntiAliasingKernel, BlitPass, Camera, Canvas, Context, CuboidGeometry, DefaultFramebuffer, EventProvider, Framebuffer, Invalidate, Navigation, NdcFillingTriangle, PlaneGeometry, Program, Renderbuffer, Renderer, ShadowPass, Texture2D } from 'webgl-operate';
import { Example } from './example';
declare class ShadowMapMultiframeRenderer extends Renderer {
    protected _cuboids: Array<CuboidGeometry>;
    protected _plane: PlaneGeometry;
    protected _ndcTriangle: NdcFillingTriangle;
    protected _defaultFBO: DefaultFramebuffer;
    protected _colorRenderTexture: Texture2D;
    protected _depthRenderbuffer: Renderbuffer;
    protected _intermediateFBO: Framebuffer;
    protected _navigation: Navigation;
    protected _camera: Camera;
    protected _light: Camera;
    protected _lightSamples: Array<vec3>;
    protected _ndcOffsetKernel: AntiAliasingKernel;
    protected _uNdcOffset: WebGLUniformLocation;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uModel: WebGLUniformLocation;
    protected _uColored: WebGLUniformLocation;
    protected _uLightViewProjection: WebGLUniformLocation;
    protected _uLightPosition: WebGLUniformLocation;
    protected _shadowProgram: Program;
    protected _uModelS: WebGLUniformLocation;
    protected _uLightViewProjectionS: WebGLUniformLocation;
    protected _uLightPositionS: WebGLUniformLocation;
    protected _shadowPass: ShadowPass;
    protected _accumulate: AccumulatePass;
    protected _blit: BlitPass;
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
export declare class ShadowMapMultiframeExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): ShadowMapMultiframeRenderer;
}
export {};
//# sourceMappingURL=shadowmap-multiframe-example.d.ts.map