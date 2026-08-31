import axios from "axios";
import { HttpCommunication } from "../../../Library/Communications/http/http_interface";
import { EmptyChecker } from "../../../Library/EmptyChecker";
import type { ICheck } from "../../../Library/Interfaces/ICheck";
import { UniversalFactory } from "../../../Library/UniversalFactory";
import { DonchianDesktop } from "../Algorithms/DonchianDesktop";
import type { HistoryMessage } from "../Database/HistoryMessage";
import type { Initial } from "../Initial";
import { TradingPerformer } from "../TradingPerformer";
import { CommunicationTradingDatabaseHistoryInterface } from "./CommunicationTradingDatabaseHistoryInterface";
import type { IShowObject } from "../../../Library/Show/Interfaces/IShowObject";
import { TradingOrderShow } from "../Components/TradingOrderShow";
import { MemorySaveTradingDatabase } from "../Database/MemorySaveTradingDatabase";
import { HybridTradindDatabase } from "../Database/HybridTradingDatabase";
import type { ITradingDatabaseHistoryInterface } from "../Interfaces/ITradingDatabaseHistoryInterface";


export class TradingCommunication extends HttpCommunication {

    url: string = "";

    symbols: string[][] = [];

    tPerformer!: TradingPerformer; // = new TradingPerformer(new MemoryDB())

    initial!: Initial;

    any: any
    constructor() {
        super();
    }
/*
    public getTradingPerformer(): TradingPerformer {
        return this.tPerformer;
    }
*/
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
            return mp;
        }
        return []
    }

    public async saveMapArray(map: string): Promise<boolean> {
        try {
            let url = this.server + "/api/trading/tradingsaveobject"
            this.any = axios.post(url, map)
            return true
        }
        catch (ex) {
        }
        return false;

    }

    public async saveStringAsync(s: string, controller: AbortController):
        Promise<boolean> {

        const result = await this.http_cancel<boolean, string>({
            path: "/api/trading/tradingsavestring",
            method: "post",
            body: s,
        }, controller);
        if (result.ok && result.body) {
            let mp = result.body as boolean
            return mp;
        }
        return false
    }


    an : any

    public async getHistoryAsync(map: Map<string, any>, controller: AbortController): Promise<HistoryMessage[]> {
        let b = Number(map.get("b"));
        let e = Number(map.get("e"));
        let sym = map.get("s") + "";
        this.any = b
        this.any = e
        this.any = sym
        //  let p = map.get("p") + "";
        //   await this.createDb()
     /*  let r = await this.tPerformer.readHistory(sym, b, e);
        if (r.length > 0) {
            return r;
        }*/
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
              //  await this.tPerformer.writeHistoryAsync(sym, b, e, res);
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
        this.symbols = await this.getSymbolsIntretrnalAsync()
        let data = new CommunicationTradingDatabaseHistoryInterface(new TradingCommunication())
        let mem = new MemorySaveTradingDatabase()
        let hybrid = new HybridTradindDatabase(data, mem)
        let factory = new UniversalFactory
        factory.addFactory<ITradingDatabaseHistoryInterface>(hybrid, "ITradingDatabaseHistoryInterface")
        factory.addFactory<ICheck>(new EmptyChecker(), "ICheck");
        let so = new TradingOrderShow();
        factory.addFactory<IShowObject>(so, "IShowObject");

        let controller = new AbortController();
        let desktop = await DonchianDesktop.getDesktopAsync(controller, factory)
        this.tPerformer = new TradingPerformer(desktop, this, undefined, so);
        return this.symbols;
    }

}
