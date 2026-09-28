import Loader from './loader'; // Used to load files from the web server
import Input from './input'; // Used to manage the user input
import { GameOptions } from './GameOptions';
import { IActionAddRemoveT } from '../Library/Interfaces/IActionAddRemoveT';
import { ActionArrayT } from '../Library/Utilities/Generic/ActionArrayT';
import { IPlayEngine } from '../Library/Interfaces/IPlayEngine';
import { IActionT } from '../Library/Interfaces/IActionT';

//This is the abstract base of all scenes
export abstract class Scene {
    protected game: Game;
    protected gl: WebGL2RenderingContext;
    public constructor(game: Game){
        this.game = game;
        this.gl = game.gl;
        this.engine = game;
        
    }
    public getGl(): WebGL2RenderingContext {
        return this.gl
    }

    public abstract load(): void; // Here we will tell the loader which files to load from the webserver
    public abstract start(): void; // Here we will initialize the scene objects before entering the draw loop 
    public abstract draw(deltaTime: number): void; // Here will draw the scene (deltaTime is the difference in time between this frame and the past frame in milliseconds)
    public abstract end(): void; // Here we free the memory from objects we allocated
    protected engine !: IPlayEngine
}


//This class create the WebGL2 context, manages the scenes and handles the game loop
export default class Game implements IPlayEngine, IActionT<number> { 
    canvas: HTMLCanvasElement; // The canvas on which we will draw
    gl: WebGL2RenderingContext; // The WebGL2 context of the canvas (we will use it to draw)
    loader: Loader = new Loader(); // A loader to read files from the webserver
    input: Input; // A manager for user input (keyboard and mouse)
    scenes: {[name: string]: Scene} = {}; // A dictionary of all available scenes
    currentScene: Scene = null; // The scene that is currently being drawn
    nextScene: Scene = null; // The scene that will replace the current scene after its files have been loaded
    nextSceneReady: boolean = false; // Whether the files requested by the next scene has been loaded or not 
    lastTick: number; // The time of the last frame in milliseconds (used to calculate delta time)
    options: GameOptions;

    constructor(canvas: HTMLCanvasElement, options?: GameOptions){
        this.canvas = canvas;
        this.options = options ?? {};
        this.gl = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true, // This will prevent the Browser from automatically clearing the frame buffer every frame
            alpha: true, // this will tell the browser that we want an alpha component in our frame buffer
            antialias: true, // this will tell the browser that we want antialiasing
            depth: true, // this will tell the browser that we want a depth buffer
            powerPreference: "high-performance",
            premultipliedAlpha: false, // This can be used if the canvas are going to be blended with the rest of the webpage (transparency)
            stencil: true // this will tell the browser that we want a stencil buffer
        }); // This command loads the WebGL2 context which we will use to draw
        this.input = new Input(this.canvas);
        this.lastTick = performance.now();
        this.loop(performance.now()); // Start the game loop
    }

    public addScene(name: string, type: new (game: Game) => Scene){
        this.scenes[name] = new type(this);
    }

    public addSceneObject(name: string,  scene :Scene) {
        this.scenes[name] = scene;
    }

    

    public addScenes(scenes: {[name: string]: new (game: Game) => Scene}){
        for(let name in scenes) this.addScene(name, scenes[name]);
    }

    setNext() {
        this.nextSceneReady = true
    }

    public startScene(name: string){
        if(name in this.scenes){
            this.nextScene = this.scenes[name];
            this.nextSceneReady = false;
            this.nextScene.load();
            this.loader.wait().then(() => { this.setNext() }) // This will make the loader notify us when the files are ready
        } else {
            console.warn(`Scene "${name}" not found`);
        }
    }

 
    private loop(time: DOMHighResTimeStamp) {
        this.actionGame(time)
        requestAnimationFrame((time) => this.loop(time)); // Tell the browser to call this function again when the next frame needs to be drawn
        if(this.options.maxfps){
            if(time - this.lastTick < (1000/this.options.maxfps)) return;
        }
        if(this.nextScene != null && this.nextSceneReady){ // If there is a next scene and it is ready, replace the current scene with it.
            if(this.currentScene != null) this.currentScene.end(); // If there was an old scene, tell it to free its memory
            this.currentScene = this.nextScene;
            this.nextScene = null;
            this.currentScene.start(); // Tell the scene to initialize its objects
        }
        if(this.currentScene != null){
            this.currentScene.draw(time-this.lastTick); // Tell the scene to draw itself
        }
        this.input.update(); // Update some information about the user input
        this.lastTick = time;
        this.engineAction.addActionT(this);
    }


    protected actionGame(time: number) {
        this.curentAction.actionT(time)
    }

    actionT(t: number): void {
        this.currentTime = t;
    }
    isEngineEnabled(): boolean {
        return this.isEnabled
    }
    setEngineEnabled(enabled: boolean): void {
        if (enabled == this.isEnabled) return
        this.isEnabled = enabled
        this.curentAction = (enabled) ? this.engineAction : this.emptyAction
    }
    getPlayEngineTime(): number {
        return this.currentTime
    }
    getEngineAction(): IActionAddRemoveT<number> {
        return this.engineAction;
    }

    engineAction: IActionAddRemoveT<number> = new ActionArrayT()

    emptyAction: IActionAddRemoveT<number> = new ActionArrayT()

    curentAction: IActionAddRemoveT<number> = new ActionArrayT()

    currentTime: number = Math.min()

    isEnabled: boolean = false

}
