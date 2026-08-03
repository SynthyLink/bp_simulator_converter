import  { DataAccess } from "../../../../Library/IndexedDB/DataAccess.class";
import { DBAccess } from "../../../../Library/IndexedDB/DBAccess.class";
import type { IDBAccess } from "../../../../Library/IndexedDB/interfaces/IDBAccess.interface";
import type { Item } from "../../../../Library/IndexedDB/Item.class";
import type { HistoryMessage } from "../HistoryMessage";
import type { ILocalDB } from "./Interfaces/ILocalDB";
import { ItemHistory } from "./ItemHistoty";
import { ItemInterval } from "./ItemInterval";

export class LocalDB  implements ILocalDB {

    async setIntervalAsync(symbol: string, i: number[]): Promise<void> {
        this.any = symbol
        this.any = i

        throw new Error("Method not implemented.");
    }
    async getIntervalAsync(symbol: string): Promise<number[]> {
        let da = new DataAccess<ItemInterval>("Trading", "Interval")
        console.log(da, "SD")
        let r: number[] = []
        try {
            let d = await da.get(symbol);
            if (d !== undefined) {
                console.log(d, "d")
                r.push(d.begin)
                r.push(d.end)
            }
        }
        catch (err) { }
        da.close()
        return r;
    }
//    dbacess: DBAccess = new DBAccess()

    async writeHistoryAsync(symbol: string, history: HistoryMessage[]): Promise<void> {
        if (history.length != 0) {
            // let b = history[0].date;
            // let e = history[history.length - 1].date
            let init = []
            let i = 0;
            let da = new DataAccess<ItemHistory>("Trading", symbol)
            for (var h of history) {
                let hh = new ItemHistory(i + "", h);
                ++i;
                let pr = da.add(hh)
                init.push(pr)
                if (i < 7) {
                    console.log(hh, "DA")
                }
            }
            console.log("FINISH", init.length)
            await Promise.all(init)
            console.log("FINISH PROMISE")


            await da.close()
            let b = history[0].date
            let e = history[history.length - 1].date
            let ii = new ItemInterval(symbol, b, e)
            let db = new DataAccess<ItemInterval>("Trading", "Interval")
            await db.add(ii)
            console.log(ii, "IIII")
            console.log(db, "IIIIh")
            await db.close()
        }
    }


    async clearHistoryAsync(symbol: string): Promise<void> {
        this.any = symbol
        let da = new DataAccess<ItemHistory>("Trading", symbol)
        await da.clear();
        let db = new DataAccess<Item>("Trading", "Interval")
        await db.remove(symbol)
        await da.close()
        await db.close()
        
    }

    async readHistoryAsync(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        this.any = symbol
        this.any = begin
        this.any = end
        let da = new DataAccess<ItemHistory>("Trading", symbol)
        let p = await da.retrieve()
        let ii = p.length
        if (ii > 3) ii = 3;
        for (let x = 0; x < ii; ii++)
            console.log(p[x], "p")
        await da.close()
        return p;
    }

    any: any

    protected dbAcces: IDBAccess = new DBAccess();
    
}