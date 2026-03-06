"use strict";
/* spellchecker: disable */
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
/** Namespace that comprises various utils (also cleans up documentation). */
var auxiliaries;
(function (auxiliaries) {
    /* istanbul ignore next line - LOG_VERBOSITY_THRESHOLD has to be defined by the build environment*/
    let logVerbosityThreshold = typeof LOG_VERBOSITY_THRESHOLD !== 'undefined' ? LOG_VERBOSITY_THRESHOLD : 3;
    /**
     * Allows to specify the log verbosity. The default verbosity depends on the bundle type, e.g., a production bundle
     * might use a verbosity of 1, a local development bundle might favor a verbosity of 2. Even though verbosity levels
     * can be used arbitrarily, a verbosity of 0 is intended for user info only, 1 for developers, and 2 for developers
     * of this module. However, this semantic breaks when reusing this logging mechanism in other modules as well...
     * @param verbosity - Log level threshold, -1:disabled, 0:user, 1:developer, and 2:module developer.
     * @returns - The current log verbosity.
     */
    function logVerbosity(verbosity) {
        if (verbosity !== undefined) {
            logVerbosityThreshold = Math.max(-1, verbosity);
        }
        return logVerbosityThreshold;
    }
    auxiliaries.logVerbosity = logVerbosity;
    /**
     * Log verbosity levels.
     */
    let LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Debug"] = 3] = "Debug";
        LogLevel[LogLevel["Info"] = 2] = "Info";
        LogLevel[LogLevel["Warning"] = 1] = "Warning";
        LogLevel[LogLevel["Error"] = 0] = "Error";
    })(LogLevel = auxiliaries.LogLevel || (auxiliaries.LogLevel = {}));
    /**
     * Evaluates the provided statement and throws an evaluation error if false.
     * ```
     * assert(foo <= threshold, `value of foo ${foo} exceeds threshold of ${threshold}`);
     * ```
     * @param statement - Result of an statement expected to be true.
     * @param message - Message to be passed to the error (if thrown).
     */
    const assertImpl = (statement, message) => {
        if (statement) {
            return;
        }
        /* The parameters are intentionally not forwarded to console.assert since it does not interrupt execution. */
        throw new EvalError(message);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    const assertEmpty = (statement, message) => { };
    auxiliaries.assert = assertImpl;
    /* istanbul ignore next line - DISABLE_ASSERTIONS has to be defined by the build environment*/
    if (typeof DISABLE_ASSERTIONS !== 'undefined' && DISABLE_ASSERTIONS) {
        auxiliaries.assert = assertEmpty;
    }
    /**
     * Allows to specify whether or not assertions should be enabled or disabled/ignored.
     * @param enable - If true, assertions will be evaluated and might throw errors.
     * @returns whether assertions are enabled
     */
    function assertions(enable) {
        if (enable !== undefined) {
            auxiliaries.assert = enable ? assertImpl : assertEmpty;
        }
        return auxiliaries.assert !== assertEmpty;
    }
    auxiliaries.assertions = assertions;
    /**
     * Writes a warning to the console when the evaluated statement is false.
     * ```
     * log(,`scale changed to ${scale}, given ${this._scale}`);
     * ```
     * @param statement - Result of an statement expected to be true.
     * @param verbosity - Verbosity of log level: user, developer, or module developer.
     * @param message - Message to be passed to the log (if verbosity high enough).
     */
    function log(verbosity, ...message) {
        if (verbosity > logVerbosityThreshold) {
            return;
        }
        console.log(`[${verbosity}]`, ...message);
    }
    auxiliaries.log = log;
    /**
     * Writes a lo message to the console when the evaluated statement is false.
     * ```
     * logIf(!vec2.equals(this._scale, scale), LogLevel.Info, `scale changed to ${scale}, given ${this._scale}`);
     * ```
     * @param statement - Result of an statement expected to be true.
     * @param verbosity - Verbosity of log level: debug, info, warning, or error.
     * @param message - Message to be passed to the log (if thrown and verbosity high enough).
     */
    function logIf(statement, verbosity, ...message) {
        if (!statement) {
            return;
        }
        log(verbosity, ...message);
    }
    auxiliaries.logIf = logIf;
    /**
     * Starts performance measure using the performance API. This call initiates a performance mark and should be
     * followed by a `logPerformanceStop` call later on. Furthermore, the measurement can be tracked using, e.g., the
     * Chrome built-in performance profiler. Example:
     * ```
     * gloperate.auxiliaries.logPerformanceStart('initialization');
     * ...
     * gloperate.auxiliaries.logPerformanceStop('initialization');
     * ```
     * The example above should output something like: `[3] initialization | 5.635s`.
     * @param mark - Name for the performance measure and base name for the start mark (`<mark>-start`).
     */
    function logPerformanceStart(mark) {
        const start = `${mark}-start`;
        auxiliaries.assert(performance.getEntriesByName(mark).length === 0, `expected mark identifier to not already exists, given ${mark}`);
        auxiliaries.assert(performance.getEntriesByName(start).length === 0, `expected mark identifier to not already exists, given ${start}`);
        performance.mark(start);
    }
    auxiliaries.logPerformanceStart = logPerformanceStart;
    /**
     * Invokes `logPerformanceStart` iff the statement resolves successfully.
     * @param statement - Result of an statement expected to be true in order to invoke logPerformanceStart.
     * @param mark - Name for the performance measure mark ... @see {@link logPerformanceStart}.
     */
    function logPerformanceStartIf(statement, mark) {
        if (!statement) {
            return;
        }
        logPerformanceStart(mark);
    }
    auxiliaries.logPerformanceStartIf = logPerformanceStartIf;
    /**
     * This creates a second, end mark for the given mark name, then creates a performance measure between the start
     * and end mark (`<mark>-start` and `<mark>-end`), resolves the duration for logging and, finally, removes/cleans
     * both marks and the measure. The duration is pretty printed ranging from nanoseconds to seconds. Example:
     * ```
     * gloperate.auxiliaries.logPerformanceStart('initialization');
     * ...
     * gloperate.auxiliaries.logPerformanceStop('initialization', '#items processed: ' + items.length , 48);
     * ```
     * The example above should output something like: `[3] initialization           #items processed: 4096 | 7.172ms`.
     * @param mark - Name for the performance measure and base name for the end mark (`<mark>-end`).
     * @param message - Optional message to provide to the debug-log output.
     * @param measureIndent - Optional indentation of the measure (useful if multiple measurements shall be aligned).
     */
    function logPerformanceStop(mark, message, measureIndent = 0) {
        const start = `${mark}-start`;
        const end = `${mark}-end`;
        auxiliaries.assert(performance.getEntriesByName(mark).length === 0, `expected mark identifier to not already exists, given ${mark}`);
        auxiliaries.assert(performance.getEntriesByName(end).length === 0, `expected mark identifier to not already exists, given ${end}`);
        performance.mark(end);
        performance.measure(mark, start, end);
        const measures = performance.getEntriesByName(mark);
        const measure = measures[0];
        performance.clearMarks(start);
        performance.clearMarks(end);
        performance.clearMeasures(mark);
        const minIndent = message === undefined || message.length === 0 ? 0 : 2;
        const indent = Math.max(minIndent, measureIndent - mark.length - (message ? message.length : 0) - 1);
        const prettyMeasure = prettyPrintMilliseconds(measure.duration);
        log(LogLevel.Debug, `${mark}${' '.repeat(indent)}${message ? message : ''} | ${prettyMeasure}`);
    }
    auxiliaries.logPerformanceStop = logPerformanceStop;
    /**
     * Invokes `logPerformanceStop` under the condition that the statement is true.
     * @param statement - Result of an expression expected to be true in order to invoke logPerformanceStop.
     * @param mark - Name for the performance measure mark ... @see {@link logPerformanceStart}.
     * @param message - Optional message to provide to the debug-log output ... @see {@link logPerformanceStart}.
     * @param measureIndent - Optional indentation of the measure ... @see {@link logPerformanceStart}.
     */
    function logPerformanceStopIf(statement, mark, message, measureIndent = 0) {
        if (!statement) {
            return;
        }
        logPerformanceStop(mark, message, measureIndent);
    }
    auxiliaries.logPerformanceStopIf = logPerformanceStopIf;
    /**
     * Generates a random value within a given range [min,max].
     * @param min - Minimum random value possible.
     * @param max - Maximum random value possible.
     * @returns - Random number in the range [min,max].
     */
    function rand(min = 0.0, max = 1.0) {
        return Math.random() * (max - min) + min;
    }
    auxiliaries.rand = rand;
    /**
     * Tests with binary operations if the number is power of two.
     * @param x The number to test.
     */
    function isPowerOfTwo(x) {
        return Number.isInteger(x) && Number.isInteger(Math.log2(x));
    }
    auxiliaries.isPowerOfTwo = isPowerOfTwo;
    /**
     * Computes the next upper power of two for the given number. Math is based on
     * {@link https://graphics.stanford.edu/~seander/bithacks.html}.
     * @param x - Number to compute next upper power of two for.
     */
    function upperPowerOfTwo(x) {
        --x;
        x |= x >> 1;
        x |= x >> 2;
        x |= x >> 4;
        x |= x >> 8;
        x |= x >> 16;
        return ++x;
    }
    auxiliaries.upperPowerOfTwo = upperPowerOfTwo;
    /**
     * Byte suffixes based on ISO/IEC 80000 used for pretty printing of bytes.
     */
    const byteSuffixes = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];
    /**
     * Prints bytes using ISO/IEC 80000 postfixes for bytes and fixed number of decimal places (3 decimal places if
     * bytes >= KiB).
     * ```
     * prettyPrintBytes(27738900); // returns '26.454MiB'
     * ```
     * @param bytes - Number of bytes in plain bytes.
     */
    function prettyPrintBytes(bytes) {
        const prefix = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0;
        const value = bytes / Math.pow(1024, prefix);
        return `${prefix > 0 ? value.toFixed(3) : value}${byteSuffixes[prefix]}B`;
    }
    auxiliaries.prettyPrintBytes = prettyPrintBytes;
    /**
     * Suffixes used for pretty printing of time values in milliseconds.
     */
    const msSuffixes = ['ms', 'ns', 'μs', 'ms', 's'];
    /**
     * Scales used for pretty printing of time values in milliseconds.
     */
    const msScales = [0, 1e+6, 1e+3, 1e+0, 1e-3];
    /**
     * Prints given milliseconds in an appropriate seconds-based time unit and fixed number of decimal places.
     * ```
     * prettyPrintMilliseconds(0.03277); // returns '32.770μs'
     * ```
     * @param milliseconds - Number of milliseconds as floating point number.
     */
    function prettyPrintMilliseconds(milliseconds) {
        let prefix = milliseconds > 0 ?
            Math.max(1, Math.floor(Math.log(milliseconds * 10) / Math.log(1e+3)) + 3) : 0;
        prefix = (0, gl_matrix_extensions_1.clamp)(prefix, 0, 4);
        const value = milliseconds * msScales[prefix];
        return `${value.toFixed(3)}${msSuffixes[prefix]}`;
    }
    auxiliaries.prettyPrintMilliseconds = prettyPrintMilliseconds;
    /**
     * Tests if specific bits are set in a given bitfield and returns true if so, false otherwise.
     */
    function bitInBitfield(flags, flag) {
        if (flag === undefined) {
            return false;
        }
        return (flags & flag) === flag;
    }
    auxiliaries.bitInBitfield = bitInBitfield;
    /**
     * Conversion multiplier for radians to degrees conversion (180 / PI).
     */
    auxiliaries.RAD2DEG = 57.295779513082320;
    /**
     * Conversion multiplier for degrees to radians conversion (PI / 180).
     */
    auxiliaries.DEG2RAD = 0.017453292519943295;
    /**
     * Queries window.location.search, or, if not present, window.location.search of the window's top frame.
     */
    function GETsearch() {
        let search = window.location.search;
        if (!search) {
            search = window.top?.location?.search || '';
        }
        return search;
    }
    auxiliaries.GETsearch = GETsearch;
    /**
     * Queries the value of a GET parameter.
     * @param parameter - Name/identifier of the parameter to query for.
     */
    function GETparameter(parameter) {
        const re = new RegExp(`${parameter}=([^&]+)`);
        let match = window.location.search.match(re);
        if (!match) {
            // For iframe contents (i. e., the embedded /examples/ files), look within the top frame's search params
            match = window.top?.location?.search.match(re) || null;
        }
        if (!match) {
            return undefined;
        }
        return match[1];
    }
    auxiliaries.GETparameter = GETparameter;
    /**
     * Path separator used for path related functions such as dirname and basename.
     */
    auxiliaries.PATH_SEPARATOR = '/';
    /**
     * Returns the directory name of a given (file) path. If no path separator is found, an empty dir name is returned.
     * @param path - Path string the directory name should be returned of.
     */
    function dirname(path) {
        if (path.includes(auxiliaries.PATH_SEPARATOR) === false) {
            return '';
        }
        return path.substr(0, path.lastIndexOf(auxiliaries.PATH_SEPARATOR)).trimLeft();
    }
    auxiliaries.dirname = dirname;
    /**
     * Returns the base name of a given file path. If no path separator is found, the input path is returned.
     * @param path - Path string the file/base name should be returned of.
     */
    function basename(path) {
        if (path.includes(auxiliaries.PATH_SEPARATOR) === false) {
            return path;
        }
        return path.substr(path.lastIndexOf(auxiliaries.PATH_SEPARATOR) + 1).trimRight();
    }
    auxiliaries.basename = basename;
})(auxiliaries || (auxiliaries = {}));
module.exports = auxiliaries;
//# sourceMappingURL=auxiliaries.js.map