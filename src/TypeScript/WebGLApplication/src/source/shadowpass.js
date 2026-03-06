"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShadowPass = void 0;
const auxiliaries_1 = require("./auxiliaries");
const context_1 = require("./context");
const framebuffer_1 = require("./framebuffer");
const gaussfilter_1 = require("./gaussfilter");
const initializable_1 = require("./initializable");
const renderbuffer_1 = require("./renderbuffer");
const texture2d_1 = require("./texture2d");
const wizard_1 = require("./wizard");
const tuples_1 = require("./tuples");
class ShadowPass extends initializable_1.Initializable {
    _context;
    _shadowType;
    _shadowMapSize;
    _blurredShadowMapSize;
    _shadowMapFBO;
    _shadowMapTexture;
    _shadowMapRenderbuffer;
    _gaussFilter;
    _gaussFilterKernelSize = 21;
    _intermediateBlurFBO;
    _intermediateBlurTexture;
    _blurFBO;
    _blurTexture;
    constructor(context) {
        super();
        this._context = context;
    }
    get shadowMapFBO() {
        return this._shadowMapFBO;
    }
    get shadowMapTexture() {
        if (this.hasBlur) {
            return this._blurTexture;
        }
        return this._shadowMapTexture;
    }
    get hasBlur() {
        return this._shadowType !== ShadowPass.ShadowMappingType.HardLinear;
    }
    get blurSize() {
        return this._gaussFilterKernelSize;
    }
    set blurSize(blurSize) {
        if (blurSize === this._gaussFilterKernelSize) {
            return;
        }
        if (this._gaussFilter !== undefined) {
            this._gaussFilter.kernelSize = blurSize;
            this._gaussFilter.standardDeviation = blurSize / 6.0;
        }
        this._gaussFilterKernelSize = blurSize;
    }
    @initializable_1.Initializable.assert_initialized()
    resize(size, bind = true, unbind = true) {
        (0, auxiliaries_1.assert)(size[0] > 0 && size[1] > 0, 'Size has to be > 0.');
        this._shadowMapSize = size;
        this._shadowMapFBO.resize(this._shadowMapSize[0], this._shadowMapSize[1], bind, unbind);
    }
    @initializable_1.Initializable.assert_initialized()
    resizeBlurTexture(size, bind = true, unbind = true) {
        (0, auxiliaries_1.assert)(size[0] > 0 && size[1] > 0, 'Size has to be > 0.');
        this._blurredShadowMapSize = size;
        this._intermediateBlurFBO.resize(this._blurredShadowMapSize[0], this._blurredShadowMapSize[1], bind, unbind);
        this._blurFBO.resize(this._blurredShadowMapSize[0], this._blurredShadowMapSize[1], bind, unbind);
    }
    @initializable_1.Initializable.initialize()
    initialize(shadowType, shadowMapSize, blurredShadowMapSize) {
        (0, auxiliaries_1.assert)(shadowMapSize[0] > 0 && shadowMapSize[1] > 0, 'Size has to be > 0.');
        this._shadowType = shadowType;
        this._shadowMapSize = shadowMapSize;
        if (blurredShadowMapSize !== undefined) {
            this._blurredShadowMapSize = blurredShadowMapSize;
        }
        else {
            this._blurredShadowMapSize = this._shadowMapSize;
        }
        const gl = this._context.gl;
        const gl2facade = this._context.gl2facade;
        let format = gl.RGBA;
        if (this._context.isWebGL2) {
            const gl2 = this._context.gl;
            switch (this._shadowType) {
                case ShadowPass.ShadowMappingType.HardLinear:
                case ShadowPass.ShadowMappingType.HardExponential:
                    format = gl2.RED;
                    break;
                case ShadowPass.ShadowMappingType.SoftLinear:
                    format = gl2.RG;
                    break;
                case ShadowPass.ShadowMappingType.SoftExponential:
                    format = gl2.RGBA;
                    break;
                default:
                    (0, auxiliaries_1.assert)(false, 'Unexpected value for shadowType');
            }
        }
        const [internalFormat, type] = wizard_1.Wizard.queryInternalTextureFormat(this._context, format, wizard_1.Wizard.Precision.float);
        if (this._shadowType !== ShadowPass.ShadowMappingType.HardLinear && type !== gl.FLOAT) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, 'floating point textures are not supported, falling back to HardLinear');
            this._shadowType = ShadowPass.ShadowMappingType.HardLinear;
        }
        let filter = gl.LINEAR;
        if (type === gl.FLOAT && !this._context.supportsTextureFloatLinear) {
            filter = gl.NEAREST;
        }
        if (type === gl2facade.HALF_FLOAT && !this._context.supportsTextureHalfFloatLinear) {
            filter = gl.NEAREST;
        }
        // Setup shadow map
        this._shadowMapTexture = new texture2d_1.Texture2D(this._context);
        this._shadowMapTexture.initialize(this._shadowMapSize[0], this._shadowMapSize[1], internalFormat, format, gl.FLOAT);
        this._shadowMapTexture.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
        this._shadowMapTexture.filter(filter, filter);
        this._shadowMapRenderbuffer = new renderbuffer_1.Renderbuffer(this._context);
        this._shadowMapRenderbuffer.initialize(this._shadowMapSize[0], this._shadowMapSize[1], gl.DEPTH_COMPONENT16);
        this._shadowMapFBO = new framebuffer_1.Framebuffer(this._context);
        this._shadowMapFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._shadowMapTexture],
            [gl.DEPTH_ATTACHMENT, this._shadowMapRenderbuffer]]);
        this._shadowMapFBO.clearColor([1.0, 1.0, 1.0, 1.0]);
        this._shadowMapFBO.clearDepth(1.0);
        if (this.hasBlur) {
            // Setup GaussFilter
            this._gaussFilter = new gaussfilter_1.GaussFilter(this._context);
            this._gaussFilter.kernelSize = this._gaussFilterKernelSize;
            this._gaussFilter.standardDeviation = this._gaussFilterKernelSize / 6.0;
            this._gaussFilter.initialize();
            // Setup intermediate blur
            this._intermediateBlurTexture = new texture2d_1.Texture2D(this._context, 'IntermediateBlurTexture');
            this._intermediateBlurTexture.initialize(this._blurredShadowMapSize[0], this._blurredShadowMapSize[1], internalFormat, format, gl.FLOAT);
            this._intermediateBlurTexture.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
            this._intermediateBlurTexture.filter(filter, filter);
            this._intermediateBlurFBO = new framebuffer_1.Framebuffer(this._context, 'IntermediateBlurFramebuffer');
            this._intermediateBlurFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._intermediateBlurTexture]]);
            this._intermediateBlurFBO.clearColor([1.0, 1.0, 1.0, 1.0]);
            this._intermediateBlurFBO.clearDepth(1.0);
            // Setup final blur
            this._blurTexture = new texture2d_1.Texture2D(this._context, 'BlurTexture');
            this._blurTexture.initialize(this._blurredShadowMapSize[0], this._blurredShadowMapSize[1], internalFormat, format, gl.FLOAT);
            this._blurTexture.wrap(gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
            this._blurTexture.filter(filter, filter);
            this._blurFBO = new framebuffer_1.Framebuffer(this._context, 'BlurFramebuffer');
            this._blurFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._blurTexture]]);
            this._blurFBO.clearColor([1.0, 1.0, 1.0, 1.0]);
            this._blurFBO.clearDepth(1.0);
        }
        return true;
    }
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._shadowMapFBO.uninitialize();
        this._shadowMapRenderbuffer.uninitialize();
        this._shadowMapTexture.uninitialize();
        if (this.hasBlur) {
            this._intermediateBlurFBO.uninitialize();
            this._intermediateBlurTexture.uninitialize();
            this._blurFBO.uninitialize();
            this._blurTexture.uninitialize();
            this._gaussFilter.uninitialize();
        }
    }
    @initializable_1.Initializable.assert_initialized()
    frame(callback) {
        const gl = this._context.gl;
        gl.viewport(0, 0, this._shadowMapSize[0], this._shadowMapSize[1]);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        this._shadowMapFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
        callback();
        gl.disable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        if (this.hasBlur) {
            // Blur the variance shadow map in two passes
            gl.viewport(0, 0, this._intermediateBlurFBO.width, this._intermediateBlurFBO.height);
            this._intermediateBlurFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
            this._gaussFilter.filter(this._shadowMapTexture, gaussfilter_1.GaussFilter.Direction.Horizontal);
            gl.viewport(0, 0, this._blurFBO.width, this._blurFBO.height);
            this._blurFBO.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT, true, false);
            this._gaussFilter.filter(this._intermediateBlurTexture, gaussfilter_1.GaussFilter.Direction.Vertical);
        }
    }
}
exports.ShadowPass = ShadowPass;
(function (ShadowPass) {
    let ShadowMappingType;
    (function (ShadowMappingType) {
        ShadowMappingType[ShadowMappingType["HardLinear"] = 0] = "HardLinear";
        ShadowMappingType[ShadowMappingType["SoftLinear"] = 1] = "SoftLinear";
        ShadowMappingType[ShadowMappingType["HardExponential"] = 2] = "HardExponential";
        ShadowMappingType[ShadowMappingType["SoftExponential"] = 3] = "SoftExponential";
    })(ShadowMappingType = ShadowPass.ShadowMappingType || (ShadowPass.ShadowMappingType = {}));
})(ShadowPass || (exports.ShadowPass = ShadowPass = {}));
//# sourceMappingURL=shadowpass.js.map