"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingDataQuery = void 0;
const CategoryObject_1 = require("../../../Library/CategoryObject");
const Performer_1 = require("../../../Library/Performer");
const TradinHistoryDatabse_1 = require("./TradinHistoryDatabse");
class TradingDataQuery extends CategoryObject_1.CategoryObject {
    constructor(desktop, name) {
        super(desktop, name);
        this.inter = (0, TradinHistoryDatabse_1.getHistoryDatabase)();
        this.performer = new Performer_1.Performer();
        this.begin = 0;
        this.end = 0;
        this.period = "";
        this.data = [];
        this.step = 0;
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
    initializeTaskAsync(controller) {
        return __awaiter(this, void 0, void 0, function* () {
            var sym = yield this.inter.getSymbolsAsync(controller);
        });
    }
}
exports.TradingDataQuery = TradingDataQuery;
//# sourceMappingURL=TradingDataQuery.js.map