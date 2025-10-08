import { HttpCommunication } from "../../Library/Communications/http/http_interface";

export class TradingCommunication extends HttpCommunication {

    async tradingSymbols(abort: AbortController): Promise<Map<string, string>> {
        var map = new Map<string, string>();
        const result = await this.http_cancel<Map<string, string>>({
            path: '/donchiantradingstratergy/symbols',
        }, abort);
        if (result.ok && result.body) {
            console.log(result.body);
            return result.body;
        } else {
            return map;
        }
    }
}