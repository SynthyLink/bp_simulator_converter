"use strict";
/* spellchecker: disable */
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const auxiliaries_1 = require("./auxiliaries");
/* spellchecker: enable */
var tuples;
(function (tuples) {
    /**
     * Creates a tuple from a array buffer of the same size.
     * @param buffer - Array of two float32 values.
     * @returns - 2-tuple of specified type (GLsizei, GLfloat, or GLclampf).
     */
    function tuple2(buffer) {
        (0, auxiliaries_1.assert)(buffer.length === 2, `expected length of buffer to be 2, given ${buffer.length}`);
        return [buffer[0], buffer[1]];
    }
    tuples.tuple2 = tuple2;
    /**
     * Creates a tuple from a array buffer of the same size.
     * @param buffer - Array of three float32 values.
     * @returns - 3-tuple of specified type (GLsizei, GLfloat, or GLclampf).
     */
    function tuple3(buffer) {
        (0, auxiliaries_1.assert)(buffer.length === 3, `expected length of buffer to be 3, given ${buffer.length}`);
        return [buffer[0], buffer[1], buffer[2]];
    }
    tuples.tuple3 = tuple3;
    /**
     * Creates a tuple from a array buffer of the same size.
     * @param buffer - Array of four float32 values.
     * @returns - 4-tuple of specified type (GLsizei, GLfloat, or GLclampf).
     */
    function tuple4(buffer) {
        (0, auxiliaries_1.assert)(buffer.length === 4, `expected length of buffer to be 4, given ${buffer.length}`);
        return [buffer[0], buffer[1], buffer[2], buffer[3]];
    }
    tuples.tuple4 = tuple4;
    /**
     * Clamps a single GLclampf/GLfloat value to the range [0.0, 1.0]. If clamping is necessary, a user-level message
     * will be logged to console.
     * @param value - Single GLclampf/GLfloat value to clamp to range [0.0, 1.0].
     * @param semantic - String describing the value's semantic, used for the user-level log message.
     * @returns - Clamped value.
     */
    function clampf(value, semantic) {
        const valueV1 = (0, gl_matrix_extensions_1.clamp)(value, 0.0, 1.0);
        (0, auxiliaries_1.logIf)(semantic !== undefined && value < 0.0 || value > 1.0, auxiliaries_1.LogLevel.Info, `${semantic} clamped to [${valueV1}], given [${value}]`);
        return valueV1;
    }
    tuples.clampf = clampf;
    /**
     * Clamps each GLclampf/GLfloat value of a 2-tuple to the range [0.0, 1.0]. If clamping is necessary, a user-level
     * message will be logged to console.
     * @param tuple - 2-tuple of GLclampf/GLfloat values, each to be clamped to range [0.0, 1.0].
     * @param semantic - String describing the tuple's semantic, used for the user-level log message.
     * @returns - Clamped tuple.
     */
    function clampf2(tuple, semantic) {
        const tupleV2 = gl_matrix_1.vec2.fromValues(tuple[0], tuple[1]);
        if (tuple[0] < 0.0 || tuple[0] > 1.0 || tuple[1] < 0.0 || tuple[1] > 1.0) {
            (0, gl_matrix_extensions_1.clamp2)(tupleV2, tupleV2, gl_matrix_1.vec2.fromValues(0.0, 0.0), gl_matrix_1.vec2.fromValues(1.0, 1.0));
            (0, auxiliaries_1.logIf)(semantic !== undefined, auxiliaries_1.LogLevel.Info, `${semantic} clamped to [${tupleV2}], given [${tuple}]`);
        }
        return tuple2(tupleV2);
    }
    tuples.clampf2 = clampf2;
    /**
     * Clamps each GLclampf/GLfloat value of a 3-tuple to the range [0.0, 1.0]. If clamping is necessary, a user-level
     * message will be logged to console.
     * @param tuple - 3-tuple of GLclampf/GLfloat values, each to be clamped to range [0.0, 1.0].
     * @param semantic - String describing the tuple's semantic, used for the user-level log message.
     * @returns - Clamped tuple.
     */
    function clampf3(tuple, semantic) {
        const tupleV3 = gl_matrix_1.vec3.fromValues(tuple[0], tuple[1], tuple[2]);
        if (tuple[0] < 0.0 || tuple[0] > 1.0 || tuple[1] < 0.0 || tuple[1] > 1.0 || tuple[2] < 0.0 || tuple[2] > 1.0) {
            (0, gl_matrix_extensions_1.clamp3)(tupleV3, tupleV3, gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0), gl_matrix_1.vec3.fromValues(1.0, 1.0, 1.0));
            (0, auxiliaries_1.logIf)(semantic !== undefined, auxiliaries_1.LogLevel.Info, `${semantic} clamped to [${tupleV3}], given [${tuple}]`);
        }
        return tuple3(tupleV3);
    }
    tuples.clampf3 = clampf3;
    /**
     * Clamps each GLclampf/GLfloat value of a 4-tuple to the range [0.0, 1.0]. If clamping is necessary, a user-level
     * message will be logged to console.
     * @param tuple - 4-tuple of GLclampf/GLfloat values, each to be clamped to range [0.0, 1.0].
     * @param semantic - String describing the tuple's semantic, used for the user-level log message.
     * @returns - Clamped tuple.
     */
    function clampf4(tuple, semantic) {
        const tupleV4 = gl_matrix_1.vec4.fromValues(tuple[0], tuple[1], tuple[2], tuple[3]);
        if (tuple[0] < 0.0 || tuple[0] > 1.0 || tuple[1] < 0.0 || tuple[1] > 1.0 ||
            tuple[2] < 0.0 || tuple[2] > 1.0 || tuple[3] < 0.0 || tuple[3] > 1.0) {
            (0, gl_matrix_extensions_1.clamp4)(tupleV4, tupleV4, gl_matrix_1.vec4.fromValues(0.0, 0.0, 0.0, 0.0), gl_matrix_1.vec4.fromValues(1.0, 1.0, 1.0, 1.0));
            (0, auxiliaries_1.logIf)(semantic !== undefined, auxiliaries_1.LogLevel.Info, `${semantic} clamped to [${tupleV4}], given [${tuple}]`);
        }
        return tuple4(tupleV4);
    }
    tuples.clampf4 = clampf4;
    /**
     * Creates a duplicate of a 2-tuple into another tuple.
     * @param tuple - Source tuple to create duplicate of.
     */
    function duplicate2(tuple) {
        return [tuple[0], tuple[1]];
    }
    tuples.duplicate2 = duplicate2;
    /**
     * Creates a duplicate of a 3-tuple into another tuple.
     * @param tuple - Source tuple to create duplicate of.
     */
    function duplicate3(tuple) {
        return [tuple[0], tuple[1], tuple[2]];
    }
    tuples.duplicate3 = duplicate3;
    /**
     * Creates a duplicate of a 4-tuple into another tuple.
     * @param tuple - Source tuple to create duplicate of.
     */
    function duplicate4(tuple) {
        return [tuple[0], tuple[1], tuple[2], tuple[3]];
    }
    tuples.duplicate4 = duplicate4;
    /**
     * Checks whether or not two 2-tuples have identical values.
     * @param tuple0 - First 2-tuple/operand for comparison.
     * @param tuple1 - Second 2-tuple/operand for comparison.
     * @returns - True iff tuples are equal in all two values (in their sequence).
     */
    function equals2(t0, t1) {
        return t0[0] === t1[0] && t0[1] === t1[1];
    }
    tuples.equals2 = equals2;
    /**
     * Checks whether or not two 3-tuples have identical values.
     * @param tuple0 - First 3-tuple/operand for comparison.
     * @param tuple1 - Second 3-tuple/operand for comparison.
     * @returns - True iff tuples are equal in all three values (in their sequence).
     */
    function equals3(t0, t1) {
        return t0[0] === t1[0] && t0[1] === t1[1] && t0[2] === t1[2];
    }
    tuples.equals3 = equals3;
    /**
     * Checks whether or not two 4-tuples have identical values.
     * @param tuple0 - First 4-tuple/operand for comparison.
     * @param tuple1 - Second 4-tuple/operand for comparison.
     * @returns - True iff tuples are equal in all four values (in their sequence).
     */
    function equals4(t0, t1) {
        return t0[0] === t1[0] && t0[1] === t1[1] && t0[2] === t1[2] && t0[3] === t1[3];
    }
    tuples.equals4 = equals4;
})(tuples || (tuples = {}));
module.exports = tuples;
//# sourceMappingURL=tuples.js.map