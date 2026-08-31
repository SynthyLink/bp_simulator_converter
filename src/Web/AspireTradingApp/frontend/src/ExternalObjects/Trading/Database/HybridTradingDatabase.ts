import { EmptyObject } from "../../../Library/EmptyObject"
import type { ISaveTradingDatabase } from "../Interfaces/ISaveTradingDatabase"
import type { ITradingDatabaseHistoryInterface } from "../Interfaces/ITradingDatabaseHistoryInterface"
import type { HistoryMessage } from "./HistoryMessage"

export class HybridTradindDatabase extends EmptyObject implements ITradingDatabaseHistoryInterface {
    database !: ITradingDatabaseHistoryInterface
    copy !: ITradingDatabaseHistoryInterface
    memory !: ISaveTradingDatabase

    constructor(database: ITradingDatabaseHistoryInterface, copy : ITradingDatabaseHistoryInterface) {
        super("")
        this.database = database
        this.copy = copy
        this.memory = copy as unknown as ISaveTradingDatabase
        this.types.push("ITradingDatabaseHistoryInterface")
        this.types.push("HybridTradindDatabase")
        this.typeName = "HybridTradindDatabase"
    }

    async getSymbolsAsync(): Promise<string[][]> {
        let s = await this.copy.getSymbolsAsync()
        if (s.length > 0) return s
        s = await this.database.getSymbolsAsync()
        if (s.length > 0) this.memory.saveSymbols(s)
        return s
    }

    async getHistoricalDataMessageDateTimesAsync(id: any, period: string, symbol: string, begin: number, end: number,
        cancellation: AbortController): Promise<HistoryMessage[]> {
        let h = await this.copy.getHistoricalDataMessageDateTimesAsync(id, period, symbol, begin, end, cancellation)
        if (h.length > 0) return h
        h = await this.database.getHistoricalDataMessageDateTimesAsync(id, period, symbol, begin, end, cancellation)

        if (h.length > 0) this.memory.saveHistoricalDataMessageDateTimes(id, period, symbol, begin, end, h)
        return h
    }
}