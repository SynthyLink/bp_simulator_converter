import type { IFactory } from "../Interfaces/IFactory";
import type { IPlayEngine } from "../Interfaces/IPlayEngine";
import type { GameOptions } from "./interfaces/IGameOptions";
import type { IGLContext } from "./interfaces/IGLContext";
import { EngineGameCameraAction } from "../Abstract3DGame/Games/EngineGameCameraAction";

export class GLGame extends EngineGameCameraAction implements IGLContext {

    constructor(name: string, factory: IFactory, engine: IPlayEngine, useLoader: boolean,
        canvas: HTMLCanvasElement, options: GameOptions) {
        super(name, factory, engine, useLoader)
        this.types.push("IGLContext")
        this.types.push("GLGame")
        this.typeName = "GLGame"
        this.canvas = canvas
        factory.addFactory<IGLContext>(this, "IGLContext")
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
            this.gl = gl
        }
        this.options = options
    }
    getGlContext(): WebGL2RenderingContext {
        return this.gl;
        
    }

 

   


 
    canvas !: HTMLCanvasElement

    gl !: WebGL2RenderingContext

    nextSceneReady: boolean = false; // Whether the files requested by the next scene has been loaded or not 
    lastTick: number = 0; // The time of the last frame in milliseconds (used to calculate delta time)
    options !: GameOptions;

}