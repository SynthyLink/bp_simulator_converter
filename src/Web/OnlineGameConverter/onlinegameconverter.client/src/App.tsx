import { useEffect, useState,  type ReactNode } from 'react';
import './App.css';
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from './Algorithms/OrbitalForecastCalculation/OrbitalData';
import { getOrbitalInitialCancel, getOrbitalForecastFromNumber, orbitCalculation } from './OrbitalMethods';
import { DateTimeConverter } from './Library/Utilities/DateTime/DateTimeConverter';
import { OrbitalCommunication } from './Algorithms/OrbitalForecastCalculation/OrbitalCommunication';
import { ServerClientComparisonChart } from './Visualization/ServerClientComparisonChart';
import { createServerClientComparisonData } from './Visualization/orbitalComparisonData';

let dt = new DateTimeConverter();


function get(x: any): number {
    return Number(x);
}

let orbiral = new OrbitalCommunication();


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
    let [initial, setInitial] = useState<OrbitalForecastConditionNumber>();
    const [client, setClient] = useState<OrbitalForecastItemNumber[]>();
    const [begin, setBegin] = useState<string>();
    const [end, setEnd] = useState<string>();
    const [x, setX] = useState<number>();
    const [y, setY] = useState<number>();
    const [z, setZ] = useState<number>();
    const [vx, setVx] = useState<number>();
    const [vy, setVy] = useState<number>();
    const [vz, setVz] = useState<number>();

    const handleBeginChange = (event: any) => {
        var s = event.target.value;
 //       var dt = new Date(s);
        setBegin(s);
    }
    const handleEndChange = (event: any) => {
        setEnd(event.target.value);
    }
    const handleXChange = (event: any) => {
        setX(get(event.target.value));
    }
    const handleYChange = (event: any) => {
        setY(get(event.target.value));
    }
    const handleZChange = (event: any) => {
        setZ(get(event.target.value));
    }

    const handleVxChange = (event: any) => {
        setVx(get(event.target.value));
    }
    const handleVyChange = (event: any) => {
        setVy(get(event.target.value));
    }
    const handleVzChange = (event: any) => {
        setVz(get(event.target.value));
    }



    const [forecast, setForecast] = useState<OrbitalForecastItemNumber[]>();


    useEffect(() => {

        populateData();
    }, []);

    const serverCalc = async (initial: OrbitalForecastConditionNumber): Promise<void> => {

        let fore = await getOrbitalForecastFromNumber(initial);
        var r = fore as unknown as OrbitalForecastItemNumber[];
        if (r === undefined)
        {

        }
        else
        {
            setForecast(r);
        }
    }

    const clientCalc = async (initial: OrbitalForecastConditionNumber): Promise<void> => {

        let fore = await orbitCalculation(initial);
        var r = fore as unknown as OrbitalForecastItemNumber[];
        if (r === undefined) {

        }
        else {
            setClient(r);
        }
    }


    const btnClick = async () =>
    {
        setClient(undefined);
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

        const init: OrbitalForecastConditionNumber = { begin: dateValue(begin), end: dateValue(end), x: x, y: y, z: z, vx: vx, vy: vy, vz: vz };
        if (init === undefined) {
            return;
        }
        await clientCalc(init);
        await serverCalc(init);
     }

    const b = initial === undefined;
    const contents = b 
        ? <em>Loading... Please refresh once the ASP.NET backend has started.</em>
        : <table className = "my-table">
            <thead>
            <tr>
                <th>Parameter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label asp-for="Begin">Begin</label>
                    </td>
                    <td>
                        <input className="input-filter-index" type='datetime-local' value={begin} onInput={handleBeginChange} />
                    </td>
                </tr>
            <tr>
                <td>
                    <label>End</label>
                </td>
                <td> 
                        <input className="input-filter-index" type="datetime-local" value={end} onChange={handleEndChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="X">X</label>
                </td>
                <td>
                        <input className="input-filter-index" type="number" value={x} onChange={handleXChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Y">Y</label>
                </td>
                <td>
                        <input className="input-filter-index" type="number" value={y} onChange={handleYChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Z">Z</label>
                </td>
                <td>
                        <input className="input-filter-index"type="number" value={z} onChange={handleZChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Vx">Vx</label>
                </td>
                <td>
                        <input className="input-filter-index" type="number" value={vx} onChange={handleVxChange} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Vy">Vy</label>
                </td>
                    <td>
                        <input className="input-filter-index" type="number" value={vy} onChange={handleVyChange} />
                    </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Vz">Vz</label>
                </td>
                <td>
                        <input className="input-filter-index" type="number" value={vz} onChange={handleVzChange} />
                </td>
                </tr>
              </tbody>
        </table>
    
    const contentsC = load(client, "Client calculation..." );
    const contentsF = load(forecast, "Loading from the ASP.NET backend...");
    const comparisonData =
        client !== undefined && forecast !== undefined
            ? createServerClientComparisonData(forecast, client)
            : [];


    return (
        <div className="body-main">
            <h1 id="tableLabel">Orbital forecast</h1>
            <h2>This component calculation of orbit forecast</h2>
            <div className="orbital-parameters">  {contents} </div>
            <div className="orbital-results">
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
                              {contentsF} 
                            </td>
                            <td>
                                 {contentsC} 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="orbital-chart">
                <ServerClientComparisonChart data={comparisonData} />
            </div>

        </div>
        
    );

    function load(orb: OrbitalForecastItemNumber[] | undefined, text: string) {
        const b = orb === undefined;
        return b
            ? <em className="important-message">{text}</em>
            : <table className="my-table">
                <thead>
                    <tr>
                        <th>Paramerter</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {orb.map((f, rowIndex) => (
                        <><tr>                    <td>Loop</td>                        <td>{rowIndex + 1}</td>
                        </tr><tr>                    <td>Time</td>                        <td>{date(f.orbitalTime)}</td>
                            </tr>
                            <tr>                    <td>X</td>                        <td>{f.x}</td>
                            </tr>
                            <tr>
                                <td>Y</td>
                                <td>{f.y}</td>
                            </tr>
                            <tr>
                                <td>Z</td>
                                <td>{f.z}</td>
                            </tr><tr>
                                <td>Y</td>
                                <td>{f.y}</td>
                            </tr><tr>
                                <td>Vx</td>
                                <td>{f.vx}</td>
                            </tr><tr>
                                <td>Vy</td>
                                <td>{f.vy}</td>
                            </tr><tr>
                                <td>Vz</td>
                                <td>{f.vz}</td>
                            </tr><tr>
                                <td>Duration</td>
                                <td>{f.duration}</td>
                            </tr><tr className="black-color"><td className="black-color"></td><td className="black-color"></td></tr></>
                    ))}
                </tbody>
            </table>;

    }


    async function populateData() {
        await orbiral.setServer();
 
        if (initial === undefined) {
            let init = await getOrbitalInitialCancel();
            var res = init as unknown as OrbitalForecastConditionNumber;
            var b = datePure(res.begin)
            var e = datePure(res.end)
            setBegin(b);
            setEnd(e);
            setX(res.x);
            setY(res.y);
            setZ(res.z);
            setVx(res.vx);
            setVy(res.vy);
            setVz(res.vz);
            setInitial(res);
        }
        else
        {

        }
    }


   



}
export default App;
