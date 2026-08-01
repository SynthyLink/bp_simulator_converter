import type { HistoryMessage } from "../../HistoryMessage"

export interface ILocalDB {
    getInterval(symbol: string): number[]
    setInterval(symbol: string, i : number[]) : void
    writeHistory(symbol: string, history: HistoryMessage[]): void
    clearHistory(symbol: string): void
    readHistory(symbol: string, begin: number, end: number): HistoryMessage[]

}