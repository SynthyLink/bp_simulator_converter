"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai');
const expect = chai.expect;
const initializable_1 = require("../source/initializable");
/* spellchecker: enable */
class Initializable extends initializable_1.Initializable {
    @Initializable.initialize()
    initialize(result = true) {
        return result;
    }
    @Initializable.uninitialize()
    uninitialize() { }
    publicAssertInitialized = () => this.assertInitialized();
    publicAssertUninitialized = () => this.assertUninitialized();
    @Initializable.assert_initialized()
    expectInitialized() { }
    @Initializable.assert_uninitialized()
    expectUninitialized() { }
    @Initializable.assert_initialized()
    returnsValue(value) {
        return value;
    }
}
describe('Initializable', () => {
    it('should be uninitialized after construction', () => {
        const initializable = new Initializable();
        expect(initializable.initialized).to.be.false;
    });
    it('should initialize when not initialized', () => {
        const initializable = new Initializable();
        expect(() => initializable.initialize()).not.to.throw();
        expect(initializable.initialized).to.be.true;
    });
    it('should un-initialize when initialized', () => {
        const initializable = new Initializable();
        initializable.initialize();
        expect(() => initializable.uninitialize()).not.to.throw();
        expect(initializable.initialized).to.be.false;
    });
    it('should not uninitialize when not initialized', () => {
        const initializable = new Initializable();
        expect(() => initializable.uninitialize()).to.throw();
    });
    it('should not initialize multiple times (subsequently)', () => {
        const initializable = new Initializable();
        initializable.initialize();
        expect(() => initializable.initialize()).to.throw();
    });
    it('should re-initialize when previously initialized and uninitialized', () => {
        const initializable = new Initializable();
        initializable.initialize();
        initializable.uninitialize();
        expect(() => initializable.initialize()).not.to.throw();
        expect(initializable.initialized).to.be.true;
    });
    it('asserting for initialized should fail when not initialized', () => {
        const initializable = new Initializable();
        expect(() => initializable.publicAssertInitialized()).to.throw();
        initializable.initialize();
        expect(() => initializable.publicAssertInitialized()).not.to.throw();
    });
    it('asserting for initialized should fail after beeing uninitialized', () => {
        const initializable = new Initializable();
        initializable.initialize();
        initializable.uninitialize();
        expect(() => initializable.publicAssertInitialized()).to.throw();
        expect(() => initializable.publicAssertUninitialized()).not.to.throw();
    });
    it('asserting for uninitialized should fail when initialized', () => {
        const initializable = new Initializable();
        expect(() => initializable.publicAssertUninitialized()).not.to.throw();
        initializable.initialize();
        expect(() => initializable.publicAssertUninitialized()).to.throw();
    });
    it('should remain uninitialized when initialization fails', () => {
        const initializable = new Initializable();
        expect(() => initializable.publicAssertUninitialized()).not.to.throw();
        initializable.initialize(false);
        expect(initializable.initialized).to.be.false;
        expect(() => initializable.publicAssertInitialized()).to.throw();
        expect(() => initializable.publicAssertUninitialized()).not.to.throw();
    });
    it('should support assert (un)initialized by means of decorators', () => {
        const initializable = new Initializable();
        expect(() => initializable.expectUninitialized()).not.to.throw();
        expect(() => initializable.expectInitialized()).to.throw();
        initializable.initialize();
        expect(() => initializable.expectUninitialized()).to.throw();
        expect(() => initializable.expectInitialized()).not.to.throw();
    });
    it('should decorate per-instance', () => {
        const initializable1 = new Initializable();
        const initializable2 = new Initializable();
        expect(() => initializable1.expectUninitialized()).not.to.throw();
        expect(() => initializable2.expectUninitialized()).not.to.throw();
        expect(() => initializable1.expectInitialized()).to.throw();
        expect(() => initializable2.expectInitialized()).to.throw();
        initializable1.initialize();
        expect(() => initializable1.expectUninitialized()).to.throw();
        expect(() => initializable2.expectUninitialized()).not.to.throw();
        expect(() => initializable1.expectInitialized()).not.to.throw();
        expect(() => initializable2.expectInitialized()).to.throw();
    });
    it('should decorate per-instance', () => {
        const initializable = new Initializable();
        initializable.initialize();
        expect(initializable.returnsValue('foo')).to.equal('foo');
        expect(initializable.returnsValue(2.0)).to.equal(2.0);
    });
});
//# sourceMappingURL=initializable.test.js.map