"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFramebuffer = void 0;
/* spellchecker: disable */
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
const framebuffer_1 = require("./framebuffer");
const initializable_1 = require("./initializable");
/* spellchecker: enable */
/**
 * Default framebuffer with framebuffer interface. It is intended for use as default buffer binding and enables lazy
 * target size reconfiguration of stages.
 *
 * ```
 * this._someStage.frame(this._nullFBO, frameNumber, multiFrameNumber);
 * ```
 *
 * Note that this buffer does query its size from the current context's canvas.
 */
class DefaultFramebuffer extends framebuffer_1.Framebuffer {
    /**
     * @override
     * Default framebuffer cannot be created.
     */
    create() {
        this._object = framebuffer_1.Framebuffer.DEFAULT_FRAMEBUFFER;
        this._valid = true;
        /* Initialize with default clear values */
        this._clearColors = new Array(1);
        this._clearDepth = 1.0;
        this._clearStencil = 0;
        this.clear = this.es2Clear;
        return this._object;
    }
    /**
     * @override
     * Default framebuffer cannot be deleted.
     */
    delete() {
        this._object = undefined;
        this._valid = false;
    }
    /**
     * @override
     * @returns - Always false, since default buffer cannot have any attachments.
     */
    hasAttachment(attachment) {
        return false;
    }
    /**
     * @override
     * Binds the default framebuffer object to the provided target.
     * @param target - Specifying the binding point (target).
     */
    @initializable_1.Initializable.assert_initialized()
    bind(target = this.context.gl.FRAMEBUFFER) {
        this.context.gl.bindFramebuffer(target, this._object);
    }
    /**
     * @override
     * Sets the clear color used for clearing the default color buffer. In order to have transparency working, the
     * canvas needs to have the alpha  attribute enabled. This stage also supports premultiplied alpha, which is applied
     * automatically when the context's `premultipliedAlpha` attribute is set.
     * @param color - RGBA clear color.
     */
    clearColor(color) {
        super.clearColor(color);
    }
    /**
     * Resets the size (important for valid size change detection in stages).
     */
    resize() {
        (0, auxiliaries_1.assert)(false, `the default framebuffer cannot be resized directly`);
    }
    /**
     * Convenience accessor: returns the renderable width of the canvas back buffer.
     */
    get width() {
        return this.context.gl.canvas.width;
    }
    /**
     * Convenience accessor: returns the renderable height of the canvas back buffer.
     */
    get height() {
        return this.context.gl.canvas.height;
    }
}
exports.DefaultFramebuffer = DefaultFramebuffer;
//# sourceMappingURL=defaultframebuffer.js.map