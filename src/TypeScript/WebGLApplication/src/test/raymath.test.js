"use strict";
/* spellchecker: disable */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai');
const expect = chai.expect;
const gl_matrix_1 = require("gl-matrix");
const rayMath = __importStar(require("../source/raymath"));
/* spellchecker: enable */
/* tslint:disable:no-unused-expression */
describe('Ray Math', () => {
    it('ray plane intersection should return undefined intersection, when there is none', () => {
        const ray0 = [gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0), gl_matrix_1.vec3.fromValues(-1.0, 0.0, 1.0)];
        const ray1 = [gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0), gl_matrix_1.vec3.fromValues(-1.0, 0.0, 1.0)];
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayPlaneIntersection(ray0[i], ray1[i]);
            expect(result).to.be.undefined;
        }
    });
    it('ray plane intersection should result in straight lines, since direction stays within plane', () => {
        const ray0 = [gl_matrix_1.vec3.fromValues(+1.0, 0.0, 0.0), gl_matrix_1.vec3.fromValues(0.0, 0.0, +1.0)];
        const ray1 = [gl_matrix_1.vec3.fromValues(-1.0, 0.0, 0.0), gl_matrix_1.vec3.fromValues(0.0, 0.0, -1.0)];
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayPlaneIntersection(ray0[i], ray1[i]);
            expect(result).to.be.undefined;
        }
    });
    it('ray plane intersection should account for constrained intersections, e. g., ray from below', () => {
        const ray0 = [gl_matrix_1.vec3.fromValues(0.0, -1.0, 0.0)];
        const ray1 = [gl_matrix_1.vec3.fromValues(0.0, +1.0, 0.0)];
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayPlaneIntersection(ray0[i], ray1[i]);
            expect(result).to.be.undefined;
        }
    });
    it('ray plane intersection should return valid intersections', () => {
        const ray0 = new Array();
        const ray1 = new Array();
        const expected = new Array();
        ray0.push(gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0));
        ray1.push(gl_matrix_1.vec3.fromValues(0.0, -1.0, 0.0));
        expected.push(gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0));
        ray0.push(gl_matrix_1.vec3.fromValues(1.0, 1.0, 0.0));
        ray1.push(gl_matrix_1.vec3.fromValues(-1.0, -1.0, 0.0));
        expected.push(gl_matrix_1.vec3.fromValues(0.0, 0.0, 0.0));
        ray0.push(gl_matrix_1.vec3.fromValues(2.0, 1.0, 3.0));
        ray1.push(gl_matrix_1.vec3.fromValues(2.0, -1.0, 3.0));
        expected.push(gl_matrix_1.vec3.fromValues(2.0, 0.0, 3.0));
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayPlaneIntersection(ray0[i], ray1[i]);
            expect(result).to.deep.equal(expected[i]);
        }
    });
    it('ray plane intersection should return undefined intersection, invalid ray is provided', () => {
        const ray0 = [gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0)];
        const ray1 = [gl_matrix_1.vec3.fromValues(0.0, 1.0, 0.0)];
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayPlaneIntersection(ray0[i], ray1[i]);
            expect(result).to.be.undefined;
        }
    });
    it('point-within-square evaluation should be positive for the center as well as points on edges', () => {
        const points = [
            gl_matrix_1.vec2.fromValues(+1.0, +1.0),
            gl_matrix_1.vec2.fromValues(+1.0, +0.0),
            gl_matrix_1.vec2.fromValues(+1.0, -1.0),
            gl_matrix_1.vec2.fromValues(+0.0, +1.0),
            gl_matrix_1.vec2.fromValues(+0.0, +0.0),
            gl_matrix_1.vec2.fromValues(+0.0, -1.0),
            gl_matrix_1.vec2.fromValues(-1.0, +1.0),
            gl_matrix_1.vec2.fromValues(-1.0, +0.0),
            gl_matrix_1.vec2.fromValues(-1.0, -1.0)
        ];
        for (const point of points) {
            expect(rayMath.isPointWithinSquare(point)).to.be.true;
        }
    });
    it('point-within-square evaluation should be positive for the center as well as points on edges', () => {
        const points = [
            gl_matrix_1.vec2.fromValues(+1.0, +1.0),
            gl_matrix_1.vec2.fromValues(+1.0, +0.0),
            gl_matrix_1.vec2.fromValues(+1.0, -1.0),
            gl_matrix_1.vec2.fromValues(+0.0, +1.0),
            gl_matrix_1.vec2.fromValues(+0.0, +0.0),
            gl_matrix_1.vec2.fromValues(+0.0, -1.0),
            gl_matrix_1.vec2.fromValues(-1.0, +1.0),
            gl_matrix_1.vec2.fromValues(-1.0, +0.0),
            gl_matrix_1.vec2.fromValues(-1.0, -1.0)
        ];
        for (const point of points) {
            expect(rayMath.isPointWithinSquare(point)).to.be.true;
        }
    });
    it('point-within-square evaluation should be negative for points outside the square', () => {
        const e = 1.0 + 0.000001;
        const points = [
            gl_matrix_1.vec2.fromValues(+e, +e),
            gl_matrix_1.vec2.fromValues(+e, +0),
            gl_matrix_1.vec2.fromValues(+e, -e),
            gl_matrix_1.vec2.fromValues(+0, +e),
            gl_matrix_1.vec2.fromValues(+0, -e),
            gl_matrix_1.vec2.fromValues(-e, +e),
            gl_matrix_1.vec2.fromValues(-e, +0),
            gl_matrix_1.vec2.fromValues(-e, -e)
        ];
        for (const point of points) {
            expect(rayMath.isPointWithinSquare(point)).to.be.false;
        }
    });
    it('point-within-square evaluation should be positive for points within the square', () => {
        const points = [
            gl_matrix_1.vec2.fromValues(+0.5, +0.5),
            gl_matrix_1.vec2.fromValues(+0.5, +0.0),
            gl_matrix_1.vec2.fromValues(+0.5, -0.5),
            gl_matrix_1.vec2.fromValues(+0.0, +0.5),
            gl_matrix_1.vec2.fromValues(+0.0, +0.0),
            gl_matrix_1.vec2.fromValues(+0.0, -0.5),
            gl_matrix_1.vec2.fromValues(-0.5, +0.5),
            gl_matrix_1.vec2.fromValues(-0.5, +0.0),
            gl_matrix_1.vec2.fromValues(-0.5, -0.5)
        ];
        for (const point of points) {
            expect(rayMath.isPointWithinSquare(point)).to.be.true;
        }
    });
    it('ray circle intersection should return undefined intersection, when there is none', () => {
        const ray0 = new Array();
        const ray1 = new Array();
        ray0.push(gl_matrix_1.vec2.fromValues(0.0, 0.0));
        ray1.push(gl_matrix_1.vec2.fromValues(0.0, 0.0));
        ray0.push(gl_matrix_1.vec2.fromValues(+2.0, 0.0));
        ray1.push(gl_matrix_1.vec2.fromValues(+3.0, +1.0));
        ray0.push(gl_matrix_1.vec2.fromValues(+2.0, 0.0));
        ray1.push(gl_matrix_1.vec2.fromValues(+1.0, -1.0));
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayCircleIntersection(ray0[i], ray1[i]);
            expect(result).to.be.undefined;
        }
    });
    it('ray circle intersection should return valid intersection points', () => {
        const ray0 = new Array();
        const ray1 = new Array();
        const expected = new Array();
        ray0.push(gl_matrix_1.vec2.fromValues(+2.0, 0.0));
        ray1.push(gl_matrix_1.vec2.fromValues(+1.0, 0.0));
        expected.push(gl_matrix_1.vec2.fromValues(+1.0, 0.0));
        ray0.push(gl_matrix_1.vec2.fromValues(0.0, +2.0));
        ray1.push(gl_matrix_1.vec2.fromValues(0.0, +1.0));
        expected.push(gl_matrix_1.vec2.fromValues(0.0, +1.0));
        ray0.push(gl_matrix_1.vec2.fromValues(-2.0, 0.0));
        ray1.push(gl_matrix_1.vec2.fromValues(-1.0, 0.0));
        expected.push(gl_matrix_1.vec2.fromValues(-1.0, 0.0));
        ray0.push(gl_matrix_1.vec2.fromValues(0.0, -2.0));
        ray1.push(gl_matrix_1.vec2.fromValues(0.0, -1.0));
        expected.push(gl_matrix_1.vec2.fromValues(0.0, -1.0));
        for (let i = 0; i < ray0.length; ++i) {
            const result = rayMath.rayCircleIntersection(ray0[i], ray1[i]);
            expect(result).to.deep.equal(expected[i]);
        }
    });
});
//# sourceMappingURL=raymath.test.js.map