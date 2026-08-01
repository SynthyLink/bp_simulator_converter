import type { HistoryMessage } from "./Database/HistoryMessage";
import type { ILocalDB } from "./Database/Local/Interfaces/ILocalDB";

export class TradingPerformer {
    constructor(local: ILocalDB) {
        this.local = local;
    }

    writeHistory(symbol: string, history: HistoryMessage[]): void {
        let p = this.local.getInterval(symbol);
        if (p.length === 0)
            this.local.clearHistory(symbol)
        this.local.writeHistory(symbol, history)
        
    }

    readHistory(symbol: string, begin: number, end: number): HistoryMessage[] {
        let p = this.local.getInterval(symbol);
        if (p.length === 0) return []
        if (p[0] > begin) return []
        if (p[1] > end) return []
        return this.local.readHistory(symbol, begin, end)
    }


    local !: ILocalDB
}