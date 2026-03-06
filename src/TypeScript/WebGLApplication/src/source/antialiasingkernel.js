"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiAliasingKernel = void 0;
const randomsquarekernel_1 = require("./randomsquarekernel");
/* spellchecker: enable */
/**
 * An anti-aliasing kernel which provides NDC offsets for anti-aliasing, e.g., when using multi-frame sampling.
 */
class AntiAliasingKernel extends randomsquarekernel_1.RandomSquareKernel {
    /**
     * AntiAliasingKernel is fixed to one-dimension (x-axis) and 2-components per sample.
     * @param width - Width of the kernel along its x-axis.
     */
    constructor(width) {
        super(width);
    }
    /**
     * Invokes regeneration of all values. If width is either 8 or 64 pre-built kernels will be loaded (golden set). In
     * any other case, a random square kernel will be created.
     */
    generate() {
        switch (this._width) {
            case 8:
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.fromJSON(require('./data/goldenset08.json'));
                break;
            case 64:
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.fromJSON(require('./data/goldenset64.json'));
                break;
            case 128:
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.fromJSON(require('./data/goldenset128.json'));
                break;
            default:
                super.generate();
        }
    }
}
exports.AntiAliasingKernel = AntiAliasingKernel;
//# sourceMappingURL=antialiasingkernel.js.map