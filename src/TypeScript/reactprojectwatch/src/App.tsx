
import React from 'react';
import { GLGame } from './Library/GLGame/GLGame';
export default function App() {
    let b = false
    const contents =
        <><div id="root">
            <canvas width="960" height="540" id="app">
            </canvas>
        </div><div>
                <span>Scene: </span>
                <select name="scenes" id="scenes"></select>
            </div><div id="controls"></div><label className="control-label">Score:
                <span id="score"></span></label><br /><label  className="control-label">Health:
                <span id="health"></span></label><span id="over">

            </span></>
    return contents
}
var ca = document.querySelector("#app");
if (ca != null) {
    const canvas: HTMLCanvasElement = ca as HTMLCanvasElement
/*
    var sel = document.querySelector("#scenes");

    if (sel != null) { }
    // Here we setup a selector element to switch scenes from the webpage
    const selector = sel as HTMLSelectElement
    /*  for (let name in scenes) {
          let option = document.createElement("option");
          option.text = name;
          option.value = name;
          selector.add(option);
      }
       selector.value = initialScene;
       selector.addEventListener("change", () => {
           game.startScene(selector.value);
}
    });*/
}