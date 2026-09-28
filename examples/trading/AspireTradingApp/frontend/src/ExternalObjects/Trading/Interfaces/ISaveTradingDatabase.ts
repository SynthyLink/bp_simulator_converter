import type { HistoryMessage } from "../Database/HistoryMessage";

export interface ISaveTradingDatabase {
    saveHistoricalDataMessageDateTimes(id: any, period: string, symbol: string, begin: number,
        end: number, messages: HistoryMessage[]): boolean
    saveSymbols(sym: string[][]) : void
}