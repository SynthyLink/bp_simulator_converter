import { useEffect, useState } from 'react';
import './App.css';
import type { OrbitalForecastConditionNumber, OrbitalForecastItemNumber } from './Algorithms/OrbitalForecastCalculation/OrbitalData';
import { getOrbitalInitialCancel, getOrbitalForecastFromNumber } from './Methods';


function App() {
    const [initial, setInitial] = useState<OrbitalForecastConditionNumber>();

    const [forecast, setForecast] = useState<OrbitalForecastItemNumber[]>();


    useEffect(() => {

        populateData();
    }, []);


    const btnClick = async () => {
        if (initial === undefined) {
            return;
        }
        let fore = await getOrbitalForecastFromNumber(initial);
        var r = fore as unknown as OrbitalForecastItemNumber[];
        if (r === undefined)
        {

        }
        else
        {
          //  for (var i = 0; i < r.length; i++) {
           //     console.loag(r[i].x);
          // ]] }
            var xp = [];
            var map = new Map<string, number>();
            console.log(r);
            for (var f of r)
            {
                map.set("X", f.x);
            }
            setForecast(map);
            //         console.log(forecast);

        }
    }

    /*
        for (var i = 0; i < forecast.length; i++)
               {
                   <tr>
                       <td>X</td>
                       <td>{forecast[i].X + ''}</td>
                   </tr>
               }

              for (var i = 0; i < forecast.length; i++)
              {
                  <tr>
                      <td>X</td>
                      <td>X</td>
                  </tr>
              }
  
*/


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

    const bb =  forecast === undefined
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
              </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Orbital forecast</h1>
            <h2>This component calculation of orbit forecast.</h2>
            <div>  {contents} </div>
            <div>  {contentsF} </div>

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