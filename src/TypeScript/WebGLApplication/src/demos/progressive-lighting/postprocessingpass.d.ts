import { Context, Framebuffer, Initializable, NdcFillingTriangle, Program, Texture2D } from 'webgl-operate';
export declare class PostProcessingPass extends Initializable {
    /**
     * Read-only access to the objects context, used to get context information and WebGL API access.
     */
    protected _context: Context;
    protected _texture: Texture2D;
    protected _normalDepthTexture: Texture2D;
    protected _targetTexture: Texture2D;
    protected _frameBuffer: Framebuffer;
    protected _ndcTriangle: NdcFillingTriangle;
    protected _program: Program;
    constructor(context: Context);
    initialize(ndcTriangle: NdcFillingTriangle): boolean;
    /**
     * Specializes this pass's uninitialization. Program and geometry resources are released (if allocated). Cached
     * uniform and attribute locations are invalidated.
     */
    uninitialize(): void;
    update(): void;
    frame(): void;
    clear(): void;
    set texture(texture: Texture2D);
    set normalDepthTexture(texture: Texture2D);
    set exposure(exposure: number);
    get targetTexture(): Texture2D;
    get framebuffer(): Framebuffer;
}
//# sourceMappingURL=postprocessingpass.d.ts.map