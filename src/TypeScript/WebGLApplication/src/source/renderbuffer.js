"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderbuffer = void 0;
const auxiliaries_1 = require("./auxiliaries");
const formatbytesizes_1 = require("./formatbytesizes");
const tuples_1 = require("./tuples");
const bindable_1 = require("./bindable");
const initializable_1 = require("./initializable");
const object_1 = require("./object");
/* spellchecker: enable */
/**
 * WebGL Renderbuffer implementation providing size accessors and requiring for bind, unbind, resize, validity, and
 * initialization implementations.
 * ```
 * @todo add usage example
 * ```
 */
class Renderbuffer extends object_1.AbstractObject {
    /**
     * Default renderbuffer, e.g., used for unbind.
     */
    static DEFAULT_RENDER_BUFFER = undefined;
    /** @see {@link width} */
    _width;
    /** @see {@link height} */
    _height;
    /**
     * Cached internal format of the renderbuffer for efficient resize.
     */
    _internalFormat = undefined;
    /**
     * Cached sample count for multisampling.
     */
    _samples;
    /**
     * Create a renderbuffer object on the GPU.
     * @param width - Initial width of the renderbuffer.
     * @param height - Initial height of the renderbuffer.
     * @param internalFormat - Internal format of the renderbuffer data.
     */
    create(width, height, internalFormat, samples = 1) {
        (0, auxiliaries_1.assert)(width > 0 && height > 0, `renderbuffer object requires valid width and height greater than zero`);
        const gl = this.context.gl;
        this._object = gl.createRenderbuffer();
        this._width = width;
        this._height = height;
        this._internalFormat = internalFormat;
        this._samples = samples;
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._object);
        if (this._samples > 1) {
            gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this._samples, internalFormat, width, height);
        }
        else {
            gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);
        }
        /* note that gl.isRenderbuffer requires the renderbuffer to be bound */
        this._valid = gl.isRenderbuffer(this._object);
        gl.bindRenderbuffer(gl.RENDERBUFFER, Renderbuffer.DEFAULT_RENDER_BUFFER);
        const bytes = width * height * (0, formatbytesizes_1.byteSizeOfFormat)(this.context, internalFormat);
        this.context.allocationRegister.reallocate(this._identifier, bytes);
        return this._object;
    }
    /**
     * Delete the renderbuffer object on the GPU. This should have the reverse effect of `create`.
     */
    delete() {
        (0, auxiliaries_1.assert)(this._object instanceof WebGLRenderbuffer, `expected WebGLRenderbuffer object`);
        this.context.gl.deleteRenderbuffer(this._object);
        this._object = undefined;
        this._valid = false;
        this._internalFormat = undefined;
        this._width = 0;
        this._height = 0;
    }
    /**
     * Bind the renderbuffer object.
     */
    @initializable_1.Initializable.assert_initialized()
    bind() {
        this.context.gl.bindRenderbuffer(this.context.gl.RENDERBUFFER, this._object);
    }
    /**
     * Unbind the renderbuffer object.
     */
    @initializable_1.Initializable.assert_initialized()
    unbind() {
        this.context.gl.bindRenderbuffer(this.context.gl.RENDERBUFFER, Renderbuffer.DEFAULT_RENDER_BUFFER);
    }
    /**
     * This should be used to implement efficient resize for all attachments.
     * @param width - Targeted/new width of the renderbuffer in px.
     * @param height - Targeted/new height of the renderbuffer in px.
     * @param bind - Allows to skip binding the renderbuffer (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the renderbuffer (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    resize(width, height, bind = false, unbind = false) {
        if (width === this._width && height === this._height) {
            return;
        }
        this._width = width;
        this._height = height;
        const gl = this.context.gl;
        if (bind) {
            this.bind();
        }
        if (this._samples > 1) {
            gl.renderbufferStorageMultisample(gl.RENDERBUFFER, this._samples, this._internalFormat, width, height);
        }
        else {
            gl.renderbufferStorage(gl.RENDERBUFFER, this._internalFormat, width, height);
        }
        if (unbind) {
            this.unbind();
        }
        // update allocated bytes
        const bytes = width * height * (0, formatbytesizes_1.byteSizeOfFormat)(this.context, this._internalFormat);
        this.context.allocationRegister.reallocate(this._identifier, bytes);
    }
    /**
     * Returns the number of bytes this object approximately allocates on the GPU.
     */
    get bytes() {
        this.assertInitialized();
        return this.context.allocationRegister.allocated(this._identifier);
    }
    /**
     * Readonly access to the internal format of the renderbuffer object. This can only be changed by re-initialization.
     */
    get internalFormat() {
        this.assertInitialized();
        return this._internalFormat;
    }
    /**
     * Convenience accessor: returns the width of the texture object.
     */
    get width() {
        this.assertInitialized();
        return this._width;
    }
    /**
     * Convenience accessor: returns the height of the texture object.
     */
    get height() {
        this.assertInitialized();
        return this._height;
    }
    /**
     * Convenience accessor: sample count for multisampling.
     */
    get samples() {
        this.assertInitialized();
        return this._samples;
    }
    /**
     * Convenience accessor: if multisampling is enabled.
     */
    get multisampling() {
        this.assertInitialized();
        return this._samples > 1;
    }
    /**
     * Convenience getter for the 2-tuple containing the render buffer's width and height.
     * @see {@link width}
     * @see {@link heigth}
     */
    get size() {
        return [this.width, this.height];
    }
}
exports.Renderbuffer = Renderbuffer;
//# sourceMappingURL=renderbuffer.js.map