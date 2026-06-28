import { HttpCommunication } from "../../../../Library/Communications/http/http_interface";

export class TradingCommunication extends HttpCommunication {

    url: string = "";

    public async getSymbols(): Promise<string[][]>
    {
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
                console.log(data)
                return data
            }
        }
        catch (err) {
            //setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
          //  console.error('Error fetching trading symbols:', err);
            console.log(err)
        } finally {
            //setLoading(false);
        }
        return[]
    }

}
