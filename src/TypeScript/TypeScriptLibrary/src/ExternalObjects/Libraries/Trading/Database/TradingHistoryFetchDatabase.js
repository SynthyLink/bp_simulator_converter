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
exports.TradingHistoryFetchDatabase = void 0;
const TradingCommunication_1 = require("../Communication/TradingCommunication");
let communication = new TradingCommunication_1.TradingCommunication();
class TradingHistoryFetchDatabase {
    getSymbolsAsync(cancel) {
        return __awaiter(this, void 0, void 0, function* () {
            var map = yield communication.getSymbolsAsync(cancel);
            return map;
        });
    }
    getHistoricalDataMessageDateTimesAsync(id, begin, end, cancellation) {
        throw new Error("Method not implemented.");
    }
}
exports.TradingHistoryFetchDatabase = TradingHistoryFetchDatabase;
//# sourceMappingURL=TradingHistoryFetchDatabase.js.map