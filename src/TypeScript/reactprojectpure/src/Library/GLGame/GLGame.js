"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLGame = void 0;
const EngineGameImitationCameraAction_1 = require("../Abstract3DGame/Games/EngineGameImitationCameraAction");
const Loader_1 = __importDefault(require("../RemoteResuorces/Loader"));
const GLGamePerformer_1 = require("./GLGamePerformer");
class GLGame extends EngineGameImitationCameraAction_1.EngineGameImitationCameraAction {
    constructor(name, factory, canvas, options) {
        super(name, factory);
        this.loader = new Loader_1.default();
        this.nextSceneReady = false; // Whether the files requested by the next scene has been loaded or not 
        this.lastTick = 0; // The time of the last frame in milliseconds (used to calculate delta time)
        this.resourcesI = new Map();
        this.glGamePerformer = new GLGamePerformer_1.GLGamePerformer();
        this.types.push("IGLContext");
        this.types.push("GLGame");
        this.typeName = "GLGame";
        this.canvas = canvas;
        factory.addFactory(this, "IGLContext");
        var gl = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true, // This will prevent the Browser from automatically clearing the frame buffer every frame
            alpha: true, // this will tell the browser that we want an alpha component in our frame buffer
            antialias: true, // this will tell the browser that we want antialiasing
            depth: true, // this will tell the browser that we want a depth buffer
            powerPreference: "high-performance",
            premultipliedAlpha: false, // This can be used if the canvas are going to be blended with the rest of the webpage (transparency)
            stencil: true // this will tell the browser that we want a stencil buffer
        }); // This command loads the WebGL2 context which we will use to draw
        if (gl != undefined) {
            this.gl = gl;
        }
        this.options = options;
    }
    getGlContext() {
        return this.gl;
    }
    loadItself(load) {
        return true;
    }
    nextScene() {
        super.loadItself(true);
        super.startItself(true);
    }
    startItself(start) {
        if (this.isStarted == start)
            return false;
        this.loadProtected();
        return true;
    }
    loadProtected() {
        this.nextSceneReady = false;
        this.resourcesI.clear();
        this.performer.collectResources(this, this);
        this.glGamePerformer.convertResourceInfo(this.resources, this.resourcesI);
        this.loader.loadMap(this.resourcesI);
        this.loader.wait().then(this.nextScene);
        //this.loader.load()
    }
    run() {
        this.loop(0);
    }
    loop(time) {
        if (!this.isStarted)
            return;
        requestAnimationFrame((time) => this.loop(time)); // Tell the browser to call this function again when the next frame needs to be drawn
        if (this.options.maxfps) {
            if (time - this.lastTick < (1000 / this.options.maxfps))
                return;
        }
        if (!this.nextSceneReady) {
            return;
        }
        this.cycle(time);
        this.lastTick = time;
    }
}
exports.GLGame = GLGame;
//# sourceMappingURL=GLGame.js.map