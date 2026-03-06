"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnifiedBuffer = void 0;
const buffer_1 = require("./buffer");
const context_1 = require("./context");
const initializable_1 = require("./initializable");
/* spellchecker: enable */
/**
 * Class to encapsulating a WebGL buffer adding functionality to record changes to the underlying buffer without
 * instantly propagating them to the WebGL buffer. It is intended to be a direct replacement for {@link Buffer}.
 * When calling {@link subData} the data will be copied to an internal, CPU-sided buffer and the affecting range will be
 * recorded. If the newly recorded range overrides a part of or the whole of a previously recorded range the older one
 * will either be discarded completely or merged with the new one according to a specifiable merge threshold.
 * To propagate all recorded changes to the GPU-sided buffer, {@link update} has to be called. This will take care of
 * both the allocation of the GPU-sided buffer and the transfer of the changed data.
 * While {@link update} can must only be called after initializing the object, {@link subData},
 * {@link mergeSubDataRanges} and resizing (@see{@link size}) can be called on the unitialized object.
 * The GPU-sided buffer is created on initialization and deleted on uninitialization.
 * A typical usage could look like this:
 * ```
 * // Create a unified buffer with the size of 1028 bytes and a mergeThreshold of 32 bytes
 * const unifiedBuffer = new UnifiedBuffer(context, 1028, gl.STATIC_DRAW, 32, 'UnifiedBuffer');
 * unifiedBuffer.initialize(gl.ARRAY_BUFFER);
 * unifiedBuffer.attribEnable(0, 1, gl.FLOAT, gl.FALSE, 0, 0, true, false);
 * unifiedBuffer.attribEnable(1, 1, gl.SHORT, gl.FALSE, 0, 512, false, true);
 *
 * unifiedBuffer.subData(0, new Float32Array(64).fill(3.14));
 * unifiedBuffer.subData(512, new Int16Array(128).fill(1200));
 *
 * unifiedBuffer.update(true, true);
 *
 * unifiedBuffer.subData(128, new Float32Array(32).fill(1.57));
 * unifiedBuffer.subData(640, new Int36Array(64).fill(600));
 *
 * unifiedBuffer.mergeThreshold = -1;
 * // This will merge both already existing ranges resulting in a single update
 * unifiedBuffer.mergeSubDataRanges();
 *
 * unifiedBuffer.bind();
 * unifiedBuffer.update();
 * unifiedBuffer.unbind();
 * ```
 */
class UnifiedBuffer extends initializable_1.Initializable {
    _cpuBuffer;
    _gpuBuffer;
    _updates = new Array();
    /** @see {@link usage} */
    _usage;
    /** @see {@link mergeThreshold} */
    _mergeThreshold;
    /**
     * Checks if two updates have to be merged according to the mergeThreshold. Note: lhsUpdate.begin has to be smaller
     * than rhsUpdate.begin.
     * @param lhsUpdate - First update
     * @param rhsUpdate - Second update
     * @param mergeThreshold - Threshold considered for merging.
     * @returns - True if mergeThreshold == -1 or distance between the two updates <= mergeThreshold, false otherwise.
     */
    static updatesNeedMerge(lhsUpdate, rhsUpdate, mergeThreshold) {
        return rhsUpdate.begin - lhsUpdate.end < mergeThreshold || mergeThreshold === -1;
    }
    /**
     * Creates a zero initialized buffer with the given size.
     * @param context - Context used for all GPU operations.
     * @param sizeInBytes - Size of the buffer in bytes.
     * @param usage - Usage hint for allocation of the GPU-sided buffer.
     * @param mergeThreshold - Threshold in which all updates will get merged.
     * @param identifier - Unique identifier for this UnifiedBuffer.
     */
    constructor(context, sizeInBytes, usage, mergeThreshold = 0, identifier) {
        super();
        this._cpuBuffer = new ArrayBuffer(sizeInBytes);
        this._gpuBuffer = new buffer_1.Buffer(context, identifier);
        this._usage = usage;
        this._mergeThreshold = mergeThreshold;
    }
    /**
     * Merges all updates left of index transitively with the update at index until there are no more updates within the
     * merge threshold.
     * @param index - Index of the update that should get merged.
     * @returns - Number of merged updates.
     */
    mergeUpdatesLeft(index) {
        let removeCount = 0;
        const rhs = this._updates[index];
        for (let i = index - 1; i >= 0; i--) {
            const lhs = this._updates[i];
            if (UnifiedBuffer.updatesNeedMerge(lhs, rhs, this._mergeThreshold)) {
                rhs.begin = Math.min(rhs.begin, lhs.begin);
                rhs.end = Math.max(rhs.end, lhs.end);
                removeCount++;
            }
            else {
                break;
            }
        }
        this._updates.splice(index - removeCount, removeCount);
        return removeCount + 1;
    }
    /**
     * Merges all updates right of index transitively with the update at index until there are no more updates within
     * the merge threshold.
     * @param index - Index of the update that should get merged.
     * @returns - Number of merged updates.
     */
    mergeUpdatesRight(index) {
        let removeCount = 0;
        const lhs = this._updates[index];
        for (let i = index + 1; i < this._updates.length; i++) {
            const rhs = this._updates[i];
            if (UnifiedBuffer.updatesNeedMerge(lhs, rhs, this._mergeThreshold)) {
                lhs.begin = Math.min(lhs.begin, rhs.begin);
                lhs.end = Math.max(lhs.end, rhs.end);
                removeCount++;
            }
            else {
                break;
            }
        }
        this._updates.splice(index + 1, removeCount);
        return removeCount + 1;
    }
    /**
     * Adds a range to recorded updates. Transitively merges all already recorded updates within the mergeThreshold of
     * the added range.
     * @param update - Range to add to the updates.
     */
    addUpdate(update) {
        const start = this._updates.findIndex((current) => {
            return update.begin < current.begin;
        });
        if (start === -1) {
            this._updates.push(update);
            this.mergeUpdatesLeft(this._updates.length - 1);
        }
        else {
            this._updates.splice(start, 0, update);
            this.mergeUpdatesRight(start);
            this.mergeUpdatesLeft(start);
        }
    }
    /**
     * Create the buffer object on the GPU.
     * @param target - Target used as binding point.
     */
    @initializable_1.Initializable.initialize()
    initialize(target) {
        return this._gpuBuffer.initialize(target);
    }
    /**
     * Delete the buffer object on the GPU. This should have the reverse effect of `create`.
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._gpuBuffer.uninitialize();
    }
    /**
     * Binds the buffer object as buffer to predefined target.
     */
    @initializable_1.Initializable.assert_initialized()
    bind() {
        this._gpuBuffer.bind();
    }
    /**
     * Binds null as current buffer to predefined target;
     */
    @initializable_1.Initializable.assert_initialized()
    unbind() {
        this._gpuBuffer.unbind();
    }
    /**
     * Specifies the memory layout of the buffer for a binding point.
     * @param index - Index of the vertex attribute that is to be setup and enabled.
     * @param size - Number of components per vertex attribute.
     * @param type - Data type of each component in the array.
     * @param normalized - Whether integer data values should be normalized when being casted to a float.
     * @param stride - Offset in bytes between the beginning of consecutive vertex attributes.
     * @param offset - Offset in bytes of the first component in the vertex attribute array.
     * @param bind - Allows to skip binding the object (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the object (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    attribEnable(index, size, type, normalized = false, stride = 0, offset = 0, bind = true, unbind = true) {
        this._gpuBuffer.attribEnable(index, size, type, normalized, stride, offset, bind, unbind);
    }
    /**
     * Disables a buffer binding point.
     * @param index - Index of the vertex attribute that is to be disabled.
     * @param bind - Allows to skip binding the object (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the object (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    attribDisable(index, bind = true, unbind = true) {
        this._gpuBuffer.attribDisable(index, bind, unbind);
    }
    /**
     * Merges all recorded subData ranges.
     */
    mergeSubDataRanges() {
        let index = 0;
        while (index < this._updates.length) {
            index += this.mergeUpdatesRight(index);
        }
    }
    /**
     * Copies the new data into the CPU-sided buffer and records the range as changed. All previously added ranges will
     * get merged transitively with the new one, if they are within the set mergeThreshold.
     * Note: This does not transfer anything to the GPU-sided buffer yet.
     * @param dstByteOffset - Offset of bytes into the destination buffer.
     * @param srcData - Data that will be copied into the destination buffer.
     */
    subData(dstByteOffset, srcData) {
        let src;
        if (srcData instanceof ArrayBuffer) {
            src = new Uint8Array(srcData);
        }
        else {
            src = new Uint8Array(srcData.buffer).subarray(srcData.byteOffset, srcData.byteOffset + srcData.byteLength);
        }
        const dst = new Uint8Array(this._cpuBuffer);
        dst.set(src, dstByteOffset);
        this.addUpdate({ begin: dstByteOffset, end: dstByteOffset + src.byteLength });
    }
    /**
     * Copies all previously recorded ranges and their data to the GPU. (Re-)Allocate the GPU-sided buffer if the size
     * changed or the object was reinitialized.
     * @param bind - Allows to skip binding the object (e.g., when binding is handled outside).
     * @param unbind - Allows to skip unbinding the object (e.g., when binding is handled outside).
     */
    @initializable_1.Initializable.assert_initialized()
    update(bind = false, unbind = false) {
        if (bind) {
            this._gpuBuffer.bind();
        }
        if (this._gpuBuffer.bytes !== this._cpuBuffer.byteLength) {
            this._gpuBuffer.data(this._cpuBuffer, this._usage);
        }
        else {
            const bufferView = new Uint8Array(this._cpuBuffer);
            for (const update of this._updates) {
                const subBufferView = bufferView.subarray(update.begin, update.end);
                this._gpuBuffer.subData(update.begin, subBufferView);
            }
        }
        if (unbind) {
            this._gpuBuffer.unbind();
        }
        this._updates.length = 0;
    }
    /**
     * Returns the size of the CPU-sided buffer. This is not necessarily the same as the size of the GPU-sided buffer,
     * if update has not been called after resizing the buffer.
     */
    get size() {
        return this._cpuBuffer.byteLength;
    }
    /**
     * Resizes the buffer. Note, that this does not resize the GPU-sided buffer. To update the size of the GPU-sided
     * buffer update has to be called.
     */
    set size(sizeInBytes) {
        const oldBuffer = this._cpuBuffer;
        this._cpuBuffer = new ArrayBuffer(sizeInBytes);
        // Takes the whole buffer, if sizeInBytes > oldBuffer
        // Takes sizeInBytes of oldBuffer otherwise
        const src = new Uint8Array(oldBuffer).slice(0, sizeInBytes);
        const dst = new Uint8Array(this._cpuBuffer);
        dst.set(src);
    }
    /**
     * Target to which the buffer object is bound (either GL_ARRAY_BUFFER or GL_ELEMENT_ARRAY_BUFFER).
     * Readonly access to the target (as specified on initialization) the buffer will be bound to.
     */
    get target() {
        this.assertInitialized();
        return this._gpuBuffer.target;
    }
    /**
     * Returns the usage hint used for allocation of the GPU-sided buffer.
     */
    get usage() {
        return this._usage;
    }
    /**
     * Sets the usage hint used for allocation of the GPU-sided buffer.
     */
    set usage(usage) {
        this._usage = usage;
    }
    /**
     * Returns the threshold used to determine whether two ranges have to be merged.
     */
    get mergeThreshold() {
        return this._mergeThreshold;
    }
    /**
     * Sets the threshold determining whether two ranges have to be merged. If the mergeThreshold is set to -1 all
     * ranges will get merged disregarding their distance to each other.
     */
    set mergeThreshold(mergeThreshold) {
        this._mergeThreshold = mergeThreshold;
    }
}
exports.UnifiedBuffer = UnifiedBuffer;
//# sourceMappingURL=unifiedbuffer.js.map