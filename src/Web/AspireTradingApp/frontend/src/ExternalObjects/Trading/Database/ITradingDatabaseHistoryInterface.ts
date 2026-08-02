
export interface ITradingDatabaseHistoryInterface {

    getSymbolsAsync(): Promise<string[][]>

    getHistoricalDataMessageDateTimesAsync(id: any, begin: number,
        end: number, cancellation: AbortController): Promise<[]>;

}