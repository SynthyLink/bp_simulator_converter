"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLTFPrimitive = exports.VertexBinding = exports.IndexBinding = void 0;
const buffer_1 = require("../buffer");
const context_1 = require("../context");
const geometry_1 = require("../geometry");
const scene_1 = require("../scene");
const gltfhelper_1 = require("./gltfhelper");
// tslint:disable:max-classes-per-file
class IndexBinding {
    buffer;
    type;
    numIndices;
    offset;
}
exports.IndexBinding = IndexBinding;
class VertexBinding {
    buffer;
    attributeIndex;
    numVertices;
    size;
    type;
    normalized;
    stride;
    offset;
}
exports.VertexBinding = VertexBinding;
/**
 * This class includes all information to render a primitive as specified by the glTF standard.
 * The logic for binding the necessary buffers and drawing the primitive are also included.
 * The material for the primitive as specified by glTF is stored, however it is not bound
 * automatically, i.e., material handling needs to be performed outside this class.
 * See https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#geometry.
 */
class GLTFPrimitive extends geometry_1.Geometry {
    _drawMode;
    _indexBinding;
    _bindings;
    _material;
    _geometryFlags;
    constructor(context, bindings, indexBinding, drawMode, material, flags, identifier) {
        super(context, identifier);
        this._bindings = bindings;
        this._indexBinding = indexBinding;
        this._material = material;
        this._geometryFlags = flags;
        this._drawMode = drawMode;
    }
    bindBuffers() {
        if (this._indexBinding) {
            this._indexBinding.buffer.bind();
        }
        for (const vertexBinding of this._bindings) {
            vertexBinding.buffer.attribEnable(vertexBinding.attributeIndex, vertexBinding.size, vertexBinding.type, vertexBinding.normalized, vertexBinding.stride, vertexBinding.offset, true, true);
        }
    }
    unbindBuffers() {
        if (this._indexBinding) {
            this._indexBinding.buffer.unbind();
        }
        for (const vertexBinding of this._bindings) {
            vertexBinding.buffer.attribDisable(vertexBinding.attributeIndex, true, true);
        }
    }
    draw() {
        const gl = this.context.gl;
        if (this._indexBinding) {
            gl.drawElements(this._drawMode, this._indexBinding.numIndices, this._indexBinding.type, this._indexBinding.offset);
        }
        else {
            gl.drawArrays(this._drawMode, 0, this._bindings[0].numVertices);
        }
    }
    get drawMode() {
        return this._drawMode;
    }
    get material() {
        return this._material;
    }
    get flags() {
        return this._geometryFlags;
    }
    get indexBufferInformation() {
        return this._indexBinding;
    }
    /**
     * Returns information about the attribute buffer used by this primitive for a specific attribute semantic.
     * If the attribute buffer is not present, undefined is returned.
     *
     * @param attribute - Name of the attribute semantic defined by glTF, e.g., "POSITION" or "TEXCOORD_0",
     * see https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#meshes
     */
    getVertexBufferInformationFromAttribute(attribute) {
        const attributeIndex = gltfhelper_1.GLTFHelper.nameToAttributeIndex(attribute);
        for (const bufferInformation of this._bindings) {
            if (bufferInformation.attributeIndex === attributeIndex) {
                return bufferInformation;
            }
        }
        return undefined;
    }
}
exports.GLTFPrimitive = GLTFPrimitive;
//# sourceMappingURL=gltfprimitive.js.map