"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geometry = void 0;
const bindable_1 = require("./bindable");
const buffer_1 = require("./buffer");
const initializable_1 = require("./initializable");
const context_1 = require("./context");
const vertexarray_1 = require("./vertexarray");
/* spellchecker: enable */
/**
 * Geometry that extends Initializable and Bindable by a draw method, a getter for buffers, as well as a getter for the
 * vertex array object. This is used as generic interface for one or more buffer objects associated to a single vertex
 * array object intended for drawing (often also referred to as 'drawable').
 */
class Geometry extends initializable_1.Initializable {
    /**
     * Vertex array used for binding the rectangle's buffer(s).
     */
    _vertexArray;
    /**
     * Various buffers required for this geometry (e.g., vertex buffer).
     */
    _buffers = new Array();
    /**
     * Creates the geometry and a vertex array instance. Please note that inheritors are expected to create the buffer.
     * @param context - Valid context to create the object for.
     * @param identifier - Meaningful name for identification of this instances VAO and VBOs.
     */
    constructor(context, identifier) {
        super();
        identifier = identifier !== undefined && identifier !== `` ? identifier : this.constructor.name;
        this._vertexArray = new vertexarray_1.VertexArray(context, `${identifier}VAO`);
    }
    /**
     * Initializes all buffer objects and the vertex array. Please note that implicit arguments are used in order to
     * enable custom initialization signatures for inheritors.
     * @param targets - Targets to initialize the buffers for.
     * @param indices - Binding points that are passed to the inheritors (un)bind buffer methods.
     */
    @initializable_1.Initializable.initialize()
    initialize(...args) {
        const targets = args[0];
        const indices = args[1];
        let valid = true;
        for (let i = 0; i < this._buffers.length; ++i) {
            valid = this._buffers[i].initialize(targets[i]) && valid;
        }
        this._vertexArray.initialize(() => this.bindBuffers(indices), () => this.unbindBuffers(indices));
        return this._vertexArray.valid && valid;
    }
    /**
     * Uninitialize the vertex array object and the rectangle.
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._vertexArray.uninitialize();
        this._buffers.forEach((buffer) => buffer.uninitialize());
    }
    /**
     * Binds the vertex array object.
     */
    @initializable_1.Initializable.assert_initialized()
    bind() {
        this._vertexArray.bind();
    }
    /**
     * Unbinds the vertex array object.
     */
    @initializable_1.Initializable.assert_initialized()
    unbind() {
        this._vertexArray.unbind();
    }
    /**
     * Read-only access to the buffer(s) associated to this instances vertex array object.
     */
    get buffers() {
        return this._buffers;
    }
    /**
     * Read-only access to the buffers' and vertex array's context.
     */
    get context() {
        return this._vertexArray.context;
    }
    /**
     * Read-only access to the vertex array.
     */
    get vertexArray() {
        return this._vertexArray;
    }
}
exports.Geometry = Geometry;
//# sourceMappingURL=geometry.js.map