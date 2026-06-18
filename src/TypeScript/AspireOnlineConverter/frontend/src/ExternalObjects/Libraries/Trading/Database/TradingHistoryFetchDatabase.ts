import { TradingCommunication } from "../Communication/TradingCommunication";
import type { ITradingDatabaseHistoryInterface } from "./ITradingDatabaseHistoryInterface";

let communication = new TradingCommunication()
export class TradingHistoryFetchDatabase implements ITradingDatabaseHistoryInterface {
    async getSymbolsAsync(cancel: AbortController): Promise<Map<String, any>> {
        var map = await communication.getSymbolsAsync(cancel);
        return map;
    }
    getHistoricalDataMessageDateTimesAsync(id: any, begin: number, end: number, cancellation: AbortController): Promise<[]> {
        throw new Error("Method not implemented.");
        this.any = id
        this.any = begin
        this.any = end
        this.any = cancellation
    }
    any : any

}
