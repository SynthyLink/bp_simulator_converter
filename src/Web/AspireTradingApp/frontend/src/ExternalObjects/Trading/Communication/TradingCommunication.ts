import { HttpCommunication } from "../../../Library/Communications/http/http_interface";
import { Donchian } from "../Algorithms/Donchian";
import type { TradingDataQuery } from "../Components/TradingDataQuery";
import type { HistoryMessage } from "../Database/HistoryMessage";
import { MemoryDB } from "../Database/Local/MemoryDB";
import type { Initial } from "../Initial";
import { TradingPerformer } from "../TradingPerformer";


export class TradingCommunication extends HttpCommunication {

    url: string = "";

    symbols: string[][] = [];

    tPerformer!: TradingPerformer; // = new TradingPerformer(new MemoryDB())

    initial!: Initial;

    public getTradingPerformer(): TradingPerformer {
        return this.tPerformer;
    }

    public async getInitialAsync(controller: AbortController): Promise<Initial | undefined> {
        if (this.initial != undefined) return this.initial;
        if (this.url.length === 0) return undefined;
        try {
            const result = await this.http_cancel<string>({
                path: "/api/trading/initial",
                method: "get",
                body: undefined,
            }, controller);
            if (result.ok && result.body) {
                return result.body as unknown as Initial;
            }
            else {
                return undefined;
            }
        }
        catch (err) {
            // setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching trading symbols:', err);
            // console.log(err)
        } finally {
            //setLoading(false);
        }
        return undefined;
    }

    public async getAnalysisAsync(map: Map<string, any>, controller: AbortController):
        Promise<Map<string, any>[] | undefined>

 {
        let json = JSON.stringify(Object.fromEntries(map));
        let s = "";
        if (json !== undefined) s = json;
        const result = await this.http_cancel<string, string>({
            path: "/api/trading/tradinganalysis",
            method: "post",
            body: s,
        }, controller);
        if (result.ok && result.body) {
            let mp = result.body as unknown as Map<string, any>[]
            console.log("mp", mp)
            return mp;
        }
        return []
    }

    public async getHistoryAsync(map: Map<string, any>, controller: AbortController): Promise<HistoryMessage[]> {
        let b = Number(map.get("b"));
        let e = Number(map.get("e"));
        let sym = map.get("s") + "";
        //  let p = map.get("p") + "";
        //   await this.createDb()
        let r = await this.tPerformer.readHistory(sym, b, e);
        if (r.length > 0) {
            console.log(r[0], "ro");
            return r;
        }
        let json = JSON.stringify(Object.fromEntries(map));
        let s = "";
        if (json !== undefined) {
            s = json;
        }
        try {
            const result = await this.http_cancel<string, string>({
                path: "/api/trading/tradinghistory",
                method: "post",
                body: s,
            }, controller);
            if (result.ok && result.body) {
                let res = result.body as unknown as HistoryMessage[];
                await this.tPerformer.writeHistoryAsync(sym, b, e, res);
                return res;
            }
            else {
                return [];
            }
        }
        catch (err) {
            // setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching trading symbols:', err);
            // console.log(err)
        } finally {
            //setLoading(false);
        }
        return [];
    }

    public deleteDb1(): void {
        var req = indexedDB.deleteDatabase("Trading");
        req.onsuccess = () => {
            console.log("Deleted database successfully");
        };
        req.onerror = () => {
            console.log("Couldn't delete database");
        };
        req.onblocked = () => {
            console.log("Couldn't delete database due to the operation being blocked");
        };

    }


    createDb1(): void {
        var req = indexedDB.open("Trading", 1);
        req.onsuccess = () => {
            console.log("Open database successfully");
        };
        req.onerror = () => {
            console.log("Couldn't open database");
        };
        req.onblocked = () => {
            console.log("Couldn't open database due to the operation being blocked");
        };

        req.onupgradeneeded = () => {
            console.log("UPGRADE");
            let db = req.result;
            let n = db.objectStoreNames;
            if (n.length > 0) return;
            db.createObjectStore("Interval", { keyPath: 'uid' });
            for (let s of this.symbols) {
                db.createObjectStore(s[0], { keyPath: 'uid' });
            }

        };


    }


    public async getSymbolsIntretrnalAsync(): Promise<string[][]> {
        if (this.symbols.length > 0) return this.symbols;


        // this.deleteDb()
        // return []
        try {
            let s = "/api/trading/tradingsymbols";
            const response = await fetch(s);
            if (!response.ok) {
            }
            else {
                let u = response.url;
                this.url = u.substring(0, u.length - s.length);
                this.setCommunicationServer(this.url);
                const data = await response.json();
                this.symbols = data;
                return data;
            }
        }
        catch (err) {
            // setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching trading symbols:', err);
            // console.log(err)
        } finally {
            //setLoading(false);
        }
        return [];
    }

    public async getSymbolsAsync(): Promise<string[][]> {
        if (this.symbols.length > 0) return this.symbols;
        let controller = new AbortController();
        let desktop = new Donchian();
        this.tPerformer = new TradingPerformer(new MemoryDB(), desktop, this);
        await desktop.loadAsync(controller);
        let q = desktop.getCategoryObject("Trading") as unknown as TradingDataQuery;
        this.symbols = q.getSymbolsStr();
        return this.symbols;
    }

}
