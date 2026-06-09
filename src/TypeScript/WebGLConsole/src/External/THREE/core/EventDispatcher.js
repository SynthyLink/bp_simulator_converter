"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
class EventDispatcher {
    constructor() {
        this._listeners = new Map;
        this.disp = this;
    }
    /**
     * Adds the given event listener to the given event type.
     *
     * @param {string} type - The type of event to listen to.
     * @param {Function} listener - The function that gets called when the event is fired.
     */
    addEventListener(type, listener) {
        //	if (this._listeners === undefined) this._listeners = {};
        const listeners = this._listeners;
        if (listeners.get(type) === undefined) {
            listeners.set(type, []);
        }
        let l = listeners.get(type);
        if (l === undefined)
            return;
        if (l.indexOf(listener) === -1) {
            l.push(listener);
        }
    }
    /**
     * Returns `true` if the given event listener has been added to the given event type.
     *
     * @param {string} type - The type of event.
     * @param {Function} listener - The listener to check.
     * @return {boolean} Whether the given event listener has been added to the given event type.
     */
    hasEventListener(type, listener) {
        const listeners = this._listeners;
        if (listeners === undefined)
            return false;
        let l = listeners.get(type);
        return l !== undefined && l.indexOf(listener) !== -1;
    }
    /**
     * Removes the given event listener from the given event type.
     *
     * @param {string} type - The type of event.
     * @param {Function} listener - The listener to remove.
     */
    removeEventListener(type, listener) {
        const listeners = this._listeners;
        if (listeners === undefined)
            return;
        const listenerArray = listeners.get(type);
        if (listenerArray !== undefined) {
            const index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }
    /**
     * Dispatches an event object.
     *
     * @param {Object} event - The event that gets fired.
     */
    dispatchEvent(event) {
        const listeners = this._listeners;
        if (listeners === undefined)
            return;
        const listenerArray = listeners.get(event.type);
        if (listenerArray !== undefined) {
            event.target = this;
            // Make a copy, in case listeners are removed while iterating.
            const array = listenerArray.slice(0);
            for (let i = 0, l = array.length; i < l; i++) {
                let a = array[i];
                a(this, event);
            }
            event.target = null;
        }
    }
}
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map