"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaDesktop = void 0;
const FictiveDesktop_1 = require("../Fiction/FictiveDesktop");
const ScadaInterface_1 = require("./ScadaInterface");
class ScadaDesktop extends ScadaInterface_1.ScadaInterface {
    constructor() {
        super(...arguments);
        this.components = new FictiveDesktop_1.FictiveDesktop();
    }
    getObjectCollection() {
        return this.components.getObjectCollection();
    }
    getScadaObject(name, type) {
        return this.performer.getCollectionObject(this.components, name, type);
    }
}
exports.ScadaDesktop = ScadaDesktop;
//# sourceMappingURL=ScadsDessktop.js.map