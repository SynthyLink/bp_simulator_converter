import type { ITradingDatabaseHistoryInterface } from "./ITradingDatabaseHistoryInterface";

export class FictionTradingDatabase implements ITradingDatabaseHistoryInterface {
    getSymbolsAsync(cancel: AbortController): Promise<Map<String, any>> {
        throw new Error("Method not implemented.");
        this.any = cancel

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