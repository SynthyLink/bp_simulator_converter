import { Camera, Canvas, Context, EnvironmentRenderingPass, EventProvider, Framebuffer, Invalidate, Navigation, Renderer, Texture2D, TextureCube } from 'webgl-operate';
import { Example } from './example';
declare class EnvironmentProjectionRenderer extends Renderer {
    protected _defaultFBO: Framebuffer;
    protected _environmentRenderingPass: EnvironmentRenderingPass;
    protected _cubeMap: TextureCube;
    protected _equiRectangularMap: Texture2D;
    protected _sphereMap: Texture2D;
    protected _polarMaps: Array<Texture2D>;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(): void;
    protected onSwap(): void;
    protected setupTexture2D(texture: Texture2D): void;
    protected fetchTextures(): void;
}
export declare class EnvironmentProjectionExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): EnvironmentProjectionRenderer;
}
export {};
//# sourceMappingURL=envprojections-example.d.ts.map