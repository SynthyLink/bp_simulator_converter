import type { HistoryMessage } from "../HistoryMessage";
import type { ILocalDB } from "./Interfaces/ILocalDB";

export class MemoryDB implements ILocalDB {
    getIntervalAsync(symbol: string): Promise<number[]> {
        let n: number[] = [];
        if (this.map.has(symbol)) {
            let m = this.map.get(symbol)
            if (m != undefined) n = m
        }
        return new Promise<number[]>((resolve, reject) => {
            console.log("n", n)
            resolve(n)
            this.any = reject
        }
        )
    }
    setIntervalAsync(symbol: string, i: number[]): Promise<void> {
        this.map.set(symbol, i)
        console.log(this.map, "map")
        return new Promise<void>((resolve, reject) => {
            resolve()
            this.any = reject
    }
        )
    }

    writeHistoryAsync(symbol: string, history: HistoryMessage[]): Promise<void> {
        console.log(history.length)
        if (history.length > 0) {
            this.maph.set(symbol, history)
            this.map.set(symbol, [history[0].date, history[history.length - 1].date])
            console.log(this.map)
        }
        return new Promise<void>((resolve, reject) => {
            resolve();
            this.any = reject
      }
        )

    }

    clearHistoryAsync(symbol: string): Promise<void> {
        this.maph.set(symbol, [])
        console.log("clear")
        if (this.map.has(symbol)) this.map.set(symbol, [])
        return new Promise<void>((resolve, reject) => {
            resolve()
             this.any = reject
      }
        )
    }

    readHistoryAsync(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        let h: HistoryMessage[] = []
        console.log("READ")
        if (this.maph.has(symbol))
        {
            let hh = this.maph.get(symbol)
            if (hh != null) {
                let b = hh[0].date
                let e = hh[hh.length - 1].date
                let cond = b >= begin || e <= end
                console.log(cond)
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
        console.log(h.length, "hhhhhHH")
  

        return new Promise<HistoryMessage[]>((resolve, reject) => {
            console.log(h.length, "hhhhh")
            resolve(h)
            this.any = reject
        }
        )

    }

    map: Map<string, number[]> = new Map
    maph: Map<string, HistoryMessage[]> = new Map

    any : any

}