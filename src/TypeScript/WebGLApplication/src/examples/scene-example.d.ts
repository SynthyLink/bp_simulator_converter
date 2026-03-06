import { Camera, Canvas, Context, EventProvider, ForwardSceneRenderPass, Framebuffer, Invalidate, Material, Navigation, Program, Renderer, SceneNode, Texture2D } from 'webgl-operate';
import { Example } from './example';
/**
 * @todo comment
 */
export declare class SceneRenderer extends Renderer {
    protected _navigation: Navigation;
    protected _forwardPass: ForwardSceneRenderPass;
    protected _camera: Camera;
    protected _scene: SceneNode;
    protected _texture: Texture2D;
    protected _framebuffer: Framebuffer;
    protected _program: Program;
    protected _uViewProjection: WebGLUniformLocation;
    protected _uModel: WebGLUniformLocation;
    protected _uTexture: WebGLUniformLocation;
    protected _uTextured: WebGLUniformLocation;
    protected _aMeshVertex: GLint;
    protected _aMeshTexCoord: GLint;
    /**
     * Initializes and sets up rendering passes, navigation, loads a font face and links shaders with program.
     * @param context - valid context to create the object for.
     * @param identifier - meaningful name for identification of this instance.
     * @param mouseEventProvider - required for mouse interaction
     * @returns - whether initialization was successful
     */
    protected onInitialize(context: Context, callback: Invalidate, eventProvider: EventProvider): boolean;
    /**
     * Uninitializes Buffers, Textures, and Program.
     */
    protected onUninitialize(): void;
    protected onDiscarded(): void;
    /**
     * This is invoked in order to check if rendering of a frame is required by means of implementation specific
     * evaluation (e.g., lazy non continuous rendering). Regardless of the return value a new frame (preparation,
     * frame, swap) might be invoked anyway, e.g., when update is forced or canvas or context properties have
     * changed or the renderer was invalidated @see{@link invalidate}.
     * Updates the navigaten and the AntiAliasingKernel.
     * @returns whether to redraw
     */
    protected onUpdate(): boolean;
    /**
     * This is invoked in order to prepare rendering of one or more frames, regarding multi-frame rendering and
     * camera-updates.
     */
    protected onPrepare(): void;
    /**
     * @todo comment
     * @param frameNumber - for intermediate frames in accumulation rendering.
     */
    protected onFrame(frameNumber: number): void;
    /**
     * @todo comment ...
     */
    protected onSwap(): void;
    /**
     *  @todo comment
     */
    protected generateScene(): void;
    protected generateSphereNode(parent: SceneNode): SceneNode;
    protected generatePlaneNode(parent: SceneNode): SceneNode;
    protected generateBoxNode(parent: SceneNode): SceneNode;
}
export declare class SceneExampleMaterial extends Material {
    protected _texture: Texture2D;
    protected _textured: boolean;
    set texture(texture: Texture2D);
    get texture(): Texture2D;
    set textured(value: boolean);
    get textured(): boolean;
}
export declare class SceneExample extends Example {
    private _canvas;
    private _renderer;
    onInitialize(element: HTMLCanvasElement | string): boolean;
    onUninitialize(): void;
    get canvas(): Canvas;
    get renderer(): SceneRenderer;
}
//# sourceMappingURL=scene-example.d.ts.map