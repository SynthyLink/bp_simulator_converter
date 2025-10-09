import { HttpCommunication } from "../../Library/Communications/http/http_interface";
import type { DataQueryInit } from "./DataQureyInit";
import type { HistoricalDataMessageNumber } from "./HistoricalDataMessageNumber";

export class TradingCommunication extends HttpCommunication {

    async tradingSymbols(abort: AbortController): Promise<Map<string, string>> {
        var map = new Map<string, string>();
        const result = await this.http_cancel<Map<string, string>>({
            path: '/donchiantradingstratergy/symbols',
        }, abort);
        if (result.ok && result.body) {
            return result.body;
        } else {
            return map;
        }
    }

    public async getTradingData(
        condition: DataQueryInit, controller: AbortController
    ): Promise<HistoricalDataMessageNumber[] | undefined> {
        const result = await this.http_cancel<HistoricalDataMessageNumber[], DataQueryInit>({
            path: "/donchiantradingstratergy",
            method: "post",
            body: condition,
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        else {
            return undefined;
        }
    }


}