import { useEffect, useState } from 'react';
import './App.css';
import { TradingCommunication } from './ExternalObjects/Libraries/Trading/Communication/TradingCommunication';
import React from 'react';



let communication = new TradingCommunication()



let map: Map<string, any> = new Map


function App() {
    let [symbols, setSymbols] = useState<Map<string, any>>();
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
                console.log(select)
                console.log(n)
                console.log(map)
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
