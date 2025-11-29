import type Stream from "stream";

export interface ITradingDatabaseHistoryInterface {

    getSymbolsAsync(cancel: AbortController): Promise<Map<String, String>>

    getHistoricalDataMessageDateTimesAsync(id: Any, begin: number,
        end: number, cancellation: AbortController): Promise<[]>;

}