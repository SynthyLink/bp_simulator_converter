import { EmptyObject } from "../../../Library/EmptyObject";
import type { HistoryMessage } from "../Database/HistoryMessage";
import type { ITradingDatabaseHistoryInterface } from "../Database/ITradingDatabaseHistoryInterface";
import type { TradingCommunication } from "./TradingCommunication";


export class CommunicationTradingDatabaseHistoryInterface extends EmptyObject implements ITradingDatabaseHistoryInterface {

    communication!: TradingCommunication;
    constructor(communication: TradingCommunication) {
        super("")
        this.communication = communication;
        this.types.push("ITradingDatabaseHistoryInterface")
        this.types.push("CommunicationTradingDatabaseHistoryInterface")
        this.typeName = "CommunicationTradingDatabaseHistoryInterface"
    }

    async getSymbolsAsync(): Promise<string[][]> {
        return await this.communication.getSymbolsIntretrnalAsync();
    }

    async getHistoricalDataMessageDateTimesAsync(id: any, symbol: string, begin: number,
        end: number, cancellation: AbortController): Promise<HistoryMessage[]> {
        this.any = id;
        let map = new Map<string, any>;
        map.set("s", symbol);
        map.set("b", begin);
        map.set("e", end);
        map.set("p", "1 day");
        let h = await this.communication.getHistoryAsync(map, cancellation);
        return h;
    }

    any: any;

}
