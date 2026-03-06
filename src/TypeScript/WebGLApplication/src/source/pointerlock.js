"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerLock = void 0;
const auxiliaries_1 = require("./auxiliaries");
/* spellchecker: enable */
/**
 * Utility class providing simplified access to the clients pointer lock API.
 */
class PointerLock {
    /**
     * Cached exit call of the clients specific pointer lock API.
     */
    static _exit;
    /**
     * Cached request call of the clients specific pointer API.
     */
    static _request;
    /**
     * Cached element call returning the fullscreen element specific to the clients fullscreen API.
     */
    static _element;
    /**
     * Query and cache the client specific pointer lock API.
     */
    static queryAndCacheAPI() {
        if (PointerLock._exit !== undefined) {
            return;
        }
        /**
         * Shadow global document declaration with an untyped one. This is done in order to use vendor specific
         * properties without a compile error.
         */
        const document = window.document;
        // Query the API to use.
        const exits = [
            document.exitPointerLock,
            document.mozExitPointerLock,
            document.webkitExitPointerLock,
            undefined
        ];
        let api = 0;
        for (; api < exits.length; ++api) {
            if (exits[api] === undefined) {
                continue;
            }
            break;
        }
        switch (api) {
            case 0: // native
                PointerLock._exit = () => document.exitPointerLock();
                /* @todo - refine the request pointer lock as soon as candidate recommendation is approved. */
                PointerLock._request = (element) => element.requestPointerLock();
                PointerLock._element = () => document.pointerLockElement;
                break;
            case 1: // mozilla
                PointerLock._exit = () => document.mozCancelPointerLock();
                PointerLock._request = (element) => element.mozRequestPointerLock();
                PointerLock._element = () => document.mozPointerLockElement;
                break;
            case 2: // webkit
                PointerLock._exit = () => document.webkitExitPointerLock();
                PointerLock._request = (element) => element.webkitRequestPointerLock();
                PointerLock._element = () => document.webkitPointerLockElement;
                break;
            default:
                (0, auxiliaries_1.assert)(false, `none of the following pointer lock apis was found: native, moz, or webkit`);
        }
    }
    /**
     * Returns whether or not a pointer lock element exists, indicating if pointer lock is active or not.
     */
    static active(element) {
        if (this._element === undefined) {
            return false;
        }
        return (element !== undefined && PointerLock._element() === element) || (element === undefined &&
            PointerLock._element() !== undefined && PointerLock._element() !== null);
    }
    /**
     * Requests pointer lock for a given element. If another element is already in pointer lock, it is unlocked
     * first. The function considers various platform specific pointer lock interfaces, i.e., native, moz, and webkit.
     * @param element - Element to toggle pointer lock state of.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static request(element, callback) {
        if (element === undefined) {
            return;
        }
        PointerLock.queryAndCacheAPI();
        if (PointerLock.active() && PointerLock._element() !== element) {
            PointerLock._exit();
        }
        if (!PointerLock.active()) {
            PointerLock._request(element);
        }
    }
    /**
     * Exit pointer lock. The function considers various platform specific pointer lock interfaces, i.e., native, moz,
     * and webkit.
     */
    static exit() {
        if (PointerLock._exit) {
            PointerLock._exit();
        }
    }
}
exports.PointerLock = PointerLock;
//# sourceMappingURL=pointerlock.js.map