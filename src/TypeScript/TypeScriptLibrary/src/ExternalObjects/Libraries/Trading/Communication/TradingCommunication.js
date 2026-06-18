"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingCommunication = void 0;
const http_interface_1 = require("../../../../Library/Communications/http/http_interface");
class TradingCommunication extends http_interface_1.HttpCommunication {
    async getSymbolsAsync(controller) {
        const result = await this.http_cancel({
            path: '/orbital/initial',
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        return new Map();
    }
}
exports.TradingCommunication = TradingCommunication;
//# sourceMappingURL=TradingCommunication.js.map