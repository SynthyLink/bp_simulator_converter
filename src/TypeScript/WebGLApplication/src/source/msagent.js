"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_EDGE = exports.IS_IE11 = void 0;
exports.IS_IE11 = typeof navigator === 'undefined' ?
    undefined : /MSIE 11|Windows/i.test(navigator.userAgent);
exports.IS_EDGE = typeof navigator === 'undefined' ?
    undefined : /Edge\/\d./i.test(navigator.userAgent);
//# sourceMappingURL=msagent.js.map