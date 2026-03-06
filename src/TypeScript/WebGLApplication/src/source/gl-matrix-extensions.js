"use strict";
/* spellchecker: disable */
const gl_matrix_1 = require("gl-matrix");
/* spellchecker: enable */
/** Namespace that comprises various gl-matrix extensions (also cleans up documentation). */
var gl_matrix_extensions;
(function (gl_matrix_extensions) {
    // GLSL sign https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/sign.xhtml
    /**
     * Extract the sign of the parameter as specified in GLSL.
     * @param x - Value from which to extract the sign.
     * @returns - -1.0 if x is less than 0.0, 0.0 if x is equal to 0.0, and +1.0 if x is greater than 0.0.
     */
    function sign(x) {
        return x > 0.0 ? 1.0 : x < 0.0 ? -1.0 : 0.0;
    }
    gl_matrix_extensions.sign = sign;
    // GLSL clamp https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/clamp.xhtml
    /**
     * Constrain a value to lie between two further values.
     * ```
     * clamp(+3, +0, +2); // results in +2;
     * ```
     * @param x - The number to clamp.
     * @param min - Minimum number operand.
     * @param max - Maximum number operand.
     * @returns - Number constrained to [min,max].
     */
    function clamp(x, min, max) {
        return Math.max(min, Math.min(max, x));
    }
    gl_matrix_extensions.clamp = clamp;
    /**
     * Compute the fractional part of the argument.
     * ```
     * fract(+1.23); // results in +0.23
     * fract(-1.23); // results in -0.23
     * ```
     * @param x - The number to compute the fractional part of.
     * @returns - The fractional part of x. This is calculated as x - floor(x).
     */
    function fract(x) {
        return x > 0 ? x - Math.floor(x) : x - Math.ceil(x);
    }
    gl_matrix_extensions.fract = fract;
    /**
     * A vec2 placeholder to overcome the gl-matrix out interface.
     */
    function v2() {
        return gl_matrix_1.vec2.create();
    }
    gl_matrix_extensions.v2 = v2;
    /**
     * Constrain a two-component vector to lie between two further two-component vectors.
     * ```
     * let a: vec2 = vec2.fromValues(2, 2);
     * clamp2(a, a, [0, 0], [1, 1]);
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to clamp.
     * @param min - Minimum vector operand.
     * @param max - Maximum vector operand.
     * @returns - Vector constrained to [min,max].
     */
    function clamp2(out, x, min, max) {
        out[0] = Math.max(min[0], Math.min(max[0], x[0]));
        out[1] = Math.max(min[1], Math.min(max[1], x[1]));
        return out;
    }
    gl_matrix_extensions.clamp2 = clamp2;
    /**
     * Derive the absolute values of each of the two vector components.
     * ```
     * let a: vec2 = vec2.fromValues(-2, 2);
     * abs2(a, a); // should result in [2,2]
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to apply abs to.
     * @returns - Vector with each component as absolute value.
     */
    function abs2(out, x) {
        out[0] = Math.abs(x[0]);
        out[1] = Math.abs(x[1]);
        return out;
    }
    gl_matrix_extensions.abs2 = abs2;
    /**
     * A vec3 placeholder to overcome the gl-matrix out interface.
     */
    function v3() {
        return gl_matrix_1.vec3.create();
    }
    gl_matrix_extensions.v3 = v3;
    /**
     * Constrain a three-component vector to lie between two further three-component vectors.
     * ```
     * let a: vec3 = vec3.fromValues(2, 2, 2);
     * clamp3(a, a, [0, 0, 0], [1, 1, 1]);
     * ```
     * @param out -The receiving vector.
     * @param x - The vector to clamp.
     * @param min - Minimum vector operand.
     * @param max - Maximum vector operand.
     * @returns - Vector constrained to [min,max].
     */
    function clamp3(out, x, min, max) {
        out[0] = Math.max(min[0], Math.min(max[0], x[0]));
        out[1] = Math.max(min[1], Math.min(max[1], x[1]));
        out[2] = Math.max(min[2], Math.min(max[2], x[2]));
        return out;
    }
    gl_matrix_extensions.clamp3 = clamp3;
    /**
     * Derive the absolute values of each of the three vector components.
     * ```
     * let a: vec3 = vec3.fromValues(-2, 2, -1);
     * abs3(a, a); // should result in [2,2,1]
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to apply abs to.
     * @returns  - Vector with each component as absolute value.
     */
    function abs3(out, x) {
        out[0] = Math.abs(x[0]);
        out[1] = Math.abs(x[1]);
        out[2] = Math.abs(x[2]);
        return out;
    }
    gl_matrix_extensions.abs3 = abs3;
    const one256ths = 1.0 / 256.0;
    /**
     * Encodes a 24bit floating point in [0,1] into three 8bit components (vec3 of uint8).
     * @param out - The vector to encode into.
     * @param x - 24bit floating point number to encode.
     * @returns - Vector with the float encoded.
     */
    function encode_float24x1_to_uint8x3(out, x) {
        out[0] = Math.floor(x * 256.0);
        out[1] = Math.floor(fract(x * 256.0) * 256.0);
        out[2] = Math.floor(fract(x * 65536.0) * 256.0);
        return out;
    }
    gl_matrix_extensions.encode_float24x1_to_uint8x3 = encode_float24x1_to_uint8x3;
    /**
     * Decodes three 8bit components of a vec3 to a 24bit floating point number.
     * @param x - Vector with three 8bit unsigned int components (uint8x3).
     * @returns - Encoded 24bit floating point number.
     */
    function decode_float24x1_from_uint8x3(x) {
        return (x[0] + (x[1] + x[2] * one256ths) * one256ths) * one256ths;
    }
    gl_matrix_extensions.decode_float24x1_from_uint8x3 = decode_float24x1_from_uint8x3;
    /**
     * Packs a 24bit unsigned int into a three component byte vector.
     * ```
     * let uint8x3: vec3 = vec3.create();
     * encode_uint24_in_rgb8(uint8x3, 250285); // should result in [ 173, 209, 3 ]
     * ```
     * @param out - byte (uint8) vector with packed uint24 data
     * @param x - uint24 number
     * @returns - Three component byte vector with x packed.
     */
    function encode_uint24_to_rgb8(out, x) {
        out[0] = (x >>> 0) & 0xFF;
        out[1] = (x >>> 8) & 0xFF;
        out[2] = (x >>> 16) & 0xFF;
        return out;
    }
    gl_matrix_extensions.encode_uint24_to_rgb8 = encode_uint24_to_rgb8;
    /**
     * Packs a 32bit unsigned int into a four component byte vector.
     * ```
     * let uint8x4: vec3 = vec4.create();
     * encode_uint24_in_rgb8(uint8x4, 250285); // should result in [ 173, 209, 3, 0 ]
     * ```
     * @param out - byte (uint8) vector with packed uint32 data
     * @param x - uint32 number
     * @returns - Three component byte vector with x packed.
     */
    function encode_uint32_to_rgba8(out, x) {
        out[0] = (x >>> 0) & 0xFF;
        out[1] = (x >>> 8) & 0xFF;
        out[2] = (x >>> 16) & 0xFF;
        out[3] = (x >>> 24) & 0xFF;
        return out;
    }
    gl_matrix_extensions.encode_uint32_to_rgba8 = encode_uint32_to_rgba8;
    /**
     * Unpacks a 24bit unsigned int from a three component byte vector.
     * ```
     * let uint8x3: vec3 = vec3.fromValues(173, 209, 3);
     * decode_uint24_from_rgb8(uint8x3); // should return 250285
     * ```
     * @param x - byte (uint8) vector with packed uint24 data
     * @returns - Unpacked 24bit unsigned int.
     */
    function decode_uint24_from_rgb8(x) {
        return x[0] + (x[1] << 8) + (x[2] << 16);
    }
    gl_matrix_extensions.decode_uint24_from_rgb8 = decode_uint24_from_rgb8;
    /**
     * Unpacks a 32bit unsigned int from a four component byte vector.
     * ```
     * let uint8x4: vec4 = vec4.fromValues(173, 209, 3, 23);
     * decode_uint24_from_rgba8(uint8x4); // should return xxx
     * ```
     * @param x - byte (uint8) vector with packed uint32 data
     * @returns - Unpacked 32bit unsigned int.
     */
    function decode_uint32_from_rgba8(x) {
        return x[0] + (x[1] << 8) + (x[2] << 16) + (x[3] << 24) >>> 0;
    }
    gl_matrix_extensions.decode_uint32_from_rgba8 = decode_uint32_from_rgba8;
    /**
     * Constructs a vec3 from a vec4 with division by the w component applied. If the w component is zero, division
     * skipped.
     * ```
     * const v4: vec4 = vec4.fromValues(2, 4, 6, 2);
     * const v3: vec3 = fromVec4(v4); // v3 is [1, 2, 3]
     * ```
     * @param x - The vector to be transformed to a vec3.
     * @returns - Three component vector based on x.
     */
    function fromVec4(x) {
        if (x[3] === 0) {
            return gl_matrix_1.vec3.fromValues(x[0], x[1], x[2]);
        }
        return gl_matrix_1.vec3.fromValues(x[0] / x[3], x[1] / x[3], x[2] / x[3]);
    }
    gl_matrix_extensions.fromVec4 = fromVec4;
    /**
     * A vec4 placeholder to overcome the gl-matrix out interface.
     */
    function v4() {
        return gl_matrix_1.vec4.create();
    }
    gl_matrix_extensions.v4 = v4;
    /**
     * Constrain a four-component vector to lie between two further four-component vectors.
     * ```
     * let a: vec4 = vec4.fromValues(2, 2, 2, 2);
     * clamp4(a, a, [0, 0, 0, 0], [1, 1, 1, 1]);
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to clamp.
     * @param min - Minimum vector operand.
     * @param max - Maximum vector operand.
     * @returns - Vector constrained to [min,max].
     */
    function clamp4(out, x, min, max) {
        out[0] = Math.max(min[0], Math.min(max[0], x[0]));
        out[1] = Math.max(min[1], Math.min(max[1], x[1]));
        out[2] = Math.max(min[2], Math.min(max[2], x[2]));
        out[3] = Math.max(min[3], Math.min(max[3], x[3]));
        return out;
    }
    gl_matrix_extensions.clamp4 = clamp4;
    /**
     * Derive the absolute values of each of the four vector components.
     * ```
     * let a: vec4 = vec4.fromValues(-2, 2, -1, 1);
     * abs4(a, a); // should result in [2,2,1,1]
     * ```
     * @param out - The receiving vector.
     * @param x - The vector to apply abs to.
     * @returns - Vector with each component as absolute value.
     */
    function abs4(out, x) {
        out[0] = Math.abs(x[0]);
        out[1] = Math.abs(x[1]);
        out[2] = Math.abs(x[2]);
        out[3] = Math.abs(x[3]);
        return out;
    }
    gl_matrix_extensions.abs4 = abs4;
    /**
     * Constructs a vec4 from a vec3 by appending 1.0 as the w component.
     * ```
     * const v3: vec3 = vec3.fromValues(2, 4, 6);
     * const v4: vec4 = fromVec3(v3); // v3 is [2, 4, 6, 1]
     * ```
     * @param x - The vector to be transformed to a vec4.
     * @returns - Four component vector based on x.
     */
    function fromVec3(x) {
        return gl_matrix_1.vec4.fromValues(x[0], x[1], x[2], 1.0);
    }
    gl_matrix_extensions.fromVec3 = fromVec3;
    /**
     * Parses a vec2 from a string.
     * @param v2str - String in the format '<number>, <number>', e.g., '1.0, 0.0'.
     * @returns - Vec2 if string was parsed successfully, undefined else.
     */
    function parseVec2(v2str) {
        if (v2str === undefined || v2str === '') {
            return undefined;
        }
        let numbers = [];
        try {
            numbers = JSON.parse(`[${v2str}]`);
        }
        catch (error) {
            return undefined;
        }
        return numbers.length !== 2 || isNaN(numbers[0]) || isNaN(numbers[1]) ?
            undefined : gl_matrix_1.vec2.clone(numbers);
    }
    gl_matrix_extensions.parseVec2 = parseVec2;
    /**
     * Parses a vec3 from a string.
     * @param v3str - String in the format '<number>, <number>, <number>', e.g., '1.0, 0.0, 1.0'.
     * @returns - Vec3 if string was parsed successfully, undefined else.
     */
    function parseVec3(v3str) {
        if (v3str === undefined || v3str === '') {
            return undefined;
        }
        let numbers = [];
        try {
            numbers = JSON.parse(`[${v3str}]`);
        }
        catch (error) {
            return undefined;
        }
        return numbers.length !== 3 || isNaN(numbers[0]) || isNaN(numbers[1]) || isNaN(numbers[2]) ?
            undefined : gl_matrix_1.vec3.clone(numbers);
    }
    gl_matrix_extensions.parseVec3 = parseVec3;
    /**
     * Parses a vec4 from a string.
     * @param v4str - String in the format '<number>, <number>, <number>, <number>', e.g., '1.0, 0.0, 0.0, 0.0'.
     * @returns - Vec4 if string was parsed successfully, undefined else.
     */
    function parseVec4(v4str) {
        if (v4str === undefined || v4str === '') {
            return undefined;
        }
        let numbers = [];
        try {
            numbers = JSON.parse(`[${v4str}]`);
        }
        catch (error) {
            return undefined;
        }
        return numbers.length !== 4 || isNaN(numbers[0]) || isNaN(numbers[1]) ||
            isNaN(numbers[2]) || isNaN(numbers[3]) ?
            undefined : gl_matrix_1.vec4.clone(numbers);
    }
    gl_matrix_extensions.parseVec4 = parseVec4;
    /**
     * Performs a mix as specified in GLSL.
     * @param value1 - The first value.
     * @param value2 - The second value.
     * @param interpolation - The interpolation value (usually between 0 and 1).
     * @returns - The interpolated value between value1 and value2.
     */
    function mix(value1, value2, interpolation) {
        return value1 * (1.0 - interpolation) + value2 * interpolation;
    }
    gl_matrix_extensions.mix = mix;
    /**
     * A mat2 placeholder to overcome the gl-matrix out interface.
     */
    function m2() {
        return gl_matrix_1.mat2.create();
    }
    gl_matrix_extensions.m2 = m2;
    /**
     * A mat3 placeholder to overcome the gl-matrix out interface.
     */
    function m3() {
        return gl_matrix_1.mat3.create();
    }
    gl_matrix_extensions.m3 = m3;
    /**
     * A mat4 placeholder to overcome the gl-matrix out interface.
     */
    function m4() {
        return gl_matrix_1.mat4.create();
    }
    gl_matrix_extensions.m4 = m4;
})(gl_matrix_extensions || (gl_matrix_extensions = {}));
module.exports = gl_matrix_extensions;
//# sourceMappingURL=gl-matrix-extensions.js.map