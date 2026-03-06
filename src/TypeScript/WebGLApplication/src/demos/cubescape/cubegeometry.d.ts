import { Context, Geometry } from 'webgl-operate';
export declare class CubeGeometry extends Geometry {
    protected static readonly VERTICES: Float32Array<ArrayBuffer>;
    protected static readonly INDICES: Uint8Array<ArrayBuffer>;
    protected _count: number;
    protected _vertexLocation: GLuint;
    protected _instanceLocation: GLuint;
    /**
     * Object constructor, requires a context and an identifier.
     * @param context - Valid context to create the object for.
     * @param identifier - Meaningful name for identification of this instance.
     */
    constructor(context: Context, identifier?: string);
    /**
     * Binds all vertex buffer objects (VBOs) to pre-set attribute binding points.
     * @param indices - Unused, since pre-set locations are used.
     */
    protected bindBuffers(): void;
    /**
     * Unbinds all vertex buffer objects (VBOs) and disables their attribute binding points.
     * @param indices - Unused, since pre-set locations are used.
     */
    protected unbindBuffers(): void;
    /**
     * Creates the vertex buffer object (VBO) and creates and initializes the buffer's data store.
     * @param vertexLocation - Attribute binding point for vertices.
     */
    initialize(vertexLocation?: GLuint, instanceLocation?: GLuint): boolean;
    /**
     * Specifies/invokes the draw of this cube.
     */
    draw(): void;
    /**
     * Specifies the number of cubes per side of the cubescape to be drawn (total is count²).
     */
    set count(count: GLuint);
    get count(): GLuint;
    /**
     * Attribute location to which this geometry's vertices are bound to.
     */
    get vertexLocation(): GLint;
    /**
     * Attribute location to which this geometry's instance indices are bound to.
     */
    get instanceLocation(): GLint;
}
//# sourceMappingURL=cubegeometry.d.ts.map