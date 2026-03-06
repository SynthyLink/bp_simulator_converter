"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai'), sinon = require('sinon');
const expect = chai.expect;
const stub = sinon.stub;
const tuples_1 = require("../source/tuples");
/* spellchecker: enable */
/* tslint:disable:no-unused-expression */
describe('tuples clamp', () => {
    it('should clamp a float value to [0.0, 1.0] range', () => {
        const tests = [[+3, +1], [+1, +1], [-1, 0], [0, 0], [0.5, 0.5]];
        const consoleLogStub = stub(console, 'log');
        tests.forEach((test) => expect((0, tuples_1.clampf)(test[0])).to.equal(test[1]));
        consoleLogStub.restore();
    });
    it('should clamp each component of a float 2-tuple to [0.0, 1.0] range', () => {
        const tests = [[[2, 2], [1, 1]], [[-1, -1], [0, 0]],
            [[0, 0], [0, 0]], [[0.5, 0.5], [0.5, 0.5]],
            [[2, 0], [1, 0]], [[0, 2], [0, 1]], [[-2, 0], [0, 0]], [[0, -2], [0, 0]]];
        const consoleLogStub = stub(console, 'log');
        tests.forEach((test) => expect((0, tuples_1.clampf2)(test[0])).to.deep.equal(test[1]));
        consoleLogStub.restore();
    });
    it('should clamp each component of a float 3-tuple to [0.0, 1.0] range', () => {
        const tests = [[[2, 2, 2], [1, 1, 1]], [[-1, -1, -1], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0]], [[0.5, 0.5, 0.5], [0.5, 0.5, 0.5]],
            [[+2, 0, 0], [1, 0, 0]], [[0, +2, 0], [0, 1, 0]], [[0, 0, +2], [0, 0, 1]],
            [[-2, 0, 0], [0, 0, 0]], [[0, -2, 0], [0, 0, 0]], [[0, 0, -2], [0, 0, 0]]];
        const consoleLogStub = stub(console, 'log');
        tests.forEach((test) => expect((0, tuples_1.clampf3)(test[0])).to.deep.equal(test[1]));
        consoleLogStub.restore();
    });
    it('should clamp each component of a float 4-tuple to [0.0, 1.0] range', () => {
        const tests = [[[2, 2, 2, 2], [1, 1, 1, 1]], [[-1, -1, -1, -1], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0]], [[0.5, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]],
            [[+2, 0, 0, 0], [1, 0, 0, 0]], [[0, +2, 0, 0], [0, 1, 0, 0]],
            [[0, 0, +2, 0], [0, 0, 1, 0]], [[0, 0, 0, +2], [0, 0, 0, 1]],
            [[-2, 0, 0, 0], [0, 0, 0, 0]], [[0, -2, 0, 0], [0, 0, 0, 0]],
            [[0, 0, -2, 0], [0, 0, 0, 0]], [[0, 0, 0, -2], [0, 0, 0, 0]]];
        const consoleLogStub = stub(console, 'log');
        tests.forEach((test) => expect((0, tuples_1.clampf4)(test[0])).to.deep.equal(test[1]));
        consoleLogStub.restore();
    });
});
describe('tuples', () => {
    it('should duplicate 2-tuples', () => {
        const tuple0 = [3.0, 2.0];
        const tuple1 = (0, tuples_1.duplicate2)(tuple0);
        expect(tuple1[0]).to.be.equal(3.0);
        expect(tuple1[1]).to.be.equal(2.0);
        tuple1[0] = 0.0;
        tuple1[1] = 1.0;
        expect(tuple0[0]).to.be.equal(3.0);
        expect(tuple0[1]).to.be.equal(2.0);
    });
    it('should duplicate 3-tuples', () => {
        const tuple0 = [5.0, 4.0, 3.0];
        const tuple1 = (0, tuples_1.duplicate3)(tuple0);
        expect(tuple1[0]).to.be.equal(5.0);
        expect(tuple1[1]).to.be.equal(4.0);
        expect(tuple1[2]).to.be.equal(3.0);
        tuple1[0] = 0.0;
        tuple1[1] = 1.0;
        tuple1[2] = 2.0;
        expect(tuple0[0]).to.be.equal(5.0);
        expect(tuple0[1]).to.be.equal(4.0);
        expect(tuple0[2]).to.be.equal(3.0);
    });
    it('should duplicate 4-tuples', () => {
        const tuple0 = [7.0, 6.0, 5.0, 4.0];
        const tuple1 = (0, tuples_1.duplicate4)(tuple0);
        expect(tuple1[0]).to.be.equal(7.0);
        expect(tuple1[1]).to.be.equal(6.0);
        expect(tuple1[2]).to.be.equal(5.0);
        expect(tuple1[3]).to.be.equal(4.0);
        tuple1[0] = 0.0;
        tuple1[1] = 1.0;
        tuple1[2] = 2.0;
        tuple1[3] = 3.0;
        expect(tuple0[0]).to.be.equal(7.0);
        expect(tuple0[1]).to.be.equal(6.0);
        expect(tuple0[2]).to.be.equal(5.0);
        expect(tuple0[3]).to.be.equal(4.0);
    });
    it('should support check for equality of 2-tuples', () => {
        expect((0, tuples_1.equals2)([1.0, 0.0], [1.0, 0.0])).to.be.true;
        expect((0, tuples_1.equals2)([1.0, 0.0], [0.0, 1.0])).to.be.false;
    });
    it('should support check for equality of 3-tuples', () => {
        expect((0, tuples_1.equals3)([2.0, 1.0, 0.0], [2.0, 1.0, 0.0])).to.be.true;
        expect((0, tuples_1.equals3)([2.0, 1.0, 0.0], [2.0, 1.0, 3.0])).to.be.false;
        expect((0, tuples_1.equals3)([2.0, 1.0, 0.0], [2.0, 3.0, 0.0])).to.be.false;
        expect((0, tuples_1.equals3)([2.0, 1.0, 0.0], [3.0, 1.0, 0.0])).to.be.false;
    });
    it('should support check for equality of 4-tuples', () => {
        expect((0, tuples_1.equals4)([3.0, 2.0, 1.0, 0.0], [3.0, 2.0, 1.0, 0.0])).to.be.true;
        expect((0, tuples_1.equals4)([3.0, 2.0, 1.0, 0.0], [3.0, 2.0, 1.0, 4.0])).to.be.false;
        expect((0, tuples_1.equals4)([3.0, 2.0, 1.0, 0.0], [3.0, 2.0, 4.0, 0.0])).to.be.false;
        expect((0, tuples_1.equals4)([3.0, 2.0, 1.0, 0.0], [3.0, 4.0, 1.0, 0.0])).to.be.false;
        expect((0, tuples_1.equals4)([3.0, 2.0, 1.0, 0.0], [4.0, 2.0, 1.0, 0.0])).to.be.false;
    });
});
//# sourceMappingURL=tuples.test.js.map