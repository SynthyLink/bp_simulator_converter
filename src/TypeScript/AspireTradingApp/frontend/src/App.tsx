import { useEffect, useState } from 'react';
import './App.css';
import { TradingCommunication } from './ExternalObjects/Libraries/Trading/Communication/TradingCommunication';
import type { Initial } from './ExternalObjects/Libraries/Trading/Initial';
import { DateTimeConverter } from './Library/Utilities/DateTime/DateTimeConverter';
import { Performer } from './Library/Performer';
import type { HistoryMessage } from './ExternalObjects/Libraries/Trading/Database/HistoryMessage';



let communication = new TradingCommunication()

let controller: AbortController | undefined
let dt = new DateTimeConverter();

let performer = new Performer()



let map: Map<string, any> = new Map

let init: Initial | undefined

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

function App() {
    let [symbols, setSymbols] = useState<Map<string, any>>();
    let [begin, setBegin] = useState<string>();

    let [end, setEnd] = useState<string>();

  //  let [period, setPeriod] = useState<string>();

    let [symbol, setSymbol] = useState < string > ();

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


    const btnClick = async () => {
        if (begin === undefined) return
        let b = performer.dateNumber(begin);
        if (end === undefined) return
        let e = performer.dateNumber(end);
        let p = "1 day"
        let s = symbol;
        let map = new Map<string, any>()
        map.set("b", b)
        map.set("e", e)
        map.set("p", p)
        map.set("s", s)
        let h = await communication.getHistoryAsync(map, getAbortController())
        fillHistory(h)
   /*      setClient(undefined);
        setForecast(undefined);

        if (begin === undefined) {
            return;
        }
        if (end === undefined) {
            return;
        }
        if (x === undefined) {
            return;
        }
        if (y === undefined) {
            return;
        }
        if (z === undefined) {
            return;
        }
        if (vx === undefined) {
            return;
        }
        if (vy === undefined) {
            return;
        }
        if (vz === undefined) {
            return;
        }

        const init: OrbitalForecastConditionNumber = {
            begin: performer.dateNumber(begin),
            end: performer.dateNumber(end),
            x: x,
            y: y,
            z: z,
            vx: vx,
            vy: vy,
            vz: vz,
        };
        if (init === undefined) {
            return;
        }
        await clientCalc(init);
        await serverCalc(init);
        */
    };

    function fillHistory(m: HistoryMessage[] | undefined): void{
        if (m === undefined) return
        console.log(m[0])
      //  let r = dt.fromSrting(m[0].date)
       // console.log(r);
    }
    function getAbortController(): AbortController {
        return new AbortController()
    }


    async function populateData()
    {

        if (symbols === undefined) {
            let s = await communication.getSymbolsAsync()
            for (let ss of s) {
                map.set(ss[0], ss[1])
            }
            setSymbols(map)
        }
        else map = symbols
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

/*
            const contents = (map.size > 0) ?
                <><select id="symbol" />
                </> : ""*/
            //any = contents
            //any = period

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
                    <button onClick={btnClick}>Start</button>
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

            </div>

    );
    return page

}



export default App;
