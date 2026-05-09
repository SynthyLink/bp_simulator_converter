

//import { funcAirplane } from "./funcAirlane";
import { funcAirplane } from "./funcAirlane.js";

import { useEffect } from "react";

//import funcAirplane from './funcAirlane';
export default function App() {

    /* document.addEventListener('DOMContentLoaded', (event) => {
         console.log('DOM fully loaded and parsed');
         // Your code here
      })*/

    useEffect(() => {

        populateData();
    }, []);

    const contents =
        <><div id="root">
            <h1>TTTTTT</h1>
            <canvas width="960" height="540" id="app">
            </canvas>
        </div><div>
                <span>Scene: </span>
                <select name="scenes" id="scenes"></select>
            </div><div id="controls"></div><label className="control-label">Score:
                <span id="score"></span></label><br /><label className="control-label">Health:
                <span id="health"></span></label><span id="over">

            </span></>
    return contents
}


async function populateData() {
    try {
        funcAirplane()
    }
    catch (e) {
        console.log(e)
    }
}

