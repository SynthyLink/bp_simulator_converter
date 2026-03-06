import { Camera, Canvas, Context, Framebuffer, Renderbuffer, Texture2D, DefaultFramebuffer, EventProvider, Invalidate, CuboidGeometry, Navigation, Renderer, Program, BlitPass, LabelRenderPass, Label, FontFace } from 'webgl-operate';
import { mat4, vec4, vec3 } from 'gl-matrix';
import { Example } from './example';
declare class DefaultSceneRenderer extends Renderer {
    protected _cuboid: CuboidGeometry;
    protected _texture: Texture2D;
    protected _frustumData: Float32Array;
    protected _frustumBuffer: WebGLBuffer;
    protected _frustumProgram: Program;
    protected _renderFrustumToFar: boolean;
    protected _frustumNearColor: vec3;
    protected _frustumFarColor: vec3;
    protected _fontFace: FontFace;
    protected _labelPass: LabelRenderPass;
    protected _labels: Array<Label>;
    protected _blit: BlitPass;
    protected _zoomSrcBounds: vec4;
    protected _zoomDstBounds: vec4;
    protected _uEnableClipping: WebGLUniformLocation;
    protected _uObservedTransform: WebGLUniformLocation;
    protected _enableClipping: boolean;
    protected _observedTransform: mat4;
    protected _observedCamera: Camera;
    protected _observedDepthBuffer: Renderbuffer;
    protected _observedColorRender: Texture2D;
    protected _observedFramebuffer: Framebuffer;
    protected _observedEye: vec3;
    protected _observedCenter: vec3;
    protected _observedUp: vec3;
    protected _observedNear: number;
    protected _observedFar: number;
    protected _defaultFBO: DefaultFramebuffer;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(frameNumber: number): void;
    protected observedFrame(): void;
    protected actualFrame(): void;
    protected onSwap(): void;
    protected vertFovToHorFov(fov: number, aspect: number): number;
    protected calculateSideAndRUp(dir: vec3, up: vec3): {
        side: vec3;
        rUp: vec3;
    };
    protected buildCorner(out: vec3, eye: vec3, dir: vec3, up: vec3, upFac: number, side: vec3, sideFac: number): vec3;
    protected updateObservedFrustum(_camera: Camera): void;
    protected setupLabels(): void;
    protected updateLabels(): void;
}
export declare class DefaultSceneExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): DefaultSceneRenderer;
}
export {};
//# sourceMappingURL=default-scene-example.d.ts.map