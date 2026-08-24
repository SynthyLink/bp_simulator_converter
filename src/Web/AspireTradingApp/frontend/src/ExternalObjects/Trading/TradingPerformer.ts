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
import type { ChartDataTrading } from "./ChartDataTrading";
import type { IDataRuntime } from "../../Library/Interfaces/IDataRuntime";
import { Motion6DFactory } from "../../Library/Motion6D/Motion6DFactory";
import { DataRuntimeConsumerODE } from "../../Library/Runtime/DataRuntimeConsumerODE";

export class TradingPerformer {

    pefrormer !: PerformerMeasuremets

    desktop !: IDesktop

    query !: TradingDataQuery


    dataConsumer !: IDataConsumer

    runtime !: IDataRuntime

    communication!: TradingCommunication

    filters: ISequenceFilter[] = []

    client: Map<string, any>[] | undefined = undefined
    server: Map<string, any>[] | undefined = undefined

    chartSym: string = "b"


    constructor(local: ILocalDB, desktop: IDesktop, communication: TradingCommunication, factory?: IFactory) {
        this.local = local;
        communication.tPerformer = this
        this.pefrormer = new PerformerMeasuremets(factory)
        this.desktop = desktop
        this.communication = communication
        this.query = desktop.getCategoryObject("Trading") as unknown as TradingDataQuery
        this.dataConsumer = desktop.getCategoryObject("Chart") as unknown as IDataConsumer
        this.runtime = new DataRuntimeConsumerODE(this.dataConsumer, new Motion6DFactory())

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


    public setClient(map: Map<string, any>[] | undefined): void {
        this.client = map
    }


    public setServer(map: Map<string, any>[] | undefined): void {
        this.server = map
    }


    public async calculate(symblol: string, period: string, begin: number, end: number,
        a1: number, a2: number, d1: number, d2: number, d3: number, d4: number, controller: AbortController):
        Promise<Map<string, any>[]> {
        console.log("CALCULATE")
        this.query.setQueryParameters(symblol, period, begin, end)
        this.filters[0].setFilterCount(a1)
        this.filters[1].setFilterCount(a2)
        this.filters[2].setFilterCount(d1)
        this.filters[3].setFilterCount(d2)
        this.filters[4].setFilterCount(d3)
        this.filters[5].setFilterCount(d4)
        let x = await this.pefrormer.performIteratorDataConsumerMapAsync(this.dataConsumer,
            this.query, this.runtime, controller, this.mmap);
      /*  let z: Map<string, any>[] = []
        for (let i = 0; i < 100; i++) {
            z.push(x[i])
        }
        const arrayOfObjects = z.map(map => Object.fromEntries(map))
        let json = JSON.stringify(arrayOfObjects)
        console.log("JSON", json)
        await this.communication.saveStringAsync(json, new AbortController)
      //  await this.communication.saveMapArray(json);*/
        return x
    }

    public setChart(s: string): ChartDataTrading {
        this.any = s
        this.x = undefined
        this.yClient = undefined
        this.yServer = undefined
        if (this.client !== undefined) {
            this.x = []
            this.yClient = []
            for (let i of this.client) {
                let xx = i.get("a")
                this.x.push(Number(xx))
                let yy = i.get(s)
                let yyy = (yy == undefined) ? undefined : Number(yy)
                this.yClient.push(yyy)
            }
        }
        if (this.server !== undefined) {
            this.x = []
            this.yServer = []
            for (let ii of this.server) {
                this.any = ii
                let yy = ii.j
                let yyy = (yy == undefined) ? undefined : Number(yy)
                this.yServer.push(yyy)
            }
        }
        let res = { x: this.x, yclient: this.yClient, yserver: this.yServer }
        return res
 }



    local !: ILocalDB

    any: any

    x: number [] | undefined = []


    yClient: (number | undefined)[] | undefined = [28.5, 70.5, undefined, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    yServer: (number | undefined)[] | undefined = [226.9, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]


    public getX(): number[] | undefined {
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
