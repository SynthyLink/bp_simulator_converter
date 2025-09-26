import { useEffect, useState, type ReactNode } from 'react';
import './App.css';
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from './Algorithms/OrbitalForecastCalculation/OrbitalData';
import { getOrbitalInitialCancel, getOrbitalForecastFromNumber, orbitCalculation } from './Methods';
import { DateTimeConverter } from './Library/Utilities/DateTime/DateTimeConverter';

let dt = new DateTimeConverter();

function date(x: number): ReactNode {
    var y = dt.fromOADate(x);
    return y + "";
}
function App() {
    const [initial, setInitial] = useState<OrbitalForecastConditionNumber>();
    const [client, setClient] = useState<OrbitalForecastItemNumber[]>();

    const [forecast, setForecast] = useState<OrbitalForecastItemNumber[]>();


    useEffect(() => {

        populateData();
    }, []);

    const serverCalc = async (initial: OrbitalForecastConditionNumber): Promise<void> => {
        console.log("S", initial);

        let fore = await getOrbitalForecastFromNumber(initial);
        var r = fore as unknown as OrbitalForecastItemNumber[];
        if (r === undefined) {

        }
        else {
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


    const btnClick = async () => {

        
        if (initial === undefined) {
            return;
        }
        await clientCalc(initial);
        await serverCalc(initial);
     }

    

 


    const b = initial === undefined;
    const contents = b 
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table>
            <thead>
            <tr>
                <td>Parameter</td>
                    <td>Value</td>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <label asp-for="Begin">Begin</label>
                </td>
                <td>
                    <input type="number" value={initial.begin} onChange={changeState} />
                </td>
            </tr>
            <tr>
                <td>
                    <label>End</label>
                </td>
                <td> 
                    <input type="number" value={initial.end} onChange={changeState} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="X">X</label>
                </td>
                <td>
                    <input type="number" value={initial.x} onChange={changeState} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Y">Y</label>
                </td>
                <td>
                    <input type="number" value={initial.y} onChange={changeState} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Z">Z</label>
                </td>
                <td>
                    <input type="number" value={initial.z} onChange={changeState} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Vx">Vx</label>
                </td>
                <td>
                    <input type="number" value={initial.vx} onChange={changeState} />
                </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Vy">Vy</label>
                </td>
                    <td>
                        <input type="number" value={initial.vy} onChange={changeState} />
                    </td>
            </tr>
            <tr>
                <td>
                    <label asp-for="Vz">Vz</label>
                </td>
                <td>
                    <input type="number" value={initial.vz} onChange={changeState} />
                </td>
                </tr>
              </tbody>
        </table>

    const bc = client === undefined
    const contentsC = bc
        ? <p><em>Client calculation...</em></p>
        : <table>
            <thead>
                <tr>
                    <th>Paramerter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {client.map((f, rowIndex) => (
                    <><tr>                    <td>Time</td>                        <td>{date(f.orbitalTime)}</td>
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
                        </tr></>
                ))}
                    </tbody>
        </table>;

    const bb = forecast === undefined
    const contentsF = bb
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table>
            <thead>
                <tr>
                    <th>Paramerter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {forecast.map((f, rowIndex) => (
                    <><tr>                    <td>X</td>                        <td>{f.x}</td>
                    </tr><tr>
                            <td>Y</td>
                            <td>{f.y}</td>
                        </tr><tr>
                            <td>Z</td>
                            <td>{f.z}</td>
                        </tr></>
                ))}
            </tbody>
        </table>;


    return (
        <div>
            <h1 id="tableLabel">Orbital forecast</h1>
            <h2>This component calculation of orbit forecast.</h2>
          <div>  {contents} </div>
            <div>
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
                                <div>  {contentsF} </div>
                            </td>
                            <td>
                                <div>  {contentsC} </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button onClick={btnClick}>Start</button>
        </div>
        
    );



    async function populateData() {

        if (initial === undefined) {
            let init = await getOrbitalInitialCancel();
            var res = init as unknown as OrbitalForecastConditionNumber;
            setInitial(res);
        }
        else
        {

        }
    }


    function changeState()  {
    }

   



}
export default App;