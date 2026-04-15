"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScadaDesktop = void 0;
const ScadaInterface_1 = require("./ScadaInterface");
class ScadaDesktop extends ScadaInterface_1.ScadaInterface {
    constructor(componentCollection) {
        super();
        this.types.push("ScadaDesktop");
        this.typeName = "ScadaDesktop";
        this.componentCollection = componentCollection;
    }
    getObjectCollection() {
        return this.componentCollection.getObjectCollection();
    }
    getScadaObject(name, type) {
        return this.performer.getCollectionObject(this.componentCollection, name, type);
    }
    setScadaEnabled(enabled) {
        this.runtime.setComponentCollectionRunning(enabled);
    }
    isScadaEnabled() {
        return this.runtime.isComponentCollectionRunning();
    }
}
exports.ScadaDesktop = ScadaDesktop;
//# sourceMappingURL=ScadaDesktop.js.map