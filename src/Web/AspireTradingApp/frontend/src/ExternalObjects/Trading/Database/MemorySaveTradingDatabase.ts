import { EmptyObject } from "../../../Library/EmptyObject";
import type { ISaveTradingDatabase } from "../Interfaces/ISaveTradingDatabase";
import type { ITradingDatabaseHistoryInterface } from "../Interfaces/ITradingDatabaseHistoryInterface";
import type { HistoryMessage } from "./HistoryMessage";

export class MemorySaveTradingDatabase extends EmptyObject implements ITradingDatabaseHistoryInterface, ISaveTradingDatabase {

    map: Map<string, Map<string, HistoryMessage[]>> = new Map

    symbols: string[][] = []
    constructor() {
        super("")
    }

    saveHistoricalDataMessageDateTimes(id: any, period: string, symbol: string, begin: number, end: number, messages: HistoryMessage[]): boolean {
        this.any = id
        let mp: Map<string, HistoryMessage[]> = new Map
        if (this.map.has(symbol)) {
            let mm = this.map.get(symbol)
            if (mm !== undefined) mp = mm
        }
        else {
            this.map.set(symbol, mp)
        }
        mp.set(period, messages)
        this.any = begin
        this.any = end
        return true
    }

    saveSymbols(sym: string[][]): void {
        this.symbols = sym;
    }

    getSymbolsAsync(): Promise<string[][]> {
        return new Promise<string[][]>((resolve, reject) => {
            resolve(this.symbols)
            this.any = reject
        })
     }

    getHistoricalDataMessageDateTimesAsync(id: any, period: string, symbol:
        string, begin: number, end: number, cancellation: AbortController): Promise<HistoryMessage[]> {
        this.any = cancellation
        this.any = id
        let h: HistoryMessage[] = []
        if (this.map.has(symbol)) {
            let m = this.map.get(symbol)
            if (m?.has(period)) {
                let hh = m.get(period)
                if (hh !== undefined)
                this.fill(begin, end, h, hh)
            }
        }
        return new Promise<HistoryMessage[]>((resolve, reject) => {
            resolve(h)
            this.any = reject
        })
    }

    fill(begin: number, end: number, h: HistoryMessage[], hh: HistoryMessage[]): void {
        let x = hh[0]
        if (x.date < begin) return
        x = hh[hh.length - 1]
        if (x.date > end) return
        for (var xx of hh) {
            if (xx.date < begin) continue
            if (xx.date > end) break
            h.push(xx)
        }

    }

    any : any
}