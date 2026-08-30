import { useEffect, useState, useRef } from 'react';
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



let communication = new TradingCommunication()

let controller: AbortController | undefined
let dt = new DateTimeConverter();

let performer = new Performer()

let map: Map<string, any> = new Map

let init: Initial | undefined

let globalAbort: AbortController | undefined = undefined


function datePure(x: number): string {
    let y = x / 86400;
    var d = dt.fromOADate(y);
    var s = d.toJSON();
    s = s.substring(0, 19) + "." + d.getMilliseconds().toString();
    return s;
}
/*function dateValue(x: string): number {
    var d = new Date(x);
    var y = dt.toOADate(d);
    var z = y * 86400;
    return z;
}*/


/*
function date(x: number): ReactNode {
    let y = x / 86400;
    var d = dt.fromOADate(y);
    return d.toLocaleString();
}
*/
echarts.use([TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

// Combine option types tightly to avoid bundle leaks
type EChartsCombinedOption = ComposeOption<
    TitleComponentOption | TooltipComponentOption | GridComponentOption | LineSeriesOption
>;

const App: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
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

    let [chartDataTrading, setChartDataTrading] = useState<ChartDataTrading>()
   // let [abort, setAbort] = useState<AbortController>()

    
/*

    let [chartX, setChartX] = useState<number[]>();
    let [chartYClient, setChartYClient] = useState<number[]>();
    let [chartYServer, setChartYServer] = useState<number[]>();
    setChartX([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    setChartYClient([28.5, 70.5, 108.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4])
    setChartYServer([226.9, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5])

*/
 
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
        setStarted(false)
        setAbortController()
        if (begin === undefined) return
        let b = performer.dateNumber(begin);
        if (end === undefined) return
        let e = performer.dateNumber(end);
        let p = "1 day"
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
            setChartDataTrading(chart)
        }
        setStarted(true)
    };
    const fillServer = async (map: Map<string, any>): Promise<void> => {
        if (globalAbort == undefined) return
        let h = await communication.getAnalysisAsync(map, globalAbort)
     //  console.log(h, "SSS")
       communication.tPerformer.setServer(h)
    }

    const fillClient = async (symbol: string, period: string, begin: number, end: number,
        a1: number, a2: number, d1: number, d2: number): Promise<void> => {

        let p = communication.tPerformer
        let h = await p.calculate(symbol, period, begin, end, a1, a2, d1, d2, globalAbort)
        console.log(h, "CCC")
        communication.tPerformer.setClient(h)

        //    let h = await communication.getHistoryAsync(map, getAbortController())
        // fillHistory(h)

    }
//*/
  
  
    function setAbortController(): void {
        let ac = new AbortController()
        globalAbort = ac
 }

    let first = true

    const chartIinit = (): any => {
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
            first = false
            let xc:  number[] | undefined =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            let yc: (number | undefined)[] | undefined = [28.5, 70.5, undefined, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            let ys: (number | undefined)[] | undefined = [226.9, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
            let ch: ChartDataTrading = {
                x: xc,
                yclient: yc,
                yserver: ys
            }
          /*  let p = new Performer()

            let x = [226.9, 194.1, 95.6, 54.4, 29.9, 600.7, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5]
            do {
                
            }
            while (x.length > 0)  
      /*      {
/*           let queue = new FastQueue<number>
            for (let xx of x) {
                queue.enqueue(xx)
            }

            let v = 0;
            do
            {
                let a = queue.array()
                let y = p.findMinWithReduce(a)
                let z = p.findMaxWithReduce(a)
                let b = queue.dequeue()
                ++v;
                if (v > 30) return
            }
            while (!queue.isEmpty())
   */

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
                        //   setPeriod(i.p)
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

    chartIinit()


        const  page = (
            <div className="body-main">
                <h1 id="tableLabel">Trading forecast</h1>
                <h2>This component calculation of trading forecast</h2>
                <div>  <select id="symbol">
                </select>
                </div>
                <div>  <select id="pertiod">
                    <option selected>1 day</option>
                </select>
                </div>
                <div> <input className="input-filter-index" type='datetime-local' value={begin} onInput={handleBeginChange} /></div>
                <div> <input className="input-filter-index" type='datetime-local' value={end} onInput={handleEndChange} /></div>
                <div>
                    <button onClick={btnClick} disabled={!started} >Start</button>
                    <button onClick={abortClick} disabled={started} >Abort</button>
                    <button onClick={delClick} hidden={true}> Delete database</button>
                    <table>
                        <thead>
                            <tr>
                                <td>Server</td>
                                <td>Client</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
            </div>
    );
    return page

}



export default App;
