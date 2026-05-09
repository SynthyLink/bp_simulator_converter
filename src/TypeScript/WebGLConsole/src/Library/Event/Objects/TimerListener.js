"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerListener = void 0;
const ListenerEventT_1 = require("./ListenerEventT");
class TimerListener extends ListenerEventT_1.ListenerEventT {
    constructor(client) {
        super(client);
        this.client = client;
    }
    isEngineEnabled() {
        return this.isRunning();
    }
    setEngineEnabled(enabled) {
        throw new Error("Method not implemented.");
    }
    getEngineAction() {
        return this;
    }
    startItself(start) {
        this.client.kill();
        return true;
    }
    isRunning() {
        return true;
    }
}
exports.TimerListener = TimerListener;
//# sourceMappingURL=TimerListener.js.map