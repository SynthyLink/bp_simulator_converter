import type { HistoryMessage } from "./Database/HistoryMessage";
import type { ILocalDB } from "./Database/Local/Interfaces/ILocalDB";

export class TradingPerformer {
    constructor(local: ILocalDB) {
        this.local = local;
    }

    async writeHistoryAsync(symbol: string, begin: number, end: number, history: HistoryMessage[]): Promise<void> {
        console.log("WH")
       let p = await this.local.getIntervalAsync(symbol);
        if (p.length === 0)
            this.local.clearHistoryAsync(symbol)
        await this.local.writeHistoryAsync(symbol, begin, end, history)
    }

    async readHistory(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        let p = await this.local.getIntervalAsync(symbol);
        let b = p.length === 0 || p[0] > begin || p[1] < end
        if (b) {
            await this.local.clearHistoryAsync(symbol)
            return [];
        }
        return await this.local.readHistoryAsync(symbol, begin, end)
    }


    local !: ILocalDB
}