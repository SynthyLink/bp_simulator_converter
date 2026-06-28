import { useEffect, useState,  type ReactNode } from 'react';
import './App.css';
import { DateTimeConverter } from './Library/Utilities/DateTime/DateTimeConverter';
import { TradingCommunication } from './ExternalObjects/Libraries/Trading/Communication/TradingCommunication';

let dt = new DateTimeConverter();


let communication = new TradingCommunication()

function get(x: any): number {
    return Number(x);
}



function datePure(x: number): string {
    let y = x / 86400;
    var d = dt.fromOADate(y);
    var s = d.toJSON();
    s = s.substring(0, 19)  + "." + d.getMilliseconds().toString();
    return s;
}

function dateValue(x: string): number {
    var d = new Date(x);
    var y = dt.toOADate(d);
    var z = y * 86400;
    return z;
}



function date(x: number): ReactNode {
    let y = x / 86400;
    var d = dt.fromOADate(y);
    return d.toLocaleString();
}


function App() {
    let [symbols, setSymbols] = useState<Map<string, any>>();
    useEffect(() => {

        populateData();
    }, []);



    async function populateData() {
        if (symbols === undefined) {
            let map: Map<string, any> = new Map
            let s = await communication.getSymbols()
            for (let ss of s) {
                map.set(ss[0], ss[1])
            }
            setSymbols(map)
        }
        let sym = symbols
        if (sym != undefined) {
            if (sym.size == 0) {
                const sele = document.querySelector("#symbol");
                if (sele !== undefined) {
                    const select = sele as HTMLSelectElement
                    let n = select.size
                    if (n === 0) {
                        for (let ss in sym) {
                            let opt = document.createElement("option");
                            opt.text = ss[0];
                            opt.value = ss[1];
                            select.add(opt);
                        }
                    }
                }
            }

            let b = false

            if (symbols !== undefined) {
                if (symbols.size !== 0) {
                    b = true
                }
            }
            const contents = b ?
                <><select id="symbol" />
                </> : ""
            return (
                <>  <div className="body-main">
                    <h1 id="tableLabel">Orbital forecast</h1>
                    <h2>This component calculation of orbit forecast</h2>
                    <div>  {contents} </div>

                </div></>

            );


        }
    }
}
export default App;
