import { useEffect, useState, useRef, type MouseEventHandler } from 'react';
import './App.css';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ComposeOption } from 'echarts/core';
import type { LineSeriesOption } from 'echarts/charts';
import type { GridComponentOption, TitleComponentOption, TooltipComponentOption } from 'echarts/components';

import { DateTimeConverter } from './Library/Utilities/DateTime/DateTimeConverter';
import { Performer } from './Library/Performer';
import { TradingCommunication } from "./ExternalObjects/Trading/Communication/TradingCommunication";
import type { Initial } from './ExternalObjects/Trading/Initial';
import type { ChartDataTrading } from './ExternalObjects/Trading/ChartDataTrading';
import { ReportExcelCreator } from './xslx/ReportExcelCreator';


let communication = new TradingCommunication()

let controller: AbortController | undefined
let dt = new DateTimeConverter();

let performer = new Performer()

let map: Map<string, any> = new Map

let init: Initial | undefined

let globalAbort: AbortController | undefined = undefined

const  filters : string[] = ["Average Short","Average Long", "Donchian maximum","Donchian minimum"];


let reportCreator :  ReportExcelCreator = new ReportExcelCreator(["b", "c", "d", "j", "k", "l"],new Map<string, string>(
		[
       ["a", "Trading.RealTime"],
        ["b", "Low"],
         ["c", "High"],
          ["d", "Open"],
          ["e", "Close"],
          ["f", "Trading.Candle"],
          ["g", "Trading.Step"],
          ["h", "Trading.DateTime"],
          ["i", "Order.Position"],
          ["j", "Income"],
          ["k", "Sell Price"],
          ["l", "Buy Price"],
          ["m", "Average Short.Output"],
          ["n", "Average Long.Output"],
        ["o", "Donchian minimum.Output"],
        ["q", "Donchian maximum.Output"],
        ["s", "Position.Formula_1"],
        ["u", "Current Position.x"],
        ["w", "Current Position.y"],
		]))

        let reportCreatorClient :  ReportExcelCreator = new ReportExcelCreator(["b", "c", "d", "j", "k", "l"],new Map<string, string>(
		[
       ["a", "Trading.RealTime"],
        ["b", "Low"],
         ["c", "High"],
          ["d", "Open"],
          ["e", "Close"],
          ["f", "Trading.Candle"],
          ["g", "Trading.Step"],
          ["h", "Trading.DateTime"],
          ["i", "Order.Position"],
          ["j", "Income"],
          ["k", "Sell Price"],
          ["l", "Buy Price"],
          ["m", "Average Short.Output"],
          ["n", "Average Long.Output"],
        ["o", "Donchian minimum.Output"],
        ["q", "Donchian maximum.Output"],
        ["s", "Position.Formula_1"],
        ["u", "Current Position.x"],
        ["w", "Current Position.y"],
		]))





function datePure(x: number): string {
    let y = x / 86400;
    var d = dt.fromOADate(y);
    var s = d.toJSON();
    s = s.substring(0, 19) + "." + d.getMilliseconds().toString();
    return s;
}

echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

// Combine option types tightly to avoid bundle leaks
type EChartsCombinedOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption
>;

const App: React.FC = () => {

  let createServerReport: MouseEventHandler = async (ev) => {
          let data = await reportCreator.create("Server",communication.tPerformer.getServer())
          if (data === undefined) return
    setServerReportUrl(URL.createObjectURL(data))
}
  let createClientReport: MouseEventHandler = async (ev) => {
          let data = await reportCreatorClient.create("Client",communication.tPerformer.getClient())
          if (data === undefined) return
    setClientReportUrl(URL.createObjectURL(data))
}
    const chartRef = useRef<HTMLDivElement>(null);

    const handleA1Change = (event: any) => {
        setAverage1(performer.toIntegerNumber(event.target.value));
    };

    const handleA2Change = (event: any) => {
        setAverage2(performer.toIntegerNumber(event.target.value));
    };

    const handleD1Change = (event: any) => {
        setDonchian1(performer.toIntegerNumber(event.target.value));
    };

    const handleD2Change = (event: any) => {
        setDonchian2(performer.toIntegerNumber(event.target.value));
    };


    const [serverReportUrl, setServerReportUrl] = useState<string>()
      const [clientReportUrl, setClientReportUrl] = useState<string>()


   const [serverReportEnabled, setServerReportEnabled] = useState<boolean>(false)

      const [clientReportEnabled, setClientReportEnabled] = useState<boolean>(false)

    const [diffHidden, setDiffHidden] = useState<boolean>(true)

            const [diffString, setDiffString] = useState<string>("")



    const [started, setStarted] = useState<boolean>()

    let [symbols, setSymbols] = useState<Map<string, any>>();
    let [begin, setBegin] = useState<string>();

    let [end, setEnd] = useState<string>();

    //  let [period, setPeriod] = useState<string>();

    let [average1, setAverage1] = useState<number>()
    let [average2, setAverage2] = useState<number>()

    let [donchian1, setDonchian1] = useState<number>()
    let [donchian2, setDonchian2] = useState<number>()

    let [symbol, setSymbol] = useState<string>();

      let [period, setPeriod] = useState<string>();

 
   

    let [chartDataTrading, setChartDataTrading] = useState<ChartDataTrading>()
 
    useEffect(() => {
      populateData();
    }, []);



    const handleBeginChange = (event: any) => {
        var s = event.target.value;
        //       var dt = new Date(s);
        setBegin(s);
    };
    const handleEndChange = (event: any) => {
        setEnd(event.target.value);
    };

    const delClick = async () => {
        //communication.deleteDb()
    }


    const abortClick = async () => {
        if (globalAbort === undefined) return
        globalAbort.abort()
        setStarted(true)
    }

    

    const btnClick = async () => {
        setDiffHidden(true)
        setStarted(false)
        setServerReportEnabled(false)
        setClientReportEnabled(false)
        setAbortController()
        if (begin === undefined) return
        let b = performer.dateNumber(begin);
        if (end === undefined) return
        let e = performer.dateNumber(end);
        let p = period
        let s = symbol;
        let map = new Map<string, any>()
        let f = [Number(average1), Number(average2), Number(donchian1),
        Number(donchian2)]
        map.set("b", b)
        map.set("e", e)
        map.set("p", p)
        map.set("s", s)
        map.set("a1", f[0])
        map.set("a2", f[1])
        map.set("d1", f[2])
        map.set("d2", f[3])
        let promises: Promise<void>[] = []
        if (s !== undefined)
        {
              promises.push(fillClient(s, p, b, e, f[0], f[1], f[2],
                    f[3]))
            promises.push(fillServer(map))
            await Promise.all(promises);
            let chart = communication.tPerformer.setChart("j")
            let r = communication.tPerformer.getResult()
            if (r.length > 0) {
                setDiffHidden(false)
                setDiffString(r)
            }
            setChartDataTrading(chart)
        }
        setStarted(true)
    };
    const fillServer = async (map: Map<string, any>): Promise<void> => {
        if (globalAbort == undefined) return
        let h = await communication.getAnalysisAsync(map, globalAbort)
        if (h?.length > 0) setServerReportEnabled(true)
       communication.tPerformer.setServer(h)
    }

    const fillClient = async (symbol: string, period: string, begin: number, end: number,
        a1: number, a2: number, d1: number, d2: number): Promise<void> => {

        let p = communication.tPerformer
        let h = await p.calculate(symbol, period, begin, end, a1, a2, d1, d2, globalAbort)
        if (h?.length > 0) setClientReportEnabled(true)
        communication.tPerformer.setClient(h)

    }

  
  
    function setAbortController(): void {
        let ac = new AbortController()
        globalAbort = ac
 }

    let first = true

    const chartInit = (): any => {
        if (!chartRef.current) return;

        // Initialize the custom instance
        const chartInstance = echarts.init(chartRef.current);

        const option: EChartsCombinedOption =
        {
            legend: {
                left: 'center',
                bottom: 'bottom'
            },
            xAxis: {
                type: 'category',
                data: (chartDataTrading == undefined) ? [] : chartDataTrading.x,
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'line series 1',
                    type: 'line',
                    //      smooth: true,
                    data: (chartDataTrading == undefined) ? [] : chartDataTrading.yclient,
                    symbol: 'none',
                    //  symbolSize: 10,
                    //  symbol: 'square',
                    emphasis: {
                        focus: 'series',
                        //  lineStyle: {
                        //     width: 5
                        // }
                    }
                },
                {
                    name: 'line series 2',
                    type: 'line',
                    //           smooth: true,
                    data: (chartDataTrading == undefined) ? [] : chartDataTrading.yserver,
                    //  symbolSize: 10,
                    // symbol: 'circle',
                    symbol: 'none',
                    emphasis: {
                        focus: 'series'
                    }
                }
            ]
        };

        chartInstance.setOption(option);

        // Handle responsiveness
        const handleResize = () => chartInstance.resize();
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.dispose();
        };

    }
  
    async function populateData() {
        if (first) {
            setStarted(false)
            setPeriod("1 min")
            first = false
            let xc:  number[] | undefined =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            let yc: (number | undefined)[] | undefined = [28.5, 70.5, undefined, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            let ys: (number | undefined)[] | undefined = [226.9, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
            let ch: ChartDataTrading = {
                x: xc,
                yclient: yc,
                yserver: ys
            }

            setChartDataTrading(ch)
            if (symbols === undefined) {
                let s = await communication.getSymbolsAsync()
                for (let ss of s) {
                    map.set(ss[0], ss[1])
                }
                setSymbols(map)
                setAverage1(10)
                setAverage2(40)
                setDonchian1(10)
                setDonchian2(10)
            }
        }
        if (map.size >= 0) {
            const sele = document.querySelector("#symbol");
            if (sele !== null) {
                const select = sele as HTMLSelectElement
                let n = select.size
             if (n === 0) {
                    for (let ss of map) {
                        let opt = document.createElement("option");
                        opt.text = ss[0];
                        opt.value = ss[1];
                        select.add(opt);
                    }
                }
            }
            if (init === undefined) {
                try {
                        controller = new AbortController();
                    let i = await communication.getInitialAsync(controller)
                        
                        if (i === undefined) return
                        init = i
                        var b = datePure(i.b)
                        var e = datePure(i.e)
                        setBegin(b)
                        setEnd(e)
                        setPeriod(i.p)
                    setSymbol(i.s)
                    setStarted(true)
                    }
                catch (error) {
                    if (error instanceof SyntaxError) {
                        console.error('Invalid JSON:', error.message);
                    }
                }
                //setBegin(init.b)
                controller = undefined
            }
        }
    }

    chartInit()


        const  page = (
          <>  <div className="body-main">
                <h1 id="tableLabel">Trading forecast</h1>
                <h2>This component calculation of trading forecast</h2>
       <div className="body-main">
       <table align="center">
<tr><td>Symbol</td><td>
                <div>  <select id="symbol">
                </select>
                </div>
                </td>
                </tr>
                <tr><td>Period</td><td>
                <div>
                    <select id="pertiod">
                    <option selected>1 min</option>
                    <option>1 day</option>
                    <option>1 mim</option>
                </select>
                </div>
                </td>
                </tr>
                <tr><td>Begin</td><td>
                <div> <input className="input-filter-index" type='datetime-local' value={begin} onInput={handleBeginChange} /></div>
                </td>
                </tr>
                <tr><td>End</td><td>
                <div> <input className="input-filter-index" type='datetime-local' value={end} onInput={handleEndChange} /></div>
                </td>
                </tr>
              <tr>
          <td>
            <label>{filters[0]}</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={average1}
              onChange={handleA1Change}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>{filters[1]}</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={average2}
              onChange={handleA2Change}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Z">{filters[2]}</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={donchian1}
              onChange={handleD1Change}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Vx">{filters[3]}</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={donchian2}
              onChange={handleD2Change}
            />
          </td>
        </tr>
                </table>
                </div>
                <div>
                    <button onClick={btnClick} disabled={!started} >Start</button>
                    <button onClick={abortClick} disabled={started} >Abort</button>
                    <button onClick={delClick} hidden={true}> Delete database</button>
                <table align="center" hidden={!clientReportEnabled && !serverReportEnabled}>
                <tr>
                <td></td><td>Server</td><td>Client</td>
                </tr>
                               <tr  hidden={diffHidden}>
                </tr>
                        <tr   >
                <td>Reports</td>  <td>    <input type="button" value="Create Report" disabled={!serverReportEnabled} onClick={createServerReport} />
      <br />
      {serverReportUrl && <a href={serverReportUrl} download="ServerReport.xlsx" >Download Report</a>}
      </td>
<td><input type="button" value="Create Report" onClick={createClientReport}  disabled={!clientReportEnabled}/>
      <br />
      </td>
      <td>

      {clientReportUrl && <a href={clientReportUrl} download="ClientReport.xlsx" >Download Report</a>}</td>
                </tr>

 
                </table>
                </div>
                <div hidden={diffHidden}  className="orbital-results">{diffString}</div>
                <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
            </div>
            </>
    );
    return page

}



export default App;
