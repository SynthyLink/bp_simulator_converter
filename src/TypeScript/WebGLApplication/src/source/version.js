"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.commit = exports.branch = void 0;
/**
 * `gloperate.branch` provides the git revision branch at build-time.
 */
exports.branch = typeof GIT_REV_BRANCH !== 'undefined' ? `${GIT_REV_BRANCH}` : undefined;
/**
 * `gloperate.commit` provides the git revision commit at build-time.
 */
exports.commit = typeof GIT_REV_COMMIT !== 'undefined' ? `${GIT_REV_COMMIT}` : undefined;
/**
 * `gloperate.version` provides the git revision version at build-time.
 */
exports.version = typeof GIT_REV_VERSION !== 'undefined' ? `${GIT_REV_VERSION}` : undefined;
//# sourceMappingURL=version.js.map