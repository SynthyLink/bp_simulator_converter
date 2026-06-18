"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingDataQuery = void 0;
const CategoryObject_1 = require("../../../Library/CategoryObject");
const TradinHistoryDatabse_1 = require("./TradinHistoryDatabse");
class TradingDataQuery extends CategoryObject_1.CategoryObject {
    inter = (0, TradinHistoryDatabse_1.getHistoryDatabase)();
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
        var sym = await this.inter.getSymbolsAsync(controller);
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
//# sourceMappingURL=TradingDataQuery.js.map