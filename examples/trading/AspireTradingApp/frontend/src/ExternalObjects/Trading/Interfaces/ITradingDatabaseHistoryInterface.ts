import type { HistoryMessage } from "../Database/HistoryMessage";

export interface ITradingDatabaseHistoryInterface {

    getSymbolsAsync(): Promise<string[][]>

    getHistoricalDataMessageDateTimesAsync(id: any, period: string,  symbol: string, begin: number,
        end: number, cancellation: AbortController): Promise<HistoryMessage[]>;

}