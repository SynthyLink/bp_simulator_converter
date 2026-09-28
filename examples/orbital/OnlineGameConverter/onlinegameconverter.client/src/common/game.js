"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const loader_1 = __importDefault(require("./loader")); // Used to load files from the web server
const input_1 = __importDefault(require("./input")); // Used to manage the user input
const ActionArrayT_1 = require("../Library/Utilities/Generic/ActionArrayT");
//This is the abstract base of all scenes
class Scene {
    constructor(game) {
        this.game = game;
        this.gl = game.gl;
        this.engine = game;
    }
    getGl() {
        return this.gl;
    }
}
exports.Scene = Scene;
//This class create the WebGL2 context, manages the scenes and handles the game loop
class Game {
    constructor(canvas, options) {
        this.loader = new loader_1.default(); // A loader to read files from the webserver
        this.scenes = {}; // A dictionary of all available scenes
        this.currentScene = null; // The scene that is currently being drawn
        this.nextScene = null; // The scene that will replace the current scene after its files have been loaded
        this.nextSceneReady = false; // Whether the files requested by the next scene has been loaded or not 
        this.engineAction = new ActionArrayT_1.ActionArrayT();
        this.emptyAction = new ActionArrayT_1.ActionArrayT();
        this.curentAction = new ActionArrayT_1.ActionArrayT();
        this.currentTime = Math.min();
        this.isEnabled = false;
        this.canvas = canvas;
        this.options = options !== null && options !== void 0 ? options : {};
        this.gl = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true, // This will prevent the Browser from automatically clearing the frame buffer every frame
            alpha: true, // this will tell the browser that we want an alpha component in our frame buffer
            antialias: true, // this will tell the browser that we want antialiasing
            depth: true, // this will tell the browser that we want a depth buffer
            powerPreference: "high-performance",
            premultipliedAlpha: false, // This can be used if the canvas are going to be blended with the rest of the webpage (transparency)
            stencil: true // this will tell the browser that we want a stencil buffer
        }); // This command loads the WebGL2 context which we will use to draw
        this.input = new input_1.default(this.canvas);
        this.lastTick = performance.now();
        this.loop(performance.now()); // Start the game loop
    }
    addScene(name, type) {
        this.scenes[name] = new type(this);
    }
    addSceneObject(name, scene) {
        this.scenes[name] = scene;
    }
    addScenes(scenes) {
        for (let name in scenes)
            this.addScene(name, scenes[name]);
    }
    setNext() {
        this.nextSceneReady = true;
    }
    startScene(name) {
        if (name in this.scenes) {
            this.nextScene = this.scenes[name];
            this.nextSceneReady = false;
            this.nextScene.load();
            this.loader.wait().then(() => { this.setNext(); }); // This will make the loader notify us when the files are ready
        }
        else {
            console.warn(`Scene "${name}" not found`);
        }
    }
    loop(time) {
        this.actionGame(time);
        requestAnimationFrame((time) => this.loop(time)); // Tell the browser to call this function again when the next frame needs to be drawn
        if (this.options.maxfps) {
            if (time - this.lastTick < (1000 / this.options.maxfps))
                return;
        }
        if (this.nextScene != null && this.nextSceneReady) { // If there is a next scene and it is ready, replace the current scene with it.
            if (this.currentScene != null)
                this.currentScene.end(); // If there was an old scene, tell it to free its memory
            this.currentScene = this.nextScene;
            this.nextScene = null;
            this.currentScene.start(); // Tell the scene to initialize its objects
        }
        if (this.currentScene != null) {
            this.currentScene.draw(time - this.lastTick); // Tell the scene to draw itself
        }
        this.input.update(); // Update some information about the user input
        this.lastTick = time;
        this.engineAction.addActionT(this);
    }
    actionGame(time) {
        this.curentAction.actionT(time);
    }
    actionT(t) {
        this.currentTime = t;
    }
    isEngineEnabled() {
        return this.isEnabled;
    }
    setEngineEnabled(enabled) {
        if (enabled == this.isEnabled)
            return;
        this.isEnabled = enabled;
        this.curentAction = (enabled) ? this.engineAction : this.emptyAction;
    }
    getPlayEngineTime() {
        return this.currentTime;
    }
    getEngineAction() {
        return this.engineAction;
    }
}
exports.default = Game;
//# sourceMappingURL=game.js.map