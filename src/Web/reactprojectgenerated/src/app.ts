import { ActorWeb } from "./Tests/Actor/ActorWeb"
import SpaceTrippersScene from './scenes/SpaceTrippers';
import { IFunc } from "./Library/Interfaces/IFunc";
import Game from "./common/game";
import { GameEngine } from "./common/GameEngine";
import { AirplaneScene } from "./scenes/AirplaneScene";
import { PerformerMeasuremets } from "./Library/Measurements/PerformerMeasuremets";
import { RungeProcessor } from "./Library/Measurements/DifferentialEquations/Processors/RungeProcessor";
import { Performer } from "./Library/Performer";
import { Motion6DRealtimeFactory } from "./Library/Motion6D/Runtime/Event/Motion6DRealtimeFactory";

PerformerMeasuremets.setDifferentialEquationProcessor(new RungeProcessor())
PerformerMeasuremets.setRealtimeEventFactory(new Motion6DRealtimeFactory())

function funcAirplane() {

    // First thing we need is to get the canvas on which we draw our scenes
    const canvas: HTMLCanvasElement = document.querySelector("#app");

    // Then we create an instance of the game class and give it the canvas
    const game = new Game(canvas, { maxfps: 25 });

    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippersScene
    };
    const initialScene = "Game";
    const air = new AirplaneScene(game);

    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
   // game.addSceneObject("Game", new SpaceTrippersScene(game))
    game.addSceneObject("Air", air)
    game.startScene("Air");

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
    let act = new ActorWeb()
    act.actCompositionEvent(game)
}

function func() {

    // First thing we need is to get the canvas on which we draw our scenes
    const canvas: HTMLCanvasElement = document.querySelector("#app");

    // Then we create an instance of the game class and give it the canvas
    const game = new Game(canvas, { maxfps: 25 });

    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippersScene
    };
    const initialScene = "Game";
    // const air = new AirplaneScene(game);

    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
    game.addSceneObject("Game", new SpaceTrippersScene(game))
    //game.addSceneObject("Air", air)
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
    let act = new ActorWeb()
    //  act.actCompositionEvent(game)
    act.actCompositionScada(game)
}



func()