"use strict";
/* spellchecker: disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestNavigation = void 0;
const eventhandler_1 = require("../eventhandler");
const renderer_1 = require("../renderer");
/* spellchecker: enable */
class TestNavigation {
    _eventHandler;
    _altered = false;
    constructor(invalidate, eventProvider) {
        this._eventHandler = new eventhandler_1.EventHandler(invalidate, eventProvider);
        this._eventHandler.pushMouseEnterHandler((latests, previous) => this.onMouseEnter(latests, previous));
        this._eventHandler.pushMouseLeaveHandler((latests, previous) => this.onMouseLeave(latests, previous));
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMouseEnter(latests, previous) {
        this._altered = false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMouseLeave(latests, previous) {
        this._altered = true;
    }
    update() {
        this._eventHandler.update();
    }
    reset() {
        this._altered = false;
    }
    get altered() {
        return this._altered;
    }
}
exports.TestNavigation = TestNavigation;
//# sourceMappingURL=testnavigation.js.map