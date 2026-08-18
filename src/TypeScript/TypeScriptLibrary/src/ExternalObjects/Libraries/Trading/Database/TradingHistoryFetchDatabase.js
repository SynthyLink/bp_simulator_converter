"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingHistoryFetchDatabase = void 0;
const TradingCommunication_1 = require("../Communication/TradingCommunication");
let communication = new TradingCommunication_1.TradingCommunication();
class TradingHistoryFetchDatabase {
    async getSymbolsAsync(cancel) {
        var map = await communication.getSymbolsAsync(cancel);
        return map;
    }
    getHistoricalDataMessageDateTimesAsync(id, begin, end, cancellation) {
        throw new Error("Method not implemented.");
    }
}
exports.TradingHistoryFetchDatabase = TradingHistoryFetchDatabase;
//# sourceMappingURL=TradingHistoryFetchDatabase.js.map