"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const game_1 = __importDefault(require("./common/game"));
const Desktop_1 = require("./Library/Desktop");
const SpaceTrippers_1 = __importDefault(require("./scenes/SpaceTrippers"));
class DesktopName extends Desktop_1.Desktop {
    constructor() {
        super();
    }
}
function init() {
    let desktop = new DesktopName();
    // First thing we need is to get the canvas on which we draw our scenes
    const canvas = document.querySelector("#app");
    // Then we create an instance of the game class and give it the canvas
    const game = new game_1.default(canvas, { maxfps: 25 });
    // Here we list all our scenes and our initial scene
    const scenes = {
        "Game": SpaceTrippers_1.default
    };
    const initialScene = "Game";
    // Then we add those scenes to the game object and ask it to start the initial scene
    //var sc = type of SpaceTrippersScene
    game.addScenes(scenes);
    //game.addScene("Game", type SpaceTrippersScene)
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
    selector.addEventListener("change", () => {
        game.startScene(selector.value);
    });
}
//# sourceMappingURL=ActorSceneName.js.map