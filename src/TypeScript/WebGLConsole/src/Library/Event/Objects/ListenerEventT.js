"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerEventT = void 0;
class ListenerEventT {
    constructor(event) {
        this.map = new Map();
        this.n = 0;
        this.event = event;
    }
    addActionT(action) {
        if (action == undefined)
            return;
        var s = "action_" + this.n;
        this.map.set(s, action);
        var t = (data) => action.actionT(data);
        this.event.on(s, t);
    }
    removeActionT(action) {
    }
    clearActionsT() {
    }
    actionT(t) {
    }
    isEmptyActionT() {
        return false;
    }
}
exports.ListenerEventT = ListenerEventT;
//# sourceMappingURL=ListenerEventT.js.map