
export interface ITradingDatabaseHistoryInterface {

    getSymbolsAsync(cancel: AbortController): Promise<Map<String, any>>

    getHistoricalDataMessageDateTimesAsync(id: any, begin: number,
        end: number, cancellation: AbortController): Promise<[]>;

}