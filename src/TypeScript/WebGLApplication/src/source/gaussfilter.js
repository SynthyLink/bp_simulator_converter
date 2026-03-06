"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaussFilter = void 0;
const gl_matrix_1 = require("gl-matrix");
const auxiliaries_1 = require("./auxiliaries");
const context_1 = require("./context");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
const initializable_1 = require("./initializable");
const ndcfillingtriangle_1 = require("./ndcfillingtriangle");
const program_1 = require("./program");
const shader_1 = require("./shader");
const texture2d_1 = require("./texture2d");
/**
 * Gaussian Filter implemented using a fragment shader.
 * Renders the filtered result into COLOR_ATTACHMENT0 of the currently bound framebuffer.
 * Does not support integer textures.
 * @todo: revisit this class design w.r.t. post planned catalogue of processing/filtering passes ...
 */
class GaussFilter extends initializable_1.Initializable {
    static _MAXKERNELSIZEHALF = 32;
    _kernelSize = 7;
    _standardDeviation = 1.0;
    _redistribute = true;
    _weights;
    _uDelta;
    _uWeights;
    _context;
    _fragmentShader;
    _program;
    _ndcTriangle;
    _ndcTriangleShared = false;
    constructor(context) {
        super();
        this._context = context;
    }
    /**
     * Recalculates the weights if necessary.
     * @returns - True if the weights were recalculated, false otherwise.
     */
    recalculateWeights() {
        if (this._weights) {
            return false;
        }
        const first = 1.0 / Math.sqrt(2.0 * Math.PI) * this._standardDeviation;
        const second = 2.0 * this._standardDeviation * this._standardDeviation;
        this._weights = [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ];
        let summedWeight = 0.0;
        for (let i = 0; i <= Math.floor(this._kernelSize / 2); i++) {
            this._weights[i] = first * Math.pow(Math.E, -(Math.pow(i, 2.0) / second));
            summedWeight += i > 0 ? 2.0 * this._weights[i] : this._weights[i];
        }
        if (this._redistribute) {
            const remainder = 1.0 - summedWeight;
            for (let i = 0; i <= Math.floor(this._kernelSize / 2); i++) {
                this._weights[i] += this._weights[i] / summedWeight * remainder;
            }
        }
        return true;
    }
    /**
     * Size of the kernel.
     */
    get kernelSize() {
        return this._kernelSize;
    }
    /**
     * Sets the size of the kernel.
     * The kernel size has to be an odd integer.
     */
    set kernelSize(kernelSize) {
        (0, auxiliaries_1.assert)(kernelSize > 0, 'Kernel size has to be positive.');
        (0, auxiliaries_1.assert)(kernelSize <= (GaussFilter._MAXKERNELSIZEHALF - 1) * 2 + 1, 'Kernel size has to be smaller than ' + ((GaussFilter._MAXKERNELSIZEHALF - 1) * 2 + 2) + '.');
        (0, auxiliaries_1.assert)(Number.isInteger(kernelSize), 'Kernel size has to be an integer.');
        (0, auxiliaries_1.assert)(kernelSize % 2 === 1, 'Kernel size has to be odd.');
        this._kernelSize = kernelSize;
        this._weights = undefined;
    }
    /**
     * Standard deviation used to calculate the weights.
     */
    get standardDeviation() {
        return this._standardDeviation;
    }
    /**
     * Sets the standard deviation.
     */
    set standardDeviation(standardDeviation) {
        (0, auxiliaries_1.assert)(standardDeviation > 0.0, 'Standard deviation has to be positive.');
        this._standardDeviation = standardDeviation;
        this._weights = undefined;
    }
    /**
     * Parameter determining whether the weights outside of the kernel get redistributed on the kernel.
     */
    get redistribute() {
        return this._redistribute;
    }
    /**
     * Sets the redistribute parameter.
     * If this is true then the sum of all weights inside the kernel is always 1.
     */
    set redistribute(redistribute) {
        this._redistribute = redistribute;
        this._weights = undefined;
    }
    /**
     * Creates and initializes the gaussian filters resources.
     * @param ndcTriangle - If specified, assumed to be used as shared geometry. If none is specified, a ndc-filling
     * triangle will be created internally.
     */
    @initializable_1.Initializable.initialize()
    initialize(ndcTriangle) {
        const gl = this._context.gl;
        const vert = new shader_1.Shader(this._context, gl.VERTEX_SHADER, 'gauss.vert');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        vert.initialize(require('./shaders/gaussfilter.vert'));
        this._fragmentShader = new shader_1.Shader(this._context, gl.FRAGMENT_SHADER, 'gauss.frag');
        this._fragmentShader.replace('$KERNEL_HALF_SIZE', `${Math.floor(this.kernelSize / 2)}`);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this._fragmentShader.initialize(require('./shaders/gaussfilter.frag'));
        this._program = new program_1.Program(this._context);
        this._program.initialize([vert, this._fragmentShader]);
        this._uDelta = this._program.uniform('u_delta');
        this._uWeights = this._program.uniform('u_weights');
        const aVertex = this._program.attribute('a_vertex', 0);
        if (ndcTriangle === undefined) {
            this._ndcTriangle = new ndcfillingtriangle_1.NdcFillingTriangle(this._context, 'GaussFilterQuad');
        }
        else {
            this._ndcTriangle = ndcTriangle;
            this._ndcTriangleShared = true;
        }
        this._ndcTriangle.initialize(aVertex);
        return true;
    }
    /**
     * Uninitializes the program and screen aligned triangle geometry, if it is not shared.
     */
    @initializable_1.Initializable.uninitialize()
    uninitialize() {
        this._program.uninitialize();
        if (!this._ndcTriangleShared) {
            this._ndcTriangle.uninitialize();
        }
    }
    /**
     * Filters the given texture in the given direction using the configured weights.
     * The weights will be recalculated if necessary.
     * @param texture - The float texture to filter.
     * @param direction - The direction to filter the texture in.
     */
    @initializable_1.Initializable.assert_initialized()
    filter(texture, direction) {
        const gl = this._context.gl;
        const directionVectors = [gl_matrix_1.vec2.fromValues(1.0, 0.0), gl_matrix_1.vec2.fromValues(0.0, 1.0)];
        const recalculatedWeights = this.recalculateWeights();
        if (recalculatedWeights) {
            this._fragmentShader.replace('$KERNEL_HALF_SIZE', `${Math.floor(this.kernelSize / 2)}`);
            this._fragmentShader.compile();
            this._program.link();
            this._uDelta = this._program.uniform('u_delta');
            this._uWeights = this._program.uniform('u_weights');
            this._program.bind();
            gl.uniform1fv(this._uWeights, this._weights);
        }
        this._program.bind();
        texture.bind(gl.TEXTURE0);
        // delta = 1.0 / textureSize * direction = direction / textureSize
        gl.uniform2fv(this._uDelta, gl_matrix_1.vec2.divide((0, gl_matrix_extensions_1.v2)(), directionVectors[direction], texture.size));
        this._ndcTriangle.bind();
        this._ndcTriangle.draw();
        this._ndcTriangle.unbind();
        texture.unbind(gl.TEXTURE0);
        this._program.unbind();
    }
}
exports.GaussFilter = GaussFilter;
(function (GaussFilter) {
    let Direction;
    (function (Direction) {
        Direction[Direction["Horizontal"] = 0] = "Horizontal";
        Direction[Direction["Vertical"] = 1] = "Vertical";
    })(Direction = GaussFilter.Direction || (GaussFilter.Direction = {}));
})(GaussFilter || (exports.GaussFilter = GaussFilter = {}));
//# sourceMappingURL=gaussfilter.js.map