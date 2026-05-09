"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineWatch = void 0;
const ActionArrayT_1 = require("../Generic/ActionArrayT");
class EngineWatch {
    constructor(interval) {
        this.enabled = false;
        this.action = new ActionArrayT_1.ActionArrayT();
        this.timerID = 0;
        this.start = 0;
        this.interval = 0;
        this.interval = interval;
    }
    isEngineEnabled() {
        return this.enabled;
    }
    setEngineEnabled(enabled) {
        if (enabled == this.enabled)
            return false;
        this.enabled = enabled;
        if (enabled) {
            const tick = () => {
                var date = new Date();
                var t = this.currentTime() - this.start;
                this.setTime(t);
            };
            this.start = this.currentTime();
            this.timerID = setInterval(() => tick(), this.interval);
        }
        else {
            clearInterval(this.timerID);
        }
        return true;
    }
    getEngineAction() {
        return this.action;
    }
    setTime(time) {
        if (this.enabled)
            this.action.actionT(time);
    }
    currentTime() {
        const date = new Date();
        const t = date.getTime();
        return 0.001 * t;
    }
}
exports.EngineWatch = EngineWatch;
//# sourceMappingURL=EnfineWatch.js.map