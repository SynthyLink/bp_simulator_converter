import  { DataAccess } from "../../../../Library/IndexedDB/DataAccess.class";
import { DBAccess } from "../../../../Library/IndexedDB/DBAccess.class";
import type { IDBAccess } from "../../../../Library/IndexedDB/interfaces/IDBAccess.interface";
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
        let da = new DataAccess<ItemInterval>("Trading", "intervals")
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
        return r;
    }

    dbacess: DBAccess = new DBAccess()

    async writeHistoryAsync(symbol: string, history: HistoryMessage[]): Promise<void> {
        if (history.length != 0) {
           // let b = history[0].date;
           // let e = history[history.length - 1].date
            let init = []
            let i = 0;
            let dba = this.dbacess.instance;
           // await dba.connect("Trading", symbol)
            let da = new DataAccess<ItemHistory>("Trading", symbol)
            for (var h of history) {
                let hh = new ItemHistory(i + "", h);
                ++i;
                let pr = await da.add(hh)
                init.push(pr)
                if (i < 10) {
                    console.log(hh)
                    console.log(da, "DA")
                }
            }
          //  Promise.all(init)
            console.log(da, "DAA")
     }
    }

    async clearHistoryAsync(symbol: string): Promise<void> {
        this.any = symbol
   //     let da = new DataAccess<ItemHistory>("Trading", symbol)
        
    }


    async readHistoryAsync(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        this.any = symbol
        this.any = begin
        this.any = end
        let da = new DataAccess<ItemHistory>("Trading", symbol)
        console.log(da, "RTH")
        let p = await da.retrieve()
        console.log(p.length, "PPP")
        return p;
    }

    any: any

    protected dbAcces: IDBAccess = new DBAccess();
    
}