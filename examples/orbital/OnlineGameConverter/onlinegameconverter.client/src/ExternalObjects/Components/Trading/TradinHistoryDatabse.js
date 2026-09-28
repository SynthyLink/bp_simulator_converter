"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryDatabase = getHistoryDatabase;
const TradingHistoryFetchDatabase_1 = require("../../Libraries/Trading/Database/TradingHistoryFetchDatabase");
let database = new TradingHistoryFetchDatabase_1.TradingHistoryFetchDatabase();
function getHistoryDatabase() {
    return database;
}
//# sourceMappingURL=TradinHistoryDatabse.js.map