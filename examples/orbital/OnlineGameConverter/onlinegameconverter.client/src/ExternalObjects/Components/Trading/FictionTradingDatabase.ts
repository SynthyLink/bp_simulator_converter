import type { ITradingDatabaseHistoryInterface } from "../../Libraries/Trading/Database/ITradingDatabaseHistoryInterface";

export class FictionTradingDatabase implements ITradingDatabaseHistoryInterface {
    getSymbolsAsync(cancel: AbortController): Promise<Map<String, String>> {
        throw new Error("Method not implemented.");
    }
    getHistoricalDataMessageDateTimesAsync(id: Any, begin: number, end: number, cancellation: AbortController): Promise<[]> {
        throw new Error("Method not implemented.");
    }

}