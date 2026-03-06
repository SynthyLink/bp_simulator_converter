"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelI8 = exports.KernelUI8 = exports.KernelI32 = exports.KernelUI32 = exports.KernelF32 = exports.AbstractKernel = void 0;
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
/**
 * Kernel class is based on the idea of glkernel {@link https://github.com/cginternals/glkernel} and is the basis for
 * various auxiliary kernels that are mainly intended for but not limited to GPU use. A kernel stores samples in a
 * three-dimensional structure. Each sample can have up to four components (vec4) and is strongly typed, e.g.,
 * {@link KernelF32}. The samples can be accessed and modified in various ways and easily passed to the GPU.
 */
class AbstractKernel {
    _samples;
    /** @see {@link width} */
    _width;
    /** @see {@link height} */
    _height;
    /** @see {@link depth} */
    _depth;
    /** @see {@link components} */
    _components;
    constructor(components, width, height = 1, depth = 1) {
        this._components = components;
        this._width = isNaN(width) ? 1 : Math.max(1, width);
        this._height = Math.max(1, height);
        this._depth = Math.max(1, depth);
        this.resize();
    }
    /**
     * Returns the n-tuple/n-component element at index within the cached kernel.
     * @param xPosOrIndex - If x is greater than width, this is interpreted as overall kernel index (requires y and z
     * positions to be undefined). Position is clamped to the range [0, width - 1].
     * @param yPos - Position along the y-axis to access the kernel element at (clamped to range [0, height - 1]).
     * @param zPos - Position along the z-axis to access the kernel element at (clamped to range [0, depth  - 1]).
     * @returns - Tuple of all components of the element at the requested index/position.
     */
    get(xPosOrIndex, yPos, zPos) {
        let i;
        if (yPos === undefined && zPos === undefined) {
            i = this._components * xPosOrIndex;
        }
        else {
            i = this.index(xPosOrIndex, yPos, zPos ? zPos : 0);
        }
        (0, auxiliaries_1.assert)(i < this.length, `index expected to be in range [0, ${this.length - 1}], given ${i}`);
        // eslint-disable-next-line default-case
        switch (this._components) {
            case 1:
                return [this._samples[i]];
            case 2:
                return [this._samples[i], this._samples[i + 1]];
            case 3:
                return [this._samples[i], this._samples[i + 1], this._samples[i + 2]];
            case 4:
                return [this._samples[i], this._samples[i + 1], this._samples[i + 2], this._samples[i + 3]];
        }
    }
    /**
     * Sets the n-tuple/n-component sample at index within the cached kernel.
     * @param sample - Values to be set at specified index or position.
     * @param xPosOrIndex - If x is greater than width, this is interpreted as overall kernel index (requires y and z
     * positions to be undefined). Position is clamped to the range [0, width - 1].
     * @param yPos - Position along the y-axis to access the kernel element at (clamped to range [0, height - 1]).
     * @param zPos - Position along the z-axis to access the kernel element at (clamped to range [0, depth  - 1]).
     */
    set(sample, xPosOrIndex, yPos, zPos) {
        (0, auxiliaries_1.assert)(sample.length === this._components, `number of components expected to be ${this._components}, given ${sample.length}`);
        let i;
        if (yPos === undefined && zPos === undefined) {
            i = this._components * Math.min(this.elements, Math.max(0, xPosOrIndex));
        }
        else {
            i = this._components * this.index(xPosOrIndex, yPos, zPos ? zPos : 0);
        }
        (0, auxiliaries_1.assert)(i < this.length, `index expected to be in range [0, ${this.length - 1}], given ${i}`);
        // eslint-disable-next-line default-case
        switch (this._components) {
            /* falls through */
            case 4:
                this._samples[i + 3] = sample[3];
            /* falls through */
            case 3:
                this._samples[i + 2] = sample[2];
            /* falls through */
            case 2:
                this._samples[i + 1] = sample[1];
            /* falls through */
            case 1:
                this._samples[i + 0] = sample[0];
                break;
        }
    }
    /**
     * Fully reconfigures, i.e., resizes and copies samples, the kernel.
     * @param json - JSON object either from file, or set manually. These kernels can be generated using, e.g.,
     * glkernel {@link https://github.com/cginternals/glkernel}.
     */
    fromJSON(json) {
        (0, auxiliaries_1.assert)(json.size && json.size.width !== undefined && json.size.height !== undefined &&
            json.size.depth !== undefined, `expected kernel width, height, and depth to be set, given '${json.size}'`);
        const flatten = (array) => array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
        this._width = Math.max(1, json.size.width);
        this._height = Math.max(1, json.size.height);
        this._depth = Math.max(1, json.size.depth);
        const array = flatten(json.kernel);
        this._components = Math.floor(array.length / this.elements);
        this.resize();
        this.fromArray(array);
    }
    /**
     * Returns the index of an element at a specific position.
     * @param xPos - Position along the x-axis (clamped to range [0, width  - 1]).
     * @param yPos - Position along the y-axis (clamped to range [0, height - 1]).
     * @param zPos - Position along the z-axis (clamped to range [0, depth  - 1]).
     * @returns - The index of the element at the requested position.
     */
    index(xPos, yPos = 0, zPos = 0) {
        return this._width * (this._height * Math.min(this._depth, Math.max(0, zPos))
            + Math.min(this._height, Math.max(0, yPos))) + Math.min(this._width, Math.max(0, xPos));
    }
    /**
     * Returns the position of an element at a specific index.
     * @param index - Index of the requested position (clamped to range [0, size]).
     * @returns - The position of the element at the requested index as 3-tuple [x, y, z].
     */
    position(index) {
        let clamped = Math.min(this.elements, Math.max(0, index));
        const zPos = Math.floor(clamped / (this._width * this._height));
        clamped -= zPos * this._width * this._height;
        const yPos = Math.floor(clamped / this._width);
        clamped -= yPos * this._width;
        const xPos = clamped;
        return [xPos, yPos, zPos];
    }
    /**
     * Sorts all samples based on the given sorting approach, e.g., by length of a sample. In order to sort an array
     * of samples comprising a number of components an sort-auxiliary array is created, sorted, and, finally, mapped to
     * the sample array.
     * @param approach - Sorting approach that is to be used.
     */
    sort(approach) {
        if (this.elements < 2) {
            return;
        }
        /* Create index structure for sorting (handling the stride). */
        const tuples = Array(this.elements);
        for (let i = 0; i < this.elements; ++i) {
            let value = 0.0;
            switch (approach) {
                case AbstractKernel.SortApproach.BySquaredLength:
                default:
                    for (let c = 0; c < this._components; ++c) {
                        const v = this._samples[i * this._components + c];
                        value += v * v;
                    }
                    break;
            }
            tuples[i] = [i, value];
        }
        /* Invoke the actual sorting approaches. Since the samples are always dense, the index structure can later be
        used directly for restructuring/applying the new order to the samples. */
        switch (approach) {
            case AbstractKernel.SortApproach.BySquaredLength:
            default:
                tuples.sort((a, b) => a[1] - b[1]);
                break;
        }
        /* Apply the new, sorted order/sequences to the samples array. */
        const source = this._samples.slice();
        for (let i = 0; i < tuples.length; ++i) {
            for (let c = 0; c < this._components; ++c) {
                const iSource = tuples[i][0] * this._components + c;
                const iTarget = i * this._components + c;
                this._samples[iTarget] = source[iSource];
            }
        }
    }
    /**
     * All elements/samples of the kernel as array buffer.
     */
    get samples() {
        return this._samples;
    }
    /**
     * Returns the number of samples, i.e., the number of elements times the number of components per element.
     */
    get length() {
        return this._width * this._height * this._depth * this._components;
    }
    /**
     * Returns the number of samples.
     */
    get elements() {
        const elementCount = this._width * this._height * this._depth;
        return isNaN(elementCount) ? 0 : elementCount;
    }
    /**
     * Number of components per sample, e.g., 2 for 2-tuple samples, 3 for 3-tuple samples, etc.
     */
    get components() {
        return this._components;
    }
    /**
     * The width of the kernel (x-axis)
     */
    get width() {
        return this._width;
    }
    /**
     * The height of the kernel (y-axis)
     */
    get height() {
        return this._height;
    }
    /**
     * The depth of the kernel (z-axis)
     */
    get depth() {
        return this._depth;
    }
    /**
     * Distance between the indices of two adjacent elements along the x-axis in bytes.
     */
    get xStride() {
        return this.bytesPerComponent * this._components;
    }
    /**
     * Distance between the indices of two adjacent elements along the y-axis in bytes.
     */
    get yStride() {
        return this.bytesPerComponent * this._components * this._width;
    }
    /**
     * Distance between the indices of two adjacent elements along the z-axis in bytes.
     */
    get zStride() {
        return this.bytesPerComponent * this._components * this._width * this._depth;
    }
    /**
     * Length of all samples in bytes.
     */
    get bytesLength() {
        return this.bytesPerComponent * this._components * this._width * this._height * this._depth;
    }
}
exports.AbstractKernel = AbstractKernel;
(function (AbstractKernel) {
    let SortApproach;
    (function (SortApproach) {
        SortApproach[SortApproach["BySquaredLength"] = 0] = "BySquaredLength";
    })(SortApproach = AbstractKernel.SortApproach || (AbstractKernel.SortApproach = {}));
})(AbstractKernel || (exports.AbstractKernel = AbstractKernel = {}));
class KernelF32 extends AbstractKernel {
    resize() {
        this._samples = new Float32Array(this.length);
    }
    /**
     * Copies and converts samples to this kernels typed samples.
     * @param samples - Flat array of all sample values.
     */
    fromArray(samples) {
        (0, auxiliaries_1.assert)(samples.length === this.length, `expected samples length to match this kernel's length`);
        this._samples.set(new Float32Array(samples));
    }
    get bytesPerComponent() {
        return 4;
    }
}
exports.KernelF32 = KernelF32;
class KernelUI32 extends AbstractKernel {
    resize() {
        this._samples = new Uint32Array(this.length);
    }
    /**
     * Copies and converts samples to this kernels typed samples.
     * @param samples - Flat array of all sample values.
     */
    fromArray(samples) {
        (0, auxiliaries_1.assert)(samples.length === this.length, `expected samples length to match this kernel's length`);
        this._samples.set(new Uint32Array(samples));
    }
    get bytesPerComponent() {
        return 4;
    }
}
exports.KernelUI32 = KernelUI32;
class KernelI32 extends AbstractKernel {
    resize() {
        this._samples = new Int32Array(this.length);
    }
    /**
     * Copies and converts samples to this kernels typed samples.
     * @param samples - Flat array of all sample values.
     */
    fromArray(samples) {
        (0, auxiliaries_1.assert)(samples.length === this.length, `expected samples length to match this kernel's length`);
        this._samples.set(new Int32Array(samples));
    }
    get bytesPerComponent() {
        return 4;
    }
}
exports.KernelI32 = KernelI32;
class KernelUI8 extends AbstractKernel {
    resize() {
        this._samples = new Uint8Array(this.length);
    }
    /**
     * Copies and converts samples to this kernels typed samples.
     * @param samples - Flat array of all sample values.
     */
    fromArray(samples) {
        (0, auxiliaries_1.assert)(samples.length === this.length, `expected samples length to match this kernel's length`);
        this._samples.set(new Uint8Array(samples));
    }
    get bytesPerComponent() {
        return 4;
    }
}
exports.KernelUI8 = KernelUI8;
class KernelI8 extends AbstractKernel {
    resize() {
        this._samples = new Int8Array(this.length);
    }
    /**
     * Copies and converts samples to this kernels typed samples.
     * @param samples - Flat array of all sample values.
     */
    fromArray(samples) {
        (0, auxiliaries_1.assert)(samples.length === this.length, `expected samples length to match this kernel's length`);
        this._samples.set(new Int8Array(samples));
    }
    get bytesPerComponent() {
        return 4;
    }
}
exports.KernelI8 = KernelI8;
//# sourceMappingURL=kernel.js.map