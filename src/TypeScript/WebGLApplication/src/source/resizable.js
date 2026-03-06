"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resizable = void 0;
const auxiliaries_1 = require("./auxiliaries");
const tuples_1 = require("./tuples");
/* spellchecker: enable */
/**
 * Mixin that incorporates resize event handling. The mixin depends on the global window resize event and forwards any
 * resize event to every existing instance of this class (global tracking).
 */
class Resizable {
    /**
     * Event identifier for resize event (single point of definition).
     */
    static EVENT_IDENTIFIER = 'resize';
    /**
     * Array for referencing all instances of resizable.
     */
    static instances = [];
    /**
     * Resize event availability (cached value).
     */
    static eventSupported = false;
    static MUTATION_OBSERVER_CONFIG = {
        attributes: true,
        attributeFilter: ['style', 'class'],
        childList: true,
        subtree: true,
    };
    /**
     * Mutation observer for listening on element style changes.
     */
    _mutationObserver;
    /**
     * This function is called when the window is resized (and the event listener was successfully registered). The
     * event is forwarded to each registered resizable object.
     */
    static resize() {
        (0, auxiliaries_1.assert)(Resizable.instances.length > 0, `resize event received without a single resizable registered`);
        Resizable.instances.forEach((item) => item.onResize());
    }
    /* istanbul ignore next */
    /**
     * Retrieves the native width and height of a given element in device pixel (size on screen in physical pixels). If
     * the element is not found, or either window or its device pixel ratio are not defined, a default vec2 is returned.
     * If the canvas size is not yet computed, i.e., not provided in px unit, undefined will be return.
     * @param element - DOM element to get the width and height in (native) pixel from.
     * @returns - Size of the element in native screen pixels. Undefined when size is not available in 'px'.
     */
    static elementSize(element) {
        if (element === undefined || window === undefined || typeof window.devicePixelRatio !== 'number') {
            return [0, 0];
        }
        const scale = window.devicePixelRatio;
        const style = getComputedStyle(element);
        const pxUnits = style.width !== null && style.width.endsWith('px') &&
            style.height !== null && style.height.endsWith('px');
        if (!pxUnits) {
            (0, auxiliaries_1.log)(auxiliaries_1.LogLevel.Debug, `computed element size expected in 'px', given ${style.width} ${style.height}`);
            return undefined;
        }
        const sizef = [parseFloat(style.width), parseFloat(style.height)];
        const size = [Math.round(sizef[0] * scale), Math.round(sizef[1] * scale)];
        return size;
    }
    /**
     * Every instance of resizable is registered in the global list of resizable instances. The first instance, however,
     * triggers the registration of the global window resize event listener.
     */
    constructor() {
        if (Resizable.instances.length === 0) { // initialize once
            const event = `on${Resizable.EVENT_IDENTIFIER}`;
            /* istanbul ignore next */
            Resizable.eventSupported = document && (event in document.documentElement || event in document.body);
            (0, auxiliaries_1.logIf)(!Resizable.eventSupported, auxiliaries_1.LogLevel.Warning, `resize event not supported`);
        }
        /* istanbul ignore next */
        if (Resizable.instances.length === 0 && Resizable.eventSupported) {
            window.addEventListener(Resizable.EVENT_IDENTIFIER, this._resizeEventListener);
        }
        Resizable.instances.push(this);
    }
    /* istanbul ignore next */
    _resizeEventListener = () => Resizable.resize();
    /* istanbul ignore next */
    _mutationEventListener = () => {
        this._mutationObserver.takeRecords();
        /* At this point, a test for actual change could be made, either by comparing to the previous size of the
        computed style, or by comparing the style for differences in various style attributes... In both cases,
        the implementation overhead seems huge. For now, the worst thing that might happen is a resize call, that does
        not actually require to resize anything. In this case, all resize event invocations are expected to lazy-check
        for changes, e.g., with previous frame or canvas size anyway. Skipping for now. */
        Resizable.resize();
    };
    /**
     * Observe a certain element for style or class mutations. Any mutation invokes the resize event.
     * @param element - element that can be observed for style mutations (style mutation will trigger resize).
     */
    observe(element) {
        /* Create mutation observer if none was created yet. */
        if (element !== undefined) {
            this._mutationObserver = new MutationObserver(this._mutationEventListener);
        }
        this._mutationObserver.observe(element, Resizable.MUTATION_OBSERVER_CONFIG);
    }
    /**
     * Unregister this instance from the global list of resizable instances. On destruction of the last instance, the
     * resize event handle is removed. Please note that destruction needs to be invoked explicitly.
     */
    dispose() {
        const i = Resizable.instances.indexOf(this);
        (0, auxiliaries_1.assert)(i !== -1, `invalid reference counting of resizable instances`);
        Resizable.instances.splice(i, 1);
        /* istanbul ignore next */
        if (Resizable.instances.length === 0 && Resizable.eventSupported) {
            window.removeEventListener(Resizable.EVENT_IDENTIFIER, this._resizeEventListener);
        }
        /* istanbul ignore next */
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
        }
    }
}
exports.Resizable = Resizable;
//# sourceMappingURL=resizable.js.map