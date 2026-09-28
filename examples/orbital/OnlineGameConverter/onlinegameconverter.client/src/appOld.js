"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Here, we import the things we need from other script files 
const game_1 = __importDefault(require("./common/game"));
const SpaceTrippers_1 = __importDefault(require("./scenes/SpaceTrippers"));
// First thing we need is to get the canvas on which we draw our scenes
const canvas = document.querySelector("#app");
// Then we create an instance of the game class and give it the canvas
const game = new game_1.default(canvas, { maxfps: 25 });
// Here we list all our scenes and our initial scene
const scenes = {
    "Game": SpaceTrippers_1.default,
};
const initialScene = "Game";
// Then we add those scenes to the game object and ask it to start the initial scene
game.addScenes(scenes);
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
//# sourceMappingURL=appOld.js.map