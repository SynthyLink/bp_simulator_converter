import { HttpCommunication } from "../../Library/Communications/http/http_interface";
import { Performer } from "../../Library/Performer";
import type { DataQueryInit } from "./DataQureyInit";
import type { HistoricalDataMessageNumber } from "./HistoricalDataMessageNumber";
import { TradingDatabase } from "./TradingDatabase";

let database = new TradingDatabase();
await database.setupDatabase();

export class TradingCommunication extends HttpCommunication {
 




    async tradingSymbols(abort: AbortController): Promise<Map<string, string>> {
        if (this.map.size > 0) {
            return this.map;
        }
        let result = await this.http_cancel<[][]>({
            path: '/TradingDatabase/symbols',
        }, abort);
        if (result.ok) {
            if (result.body === undefined) {
            } else {
                let bd = result.body;
                this.performer.copyMapFromArray(bd, this.map)
                // this.map = bd;
                console.log(this.map);
                // this.performer.copyMapEntries(m, this.map);
                database.setMap(this.map);
                return this.map;
            }
        }
        return this.map;
   }

    public async getTradingData(
        condition: DataQueryInit, controller: AbortController
    ): Promise<HistoricalDataMessageNumber[] | undefined> {
        const result = await this.http_cancel<HistoricalDataMessageNumber[], DataQueryInit>({
            path: "/TradingDatabase",
            method: "post",
            body: condition,
        }, controller);
        if (result.ok && result.body) {
            return result.body;
        }
        else {
            return undefined;
        }
    }

    public async init(): Promise<void> {
        if (this.map.size > 0) {
            return;
        }
        var ab = new AbortController();
        let t = await this.tradingSymbols(ab);
        if (t === undefined) {

        }
        else {
            console.log(t);
            //this.map = t;
        }
    }

    public getDatabase(): TradingDatabase {
        return this.database;
    }

    


    map: Map<string, string> = new Map;

    performer: Performer = new Performer();

    database: TradingDatabase = database;
}