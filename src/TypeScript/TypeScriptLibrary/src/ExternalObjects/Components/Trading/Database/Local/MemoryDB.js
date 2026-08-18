"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryDB = void 0;
const DateTimeConverter_1 = require("../../../../Library/Utilities/DateTime/DateTimeConverter");
class MemoryDB {
    converter = new DateTimeConverter_1.DateTimeConverter();
    getIntervalAsync(symbol) {
        let n = [];
        if (this.map.has(symbol)) {
            let m = this.map.get(symbol);
            if (m != undefined)
                n = m;
        }
        return new Promise((resolve, reject) => {
            resolve(n);
            this.any = reject;
        });
    }
    setIntervalAsync(symbol, i) {
        this.map.set(symbol, i);
        return new Promise((resolve, reject) => {
            resolve();
            this.any = reject;
        });
    }
    writeHistoryAsync(symbol, begin, end, history) {
        if (history.length > 0) {
            this.maph.set(symbol, history);
            this.map.set(symbol, [begin, end]);
        }
        return new Promise((resolve, reject) => {
            resolve();
            this.any = reject;
        });
    }
    clearHistoryAsync(symbol) {
        this.maph.set(symbol, []);
        if (this.map.has(symbol))
            this.map.set(symbol, []);
        return new Promise((resolve, reject) => {
            resolve();
            this.any = reject;
        });
    }
    readHistoryAsync(symbol, begin, end) {
        let h = [];
        //  let be = this.converter.fromOADate(begin).getSeconds() * 10000000
        //  let en = this.converter.fromOADate(end).getSeconds() * 10000000
        if (this.maph.has(symbol)) {
            let hh = this.maph.get(symbol);
            if (hh != null) {
                let b = hh[0].date;
                let e = hh[hh.length - 1].date;
                let cond = b >= begin && e <= end;
                if (cond) {
                    for (let x of hh) {
                        if (x.date < begin)
                            continue;
                        if (x.date > end)
                            break;
                        h.push(x);
                    }
                }
                else {
                    this.maph.set(symbol, []);
                    this.map.set(symbol, []);
                }
            }
        }
        return new Promise((resolve, reject) => {
            console.log(h.length, "hhhhh");
            resolve(h);
            this.any = reject;
        });
    }
    map = new Map;
    maph = new Map;
    any;
}
exports.MemoryDB = MemoryDB;
//# sourceMappingURL=MemoryDB.js.map