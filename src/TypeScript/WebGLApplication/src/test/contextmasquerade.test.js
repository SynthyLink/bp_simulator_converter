"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai'), sinon = require('sinon');
const expect = chai.expect;
// import * as aux from '../source/auxiliaries';
const contextmasquerade_1 = require("../source/contextmasquerade");
/* spellchecker: enable */
describe('ContextMasquerade', () => {
    const sandbox = sinon.createSandbox();
    afterEach(() => sandbox.restore());
    after(() => sandbox.restore());
    it('should be initializable from hash', () => {
        const masquerade1 = contextmasquerade_1.ContextMasquerade.fromHash('1w0000');
        expect(masquerade1.backend).to.equal('webgl1');
        expect(masquerade1.extensionsStrive).to.include('ANGLE_instanced_arrays');
        expect(masquerade1.extensionsStrive).not.to.include('EXT_foo_bar');
        const masquerade2 = contextmasquerade_1.ContextMasquerade.fromHash('288M01');
        expect(masquerade2.backend).to.equal('webgl2');
    });
    it('should be initializable from browser preset', () => {
        const mask = contextmasquerade_1.ContextMasquerade.fromPreset('chrome-63');
        const UNSUPPORTED_EXTS = ['OES_texture_half_float_linear', 'WEBGL_compressed_texture_astc',
            'WEBGL_compressed_texture_atc', 'WEBGL_compressed_texture_etc', 'WEBGL_compressed_texture_etc1',
            'WEBGL_compressed_texture_pvrtc'];
        expect(mask.backend).to.equal('webgl2');
        expect(mask.extensionsStrive).to.include('EXT_color_buffer_float');
        expect(mask.extensionsStrive).to.include('WEBGL_compressed_texture_s3tc');
        expect(mask.extensionsStrive).not.to.contain.members(UNSUPPORTED_EXTS);
        expect(mask.extensionsConceal.length).to.equal(UNSUPPORTED_EXTS.length);
        expect(mask.extensionsConceal).to.contain.members(UNSUPPORTED_EXTS);
    });
    it('should respect functions being undefined', () => {
        const safariMasquerade = contextmasquerade_1.ContextMasquerade.fromPreset('no-readBuffer');
        expect(safariMasquerade.functionsUndefine).to.include('readBuffer');
    });
    it('should raise an exception if present does not exists', () => {
        const presentThatDoesNotExist = 'undefined_present';
        expect(() => { contextmasquerade_1.ContextMasquerade.fromPreset(presentThatDoesNotExist); }).to.throw();
    });
    it('should be initializable from empty preset', () => {
        const jsonStub = sandbox.stub(contextmasquerade_1.ContextMasquerade, 'presets');
        jsonStub.returns([{ identifier: 'empty', backend: 'webgl1' }]);
        const masquerade = contextmasquerade_1.ContextMasquerade.fromPreset('empty');
        expect(masquerade.backend).to.equal('webgl1');
        expect(masquerade.extensionsStrive).to.be.empty;
        expect(masquerade.functionsUndefine).to.be.empty;
        expect(masquerade.extensionsConceal).to.be.empty;
        jsonStub.restore();
    });
    it('should be initializable from hand written preset', () => {
        const masquerade = contextmasquerade_1.ContextMasquerade.fromPreset('no-WEBGL_draw_buffers');
        expect(masquerade.backend).to.equal('webgl1');
        expect(masquerade.extensionsStrive).to.be.empty;
        expect(masquerade.functionsUndefine).to.be.empty;
        expect(masquerade.extensionsConceal).to.include('WEBGL_draw_buffers');
    });
    it('should be initializable from hash w.r.t. draw buffers extension', () => {
        const masquerade = contextmasquerade_1.ContextMasquerade.fromHash('1Q+++Z');
        expect(masquerade.backend).to.equal('webgl1');
        expect(masquerade.extensionsStrive).to.not.include('WEBGL_draw_buffers');
        expect(masquerade.functionsUndefine).to.be.empty;
        expect(masquerade.extensionsConceal).to.include('WEBGL_draw_buffers');
    });
    /* @todo somehow mock/stub the GETparameter return within fromGET (no window object) */
    // it('should be initializable by GET using hash', () => {
    //     const getParameterStub = sandbox.stub(aux, 'GETparameter');
    //     getParameterStub.returns('1w0000');
    //     const masquerade = ContextMasquerade.fromGET()!;
    //     expect(masquerade.backend).to.equal('webgl1');
    //     expect(masquerade.extensionsStrive).to.include('ANGLE_instanced_arrays');
    //     expect(masquerade.extensionsStrive).not.to.include('EXT_foo_bar');
    // });
    /* @todo somehow mock/stub the GETparameter return within fromGET (no window object) */
    // it('should be initializable by GET using preset', () => {
    //     const getParameterStub = sandbox.stub(aux, 'GETparameter');
    //     getParameterStub
    //         .onFirstCall().returns(undefined)
    //         .onSecondCall().returns('edge-41');
    //     const masquerade = ContextMasquerade.fromGET()!;
    //     expect(masquerade.backend).to.equal('webgl1');
    //     expect(masquerade.extensionsStrive).to.include('ANGLE_instanced_arrays');
    //     expect(masquerade.extensionsStrive).not.to.include('EXT_foo_bar');
    // });
    /* @todo somehow mock/stub the GETparameter return within fromGET (no window object) */
    // it('should fail if GET values are not present', () => {
    //     const getParameterStub = sandbox.stub(aux, 'GETparameter');
    //     getParameterStub.returns(undefined);
    //     const masquerade = ContextMasquerade.fromGET();
    //     expect(masquerade).to.be.undefined;
    // });
});
//# sourceMappingURL=contextmasquerade.test.js.map