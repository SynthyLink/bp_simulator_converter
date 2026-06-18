import type { ITradingDatabaseHistoryInterface } from "../../Libraries/Trading/Database/ITradingDatabaseHistoryInterface";

export class FictionTradingDatabase implements ITradingDatabaseHistoryInterface {
    getSymbolsAsync(cancel: AbortController): Promise<Map<String, String>> {
        this.any = cancel
        throw new Error("Method not implemented.");
    }
    getHistoricalDataMessageDateTimesAsync(id: any, begin: number, end: number, cancellation: AbortController): Promise<[]> {
        this.any = id
        this.any = begin
        this.any = end
        this.any = cancellation
        throw new Error("Method not implemented.");
    }

    any : any

}