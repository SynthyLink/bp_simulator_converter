"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaPerformer = void 0;
const Performer_1 = require("../Performer");
class ScadaPerformer {
    constructor() {
        this.pefrormer = new Performer_1.Performer();
    }
    setScada(collection, scada) {
        this.pefrormer.forEach(collection, this, "IScadaConsumer");
    }
    actionT(t) {
        t.setConsumerScada(this.scada);
    }
    isEmptyActionT() { return false; }
}
exports.ScadaPerformer = ScadaPerformer;
//# sourceMappingURL=ScadaPerformer.js.map