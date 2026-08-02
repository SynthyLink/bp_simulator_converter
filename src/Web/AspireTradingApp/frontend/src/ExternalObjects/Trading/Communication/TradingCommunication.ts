import { HttpCommunication } from "../../../Library/Communications/http/http_interface";
import type { HistoryMessage } from "../Database/HistoryMessage";
import { LocalDB } from "../Database/Local/LocalDB";
import type { Initial } from "../Initial";
import { TradingPerformer } from "../TradingPerformer";

export class TradingCommunication extends HttpCommunication {

    url: string = "";

    symbols: string[][] = [];

    first: boolean = true;

    tPerformrer: TradingPerformer = new TradingPerformer(new LocalDB())

    initial !: Initial;

    public async getInitialAsync(controller: AbortController): Promise<Initial | undefined> {
        if (this.initial != undefined) return this.initial
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
        return undefined
    }

    public async getHistoryAsync(map: Map<string, any>, controller: AbortController): Promise<HistoryMessage[] | undefined> {
        let b = Number(map.get("b"))
        let e = Number(map.get("e"))
        let sym = map.get("s") + "";
      //  let p = map.get("p") + "";
   /*     let r = await this.tPerformrer.readHistory(sym, b, e)
        if (r.length > 0) {
            console.log(r[0], "ro")
            return r;
        }*/
        let json = JSON.stringify(Object.fromEntries(map))
        let s = "";
        if (json !== undefined) {
            s = json
        }
        try {
            const result = await this.http_cancel<string, string>({
                path: "/api/trading/tradinghistory",
                method: "post",
                body: s,
            }, controller);
            if (result.ok && result.body) {
                let res = result.body as unknown as HistoryMessage[];
                await this.tPerformrer.writeHistoryAsync(sym, res)
                return res;
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
        return undefined
    }

    

    public async getSymbolsAsync(): Promise<string[][]>
    {
        if (this.first) {
            this.first = false
            if (this.symbols.length > 0) return this.symbols
            try {
                let s = "/api/trading/tradingsymbols"
                const response = await fetch(s)
                if (!response.ok) {
                }
                else {
                    let u = response.url;
                    this.url = u.substring(0, u.length - s.length)
                    this.setCommunicationServer(this.url)
                    const data = await response.json();
                    this.symbols = data
                    return data
                }
            }
            catch (err) {
                // setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
                console.error('Error fetching trading symbols:', err);
                // console.log(err)
            } finally {
                //setLoading(false);
            }
        }
        this.first = true
        return[]
    }



}
