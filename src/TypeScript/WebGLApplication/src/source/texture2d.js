"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texture2D = void 0;
const auxiliaries_1 = require("./auxiliaries");
const formatbytesizes_1 = require("./formatbytesizes");
const tuples_1 = require("./tuples");
const bindable_1 = require("./bindable");
const gl2facade_1 = require("./gl2facade");
const initializable_1 = require("./initializable");
const object_1 = require("./object");
/* spellchecker: enable */
/**
 * Wrapper for an WebGL 2D texture providing size accessors and requiring for bind, unbind, resize, validity, and
 * initialization implementations. The texture object is created on initialization and deleted on uninitialization.
 * After being initialized, the texture can be resized, reformated, and data can set directly or via fetch:
 * ```
 * const texture = new Texture2D(context, 'Texture');
 * texture.initialize(1, 1, gl.RGB8, gl.RGB, gl.UNSIGNED_BYTE);
 * texture.fetch('/img/webgl-operate-logo.png', true);
 * ```
 */
class Texture2D extends object_1.AbstractObject {
    /**
     * Default texture, e.g., used for unbind.
     */
    static DEFAULT_TEXTURE = undefined;
    static MAX_ANISOTROPY = undefined;
    /** @see {@link width} */
    _width = 0;
    /** @see {@link height} */
    _height = 0;
    /** @see {@link internalFormat} */
    _internalFormat = 0;
    /** @see {@link format} */
    _format = 0;
    /** @see {@link type} */
    _type = 0;
    /**
     * Whether or not to generate mip maps (based on minification settings).
     * If true, gl.generateMipmap will be called whenever the image data changes.
     */
    _mipmap = false;
    /** @see {@link anisotropy} */
    _anisotropy = undefined;
    /**
     * Create a texture object on the GPU.
     * @param width - Initial width of the texture in px.
     * @param height - Initial height of the texture in px.
     * @param internalFormat - Internal format of the texture object.
     * @param format - Format of the texture data even though no data is passed.
     * @param type - Data type of the texel data.
     */
    create(width, height, internalFormat, format, type) {
        (0, auxiliaries_1.assert)(width > 0 && height > 0, `texture requires valid width and height of greater than zero`);
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        this._object = gl.createTexture();
        this._width = width;
        this._height = height;
        this._internalFormat = internalFormat;
        this._format = format;
        this._type = type;
        gl.bindTexture(gl.TEXTURE_2D, this._object);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        /* Query max anisotropy. This is done lazy, that is, only for the first texture created. */
        if (Texture2D.MAX_ANISOTROPY === undefined) {
            if (this._context.supportsTextureFilterAnisotropic) {
                const ext = this._context.textureFilterAnisotropic;
                Texture2D.MAX_ANISOTROPY = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
            }
            else {
                Texture2D.MAX_ANISOTROPY = 0.0;
            }
        }
        gl2facade.texImage2D(gl.TEXTURE_2D, 0, this._internalFormat, this._width, this._height, 0, this._format, this._type);
        gl.bindTexture(gl.TEXTURE_2D, Texture2D.DEFAULT_TEXTURE);
        /* note that gl.isTexture requires the texture to be bound */
        this._valid = gl.isTexture(this._object);
        this.reallocate();
        return this._object;
    }
    /**
     * Delete the texture object on the GPU. This should have the reverse effect of `create`.
     */
    delete() {
        (0, auxiliaries_1.assert)(this._object instanceof WebGLTexture, `expected WebGLTexture object`);
        this._context.gl.deleteTexture(this._object);
        this._object = undefined;
        this._valid = false;
        this._internalFormat = 0;
        this._format = 0;
        this._type = 0;
        this._width = 0;
        this._height = 0;
    }
    reallocate() {
        const gl = this.context.gl;
        const gl2facade = this._context.gl2facade;
        let bytes = this._width * this._height * (0, formatbytesizes_1.byteSizeOfFormat)(this.context, this._internalFormat);
        // Fix in case of implicit float and half-float texture generation (e.g., in webgl with half_float support).
        if (this._type === gl2facade.HALF_FLOAT && this._internalFormat !== gl.RGBA16F) {
            bytes *= 2;
        }
        else if (this._type === gl.FLOAT && this._internalFormat !== gl.RGBA16F) {
            bytes *= 4;
        }
        this.context.allocationRegister.reallocate(this._identifier, bytes);
    }
    /**
     * Bind the texture object to a texture unit.
     */
    @initializable_1.Initializable.assert_initialized()
    bind(unit) {
        const gl = this.context.gl;
        if (unit) {
            gl.activeTexture(unit);
        }
        gl.bindTexture(gl.TEXTURE_2D, this._object);
    }
    /**
     * Unbind the texture object from a texture unit.
     */
    @initializable_1.Initializable.assert_initialized()
    unbind(unit) {
        const gl = this.context.gl;
        if (unit) {
            gl.activeTexture(unit);
        }
        gl.bindTexture(gl.TEXTURE_2D, Texture2D.DEFAULT_TEXTURE);
    }
    /**
     * Asynchronous load of an image via URL or data URI.
     * @param url - Uniform resource locator string referencing the image that should be loaded (data URI supported).
     * @param crossOrigin - Enable cross origin data loading.
     * @returns - Promise for handling image load status.
     */
    @initializable_1.Initializable.assert_initialized()
    fetch(url, crossOrigin = false, flipY = false) {
        const gl = this.context.gl;
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onerror = () => {
                (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Error, `loading image from '${image.src}' failed`);
                reject();
            };
            image.onload = () => {
                this.resize(image.width, image.height);
                // Flip the image horizontally, since Image has the origin on the top left
                // while WebGL has it on the bottom left
                if (!flipY) {
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                }
                this.data(image);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                resolve();
            };
            if (crossOrigin) {
                image.crossOrigin = 'anonymous';
            }
            image.src = url;
        });
    }
    /**
     * Pass image data to the texture object.
     * @param data - Texel data that will be copied into the objects data store.
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    data(data, bind = true, unbind = true) {
        const gl = this.context.gl;
        const gl2facade = this._context.gl2facade;
        if (bind) {
            this.bind();
        }
        gl2facade.texImage2D(gl.TEXTURE_2D, 0, this._internalFormat, this._width, this._height, 0, this._format, this._type, data);
        if (this._anisotropy !== undefined && this._anisotropy > 0.0) {
            this.maxAnisotropy(this._anisotropy, false, false);
        }
        else if (this._mipmap) {
            this.generateMipMap(false, false);
        }
        if (unbind) {
            this.unbind();
        }
        this.reallocate();
    }
    /**
     * Sets the texture object's magnification and minification filter. If a mipmap mode is set for minification, will
     * be generated automatically whenever the image data changes. The MipMap can be generated manually as well by
     * calling generateMipMap (@see {@link generateMipMap}).
     * @param mag - Value for the TEXTURE_MAG_FILTER parameter.
     * @param min - Value for the TEXTURE_MIN_FILTER parameter.
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    filter(mag, min, bind = true, unbind = true) {
        const gl = this.context.gl;
        if (bind) {
            this.bind();
        }
        (0, auxiliaries_1.logIf)(mag === gl.LINEAR_MIPMAP_LINEAR || mag === gl.LINEAR_MIPMAP_NEAREST, auxiliaries_1.LogLevel.Debug, `magnification does not utilize a MipMap (refer to LINEAR and NEAREST only)`);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, mag);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, min);
        this._mipmap = min === gl.LINEAR_MIPMAP_LINEAR || min === gl.LINEAR_MIPMAP_NEAREST;
        if (this._mipmap) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        if (unbind) {
            this.unbind();
        }
    }
    /**
     * Sets the texture object's wrapping function for s and t coordinates.
     * @param wrap_s - Value for the TEXTURE_WRAP_S parameter, defaulted to CLAMP_TO_EDGE.
     * @param wrap_t - Value for the TEXTURE_WRAP_T parameter, defaulted to CLAMP_TO_EDGE.
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    wrap(wrap_s, wrap_t, bind = true, unbind = true) {
        const gl = this.context.gl;
        if (bind) {
            this.bind();
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap_s);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap_t);
        if (unbind) {
            this.unbind();
        }
    }
    /**
     * This can be used to reformat the texture image without creating a new texture object. Please note that this
     * resets the texture's image data to undefined. @see {@link data} for setting new image data.
     * @param internalFormat - Internal format of the texture object.
     * @param format - Format of the texture data even though no data is passed.
     * @param type - Data type of the texel data.
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    reformat(internalFormat, format, type, bind = true, unbind = true) {
        if (internalFormat === this._internalFormat
            && (format === undefined || format === this._format)
            && (type === undefined || type === this._type)) {
            return;
        }
        (0, auxiliaries_1.assert)(internalFormat !== undefined, `valid internal format expected`);
        this._internalFormat = internalFormat;
        if (format) {
            this._format = format;
        }
        if (type) {
            this._type = type;
        }
        this.data(undefined, bind, unbind);
    }
    /**
     * This should be used to implement efficient resize the texture.
     * @param width - Targeted/new width of the texture in px.
     * @param height - Targeted/new height of the texture in px.
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    resize(width, height, bind = true, unbind = true) {
        if (width === this._width && height === this._height) {
            return;
        }
        this._width = width;
        this._height = height;
        this.data(undefined, bind, unbind);
    }
    /**
     * Generate MipMap for the texture. This is only required when minification filter is set to use
     * the MipMap. If the mipmap is generated, it will be automatically regenerated whenever the image data changes
     * via one of this classes' methods. Should be called manually when updated image data from outside though.
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     */
    generateMipMap(bind = true, unbind = true) {
        const gl = this.context.gl;
        if (bind) {
            this.bind();
        }
        gl.generateMipmap(gl.TEXTURE_2D);
        if (unbind) {
            this.unbind();
        }
        this._mipmap = true;
    }
    /**
     * Sets this textures anisotropy value. If anisotropy is not supported a debug message is logged.
     * If anisotropy is supported, the given value is clamped to the maximum supported anisotropy value and setup.
     * Note that using as well as changing a texture's anisotropy value requires (re)generating a MipMap and takes only
     * effect when minification filtering is setup to use MipMapping.
     * @param max - Targeted maximum anisotropy value (will be clamped to [0.0, MAX_ANISOTROPY]).
     * @param bind - Allows to skip binding the texture (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the texture (e.g., when binding is handled outside).
     * @returns - The anisotropy value that was actually set (undefined if anisotropy is not supported).
     */
    maxAnisotropy(max, bind = true, unbind = true) {
        if (this._context.supportsTextureFilterAnisotropic === false) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Debug, `setting anisotropy not supported (EXT_texture_filter_anisotropic missing)`);
            return undefined;
        }
        const gl = this.context.gl;
        const ext = this._context.textureFilterAnisotropic;
        this._anisotropy = max === undefined ? undefined : Math.max(0.0, Math.min(Texture2D.MAX_ANISOTROPY, max));
        (0, auxiliaries_1.logIf)(max !== this._anisotropy, auxiliaries_1.LogLevel.Debug, `value clamped to max supported anisotropy of ${Texture2D.MAX_ANISOTROPY}, given ${max}`);
        if (bind) {
            this.bind();
        }
        gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy === undefined ? 0.0 : this._anisotropy);
        this.generateMipMap(false, unbind);
        return this._anisotropy;
    }
    /**
     * Returns the number of bytes this object approximately allocates on the GPU. The size will be zero when no
     * image data was passed to the texture object.
     */
    get bytes() {
        this.assertInitialized();
        return this.context.allocationRegister.allocated(this._identifier);
    }
    /**
     * Cached internal format of the texture for efficient resize. This can only be changed by re-initialization.
     */
    get internalFormat() {
        this.assertInitialized();
        return this._internalFormat;
    }
    /**
     * Cached format of the data provided to the texture object for efficient resize. This is set on initialization and
     * might change on data transfers.
     */
    get format() {
        this.assertInitialized();
        return this._format;
    }
    /**
     * Cached type of the data provided to the texture used for efficient resize. This is set on initialization and
     * might change on data transfers.
     */
    get type() {
        this.assertInitialized();
        return this._type;
    }
    /**
     * The width of the texture object in px.
     */
    get width() {
        this.assertInitialized();
        return this._width;
    }
    /**
     * The height of the texture object in px.
     */
    get height() {
        this.assertInitialized();
        return this._height;
    }
    /**
     * Convenience getter for the 2-tuple containing width and height.
     * @see {@link width}
     * @see {@link height}
     */
    get size() {
        this.assertInitialized();
        return [this._width, this._height];
    }
}
exports.Texture2D = Texture2D;
//# sourceMappingURL=texture2d.js.map