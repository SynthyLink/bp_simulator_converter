import { DateTimeConverter } from "../../../../Library/Utilities/DateTime/DateTimeConverter";
import type { HistoryMessage } from "../HistoryMessage";
import type { ILocalDB } from "./Interfaces/ILocalDB";

export class MemoryDB implements ILocalDB {

    converter: DateTimeConverter = new DateTimeConverter()
    getIntervalAsync(symbol: string): Promise<number[]> {
        let n: number[] = [];
        if (this.map.has(symbol)) {
            let m = this.map.get(symbol)
            if (m != undefined) n = m
        }
        return new Promise<number[]>((resolve, reject) => {
            resolve(n)
            this.any = reject
        }
        )
    }
    setIntervalAsync(symbol: string, i: number[]): Promise<void> {
        this.map.set(symbol, i)
        return new Promise<void>((resolve, reject) => {
            resolve()
            this.any = reject
    }
        )
    }

    writeHistoryAsync(symbol: string, begin: number, end: number, history: HistoryMessage[]): Promise<void> {
        if (history.length > 0) {
            this.maph.set(symbol, history)
            this.map.set(symbol, [begin, end])
        }
        return new Promise<void>((resolve, reject) => {
            resolve();
            this.any = reject
      }
        )

    }

    clearHistoryAsync(symbol: string): Promise<void> {
        this.maph.set(symbol, [])
        if (this.map.has(symbol)) this.map.set(symbol, [])
        return new Promise<void>((resolve, reject) => {
            resolve()
             this.any = reject
      }
        )
    }

    readHistoryAsync(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        let h: HistoryMessage[] = []
      //  let be = this.converter.fromOADate(begin).getSeconds() * 10000000
      //  let en = this.converter.fromOADate(end).getSeconds() * 10000000
        if (this.maph.has(symbol))
        {
            let hh = this.maph.get(symbol)
            if (hh != null) {
                let b = hh[0].date
                let e = hh[hh.length - 1].date
                let cond = b >= begin && e <= end
                if (cond) {
                    for (let x of hh) {
                        if (x.date < begin) continue
                        if (x.date > end) break
                        h.push(x)
                    }
                }
                else {
                    this.maph.set(symbol, [])
                    this.map.set(symbol, [])
                }
            }

        }
  

        return new Promise<HistoryMessage[]>((resolve, reject) => {
            resolve(h)
            this.any = reject
        }
        )

    }

    map: Map<string, number[]> = new Map
    maph: Map<string, HistoryMessage[]> = new Map

    any : any

}