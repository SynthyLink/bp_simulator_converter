"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingDataQuery = void 0;
const CategoryObject_1 = require("../../../Library/CategoryObject");
const Measurement_1 = require("../../../Library/Measurements/Measurement");
class TradingDataQuery extends CategoryObject_1.CategoryObject {
    static inter;
    symbols = new Map();
    constructor(desktop, name) {
        super(desktop, name);
        this.typeName = "TradingDataQuery";
        this.types.push("TradingDataQuery");
        this.types.push("IInitializeTask");
        this.types.push("IIterator");
        this.types.push("IMeasurements");
    }
    getMeasurementsCount() {
        return 0;
    }
    getMeasurement(i) {
        throw new Error("Method not implemented.");
    }
    updateMeasurements() {
    }
    addMeasurement(measurement) {
        throw new Error("Method not implemented.");
    }
    nextIterator() {
        ++this.step;
        this.current = this.data[this.step];
    }
    resetIterator() {
        this.step = 0;
    }
    async initializeTaskAsync(controller) {
        var sym = await TradingDataQuery.inter.getSymbolsAsync(controller);
        this.performer.copyMap(sym, this.symbols);
    }
    id;
    begin = 0;
    end = 0;
    period = "";
    data = [];
    current;
    step = 0;
}
exports.TradingDataQuery = TradingDataQuery;
class BasicMeasurement extends Measurement_1.Measurement {
    query;
    constructor(name, query, type) {
        super(name, type);
        this.query = query;
    }
    getAssociatedObject() {
        return this.query;
    }
    setAssociatedObject(obj) {
    }
}
//# sourceMappingURL=TradingDataQuery.js.map