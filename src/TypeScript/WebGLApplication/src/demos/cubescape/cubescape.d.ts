import { Camera, Canvas, Context, DefaultFramebuffer, EventProvider, Invalidate, Navigation, Program, Renderer, Texture2D } from 'webgl-operate';
import { Demo } from '../demo';
import { CubeGeometry } from './cubegeometry';
declare class CubescapeRenderer extends Renderer {
    protected _defaultFBO: DefaultFramebuffer;
    protected _camera: Camera;
    protected _navigation: Navigation;
    protected _geometry: CubeGeometry;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _aVertex: GLuint;
    protected _numCubes: number;
    protected _patches: Texture2D;
    protected _terrain: Texture2D;
    protected onUpdate(): boolean;
    protected onPrepare(): void;
    protected onFrame(frameNumber: number): void;
    protected onSwap(): void;
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    protected onUninitialize(): void;
    protected onDiscarded(): void;
}
export declare class CubescapeDemo extends Demo {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): CubescapeRenderer;
}
export {};
//# sourceMappingURL=cubescape.d.ts.map