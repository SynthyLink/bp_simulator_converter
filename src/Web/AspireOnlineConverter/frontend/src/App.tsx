import { useEffect, useState, type ReactNode } from "react";
import type {
  OrbitalForecastConditionNumber,
  OrbitalForecastItemNumber,
} from "./Algorithms/OrbitalForecastCalculation/OrbitalData";
import {
  getOrbitalInitialCancel,
  getOrbitalForecastFromNumber,
  orbitCalculation,
} from "./OrbitalMethods";
import { DateTimeConverter } from "./Library/Utilities/DateTime/DateTimeConverter";
import { Performer } from "./Library/Performer";
import { ServerClientComparisonChart } from "./Visualization/ServerClientComparisonChart";
import { createServerClientComparisonData } from "./Visualization/orbitalComparisonData";
import "./App.css";

let dt = new DateTimeConverter();

let performer = new Performer();

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
    const [started, setStarted] = useState < boolean>()
   
  const handleBeginChange = (event: any) => {
    var s = event.target.value;
    //       var dt = new Date(s);
    setBegin(s);
  };
  const handleEndChange = (event: any) => {
    setEnd(event.target.value);
  };
  const handleXChange = (event: any) => {
    setX(performer.toNumber(event.target.value));
  };
  const handleYChange = (event: any) => {
    setY(performer.toNumber(event.target.value));
  };
  const handleZChange = (event: any) => {
    setZ(performer.toNumber(event.target.value));
  };

  const handleVxChange = (event: any) => {
    setVx(performer.toNumber(event.target.value));
  };
  const handleVyChange = (event: any) => {
    setVy(performer.toNumber(event.target.value));
  };
  const handleVzChange = (event: any) => {
    setVz(performer.toNumber(event.target.value));
  };

  const [forecast, setForecast] = useState<OrbitalForecastItemNumber[]>();

  useEffect(() => {
    populateData();
  }, []);

  const serverCalc = async (
    initial: OrbitalForecastConditionNumber,
  ): Promise<void> => {
    let fore = await getOrbitalForecastFromNumber(initial);
    var r = fore as unknown as OrbitalForecastItemNumber[];
    if (r === undefined) {
    } else {
      setForecast(r);
    }
  };

  const clientCalc = async (
    initial: OrbitalForecastConditionNumber,
  ): Promise<void> => {
    let fore = await orbitCalculation(initial);
    var r = fore as unknown as OrbitalForecastItemNumber[];
    if (r === undefined) {
    } else {
      setClient(r);
    }
  };

    const btnClick = async () => {
        setStarted(false)
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
      let promises: Promise<void>[] = []
       promises.push(clientCalc(init))
      promises.push(serverCalc(init))
      Promise.all(promises)
      setStarted(true)
  };

  const b = initial === undefined;
  const contents = b ? (
    <em>Loading... Please refresh once the ASP.NET backend has started.</em>
  ) : (
    <table className="parametr-table">
      <caption>Orbital Initial Conditions</caption>
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
            <input
              className="input-filter-index"
              type="datetime-local"
              value={begin}
              onInput={handleBeginChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>End</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="datetime-local"
              value={end}
              onChange={handleEndChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="X">X</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={x}
              onChange={handleXChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Y">Y</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={y}
              onChange={handleYChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Z">Z</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={z}
              onChange={handleZChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Vx">Vx</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={vx}
              onChange={handleVxChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Vy">Vy</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={vy}
              onChange={handleVyChange}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label asp-for="Vz">Vz</label>
          </td>
          <td>
            <input
              className="input-filter-index"
              type="number"
              value={vz}
              onChange={handleVzChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const contentsC = load(client, "Client calculation...");
  const contentsF = load(forecast, "Loading from the ASP.NET backend...");
  const comparisonData =
    client !== undefined && forecast !== undefined
      ? createServerClientComparisonData(forecast, client)
      : [];

  return (
    <>
      <div className="body-main">
        <h1 id="tableLabel">Orbital forecast</h1>
        <h2>This component calculation of orbit forecast</h2>
              <div className="orbital-parameters">
                  {contents} <button onClick={btnClick} disabled={!started}>Start</button>
        </div>
        <div className="orbital-results">
          {/* <button onClick={btnClick}>Start</button> */}
          <table>
            <thead>
              <tr>
                <td>Server</td>
                <td>Client</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{contentsF}</td>
                <td>{contentsC}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="orbital-chart">
          <ServerClientComparisonChart data={comparisonData} />
        </div>
      </div>
    </>
  );

  function load(orb: OrbitalForecastItemNumber[] | undefined, text: string) {
    const b = orb === undefined;
    return b ? (
      <em className="important-message">{text}</em>
    ) : (
      <table className="parametr-table">
        <thead>
          <tr>
            <th>Paramerter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {orb.map((f, rowIndex) => (
            <>
              <tr>
                {" "}
                <td>Loop</td> <td>{rowIndex + 1}</td>
              </tr>
              <tr>
                {" "}
                <td>Time</td> <td>{date(f.orbitalTime)}</td>
              </tr>
              <tr>
                {" "}
                <td>X</td> <td>{f.x}</td>
              </tr>
              <tr>
                <td>Y</td>
                <td>{f.y}</td>
              </tr>
              <tr>
                <td>Z</td>
                <td>{f.z}</td>
              </tr>
              <tr>
                <td>Y</td>
                <td>{f.y}</td>
              </tr>
              <tr>
                <td>Vx</td>
                <td>{f.vx}</td>
              </tr>
              <tr>
                <td>Vy</td>
                <td>{f.vy}</td>
              </tr>
              <tr>
                <td>Vz</td>
                <td>{f.vz}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{f.duration}</td>
              </tr>
              <tr className="black-color">
                <td className="black-color"></td>
                <td className="black-color"></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    );
  }

  async function populateData() {
      if (initial === undefined) {
          setStarted(true)
      let init = await getOrbitalInitialCancel();
      if (init === undefined) return;
      var res = init as unknown as OrbitalForecastConditionNumber;
      if (res === undefined) return;
      var b = performer.dateString(res.begin);
      var e = performer.dateString(res.end);
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
  }
}

export default App;
