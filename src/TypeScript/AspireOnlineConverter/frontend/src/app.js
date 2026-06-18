"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SpaceTrippers_1 = __importDefault(require("./scenes/SpaceTrippers"));
const game_1 = __importDefault(require("./common/game"));
const AirplaneScene_1 = require("./scenes/AirplaneScene");
const PerformerEvents_1 = require("./Library/Event/PerformerEvents");
const ActorWebNEW_1 = require("./Tests/Actor/ActorWebNEW");
PerformerEvents_1.PerformerEvents.setTimeScale(0.001);
function funcAirplane() {
    // First thing we need is to get the canvas on which we draw our scenes
    const canvas = document.querySelector("#app");
    // Then we create an instance of the game class and give it the canvas
    const game = new game_1.default(canvas, { maxfps: 25 });
    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippers_1.default
    };
    const initialScene = "Game";
    const air = new AirplaneScene_1.AirplaneScene(game);
    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
    // game.addSceneObject("Game", new SpaceTrippersScene(game))
    game.addSceneObject("Air", air);
    game.startScene("Air");
    // Here we setup a selector element to switch scenes from the webpage
    const selector = document.querySelector("#scenes");
    for (let name in scenes) {
        let option = document.createElement("option");
        option.text = name;
        option.value = name;
        selector.add(option);
    }
    selector.value = initialScene;
    selector.addEventListener("change", () => {
        game.startScene(selector.value);
    });
    /*
    let act = new ActorWebNew()
    act.actCompositionEvent(game)
    */
}
function func() {
    // First thing we need is to get the canvas on which we draw our scenes
    const canvas = document.querySelector("#app");
    // Then we create an instance of the game class and give it the canvas
    const game = new game_1.default(canvas, { maxfps: 25 });
    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippers_1.default
    };
    const initialScene = "Game";
    // const air = new AirplaneScene(game);
    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    //game.addScenes(scenes);
    game.addSceneObject("Game", new SpaceTrippers_1.default(game));
    //game.addSceneObject("Air", air)
    game.startScene(initialScene);
    // Here we setup a selector element to switch scenes from the webpage
    const selector = document.querySelector("#scenes");
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
    let act = new ActorWebNEW_1.ActorWebNew();
    //  act.actCompositionEvent(game)
    act.actCompositionScada(game);
}
//func()
funcAirplane();
//# sourceMappingURL=app.js.map