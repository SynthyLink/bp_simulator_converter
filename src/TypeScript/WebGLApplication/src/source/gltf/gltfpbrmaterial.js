"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLTFPbrMaterial = exports.GLTFAlphaMode = exports.GLTFShaderFlags = void 0;
const gl_matrix_1 = require("gl-matrix");
const context_1 = require("../context");
const scene_1 = require("../scene");
const texture2d_1 = require("../texture2d");
// These flags are used by the sample glTF renderer. See {@link https://github.com/KhronosGroup/glTF-Sample-Viewer}
var GLTFShaderFlags;
(function (GLTFShaderFlags) {
    // vertex shader + fragment shader
    GLTFShaderFlags[GLTFShaderFlags["HAS_NORMALS"] = 1] = "HAS_NORMALS";
    GLTFShaderFlags[GLTFShaderFlags["HAS_TANGENTS"] = 2] = "HAS_TANGENTS";
    GLTFShaderFlags[GLTFShaderFlags["HAS_UV"] = 4] = "HAS_UV";
    GLTFShaderFlags[GLTFShaderFlags["HAS_COLORS"] = 8] = "HAS_COLORS";
    // fragment shader only
    GLTFShaderFlags[GLTFShaderFlags["USE_IBL"] = 16] = "USE_IBL";
    GLTFShaderFlags[GLTFShaderFlags["HAS_BASECOLORMAP"] = 32] = "HAS_BASECOLORMAP";
    GLTFShaderFlags[GLTFShaderFlags["HAS_NORMALMAP"] = 64] = "HAS_NORMALMAP";
    GLTFShaderFlags[GLTFShaderFlags["HAS_EMISSIVEMAP"] = 128] = "HAS_EMISSIVEMAP";
    GLTFShaderFlags[GLTFShaderFlags["HAS_METALROUGHNESSMAP"] = 256] = "HAS_METALROUGHNESSMAP";
    GLTFShaderFlags[GLTFShaderFlags["HAS_OCCLUSIONMAP"] = 512] = "HAS_OCCLUSIONMAP";
    GLTFShaderFlags[GLTFShaderFlags["USE_TEX_LOD"] = 1024] = "USE_TEX_LOD";
})(GLTFShaderFlags || (exports.GLTFShaderFlags = GLTFShaderFlags = {}));
var GLTFAlphaMode;
(function (GLTFAlphaMode) {
    GLTFAlphaMode[GLTFAlphaMode["OPAQUE"] = 0] = "OPAQUE";
    GLTFAlphaMode[GLTFAlphaMode["MASK"] = 1] = "MASK";
    GLTFAlphaMode[GLTFAlphaMode["BLEND"] = 2] = "BLEND";
})(GLTFAlphaMode || (exports.GLTFAlphaMode = GLTFAlphaMode = {}));
class GLTFPbrMaterial extends scene_1.Material {
    _baseColorTexture;
    _metallicRoughnessTexture;
    _normalTexture;
    _occlusionTexture;
    _emissiveTexture;
    _baseColorFactor;
    _metallicFactor;
    _emissiveFactor;
    _roughnessFactor;
    _isDoubleSided;
    _normalScale;
    _alphaMode;
    _alphaCutoff;
    baseColorTexCoord;
    metallicRoughnessTexCoord;
    normalTexCoord;
    occlusionTexCoord;
    emissiveTexCoord;
    constructor(context, name) {
        super(context, name);
        this.baseColorTexCoord = 0;
        this.metallicRoughnessTexCoord = 0;
        this.normalTexCoord = 0;
        this.occlusionTexCoord = 0;
        this.emissiveTexCoord = 0;
        this._alphaMode = GLTFAlphaMode.OPAQUE;
        this._alphaCutoff = 1.0;
        this._baseColorFactor = gl_matrix_1.vec4.fromValues(1, 1, 1, 1);
        this._metallicFactor = 1;
        this._roughnessFactor = 1;
        this._emissiveFactor = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this._isDoubleSided = false;
        this._normalScale = 1;
    }
    set baseColorTexture(texture) {
        this._baseColorTexture = texture;
    }
    get baseColorTexture() {
        return this._baseColorTexture;
    }
    set metallicRoughnessTexture(texture) {
        this._metallicRoughnessTexture = texture;
    }
    get metallicRoughnessTexture() {
        return this._metallicRoughnessTexture;
    }
    set normalTexture(texture) {
        this._normalTexture = texture;
    }
    get normalTexture() {
        return this._normalTexture;
    }
    set occlusionTexture(texture) {
        this._occlusionTexture = texture;
    }
    get occlusionTexture() {
        return this._occlusionTexture;
    }
    set emissiveTexture(texture) {
        this._emissiveTexture = texture;
    }
    get emissiveTexture() {
        return this._emissiveTexture;
    }
    set emissiveFactor(factor) {
        this._emissiveFactor = factor;
    }
    get emissiveFactor() {
        return this._emissiveFactor;
    }
    set baseColorFactor(factor) {
        this._baseColorFactor = factor;
    }
    get baseColorFactor() {
        return this._baseColorFactor;
    }
    set metallicFactor(factor) {
        this._metallicFactor = factor;
    }
    get metallicFactor() {
        return this._metallicFactor;
    }
    set roughnessFactor(factor) {
        this._roughnessFactor = factor;
    }
    get roughnessFactor() {
        return this._roughnessFactor;
    }
    get normalScale() {
        return this._normalScale;
    }
    set normalScale(normalScale) {
        this._normalScale = normalScale;
    }
    set isDoubleSided(val) {
        this._isDoubleSided = val;
    }
    get isDoubleSided() {
        return this._isDoubleSided;
    }
    set alphaMode(alphaMode) {
        this._alphaMode = alphaMode;
    }
    get alphaMode() {
        return this._alphaMode;
    }
    set alphaCutoff(val) {
        this._alphaCutoff = val;
    }
    get alphaCutoff() {
        return this._alphaCutoff;
    }
    get flags() {
        let pbrFlags = 0;
        if (this.baseColorTexture !== undefined) {
            pbrFlags |= GLTFShaderFlags.HAS_BASECOLORMAP;
        }
        if (this.metallicRoughnessTexture !== undefined) {
            pbrFlags |= GLTFShaderFlags.HAS_METALROUGHNESSMAP;
        }
        if (this.normalTexture !== undefined) {
            pbrFlags |= GLTFShaderFlags.HAS_NORMALMAP;
        }
        if (this.occlusionTexture !== undefined) {
            pbrFlags |= GLTFShaderFlags.HAS_OCCLUSIONMAP;
        }
        if (this.emissiveTexture !== undefined) {
            pbrFlags |= GLTFShaderFlags.HAS_EMISSIVEMAP;
        }
        return pbrFlags;
    }
}
exports.GLTFPbrMaterial = GLTFPbrMaterial;
//# sourceMappingURL=gltfpbrmaterial.js.map