import { Canvas, Initializable, Renderer } from 'webgl-operate';
export declare abstract class Example extends Initializable {
    /**
     * Hide the loading spinner.
     */
    protected showSpinner(): void;
    /**
     * Hide the loading spinner.
     */
    protected hideSpinner(): void;
    protected expose(): void;
    initialize(element: HTMLCanvasElement | string): boolean;
    uninitialize(): void;
    abstract onInitialize(element: HTMLCanvasElement | string): boolean;
    abstract onUninitialize(): void;
    abstract get renderer(): Renderer;
    abstract get canvas(): Canvas;
    enableFullscreenOnCtrlClick(): void;
}
//# sourceMappingURL=example.d.ts.map