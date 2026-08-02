import type { HistoryMessage } from "../../HistoryMessage"

export interface ILocalDB {
    getIntervalAsync(symbol: string): Promise<number[]>
    setIntervalAsync(symbol: string, i: number[]): Promise<void>
    writeHistoryAsync(symbol: string, history: HistoryMessage[]): Promise<void>
    clearHistoryAsync(symbol: string): Promise<void>
    readHistoryAsync(symbol: string, begin: number, end: number): Promise<HistoryMessage[]>

}