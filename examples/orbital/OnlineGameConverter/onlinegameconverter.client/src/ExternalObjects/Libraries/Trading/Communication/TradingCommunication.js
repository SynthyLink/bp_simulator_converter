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
exports.TradingCommunication = void 0;
const http_interface_1 = require("../../../../Library/Communications/http/http_interface");
class TradingCommunication extends http_interface_1.HttpCommunication {
    getSymbolsAsync(controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.http_cancel({
                path: '/orbital/initial',
            }, controller);
            if (result.ok && result.body) {
                return result.body;
            }
            return new Map();
        });
    }
}
exports.TradingCommunication = TradingCommunication;
//# sourceMappingURL=TradingCommunication.js.map