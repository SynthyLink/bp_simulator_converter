import { OwnError } from "../../../Library/ErrorHandler/OwnError";
import { TradingCommunication } from "../Communication/TradingCommunication"
import type { ITradingDatabaseHistoryInterface } from "./ITradingDatabaseHistoryInterface"

let communication = new TradingCommunication()
export class TradingHistoryFetchDatabase implements ITradingDatabaseHistoryInterface {

    async getSymbolsAsync(): Promise<string[][]> {
        let map = await communication.getSymbolsAsync();
        return map;
    }

    getHistoricalDataMessageDateTimesAsync(id: any, begin: number, end: number, cancellation: AbortController): Promise<[]> {
        this.any = id
        this.any = begin
        this.any = end
        this.any = cancellation
        throw new OwnError("", "")
 
    }

    any : any
}
