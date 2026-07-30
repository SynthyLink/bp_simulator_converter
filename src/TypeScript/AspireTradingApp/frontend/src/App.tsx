import { useEffect, useState } from 'react';
import './App.css';
import { TradingCommunication } from './ExternalObjects/Libraries/Trading/Communication/TradingCommunication';
import React from 'react';
import type { Initial } from './ExternalObjects/Libraries/Trading/Initial';
//import { Initial } from './ExternalObjects/Libraries/Trading/Initial';



let communication = new TradingCommunication()

let controller: AbortController | undefined



let map: Map<string, any> = new Map

let init: string = ""


function App() {
    let [symbols, setSymbols] = useState<Map<string, any>>();
    let [begin, setBegin] = useState<number>();

    let [end, setEnd] = useState < number >();

    let [period, setPeriod] = useState < string >();


    useEffect(() => {
        populateData();
    }, []);



    async function populateData()
    {

        if (symbols === undefined) {
            let s = await communication.getSymbols()
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
                        console.log(opt)
                        opt.value = ss[1];
                        select.add(opt);
                    }
                }
            }


            const contents = (map.size > 0) ?
                <><select id="symbol" />
                </> : ""

            if (init.length == 0) {
                controller = new AbortController();
                init = await communication.getInitial(controller)
                console.log(init)
                //let mp = new  Map<string, any> 
                //JSON.parse(init, (key, value) =>
                //    mp.set(key, value)
                // )
                try {
                    let i: Initial = init as unknown as Initial
                    //console.log(mp, "MP")
                    console.log(i, "III")
                    setBegin(i.b)
                    setEnd(i.e)
                    setPeriod(i.p)
                }
                catch (error) {
                    if (error instanceof SyntaxError) {
                        console.error('Invalid JSON:', error.message);
                    }
                }
                //setBegin(init.b)
                 //console.log(m, "Init")
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
                <div>
                    <button >Start</button>
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
