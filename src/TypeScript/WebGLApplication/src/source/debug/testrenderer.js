"use strict";
/* spellchecker: disable */
const auxiliaries_1 = require("../auxiliaries");
const accumulatepass_1 = require("../accumulatepass");
const antialiasingkernel_1 = require("../antialiasingkernel");
const blitpass_1 = require("../blitpass");
const context_1 = require("../context");
const defaultframebuffer_1 = require("../defaultframebuffer");
const eventhandler_1 = require("../eventhandler");
const framebuffer_1 = require("../framebuffer");
const ndcfillingtriangle_1 = require("../ndcfillingtriangle");
const program_1 = require("../program");
const renderbuffer_1 = require("../renderbuffer");
const renderer_1 = require("../renderer");
const shader_1 = require("../shader");
const texture2d_1 = require("../texture2d");
const testnavigation_1 = require("./testnavigation");
/* spellchecker: enable */
var debug;
(function (debug) {
    class TestRenderer extends renderer_1.Renderer {
        _extensions = false;
        _program;
        _ndcOffsetKernel;
        _uNdcOffset;
        _uFrameNumber;
        _ndcTriangle;
        _accumulate;
        _blit;
        _defaultFBO;
        _colorRenderTexture;
        _depthRenderbuffer;
        _intermediateFBO;
        _testNavigation;
        onInitialize(context, callback, eventProvider) {
            const gl = this._context.gl;
            const gl2facade = this._context.gl2facade;
            /* Enable required extensions. */
            if (this._extensions === false && this._context.isWebGL1) {
                (0, auxiliaries_1.assert)(this._context.supportsStandardDerivatives, `expected OES_standard_derivatives support`);
                this._context.standardDerivatives;
                this._extensions = true;
            }
            /* Create and configure program and geometry. */
            const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'testrenderer.vert');
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            vert.initialize(require('./testrenderer.vert'));
            const frag = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'testrenderer.frag');
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            frag.initialize(require('./testrenderer.frag'));
            this._program = new program_1.Program(this._context);
            this._program.initialize([vert, frag]);
            this._uNdcOffset = this._program.uniform('u_ndcOffset');
            this._uFrameNumber = this._program.uniform('u_frameNumber');
            this._ndcTriangle = new ndcfillingtriangle_1.NdcFillingTriangle(this._context);
            const aVertex = this._program.attribute('a_vertex', 0);
            this._ndcTriangle.initialize(aVertex);
            this._ndcOffsetKernel = new antialiasingkernel_1.AntiAliasingKernel(this._multiFrameNumber);
            /* Create framebuffers, textures, and render buffers. */
            this._defaultFBO = new defaultframebuffer_1.DefaultFramebuffer(this._context, 'DefaultFBO');
            this._defaultFBO.initialize();
            this._colorRenderTexture = new texture2d_1.Texture2D(this._context, 'ColorRenderTexture');
            this._depthRenderbuffer = new renderbuffer_1.Renderbuffer(this._context, 'DepthRenderbuffer');
            this._intermediateFBO = new framebuffer_1.Framebuffer(this._context, 'IntermediateFBO');
            /* Create and configure accumulation pass. */
            this._accumulate = new accumulatepass_1.AccumulatePass(this._context);
            this._accumulate.initialize(this._ndcTriangle);
            this._accumulate.precision = this._framePrecision;
            this._accumulate.texture = this._colorRenderTexture;
            // this._accumulate.depthStencilAttachment = this._depthRenderbuffer;
            /* Create and configure blit pass. */
            this._blit = new blitpass_1.BlitPass(this._context);
            this._blit.initialize(this._ndcTriangle);
            this._blit.readBuffer = gl2facade.COLOR_ATTACHMENT0;
            this._blit.drawBuffer = gl.BACK;
            this._blit.target = this._defaultFBO;
            /* Create and configure test navigation. */
            this._testNavigation = new testnavigation_1.TestNavigation(() => this.invalidate(), eventProvider);
            return true;
        }
        onUninitialize() {
            super.uninitialize();
            this._uNdcOffset = -1;
            this._uFrameNumber = -1;
            this._program.uninitialize();
            this._ndcTriangle.uninitialize();
            this._intermediateFBO.uninitialize();
            this._defaultFBO.uninitialize();
            this._colorRenderTexture.uninitialize();
            this._depthRenderbuffer.uninitialize();
            this._blit.uninitialize();
            this._accumulate.uninitialize();
        }
        onDiscarded() {
            this._altered.alter('frameSize');
            this._altered.alter('multiFrameNumber');
            this._altered.alter('framePrecision');
            this._altered.alter('clearColor');
        }
        onUpdate() {
            this._testNavigation.update();
            const redraw = this._testNavigation.altered;
            this._testNavigation.reset();
            if (!redraw && !this._altered.any) {
                return false;
            }
            return redraw;
        }
        onPrepare() {
            const gl = this._context.gl;
            const gl2facade = this._context.gl2facade;
            if (!this._intermediateFBO.initialized) {
                this._colorRenderTexture.initialize(this._frameSize[0], this._frameSize[1], this._context.isWebGL2 ? gl.RGBA8 : gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
                this._depthRenderbuffer.initialize(this._frameSize[0], this._frameSize[1], gl.DEPTH_COMPONENT16);
                this._intermediateFBO.initialize([[gl2facade.COLOR_ATTACHMENT0, this._colorRenderTexture],
                    [gl.DEPTH_ATTACHMENT, this._depthRenderbuffer]]);
            }
            else if (this._altered.frameSize) {
                this._intermediateFBO.resize(this._frameSize[0], this._frameSize[1]);
            }
            if (this._altered.multiFrameNumber) {
                this._ndcOffsetKernel.width = this._multiFrameNumber;
            }
            if (this._altered.framePrecision) {
                this._accumulate.precision = this._framePrecision;
            }
            if (this._altered.clearColor) {
                this._intermediateFBO.clearColor(this._clearColor);
            }
            this._accumulate.update();
            this._altered.reset();
        }
        onFrame(frameNumber) {
            const gl = this._context.gl;
            gl.viewport(0, 0, this._frameSize[0], this._frameSize[1]);
            this._program.bind();
            const ndcOffset = this._ndcOffsetKernel.get(frameNumber);
            ndcOffset[0] = 2.0 * ndcOffset[0] / this._frameSize[0];
            ndcOffset[1] = 2.0 * ndcOffset[1] / this._frameSize[1];
            gl.uniform2fv(this._uNdcOffset, ndcOffset);
            gl.uniform1i(this._uFrameNumber, frameNumber);
            this._intermediateFBO.clear(gl.COLOR_BUFFER_BIT, true, false);
            this._ndcTriangle.bind();
            this._ndcTriangle.draw();
            this._intermediateFBO.unbind();
            this._accumulate.frame(frameNumber);
        }
        onSwap() {
            this._blit.framebuffer = this._accumulate.framebuffer ?
                this._accumulate.framebuffer : this._blit.framebuffer = this._intermediateFBO;
            this._blit.frame();
        }
    }
    debug.TestRenderer = TestRenderer;
})(debug || (debug = {}));
module.exports = debug;
//# sourceMappingURL=testrenderer.js.map