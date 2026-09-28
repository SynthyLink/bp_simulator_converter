import { HttpCommunication } from "../../../../Library/Communications/http/http_interface";

export class TradingCommunication extends HttpCommunication {

    public async getSymbolsAsync(controller: AbortController): Promise<Map<string, any>>
    {
        const result = await this.http_cancel <Map<string, any>>({
                path: '/orbital/initial',
            }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        return new Map < string, any>();
    }

}
