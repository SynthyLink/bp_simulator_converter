import type { IActionT } from "../../Library/Interfaces/IActionT";
import type { IDesktop } from "../../Library/Interfaces/IDesktop";
import type { IFactory } from "../../Library/Interfaces/IFactory";
import type { HistoryMessage } from "./Database/HistoryMessage";
import type { ILocalDB } from "./Database/Local/Interfaces/ILocalDB";
import type { IDataConsumer } from "../../Library/Measurements/Interfaces/IDataConsumer";
import type { ISequenceFilter } from "../../Library/Utilities/Filters/Interfaces/ISequenceFilter";
import { PerformerMeasuremets } from "../../Library/Measurements/PerformerMeasuremets";
import { TradingCommunication } from "./Communication/TradingCommunication";
import { TradingDataQuery } from "./Components/TradingDataQuery";
import { SequenceFilterWrapper } from "../../Library/Measurements/SequenserFilterWrapper";

export class TradingPerformer {

    pefrormer !: PerformerMeasuremets

    desktop !: IDesktop

    query !: TradingDataQuery


    dataConsumer !: IDataConsumer

    communication!: TradingCommunication

    filters: ISequenceFilter[] = []

    client: Map<string, any>[] | undefined = undefined
    server: Map<string, any>[] | undefined = undefined

    chartSym: string = "b"


    constructor(local: ILocalDB, desktop: IDesktop, communication: TradingCommunication, factory?: IFactory) {
        this.local = local;
        this.pefrormer = new PerformerMeasuremets(factory)
        this.desktop = desktop
        this.communication = communication
        this.setCommunication(communication, desktop)
        this.query = desktop.getCategoryObject("Trading") as unknown as TradingDataQuery
        this.dataConsumer = desktop.getCategoryObject("Chart") as unknown as IDataConsumer
        const filtersN = ["Average Short", "Averge Long", "Donchian maximum long", "Donchian maximum short", "Donchian minimum long",
            "Donchian minimum short"]
        for (let fn of filtersN) {
            let o = desktop.getCategoryObject(fn);
            let f = o as unknown as SequenceFilterWrapper
            this.filters.push(f.getFilter())
        }
    }

    async writeHistoryAsync(symbol: string, begin: number, end: number, history: HistoryMessage[]): Promise<void> {
        let p = await this.local.getIntervalAsync(symbol);
        if (p.length === 0)
            this.local.clearHistoryAsync(symbol)
        await this.local.writeHistoryAsync(symbol, begin, end, history)
    }

    async readHistory(symbol: string, begin: number, end: number): Promise<HistoryMessage[]> {
        let p = await this.local.getIntervalAsync(symbol);
        let b = p.length === 0 || p[0] > begin || p[1] < end
        if (b) {
            await this.local.clearHistoryAsync(symbol)
            return [];
        }
        return await this.local.readHistoryAsync(symbol, begin, end)
    }

    public setCommunication(communication: TradingCommunication, desktop: IDesktop) {
        let act = new SetCommunication(communication)
        this.pefrormer.forEach<TradingDataQuery>(desktop, act, "TradingDataQuery")

    }

    public setClient(map: Map<string, any>[] | undefined): void {
        this.client = map
    }


    public setServer(map: Map<string, any>[] | undefined): void {
        this.server = map
    }


    public async calculate(symblol: string, period: string, begin: number, end: number,
        a1: number, a2: number, d1: number, d2: number, d3: number, d4: number, controller: AbortController):
        Promise<Map<string, any>[]> {
        this.query.setQueryParameters(symblol, period, begin, end)
        this.filters[0].setFilterCount(a1)
        this.filters[1].setFilterCount(a2)
        this.filters[0].setFilterCount(d1)
        this.filters[0].setFilterCount(d2)
        this.filters[0].setFilterCount(d3)
        this.filters[0].setFilterCount(d4)
        let x = await this.pefrormer.performIteratorDataConsumerMapAsync(this.dataConsumer,
            this.query, controller, this.mmap);
        console.log(x[0])
        return [x[0]]
    }

    public setChart(s: string): void {
        console.log(this.client)
        this.x = undefined
        this.yClient = undefined
        this.yServer = undefined
        if (this.client !== undefined) {
            this.x = []
            this.yClient = []
            for (let i of this.client) {
                let xx = i.get("a")
                this.x.push(Number(xx))
                let yy = i.get("s")
                this.yClient.push(Number(yy))
            }
        }
        if (this.x !== undefined)
            if (this.yClient !== undefined)
                console.log("x", this.x[0], this.yClient[0])
    }



    local !: ILocalDB

    any: any

    x: (number | undefined)[] | undefined = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


    yClient: (number | undefined)[] | undefined = [28.5, 70.5, undefined, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    yServer: (number | undefined)[] | undefined = [226.9, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]


    public getX(): (number | undefined)[] | undefined {
        return this.x
    }

    public getYClient(): (number | undefined)[] | undefined {
        return this.yClient
    }

    public getYServer(): (number | undefined)[] | undefined {
        return this.yServer
    }


    mmap = new Map<string, string>([
        ["a", "Trading.RealTime"],
        ["b", "Trading.Low"],
         ["c", "Trading.High"],
          ["d", "Trading.Open"],
          ["e", "Trading.Close"],
          ["f", "Trading.Candle"],
          ["g", "Trading.Step"],
          ["h", "Trading.DateTime"],
          ["i", "Order.Position"],
          ["j", "Order.Income"],
          ["k", "Order.Sell Price"],
          ["l", "Order.Buy Price"],
          ["m", "Average Short.Output"],
          ["n", "Averge Long.Output"],
          ["o", "Donchian minimum long.Output"],
          ["p", "Donchian minimum short.Output"],
          ["q", "Donchian maximum long.Output"],
          ["r", "Donchian maximum short.Output"]]
        )
}



class SetCommunication implements IActionT<TradingDataQuery> {
    communication !: TradingCommunication;
    constructor(communication: TradingCommunication) {
        this.communication = communication
    }
    actionT(t: TradingDataQuery): void {
        t.setCommunication(this.communication)
    }
    isEmptyActionT(): boolean {
        return false
    }

}