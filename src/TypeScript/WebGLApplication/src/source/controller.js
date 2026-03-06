"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const rxjs_1 = require("rxjs");
const auxiliaries_1 = require("./auxiliaries");
const gl_matrix_extensions_1 = require("./gl-matrix-extensions");
/**
 * This class controls the rendering flow by means of triggering rendering of a well defined amount of frames
 * (multi-frame number) for frame accumulation. Single frame rendering is handled with a multi-frame number of 1. If a
 * full multi-frame is accumulated, rendering halts. The rendering is not intended to be controlled by owning objects,
 * but via invalidation from within the renderer instead. However, an explicit redraw of a full single or multi-frame
 * can be invoked by calling `update()`. Furthermore, when using multi-frame rendering, the renderer can be halted at a
 * specific frame by setting a debug-frame number.
 *
 * Terminology: a multi-frame is the final result after accumulating a number of intermediate frames (frame). The
 * number of intermediate frames is defined by the multi-frame number. For a multi-frame, the controller invokes the
 * `prepare` on a controllable first, followed by multiple `frame` and `swap` calls. Please note that the
 * adaptive batch mode is yet experimental (can be enabled using `batchSize`).
 */
class Controller {
    /**
     * Toggle for debug outputs; if true control flow will be logged.
     */
    static _debug = false;
    set debug(value) {
        if (value && (0, auxiliaries_1.logVerbosity)() < auxiliaries_1.LogLevel.Debug) {
            (0, auxiliaries_1.logVerbosity)(auxiliaries_1.LogLevel.Debug);
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Debug, `changed log verbosity to ${auxiliaries_1.LogLevel.Debug} (debug)`);
        }
        Controller._debug = value;
    }
    /**
     * Number of intermediate frames that are rendered during one browser frame
     */
    _batchSize = 1;
    set batch(size) {
        (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Warning, `(adaptive) batch multi-frame rendering is experimental for now`);
        this._batchSize = Math.max(1, size);
    }
    /**
     * @see {@link multiFrameNumber}
     * This property can be observed, e.g., `aController.multiFrameNumberObservable.subscribe()`.
     */
    _multiFrameNumber = 1;
    _multiFrameNumberSubject = new rxjs_1.ReplaySubject(1);
    /**
     * @see {@link debugFrameNumber}
     * This property can be observed, e.g., `aController.debugFrameNumberObservable.subscribe()`.
     */
    _debugFrameNumber = 0;
    _debugFrameNumberSubject = new rxjs_1.ReplaySubject(1);
    /**
     * @see {@link frameNumber}
     * This property can be observed, e.g., `aController.frameNumberObservable.subscribe()`.
     */
    _frameNumber = 0;
    _frameNumberSubject = new rxjs_1.ReplaySubject(1);
    /** @see {@link multiFrameDelay} */
    _multiFrameDelay = 0;
    // protected _delayedRequestTimeout: number | undefined;
    /** Observable event that is triggered after frame invocation (renderer). */
    _postFrameEventSubject = new rxjs_1.Subject();
    /** Observable event that is triggered after swap invocation (renderer). */
    _postSwapEventSubject = new rxjs_1.Subject();
    /**
     * Controllable, e.g., an instance of a Renderer.
     */
    _controllable;
    /**
     * Holds the handle of the pending / executed animate frame request, if requested. Throughout the controller, only a
     * single request at a time is allowed.
     */
    _animationFrameID = 0;
    /**
     * Holds the handle of the running timeout to execute a new multi frame. Undefined if we currently do not wait for
     * a new multi frame.
     */
    _timeoutID;
    /**
     * Blocking updates can be used to re-configure the controller without triggering
     */
    _block = false;
    /**
     * Number of update requested while being in blocked mode. If there is one or more blocked requests, an update will
     * be triggered when unblocked.
     */
    _blockedUpdates = 0;
    /* Debug and  reporting facilities. */
    /**
     * Total number of rendered intermediate frames.
     */
    _intermediateFrameCount = 0;
    /**
     * Total number of completed multi-frames.
     */
    _multiFrameCount = 0;
    /**
     * Time tracker used to the minimum and maximum frame time of an intermediate frame (per multi-frame).
     */
    _intermediateFrameTimes = new Array(2);
    /**
     * Time tracker used to accumulate all durations of executed frame and swap callbacks per multi-frame. This is the
     * net rendering time and is used to derive the average frame time.
     */
    _multiFrameTime;
    /**
     * Time tracker used to capture the time the update callback took.
     */
    _updateFrameTime;
    /**
     * Used to measure the gross rendering time of a multi-frame. The first point in time denotes the start of the
     * rendering, the second, the point in time the last frame was rendered.
     *
     * Note: point in times might be shifted due to (un)pausing. Their intent is to allow measuring the rendering
     * duration, nothing else.
     */
    _multiTime = [0.0, 0.0];
    _invalidated = false;
    _force = false;
    request(source = Controller.RequestType.Frame) {
        this._animationFrameID = 0;
        if (this._block) {
            this._blockedUpdates++;
            return;
        }
        this._animationFrameID = window.requestAnimationFrame(() => this.invoke(source));
    }
    invoke(source) {
        if (this._animationFrameID === 0) {
            // We got a former request animation frame that was already canceled
            return;
        }
        (0, auxiliaries_1.assert)(this._controllable !== undefined, `frame sequence invoked without controllable set`);
        if (this._invalidated) {
            this._invalidated = false;
            const redraw = this.invokeUpdate();
            if (redraw || this._force) {
                this._force = false;
                this._frameNumber = 0;
                this.cancelWaitMultiFrame();
                this.invokePrepare();
            }
        }
        if (source === Controller.RequestType.Frame && this._frameNumber === 1) {
            if (this._timeoutID === undefined) {
                this.startWaitMultiFrame();
            }
            this._animationFrameID = 0;
            return;
        }
        if (this.isMultiFrameFinished()) {
            this._animationFrameID = 0;
            return;
        }
        this.invokeFrameAndSwap();
        this.request();
    }
    /**
     * Actual invocation of the controllable's update method. Returns true if multi frame rendering should be restarted,
     * false otherwise.
     */
    invokeUpdate() {
        (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c invoke update     | ` +
            `pending: '${this._animationFrameID}', mfnum: ${this._multiFrameNumber}`);
        const redraw = this._controllable.update(this._multiFrameNumber);
        return redraw;
    }
    /**
     * Actual invocation of the controllable's prepare method.
     */
    invokePrepare() {
        (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c invoke prepare    |`);
        this._multiFrameTime = 0.0;
        this._intermediateFrameTimes[0] = Number.MAX_VALUE;
        this._intermediateFrameTimes[1] = Number.MIN_VALUE;
        /* Trigger preparation of a new multi-frame and measure execution time. */
        this._multiTime[0] = performance.now();
        this._controllable.prepare();
        this._multiTime[1] = performance.now();
        const updateDuration = this._multiTime[1] - this._multiTime[0];
        this._multiFrameTime = updateDuration;
        this._updateFrameTime = updateDuration;
    }
    /**
     * Invokes rendering of an intermediate frame, increments the frame counter, and requests rendering of the next
     * frame. The rendering is invoked by means of a callback to the canvas renderer. This function implements various
     * asserts to assure correct control logic and absolutely prevent unnecessary frame requests.
     */
    invokeFrameAndSwap() {
        (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c invoke frame      | pending: '${this._animationFrameID}'`);
        const debug = this._debugFrameNumber > 0;
        (0, auxiliaries_1.assert)(!debug || this._frameNumber < this._debugFrameNumber, `frame number about to exceed debug-frame number`);
        /* Trigger an intermediate frame and measure and accumulate execution time for average frame time. This should
        be the only place, any renderer frame method is invoked. */
        const t0 = performance.now();
        let batchEnd = Math.min(this._multiFrameNumber, this._frameNumber + this._batchSize);
        if (this._debugFrameNumber > 0) {
            batchEnd = Math.min(batchEnd, this._debugFrameNumber);
        }
        for (; this._frameNumber < batchEnd; ++this._frameNumber) {
            (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c -> frame          | frame: ${this._frameNumber}`);
            this._controllable.frame(this._frameNumber);
            this._postFrameEventSubject.next(this._frameNumber);
            ++this._intermediateFrameCount;
        }
        (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c -> swap           |`);
        this._controllable.swap();
        this._postSwapEventSubject.next(this._frameNumber);
        this._multiTime[1] = performance.now();
        /* Note: critical call sequence; be careful when changing the following lines. */
        const frameDuration = this._multiTime[1] - t0;
        this._multiFrameTime += frameDuration;
        /* Keep track of minimum and maximum intermediate frame durations. */
        this._intermediateFrameTimes[0] = Math.min(this._intermediateFrameTimes[0], frameDuration);
        /* Note that the first frame is probably the slowest due to lazy initialization of stages/passes. */
        this._intermediateFrameTimes[1] = Math.max(this._intermediateFrameTimes[1], frameDuration);
        this.frameNumberNext();
    }
    startWaitMultiFrame() {
        const startMultiFrame = () => {
            this.request(Controller.RequestType.MultiFrame);
            this._timeoutID = undefined;
        };
        this._timeoutID = window.setTimeout(startMultiFrame, this._multiFrameDelay);
    }
    cancelWaitMultiFrame() {
        if (this._timeoutID !== undefined) {
            window.clearTimeout(this._timeoutID);
            this._timeoutID = undefined;
        }
    }
    isMultiFrameFinished() {
        if (this._debugFrameNumber > 0) {
            return this._frameNumber === this._debugFrameNumber;
        }
        return this._frameNumber === this._multiFrameNumber;
    }
    /**
     * Utility for communicating this._multiFrameNumber changes to its associated subject.
     */
    multiFrameNumberNext() {
        this._multiFrameNumberSubject.next(this._multiFrameNumber);
    }
    /**
     * Utility for communicating this._debugFrameNumber changes to its associated subject.
     */
    debugFrameNumberNext() {
        this._debugFrameNumberSubject.next(this._debugFrameNumber);
    }
    /**
     * Utility for communicating this._frameNumber changes to its associated subject.
     */
    frameNumberNext() {
        this._frameNumberSubject.next(this._frameNumber);
    }
    update(force = false) {
        this._invalidated = true;
        this._force = this._force || force;
        if (this._animationFrameID === 0) {
            this.request();
        }
    }
    /**
     * Block implicit updates, e.g., caused by various setters. This can be used to reconfigure the controller without
     * triggering to multiple intermediate updates. The block updates mode can be exited using `unblock`.
     */
    block() {
        (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c block   ${this._block ? '(ignored) ' : '          '}|`);
        this._block = true;
    }
    /**
     * Unblock updates. If there was at least one blocked update request, an immediate update is invoked.
     */
    unblock() {
        (0, auxiliaries_1.logIf)(Controller._debug, auxiliaries_1.LogLevel.Debug, `c unblock ${!this._block ? '(ignored) ' : '          '}` +
            `| blocked: #${this._blockedUpdates}`);
        if (!this._block) {
            return;
        }
        this._block = false;
        if (this._blockedUpdates > 0) {
            this._blockedUpdates = 0;
            this.update();
        }
    }
    cancel() {
        if (this._animationFrameID === 0) {
            return;
        }
        window.cancelAnimationFrame(this._animationFrameID);
        this._animationFrameID = 0;
    }
    /**
     * Returns whether or not the control is blocking updates.
     * @returns - True if blocked, else false.
     */
    get blocked() {
        return this._block;
    }
    /**
     * Sets the controllable, for which updates, frames, and swaps are invoked whenever rendering is
     * invalidated and an updated multi-frame is required. Swap is detached from frame since rendering an intermediate
     * frame is usually done offscreen and explicit swap control can be useful.
     * @param controllable - Controllable for update, frame, and swap invocation.
     */
    set controllable(controllable) {
        if (controllable === this._controllable) {
            return;
        }
        this._controllable = controllable;
        this.update(true);
    }
    /**
     * Returns the multi-frame number. The number is greater than or equal to zero. Multi-frame number is implemented
     * as a property and allows for change callback.
     * @returns - Multi-frame number.
     */
    get multiFrameNumber() {
        return this._multiFrameNumber;
    }
    /**
     * Changes the multi-frame number. If the provided value equals the current number set, nothing happens. If the
     * provided value is negative, the multi-frame number is set to 1.
     * @param multiFrameNumber - The multi-frame number targeted for rendering.
     */
    set multiFrameNumber(multiFrameNumber) {
        const value = Math.max(1, isNaN(multiFrameNumber) ? 1 : multiFrameNumber);
        if (value === this._multiFrameNumber) {
            return;
        }
        this._multiFrameNumber = value;
        this.multiFrameNumberNext();
        (0, auxiliaries_1.logIf)(value !== multiFrameNumber, auxiliaries_1.LogLevel.Debug, `multi-frame number adjusted to ${value}, given ${multiFrameNumber}`);
        if (this.debugFrameNumber > this.multiFrameNumber) {
            this.debugFrameNumber = this.multiFrameNumber;
        }
        else {
            this.update();
        }
    }
    /**
     * Observable that can be used to subscribe to multi-frame number changes.
     */
    get multiFrameNumber$() {
        return this._multiFrameNumberSubject.asObservable();
    }
    /**
     * Returns the debug-frame number greater than or equal to zero.
     * @returns - Debug-frame number.
     */
    get debugFrameNumber() {
        return this._debugFrameNumber;
    }
    /**
     * Sets the debug.-frame number (debug number) that, if greater than zero, causes the rendering to halt when the
     * current frame number (frame number) equals the debug number. Debugging can be disabled by setting the debug
     * number to zero.
     *
     * If the debug number is greater than the frame number rendering is restarted by means of an update(). If the
     * debug number is less than the frame number the rendering continues and halts accordingly. If the debug number
     * equals the current debug number set, nothing happens. If the debug number is greater than the multi-frame
     * number, it is reduced to the multi-frame number.
     *
     * Note: in contrast to setting the multi-frame number, setting the debug-frame number unpauses the controller.
     *
     * @param debugFrameNumber - Debug-frame number.
     */
    set debugFrameNumber(debugFrameNumber) {
        const value = (0, gl_matrix_extensions_1.clamp)(isNaN(debugFrameNumber) ? 0 : debugFrameNumber, 0, this.multiFrameNumber);
        if (value === this._debugFrameNumber) {
            return;
        }
        this._debugFrameNumber = value;
        this.debugFrameNumberNext();
        (0, auxiliaries_1.logIf)(value !== debugFrameNumber, auxiliaries_1.LogLevel.Debug, `debug-frame number adjusted to ${value}, given ${debugFrameNumber}`);
        this.update(this.debugFrameNumber < this._frameNumber);
    }
    /**
     * Observable that can be used to subscribe to debug-frame number changes.
     */
    get debugFrameNumber$() {
        return this._debugFrameNumberSubject.asObservable();
    }
    /**
     * Sets the multi-frame delay in milliseconds. This is used to delay rendering of subsequent intermediate frames
     * after an update.
     * @param multiFrameDelay - A multi-frame delay in milliseconds.
     */
    set multiFrameDelay(multiFrameDelay) {
        const value = Math.max(0, multiFrameDelay);
        if (value === this._multiFrameDelay) {
            return;
        }
        this._multiFrameDelay = value;
    }
    /**
     * Time in milliseconds used to delay rendering of subsequent intermediate frames after an update.
     * @returns - The current multi-frame delay in milliseconds.
     */
    get multiFrameDelay() {
        return this._multiFrameDelay;
    }
    /**
     * The current multi-frame number; it is less than or equal to the multi-frame number and enumerates the last
     * rendered frame. Note that this does not denote the number of 'completed' multi-frames rendered (not a continuous
     * frame count).
     * @returns - The current (intermediate) frame number.
     */
    get frameNumber() {
        return this._frameNumber;
    }
    /**
     * Observable that can be used to subscribe to frame number changes.
     */
    get frameNumber$() {
        return this._frameNumberSubject.asObservable();
    }
    /**
     * Returns the total number of rendered (requested and probably completed) intermediate frames.
     * @returns - The total number of intermediate frames rendered.
     */
    get intermediateFrameCount() {
        return this._intermediateFrameCount;
    }
    /**
     * Returns the total number of completed multi-frames.
     * @returns - The total number of multi-frames completed.
     */
    get multiFrameCount() {
        return this._multiFrameCount;
    }
    /**
     * Provides the average time it takes to render an intermediate frame within the current displayed multi-frame (if
     * a new multi-frame is triggered, the average frame time is reset).
     * @returns - Average frame time (intermediate frame rendering) in ms
     */
    get averageFrameTime() {
        return this._frameNumber === 0 ? 0.0 : this._multiFrameTime / this._frameNumber;
    }
    /**
     * Provides the update time tracked for the current multi-frame.
     * @returns - Time of the multi-frame update (before first intermediate frame is rendered) in ms
     */
    get updateFrameTime() {
        return this._updateFrameTime;
    }
    /**
     * Provides the minimum rendering time tracked over all intermediate frames of the current multi-frame.
     * @returns - Minimum intermediate frame time in ms
     */
    get minimumFrameTime() {
        return this._intermediateFrameTimes[0];
    }
    /**
     * Provides the maximum rendering time tracked over all intermediate frames of the current multi-frame. Note that
     * the maximum frame time is most often caused by the first intermediate frame within a multi-frame due to lazy
     * stage initialization or reconfiguration.
     * @returns - Maximum intermediate frame time in ms
     */
    get maximumFrameTime() {
        return this._intermediateFrameTimes[1];
    }
    /**
     * The time in milliseconds that passed since the current multi-frame (up to the current frame number) was
     * requested. This time excludes time spent paused (e.g., caused by halting rendering at debug-frame number).
     * Note that this is not a measure of frame rendering performance. The number of frame requests per second might be
     * limited to 60Hz even though the rendering of an intermediate frame takes only a few milliseconds.
     * @returns - Time passed for current multi-frame in milliseconds.
     */
    get multiFrameTime() {
        return this._frameNumber === 0 ? 0.0 : this._multiTime[1] - this._multiTime[0];
    }
    /**
     * The frames per second is based on the average number of a full intermediate frame request up to the current
     * frame number.
     * @returns - Number of frames per second based on the current multi-frame
     */
    get framesPerSecond() {
        return this._frameNumber === 0 ? 0.0 : 1000.0 / (this.multiFrameTime / this._frameNumber);
    }
    /**
     * Observable that can be used to subscribe to post frame events.
     */
    get postFrameEvent$() {
        return this._postFrameEventSubject.asObservable();
    }
    /**
     * Observable that can be used to subscribe to post swap events.
     */
    get postSwapEvent$() {
        return this._postSwapEventSubject.asObservable();
    }
}
exports.Controller = Controller;
(function (Controller) {
    let RequestType;
    (function (RequestType) {
        RequestType[RequestType["Frame"] = 0] = "Frame";
        RequestType[RequestType["MultiFrame"] = 1] = "MultiFrame";
    })(RequestType = Controller.RequestType || (Controller.RequestType = {}));
})(Controller || (exports.Controller = Controller = {}));
//# sourceMappingURL=controller.js.map