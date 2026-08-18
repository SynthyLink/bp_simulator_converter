"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDB = void 0;
const DataAccess_class_1 = require("../../../../Library/IndexedDB/DataAccess.class");
const DBAccess_class_1 = require("../../../../Library/IndexedDB/DBAccess.class");
const ItemHistoty_1 = require("./ItemHistoty");
const ItemInterval_1 = require("./ItemInterval");
class LocalDB {
    async setIntervalAsync(symbol, i) {
        this.any = symbol;
        this.any = i;
        throw new Error("Method not implemented.");
    }
    async getIntervalAsync(symbol) {
        let da = new DataAccess_class_1.DataAccess("Trading", "Interval");
        let r = [];
        try {
            let d = await da.get(symbol);
            if (d !== undefined) {
                r.push(d.begin);
                r.push(d.end);
            }
        }
        catch (err) { }
        da.close();
        return r;
    }
    //    dbacess: DBAccess = new DBAccess()
    async writeHistoryAsync(symbol, begin, end, history) {
        this.any = begin;
        this.any = end;
        if (history.length != 0) {
            // let b = history[0].date;
            // let e = history[history.length - 1].date
            let init = [];
            let i = 0;
            let da = new DataAccess_class_1.DataAccess("Trading", symbol);
            for (var h of history) {
                let hh = new ItemHistoty_1.ItemHistory(i + "", h);
                ++i;
                let pr = da.add(hh);
                init.push(pr);
            }
            console.log("FINISH", init.length);
            await Promise.all(init);
            console.log("FINISH PROMISE");
            await da.close();
            let b = history[0].date;
            let e = history[history.length - 1].date;
            let ii = new ItemInterval_1.ItemInterval(symbol, b, e);
            let db = new DataAccess_class_1.DataAccess("Trading", "Interval");
            await db.add(ii);
            await db.close();
        }
    }
    async clearHistoryAsync(symbol) {
        this.any = symbol;
        let da = new DataAccess_class_1.DataAccess("Trading", symbol);
        await da.clear();
        let db = new DataAccess_class_1.DataAccess("Trading", "Interval");
        await db.remove(symbol);
        await da.close();
        await db.close();
    }
    async readHistoryAsync(symbol, begin, end) {
        this.any = symbol;
        this.any = begin;
        this.any = end;
        let da = new DataAccess_class_1.DataAccess("Trading", symbol);
        let p = await da.retrieve();
        let ii = p.length;
        if (ii > 3)
            ii = 3;
        await da.close();
        return p;
    }
    any;
    dbAcces = new DBAccess_class_1.DBAccess();
}
exports.LocalDB = LocalDB;
//# sourceMappingURL=LocalDB.js.map