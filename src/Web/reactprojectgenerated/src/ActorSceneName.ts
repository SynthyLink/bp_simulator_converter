import Game from "./common/game";
import { GameEngine } from "./common/GameEngine";
import { Desktop } from "./Library/Desktop";

class DesktopName extends Desktop {
    constructor() {
        super()
    }
}

export function init() {

    let desktop = new DesktopName();

    

    // First thing we need is to get the canvas on which we draw our scenes
    const canvas: HTMLCanvasElement = document.querySelector("#app");

    // Then we create an instance of the game class and give it the canvas
    const game = new Game(canvas, { maxfps: 25 });

    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippersScene
    };
    const initialScene = "Game";

    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    game.addScenes(scenes);
    //game.addScene("Game", type SpaceTrippersScene)
    game.startScene(initialScene);

    // Here we setup a selector element to switch scenes from the webpage
    const selector: HTMLSelectElement = document.querySelector("#scenes");
    for (let name in scenes) {
        let option = document.createElement("option");
        option.text = name;
        option.value = name;
        selector.add(option);
    }
    selector.value = initialScene;
    //let act = new ActorWeb()
    //act.actPI()
    selector.addEventListener("change", () => {
        game.startScene(selector.value);
    });
}
