"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai');
const expect = chai.expect;
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_extensions_1 = require("../source/gl-matrix-extensions");
/* spellchecker: enable */
describe('gl-matrix extensions sign', () => {
    it('should return the sign of a number as specified in GLSL', () => {
        expect((0, gl_matrix_extensions_1.sign)(-1.0)).to.equal(-1.0);
        expect((0, gl_matrix_extensions_1.sign)(-23.0)).to.equal(-1.0);
        expect((0, gl_matrix_extensions_1.sign)(0.0)).to.equal(0.0);
        expect((0, gl_matrix_extensions_1.sign)(+1.0)).to.equal(+1.0);
        expect((0, gl_matrix_extensions_1.sign)(+42.0)).to.equal(+1.0);
    });
});
describe('gl-matrix extensions clamp', () => {
    it('should clamp a number as specified in GLSL', () => {
        expect((0, gl_matrix_extensions_1.clamp)(+3, +0, +2)).to.equal(+2);
        expect((0, gl_matrix_extensions_1.clamp)(+1, +0, +2)).to.equal(+1);
        expect((0, gl_matrix_extensions_1.clamp)(-1, +0, +2)).to.equal(+0);
        expect((0, gl_matrix_extensions_1.clamp)(-3, -2, -0)).to.equal(-2);
        expect((0, gl_matrix_extensions_1.clamp)(-1, -2, -0)).to.equal(-1);
        expect((0, gl_matrix_extensions_1.clamp)(+1, -2, -0)).to.equal(-0);
    });
    it('should clamp a vec2 as specified in GLSL', () => {
        let a = gl_matrix_1.vec2.fromValues(2, 2);
        const b = gl_matrix_1.vec2.create();
        a = (0, gl_matrix_extensions_1.clamp2)(b, a, gl_matrix_1.vec2.fromValues(0, 0), gl_matrix_1.vec2.fromValues(1, 1));
        expect(gl_matrix_1.vec2.equals(a, b)).to.be.true;
        expect(gl_matrix_1.vec2.equals(a, gl_matrix_1.vec2.fromValues(1, 1))).to.be.true;
        a[0] = 3;
        a[1] = 4;
        (0, gl_matrix_extensions_1.clamp2)(b, a, gl_matrix_1.vec2.fromValues(1, 2), gl_matrix_1.vec2.fromValues(2, 3));
        expect(gl_matrix_1.vec2.equals(b, gl_matrix_1.vec2.fromValues(2, 3))).to.be.true;
    });
    it('should clamp a vec3 as specified in GLSL', () => {
        let a = gl_matrix_1.vec3.fromValues(2, 2, 2);
        const b = gl_matrix_1.vec3.create();
        a = (0, gl_matrix_extensions_1.clamp3)(b, a, gl_matrix_1.vec3.fromValues(0, 0, 0), gl_matrix_1.vec3.fromValues(1, 1, 1));
        expect(gl_matrix_1.vec3.equals(a, b)).to.be.true;
        expect(gl_matrix_1.vec3.equals(b, gl_matrix_1.vec3.fromValues(1, 1, 1))).to.be.true;
        a[0] = 3;
        a[1] = 4;
        a[2] = 5;
        (0, gl_matrix_extensions_1.clamp3)(b, a, gl_matrix_1.vec3.fromValues(1, 2, 3), gl_matrix_1.vec3.fromValues(2, 3, 4));
        expect(gl_matrix_1.vec3.equals(b, gl_matrix_1.vec3.fromValues(2, 3, 4))).to.be.true;
    });
    it('should clamp a vec4 as specified in GLSL', () => {
        let a = gl_matrix_1.vec4.fromValues(2, 2, 2, 2);
        const b = gl_matrix_1.vec4.create();
        a = (0, gl_matrix_extensions_1.clamp4)(b, a, gl_matrix_1.vec4.fromValues(0, 0, 0, 0), gl_matrix_1.vec4.fromValues(1, 1, 1, 1));
        expect(gl_matrix_1.vec4.equals(a, b)).to.be.true;
        expect(gl_matrix_1.vec4.equals(b, gl_matrix_1.vec4.fromValues(1, 1, 1, 1))).to.be.true;
        a[0] = 3;
        a[1] = 4;
        a[2] = 5;
        a[3] = 6;
        (0, gl_matrix_extensions_1.clamp4)(b, a, gl_matrix_1.vec4.fromValues(1, 2, 3, 4), gl_matrix_1.vec4.fromValues(2, 3, 4, 5));
        expect(gl_matrix_1.vec4.equals(b, gl_matrix_1.vec4.fromValues(2, 3, 4, 5))).to.be.true;
    });
});
describe('gl-matrix extensions abs', () => {
    it('should return the absolute of a vec2 as specified in GLSL', () => {
        const a = gl_matrix_1.vec2.fromValues(-2, 2);
        (0, gl_matrix_extensions_1.abs2)(a, a);
        expect(a[0]).to.equal(2);
        expect(a[1]).to.equal(2);
    });
    it('should return the absolute of a vec3 as specified in GLSL', () => {
        const a = gl_matrix_1.vec3.fromValues(-2, 2, -1);
        (0, gl_matrix_extensions_1.abs3)(a, a);
        expect(a[0]).to.equal(2);
        expect(a[1]).to.equal(2);
        expect(a[2]).to.equal(1);
    });
    it('should return the absolute of a vec4 as specified in GLSL', () => {
        const a = gl_matrix_1.vec4.fromValues(-2, 2, -1, 1);
        (0, gl_matrix_extensions_1.abs4)(a, a);
        expect(a[0]).to.equal(2);
        expect(a[1]).to.equal(2);
        expect(a[2]).to.equal(1);
        expect(a[3]).to.equal(1);
    });
});
describe('gl-matrix extensions', () => {
    it('should calculate the fraction of a positive or negative number', () => {
        expect((0, gl_matrix_extensions_1.fract)(+1.0)).to.equal(0.0);
        expect((0, gl_matrix_extensions_1.fract)(-1.0)).to.equal(0.0);
        expect((0, gl_matrix_extensions_1.fract)(0.0)).to.equal(0.0);
        expect((0, gl_matrix_extensions_1.fract)(+0.1)).to.closeTo(+0.1, 1e-8);
        expect((0, gl_matrix_extensions_1.fract)(+1.2)).to.closeTo(+0.2, 1e-8);
        expect((0, gl_matrix_extensions_1.fract)(-1.3)).to.closeTo(-0.3, 1e-8);
    });
    it('should mix two numbers as specified in GLSL', () => {
        expect((0, gl_matrix_extensions_1.mix)(+1.0, +2.0, 0.0)).to.closeTo(+1.0, 1e-8);
        expect((0, gl_matrix_extensions_1.mix)(+1.0, +2.0, 1.0)).to.closeTo(+2.0, 1e-8);
        expect((0, gl_matrix_extensions_1.mix)(+1.0, +2.0, 0.5)).to.closeTo(+1.5, 1e-8);
        expect((0, gl_matrix_extensions_1.mix)(+2.0, +1.0, 0.0)).to.closeTo(+2.0, 1e-8);
        expect((0, gl_matrix_extensions_1.mix)(-2.0, +2.0, 0.5)).to.closeTo(+0.0, 1e-8);
        expect((0, gl_matrix_extensions_1.mix)(-2.0, -4.0, 0.5)).to.closeTo(-3.0, 1e-8);
    });
    it('should derive a vec3 from vec4 with division by w component', () => {
        const v4 = gl_matrix_1.vec4.fromValues(2, 4, 6, 2);
        const v3 = (0, gl_matrix_extensions_1.fromVec4)(v4);
        expect(gl_matrix_1.vec3.equals(v3, gl_matrix_1.vec3.fromValues(1, 2, 3))).to.be.true;
    });
    it('should derive a vec3 from vec4 without division by w component if w = 0', () => {
        const v4 = gl_matrix_1.vec4.fromValues(2, 4, 6, 0);
        const v3 = (0, gl_matrix_extensions_1.fromVec4)(v4);
        expect(gl_matrix_1.vec3.equals(v3, gl_matrix_1.vec3.fromValues(2, 4, 6))).to.be.true;
    });
    it('should derive a vec4 from vec3 as normalized vec4 with w = 1', () => {
        const v3 = gl_matrix_1.vec3.fromValues(2, 4, 6);
        const v4 = (0, gl_matrix_extensions_1.fromVec3)(v3);
        expect(gl_matrix_1.vec4.equals(v4, gl_matrix_1.vec4.fromValues(2, 4, 6, 1))).to.be.true;
    });
    it('should provide tinified empty vec2, vec3, and vec4 constructors', () => {
        expect(gl_matrix_1.vec2.equals((0, gl_matrix_extensions_1.v2)(), gl_matrix_1.vec2.fromValues(0, 0))).to.be.true;
        expect(gl_matrix_1.vec3.equals((0, gl_matrix_extensions_1.v3)(), gl_matrix_1.vec3.fromValues(0, 0, 0))).to.be.true;
        expect(gl_matrix_1.vec4.equals((0, gl_matrix_extensions_1.v4)(), gl_matrix_1.vec4.fromValues(0, 0, 0, 0))).to.be.true;
    });
    it('should parse vec2 from string', () => {
        expect((0, gl_matrix_extensions_1.parseVec2)(undefined)).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec2)('')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec2)('[')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec2)('[0.0, 0.0]')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec2)('0.0')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec2)('0.0, 0.0, 0.0')).to.be.undefined;
        expect(gl_matrix_1.vec2.equals((0, gl_matrix_extensions_1.parseVec2)('0.0, 0.0'), (0, gl_matrix_extensions_1.v2)())).to.be.true;
        expect(gl_matrix_1.vec2.equals((0, gl_matrix_extensions_1.parseVec2)('2.0, 4.0'), gl_matrix_1.vec2.fromValues(2.0, 4.0))).to.be.true;
    });
    it('should parse vec3 from string', () => {
        expect((0, gl_matrix_extensions_1.parseVec3)(undefined)).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec3)('')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec3)('[')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec3)('[0.0, 0.0, 0.0]')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec3)('0.0')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec3)('0.0, 0.0')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec3)('0.0, 0.0, 0.0, 0.0')).to.be.undefined;
        expect(gl_matrix_1.vec3.equals((0, gl_matrix_extensions_1.parseVec3)('0.0, 0.0, 0.0'), (0, gl_matrix_extensions_1.v3)())).to.be.true;
        expect(gl_matrix_1.vec3.equals((0, gl_matrix_extensions_1.parseVec3)('2.0, 4.0, 8.0'), gl_matrix_1.vec3.fromValues(2.0, 4.0, 8.0))).to.be.true;
    });
    it('should parse vec4 from string', () => {
        expect((0, gl_matrix_extensions_1.parseVec4)(undefined)).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('[')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('[0.0, 0.0, 0.0, 0.0]')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('0.0')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('0.0, 0.0')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('0.0, 0.0, 0.0')).to.be.undefined;
        expect((0, gl_matrix_extensions_1.parseVec4)('0.0, 0.0, 0.0, 0.0, 0.0')).to.be.undefined;
        expect(gl_matrix_1.vec4.equals((0, gl_matrix_extensions_1.parseVec4)('0.0, 0.0, 0.0, 0.0'), (0, gl_matrix_extensions_1.v4)())).to.be.true;
        expect(gl_matrix_1.vec4.equals((0, gl_matrix_extensions_1.parseVec4)('1.0, 2.0, 4.0, 8.0'), gl_matrix_1.vec4.fromValues(1.0, 2.0, 4.0, 8.0))).to.be.true;
    });
    it('should provide default initialized vec and mat abbreviations', () => {
        expect(gl_matrix_1.vec2.equals(gl_matrix_1.vec2.create(), (0, gl_matrix_extensions_1.v2)())).to.be.true;
        expect(gl_matrix_1.vec3.equals(gl_matrix_1.vec3.create(), (0, gl_matrix_extensions_1.v3)())).to.be.true;
        expect(gl_matrix_1.vec4.equals(gl_matrix_1.vec4.create(), (0, gl_matrix_extensions_1.v4)())).to.be.true;
        expect(gl_matrix_1.mat2.equals(gl_matrix_1.mat2.create(), (0, gl_matrix_extensions_1.m2)())).to.be.true;
        expect(gl_matrix_1.mat3.equals(gl_matrix_1.mat3.create(), (0, gl_matrix_extensions_1.m3)())).to.be.true;
        expect(gl_matrix_1.mat4.equals(gl_matrix_1.mat4.create(), (0, gl_matrix_extensions_1.m4)())).to.be.true;
    });
});
describe('gl-matrix extensions (un)packing', () => {
    it('should pack a uint24 into a uint8x3', () => {
        const uint24 = 250285; // 3D1AD > AD, D1, 03
        const uint8x3 = gl_matrix_1.vec3.create();
        (0, gl_matrix_extensions_1.encode_uint24_to_rgb8)(uint8x3, uint24);
        expect(gl_matrix_1.vec3.equals(uint8x3, gl_matrix_1.vec3.fromValues(0xAD, 0xD1, 0x03))).to.be.true;
    });
    it('should unpack a uint24 from a uint8x3', () => {
        const uint8x3 = gl_matrix_1.vec3.fromValues(0xAD, 0xD1, 0x03);
        const uint24 = (0, gl_matrix_extensions_1.decode_uint24_from_rgb8)(uint8x3);
        expect(uint24).to.equal(250285);
    });
    it('should pack a uint32 into a uint8x4', () => {
        const uint32 = 250285; // 3D1AD > AD, D1, 03, 00
        const uint8x4 = gl_matrix_1.vec4.create();
        (0, gl_matrix_extensions_1.encode_uint32_to_rgba8)(uint8x4, uint32);
        expect(gl_matrix_1.vec4.equals(uint8x4, gl_matrix_1.vec4.fromValues(0xAD, 0xD1, 0x03, 0x00))).to.be.true;
    });
    it('should unpack a uint32 from a uint8x4', () => {
        const uint8x4 = gl_matrix_1.vec4.fromValues(0xAD, 0xD1, 0x03, 0x00);
        const uint32 = (0, gl_matrix_extensions_1.decode_uint32_from_rgba8)(uint8x4);
        expect(uint32).to.equal(250285);
    });
    it('should pack the maximum uint32 into a uint8x4', () => {
        const uint32 = 4294967295; // FFFFFFFF > FF, FF, FF, FF
        const uint8x4 = gl_matrix_1.vec4.create();
        (0, gl_matrix_extensions_1.encode_uint32_to_rgba8)(uint8x4, uint32);
        expect(gl_matrix_1.vec4.equals(uint8x4, gl_matrix_1.vec4.fromValues(0xFF, 0xFF, 0xFF, 0xFF))).to.be.true;
    });
    it('should unpack a uint32 from the maximum uint8x4', () => {
        const uint8x4 = gl_matrix_1.vec4.fromValues(0xFF, 0xFF, 0xFF, 0xFF);
        const uint32 = (0, gl_matrix_extensions_1.decode_uint32_from_rgba8)(uint8x4);
        expect(uint32).to.equal(4294967295);
    });
    it('should pack a float24 into a uint8x3', () => {
        const float24 = 0.12345678;
        const uint8x3 = gl_matrix_1.vec3.create();
        (0, gl_matrix_extensions_1.encode_float24x1_to_uint8x3)(uint8x3, float24);
        expect(gl_matrix_1.vec3.equals(uint8x3, gl_matrix_1.vec3.fromValues(0x1F, 0x9A, 0xDD))).to.be.true;
    });
    it('should unpack a float24 from uint8x3', () => {
        const uint8x3 = gl_matrix_1.vec3.fromValues(0x1F, 0x9A, 0xDD);
        const float24 = (0, gl_matrix_extensions_1.decode_float24x1_from_uint8x3)(uint8x3);
        expect(float24).to.be.closeTo(0.12345678, 1e-8);
    });
});
//# sourceMappingURL=gl-matrix-extensions.test.js.map