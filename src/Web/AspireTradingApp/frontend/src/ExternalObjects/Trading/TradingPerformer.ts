import type { IDesktop } from "../../Library/Interfaces/IDesktop";
import type { IFactory } from "../../Library/Interfaces/IFactory";
import type { HistoryMessage } from "./Database/HistoryMessage";
import type { IDataConsumer } from "../../Library/Measurements/Interfaces/IDataConsumer";
import type { ISequenceFilter } from "../../Library/Utilities/Filters/Interfaces/ISequenceFilter";
import type { ChartDataTrading } from "./ChartDataTrading";
import type { IDataRuntime } from "../../Library/Interfaces/IDataRuntime";
import type { IExceptionHandler } from "../../Library/ErrorHandler/Interfaces/IExceptionHandler";
import type { IActionT2 } from "../../Library/Interfaces/IActionT2";
import { PerformerMeasuremets } from "../../Library/Measurements/PerformerMeasuremets";
import { TradingCommunication } from "./Communication/TradingCommunication";
import { TradingDataQuery } from "./Components/TradingDataQuery";
import { SequenceFilterWrapper } from "../../Library/Measurements/SequenserFilterWrapper";
import { Motion6DFactory } from "../../Library/Motion6D/Motion6DFactory";
import { TradingOrder } from "./Components/TradingOrder";
import type { IShowObject } from "../../Library/Show/Interfaces/IShowObject";
import type { TradingOrderShow } from "./Components/TradingOrderShow";
import type { IActionT4 } from "../../Library/Interfaces/IActionT4";
import { DataConsumerRuntimeTest } from "../DataConsumerRuntimeTest";

export class TradingPerformer implements IActionT2<any, string> {

    pefrormer !: PerformerMeasuremets

    desktop !: IDesktop

    query !: TradingDataQuery

    globalMap: Map<string, any>[] = []


    dataConsumer !: IDataConsumer

    order !: TradingOrder

    runtime !: IDataRuntime

    communication!: TradingCommunication

    filters: ISequenceFilter[] = []

    client: Map<string, any>[] | undefined = undefined
    server: Map<string, any>[] | undefined = undefined

    chartSym: string = "b"

    show!: IShowObject

    constructor(desktop: IDesktop, communication: TradingCommunication, factory?: IFactory, show?: IShowObject) {
        if (show !== undefined)   this.show = show;
        communication.tPerformer = this
        this.pefrormer = new PerformerMeasuremets(factory)
        this.desktop = desktop
        this.communication = communication
        this.query = desktop.getCategoryObject("Trading") as unknown as TradingDataQuery
        this.dataConsumer = desktop.getCategoryObject("Chart") as unknown as IDataConsumer
        this.order = desktop.getCategoryObject("Order") as unknown as TradingOrder
        this.order.addActionT2(this)
        let act4 = show as unknown as IActionT4<any, string, number, number>
        if (act4 != undefined) {
            this.order.addActionT4(act4)
        }

        this.runtime = new DataConsumerRuntimeTest(this.dataConsumer, new Motion6DFactory())

        const filtersN = ["Average Short", "Average Long", "Donchian maximum", "Donchian minimum"]
        for (let fn of filtersN) {
            let o = desktop.getCategoryObject(fn);
            let f = o as unknown as SequenceFilterWrapper
            this.filters.push(f.getFilter())
        }
    }
    first: boolean = true;

    actionT2(t1: any, t2: string): void {
        let s = this.show as unknown as TradingOrderShow
        s.showEvent(t1, t2)
    }
    isEmptyActionT2(): boolean {
        return false
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

    convertMap(map: Map<string, any>): Map<string, any> {
        let m = new Map<string, any>()
        m.set("a", map.a)
        m.set("b", map.b)
        m.set("c", map.c)
        m.set("d", map.d)
        m.set("g", map.g)
        m.set("i", map.i)
        m.set("j", map.j)
        m.set("k", map.k)
        m.set("l", map.l)
        m.set("m", map.m)
        m.set("n", map.n)
        m.set("o", map.o)
        m.set("s", map.s)
        m.set("u", map.u)
        m.set("w", map.w)
        return m;
    }


    public setClient(map: Map<string, any>[] | undefined): void {
        this.client = map
    }


    public setServer(map: Map<string, any>[] | undefined): void {
        this.server = []
        if (map === undefined) return
        for (let x of map) {
            let y = this.convertMap(x)
            this.server.push(y)
        }
        console.log(map, "SSS")
    }


    public async calculate(symblol: string, period: string, begin: number, end: number,
        a1: number, a2: number, d1: number, d2: number, controller: AbortController | undefined):
        Promise<Map<string, any>[]> {
        this.any = symblol
        this.any = period
        this.any = begin
        this.any = end
        this.any = a1
        this.any = a2
        this.any = d1
        this.any = d2
    this.query.setQueryParameters(symblol, period, begin, end)
        this.filters[0].setFilterCount(a1)
        this.filters[1].setFilterCount(a2)
        this.filters[2].setFilterCount(d1)
        this.filters[3].setFilterCount(d2)
         if (controller === undefined) return []
        let x = await this.pefrormer.performIteratorDataConsumerMapAsync(this.dataConsumer,
            this.query, this.runtime, controller, this.mmap, undefined, new ErrorH(controller))
         return x
    }

    any: any

    setMap(map: Map<string, any>): void {
        
    }

    public setChart(s: string): ChartDataTrading {
        this.any = s
        this.x = undefined
        this.yClient = undefined
        this.yServer = undefined
        if (this.client !== undefined) {
            this.x = []
            this.yClient = []
            let kk: number = 0;
            for (let i of this.client) {
                let xx = i.get("a")
                let xxx = Number(xx)
                this.x.push(xxx)
                if (kk < 100) {
        //            console.log(this.x.length, xxx)
                }
                ++kk
                let yy = i.get(s)
                let yyy = (yy == undefined) ? undefined : Number(yy)
                this.yClient.push(yyy)
            }
        }
        if (this.server !== undefined) {
            this.yServer = []
            for (let ii of this.server) {
                this.any = ii
                let yy = ii.get("j")
                let yyy = (yy == undefined) ? undefined : Number(yy)
                this.yServer.push(yyy)
            }
        }
        this.compareServerClient()
        
        let res = { x: this.x, yclient: this.yClient, yserver: this.yServer }
        console.log("Res", res)
        return res
    }

    compareServerClient(): void {
        console.log("C")
        let n = this.server?.length
        if (this.client == undefined) return
        if (this.server == undefined) return
        console.log(n, this.client.length)
        for (var i = 0; i < n; i++) {
            let x = this.server[i]
            let y = this.client[i]
            for (let [k, v] of x) {
                let yy = y.get(k)
                if (yy != v){
                    console.log("COMPARE SERVER CLIENT", i, k, v, yy)
                    return

                }
            }
        }
    }



  


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
          ["n", "Average Long.Output"],
        ["o", "Donchian minimum.Output"],
        ["q", "Donchian maximum.Output"],
        ["s", "Position.Formula_1"],
        ["u", "Current Position.x"],
        ["w", "Current Position.y"],

    ]
        )
}

class ErrorH implements IExceptionHandler {
    a!: AbortController
    constructor(a: AbortController) {
        this.a = a;
    }
    handleException(error: Error, obj?: any): void {
        console.log("EEE", this.a, error, obj)
    }
    log(message: string, obj?: any): void {
        console.log("AAA", this.a, message, obj)
    }

}
