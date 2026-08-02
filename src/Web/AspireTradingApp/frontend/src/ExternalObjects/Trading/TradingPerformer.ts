import type { HistoryMessage } from "./Database/HistoryMessage";
import type { ILocalDB } from "./Database/Local/Interfaces/ILocalDB";

export class TradingPerformer {
    constructor(local: ILocalDB) {
        this.local = local;
    }

    async writeHistoryAsync(symbol: string, history: HistoryMessage[]): Promise<void> {
        console.log("WH")
       let p = await this.local.getIntervalAsync(symbol);
        if (p.length === 0)
            this.local.clearHistoryAsync(symbol)
        await this.local.writeHistoryAsync(symbol, history)
    }

    async readHistory(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        console.log("RH")
        let p = await this.local.getIntervalAsync(symbol);
        if (p.length === 0) return []
        if (p[0] > begin) return []
        if (p[1] > end) return []
        return await this.local.readHistoryAsync(symbol, begin, end)
    }


    local !: ILocalDB
}