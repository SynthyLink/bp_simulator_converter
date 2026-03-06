"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai'), spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const randomsquarekernel_1 = require("../source/randomsquarekernel");
/* tslint:disable:no-unused-expression */
describe('RamdomSquareKernel', () => {
    it('be initializable with values > 0', () => {
        expect(() => {
            let randomsquarekernel = new randomsquarekernel_1.RandomSquareKernel(1);
            randomsquarekernel = new randomsquarekernel_1.RandomSquareKernel(10);
            expect(randomsquarekernel).to.not.be.undefined;
        }).to.not.throws();
    });
    it('be not be initializable with values <= 0', () => {
        expect(() => {
            const randomsquarekernel = new randomsquarekernel_1.RandomSquareKernel(0);
            expect(randomsquarekernel).to.be.undefined;
        }).to.throws();
    });
});
//# sourceMappingURL=randomsquarekernel.test.js.map