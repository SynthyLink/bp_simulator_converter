import { HttpCommunication } from "../../../../Library/Communications/http/http_interface";

export class TradingCommunication extends HttpCommunication {

    url: string = "";

    symbols: string[][] = []

    first: boolean = true;

    initial: string = ""

    public async getInitial(controller: AbortController): Promise<string> {
        if (this.initial.length > 0) return this.initial
        if (this.url.length === 0) return "";
        try {
            const result = await this.http_cancel<string>({
                path: "/api/trading/initial",
                method: "get",
                body: undefined,
            }, controller);
            if (result.ok && result.body) {
                return result.body;
            }
            else {
                return "";
            }
        }
        catch (err) {
            // setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
            console.error('Error fetching trading symbols:', err);
            // console.log(err)
        } finally {
            //setLoading(false);
        }
        return ""
    }

    public async getSymbols(): Promise<string[][]>
    {
        if (this.first) {
            this.first = false
            if (this.symbols.length > 0) return this.symbols
            try {
                let s = "/api/trading/tradingsymbols"
                const response = await fetch(s)
                if (!response.ok) {
                    console.log(response)
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
